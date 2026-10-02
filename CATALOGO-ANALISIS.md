# Catálogo de productos: análisis y propuesta de migración

Fecha: 2026-10-02. El sitio sigue siendo una **vitrina**: no hay carrito ni
pagos, las consultas se hacen por WhatsApp.

## 1. Estado actual

### Cómo fluye el catálogo

| Pieza | Antes | Ahora (fase 3) |
| --- | --- | --- |
| Fuente | `src/data/products.json` (59 KB, 108 productos), generado en su momento desde `src/data/medicamentos.xlsx` | Igual |
| Tipo | `src/types/product.ts` (interfaz escrita a mano, `id: string`) | Derivado del esquema zod (`src/lib/catalog/schema.ts`) |
| Lectura | `src/lib/products.ts` (`fs.readFileSync` + `JSON.parse`, sin validar) | `getCatalog()` → `CatalogRepository` → `JsonCatalogRepository` (valida con zod) |
| `/store` | Componente de cliente que pedía `/api/products` en el navegador | Página de servidor estática que lee el repositorio; el filtro sigue en el navegador (`StoreClient`) |
| `/product/[id]` | `loadProducts().find(...)` | `getCatalog().getById(id)` |
| `sitemap.xml` | `loadProducts()` | `getCatalog().list()` |
| `/api/products` | Leía el JSON directamente | `getCatalog().list()` (con rate limit) |

Efecto visible: ninguno en diseño ni contenido. Diferencias menores:
- `/store` ya no muestra "Cargando productos…": los productos vienen en el
  HTML, lo que además ayuda al SEO y evita que la tienda dependa del rate
  limit de `/api/products`.
- `/api/products` devuelve `id` como texto (`"7804650310129"`) en vez de
  número. Ningún código del sitio usa ya esa ruta; queda como API pública.

### Estructura de un producto

| Campo | Tipo en el JSON | Observaciones |
| --- | --- | --- |
| `id` | número (12 o 13 dígitos, EAN/UPC) | **Inconsistencia**: el tipo decía `string`. Ahora se normaliza a texto al cargar. |
| `name` | texto | 107 de 108 con guiones bajos (`REVOLUTION_PLUS__5KG_a_10KG`); el sitio los limpia con `cleanAndCapitalize`. |
| `category` | `"Medicamento"` (95) / `"Shampoos"` (13) | Consistente. |
| `subCategory` | texto, 22 valores | Ver inconsistencias. |
| `price` | entero CLP (2.000 a 41.500) | **No se muestra en el sitio.** 9 precios no terminan en 0 (p. ej. 16.798, 14.706), lo que sugiere que se calcularon desde un neto + IVA. |
| `iva` | 19 en todos | Redundante hoy. |
| `stock` | 3 en 107 productos, 2 en uno | Parece un valor de relleno; no se usa. |
| `imageUrl` | ruta local | Todas existen en `public/`. |
| `description` | texto | Todos tienen descripción. |
| `requiresPrescription` | booleano | 94 sí / 14 no. No se muestra. |

### Inconsistencias encontradas

1. **Imágenes genéricas**: 19 productos usan `/images/products/medicamento/standar.jpg`.
2. **Imágenes huérfanas**: 140 archivos en `public/images/products` (15,4 MB), de los cuales **50 no los usa ningún producto**.
3. **Nombres de archivo frágiles**: 10 rutas con espacios, una con un acento grave (`FELIN\` GOOD`), 58 con mayúsculas. Los 13 shampoos guardan su foto en la carpeta `medicamento/`.
4. **Subcategorías** (✅ corregido el 2026-10-02):
   - Se quitaron los espacios al final de `"Suplemento "` (24) y `"Analgésico-Antiinflamatorio "` (8).
   - `"Colorio antibiótico"` → `"Colirio antibiótico"`.
   - `"Solución Tópica"` → `"Solución tópica"` (igual que `"Solución ótica"`).
5. **Textos de las descripciones** (✅ corregido el 2026-10-02):
   - "æcaros" → "ácaros" (producto `7804650310129`).
   - 2 acentos guardados como dos caracteres (letra + tilde combinada) se unificaron (normalización NFC); se veían bien, pero fallaban en búsquedas.
   - Se quitó un selector de emoji suelto después de "Oxyfresh®".
   - "deficiente.Ayuda" → "deficiente. Ayuda".
   - 3 descripciones con espacio al final.
