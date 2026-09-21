# Dogtoralia

Sitio web de Dogtoralia (clínicas veterinarias): inicio, servicios, tienda
como vitrina de productos (las consultas se hacen por WhatsApp), contacto con
formulario y páginas legales. Hecho con Next.js 14 (App Router), Tailwind CSS 4
y Framer Motion.

## Desarrollo

```bash
npm install
cp .env.example .env   # y completa los valores
npm run dev            # http://localhost:3000
npm run lint
npm run build
```

## Estructura

- `src/app/` — páginas y rutas API (`/api/contact`, `/api/instagram`, `/api/products`).
- `src/components/` — componentes de UI (navbar, footer, home, tienda, contacto...).
- `src/data/products.json` — catálogo de la tienda. Las fotos están en `public/images/products/`.
- `src/data/locations.ts` — datos de las sedes (dirección, teléfono, correo). Es la única fuente: la usan contacto, footer, sedes del inicio y el envío del formulario.
- `src/data/site.ts` — datos del sitio para SEO (URL pública, descripción, palabras clave, horario, redes). `src/lib/seo.ts` arma la metadata de cada página y los datos estructurados (JSON-LD). Ver la sección SEO más abajo.
- `src/lib/security/` — validación (zod) y rate limiting del formulario de contacto.

Ver `SEGURIDAD.md` para el estado de seguridad y pendientes.

## SEO

- **Metadata por página**: cada página define su título, descripción y URL canónica con `pageMetadata()` (`src/lib/seo.ts`). Las páginas de cliente (servicios, contacto, tienda) lo hacen desde su `layout.tsx`, porque un componente de cliente no puede exportar metadata. Las fichas de producto usan `generateMetadata`.
- **Datos estructurados (JSON-LD)**: `Organization` y `WebSite` en todas las páginas; `VeterinaryCare` (una por sede, con dirección, teléfono y horario) en inicio y contacto; `Service` en servicios; `BreadcrumbList` en las páginas internas.
- **Rastreo**: `/sitemap.xml` (incluye todos los productos), `/robots.txt` y `/manifest.webmanifest` se generan solos (`src/app/sitemap.ts`, `robots.ts`, `manifest.ts`).
- **Imagen al compartir**: `src/app/opengraph-image.tsx` (también usada como imagen de X/Twitter). Íconos: `icon.tsx` y `apple-icon.tsx`.
- **Dominio**: se toma de `NEXT_PUBLIC_SITE_URL` (por defecto `https://dogtoraliavet.cl`). `/` redirige de forma permanente (308) a `/home`, que es la URL canónica del inicio.
- **Cambiar datos**: dirección/teléfono en `data/locations.ts`, horario y palabras clave en `data/site.ts`, textos de servicios en `data/services.ts`. Todo (página, footer, JSON-LD) se actualiza desde ahí.
