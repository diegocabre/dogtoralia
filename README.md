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
- `src/lib/security/` — validación (zod) y rate limiting del formulario de contacto.

Ver `SEGURIDAD.md` para el estado de seguridad y pendientes.