6. **Descripciones repetidas**: 5 pares de productos comparten la misma descripción (en general, presentaciones distintas del mismo producto, así que es aceptable).
7. **Duplicados**: no hay ids ni nombres repetidos.
8. **Precios**: todos son enteros positivos; no hay formatos rotos.

Los puntos 4 y 5 ya están corregidos. Los puntos 1 a 3 (fotos y archivos)
requieren fotos reales o decidir qué hacer con las imágenes sin usar.

### Validación

`npm run catalog:check` valida `products.json` con el mismo esquema zod que
usa el sitio y además revisa que exista cada imagen local. Sale con código 1
y lista cada error (producto, campo y motivo), por ejemplo:

```
Catálogo con 3 error(es):
  - #1 (id 7804650310136) price: El precio debe ser un entero en CLP
  - #2 (id 7804650310129) id: duplicado, ya usado en #0
  - #3 (id 7798176423916) imageUrl: no existe public/images/no-existe.jpg
```

Además, si el JSON es inválido, `next build` falla, porque el repositorio
valida al cargar. Requiere Node 22.18 o superior (usa el soporte nativo de
TypeScript de Node; no agrega dependencias).

## 2. Comparación de proveedores

Supuestos: un solo administrador (la dueña), cientos de productos,
cambios de precio frecuentes, hosting en Vercel, tráfico de sitio local.
Tipo de cambio de referencia: **US$1 ≈ $950 CLP**. Los precios son los
planes públicos conocidos a la fecha; confírmalos antes de contratar.

| Opción | Costo mensual realista | Esfuerzo de migración | Comodidad para editar precios | Imágenes | Riesgo de dependencia |
| --- | --- | --- | --- | --- | --- |
| **Supabase (Postgres)** | $0 (plan gratis; se pausa tras 7 días sin uso) a ~$24.000 (Pro US$25) | Alto: base + panel de administración propio + login | Baja con el editor de tablas (es técnico); buena solo si se construye un panel | Supabase Storage (incluido) | Bajo: es Postgres estándar |
| **Sanity** | $0 (plan gratis alcanza de sobra) a ~$14.000 por usuario (Growth) | Medio: esquema, Studio, importación y repositorio | **Alta**: formulario por producto, desde el celular, con historial de cambios | **CDN de imágenes incluido**, con recorte y formatos modernos | Medio: datos en su nube (se pueden exportar con la CLI) |
| **Payload CMS** | ~$0 a ~$19.000 (Neon + Vercel Blob) | Alto: se instala dentro de la app de Next; hay que mantenerlo | Alta (panel generado), pero hay que alojarlo y actualizarlo | Vercel Blob o S3 | Bajo: código abierto y base propia |
| **Airtable** | $0 (máx. 1.000 registros y **1.000 llamadas a la API al mes**) a ~$19.000 por usuario (Team) | Bajo-medio | **Muy alta**: es una planilla | Los adjuntos tienen URLs que **caducan**: hay que copiarlos a otro almacenamiento | Medio-alto: límites del plan gratis y formato propietario |
| **Google Sheets** | $0 | Bajo | **Muy alta** (ya trabaja en Excel) | Débil: links de Drive poco fiables; requiere almacenamiento aparte | Bajo, pero **frágil**: una columna movida rompe el sitio; requiere cuenta de servicio (otro secreto) |
| **Neon/Vercel Postgres + panel propio** | $0 (Neon gratis) a ~$18.000 (Launch) | **El más alto**: CRUD, login seguro, subida de imágenes | Tan buena como el panel que se construya | Vercel Blob (~$0 a este volumen) | Bajo |

### Recomendación: **Sanity**

1. **La dueña edita sola y con seguridad**: el Studio da un formulario por
   producto con campos validados (precio entero, categoría de una lista),
   historial y deshacer, sin construir ni mantener un panel ni un login
   propio. Justo se eliminó NextAuth para reducir superficie de ataque, y
   este enfoque no lo reintroduce.
2. **Costo cero realista**: cientos de productos y un usuario están muy
   por debajo del plan gratis.
3. **Imágenes resueltas**: subida desde el Studio y CDN con redimensión,
   lo que también resuelve los 50 archivos huérfanos y los nombres frágiles.
4. **Cambio de precio sin redeploy**: un webhook de Sanity llama a una ruta
   del sitio que revalida la caché por tag (sección 3).
5. **Riesgo acotado**: gracias a `CatalogRepository`, Sanity queda detrás
   de una sola clase; volver a JSON u otro proveedor es reemplazar esa
   implementación.

Punto débil: cambiar muchos precios a la vez es más lento que en una
planilla. Mitigación: un script `catalog:import-prices` que lea un CSV/Excel
(`ean,precio`) y actualice los precios en lote con la API de Sanity. Si la
dueña prefiere de todas formas trabajar en planilla, la segunda opción es
**Google Sheets como fuente + imágenes en Vercel Blob**, aceptando su
fragilidad y validando con el mismo esquema zod al leer.

## 3. Plan de migración (cuando lo decidas)

### 3.1 Esquema propuesto (Sanity)

```ts
// sanity/schemas/product.ts
defineType({
  name: "product",
  type: "document",
  fields: [
    { name: "ean", type: "string", validation: (r) => r.required().regex(/^\d{8,14}$/) },
    { name: "name", type: "string", validation: (r) => r.required() },
    { name: "slug", type: "slug", options: { source: "name" } },
    { name: "category", type: "string", options: { list: ["Medicamento", "Shampoos"] } },
    { name: "subCategory", type: "reference", to: [{ type: "subCategory" }] }, // lista controlada, sin tipeos
    { name: "price", type: "number", validation: (r) => r.required().integer().positive() },
    { name: "requiresPrescription", type: "boolean", initialValue: true },
    { name: "image", type: "image", options: { hotspot: true } },
    { name: "description", type: "text" },
    { name: "active", type: "boolean", initialValue: true }, // ocultar sin borrar
  ],
});
```

- El `_id` del documento será `product-<ean>`, así las URLs
  `/product/<ean>` no cambian y el SEO se mantiene.
- `iva` y `stock` se eliminan: hoy no aportan (todos tienen el mismo valor) y
  pueden volver si algún día se muestran.

(Si se eligiera Postgres, la tabla equivalente es `products(ean text primary
key, name text not null, category text check (...), sub_category_id int
references sub_categories, price integer not null check (price > 0),
requires_prescription boolean not null default true, image_url text,
description text, active boolean not null default true, updated_at
timestamptz not null default now())`.)

### 3.2 Script de importación del JSON

`scripts/catalog-import-sanity.mjs` (se crea al migrar):

1. Lee `products.json` y lo valida con `productSchema` (el mismo de hoy).
2. Normaliza: recorta subcategorías, corrige "Colorio" → "Colirio" y
   "æcaros" → "ácaros", y crea los documentos `subCategory` únicos.
3. Sube cada imagen local con `client.assets.upload("image", stream)`,
   reutilizando el asset si la ruta se repite (la imagen genérica se omite y
   el sitio muestra la de respaldo).
4. Crea o reemplaza cada `product-<ean>` en una transacción
   (`createOrReplace`), así el script es idempotente.
5. Imprime un resumen y compara el conteo final con el JSON (108).

### 3.3 Revalidación sin redeploy

```ts
// src/lib/catalog/sanityRepository.ts (implementa CatalogRepository)
const products = await sanityFetch(query, {}, { next: { tags: ["catalog"] } });
```

```ts
// src/app/api/revalidate/route.ts
import { revalidateTag } from "next/cache";
// 1. Verificar la firma del webhook (SANITY_WEBHOOK_SECRET).
// 2. revalidateTag("catalog", "max");   // Next 16: segundo argumento obligatorio
// 3. Responder 200.
```

- En Sanity → API → Webhooks: disparar en create/update/delete de
  `product`, apuntando a `https://dogtoraliavet.cl/api/revalidate`.
- `/store`, `/product/[id]` y el sitemap quedan cacheados y se regeneran
  solos tras cada cambio (stale-while-revalidate: el primer visitante ve la
  versión anterior y el siguiente ya ve el precio nuevo).
- `generateStaticParams` sigue precalculando las fichas, y con
  `dynamicParams` (activo por defecto) un producto nuevo se genera en la
  primera visita.
- Cambio en el código del sitio: **solo** `getCatalog()` en
  `src/lib/catalog/index.ts` pasa a devolver `new SanityCatalogRepository()`.

Variables nuevas al migrar: `SANITY_PROJECT_ID`, `SANITY_DATASET`,
`SANITY_API_READ_TOKEN` (solo si el dataset es privado) y
`SANITY_WEBHOOK_SECRET`.
