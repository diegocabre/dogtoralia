# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Familias del barrio, de Puente Alto y Santiago Centro, con perros y gatos. Entran casi siempre desde el celular y su objetivo es conseguir hora rápido: abren el sitio, eligen la sede y escriben por WhatsApp. En segundo lugar, revisan servicios, horarios, cómo llegar y productos de la tienda antes de escribir.

## Product Purpose

Dogtoralia Vet es una clínica veterinaria de barrio con dos sedes. El sitio existe para que una familia pase de "necesito llevar a mi mascota" a un WhatsApp enviado a la sede correcta, con la confianza de que la van a atender bien. El éxito se mide en conversaciones de WhatsApp iniciadas, no en visitas.

## Positioning

- Anestesiólogo (Gabriel Cabré) y cirujana (Sara Vásquez) en el equipo propio: los procedimientos y cirugías no se derivan.
- Atención a domicilio en todo Santiago, además de las dos sedes. WhatsApp propio: +56 9 8342 1929 (`DOMICILIO_WHATSAPP_PHONE` en `src/data/locations.ts`).
- En las cirugías programadas atienden los dos veterinarios juntos.
- Clínica, peluquería canina y felina y tienda en un mismo lugar.
- Precios accesibles para el barrio. No hay precios publicados: no inventar cifras.

## Operating Context

- **Sedes:** Puente Alto (Av. Concha y Toro 3859, WhatsApp +56 9 5783 0195) y Santiago Centro (Av. Presidente Balmaceda 2776, WhatsApp +56 9 2749 2520). Fuente única: `src/data/locations.ts`.
- **Horario por sede** (`hours` en `src/data/locations.ts`): Puente Alto, lunes a viernes de 10:00 a 18:00 y sábados de 10:00 a 16:00; Santiago Centro, lunes a viernes de 10:00 a 18:30 y sábados de 10:00 a 16:30. Domingo cerrado en ambas.
- **Reserva:** por WhatsApp, un número por sede. No hay sistema de reservas online; la evaluación está en `RESERVAS-PROPUESTA.md`.
- **Tienda:** es una vitrina. No hay carrito ni pago online; cada producto se consulta por WhatsApp y se retira en la sede (Puente Alto o Santiago Centro); no hay despacho. El catálogo vive en `src/data/products.json`.
- **Contacto:** formulario con envío por correo (Resend) y rate limiting, además de Google Maps y Waze por sede.

## Capabilities and Constraints

- **Servicios** (`src/data/services.ts`): Consultas, Vacunas, Exámenes, Procedimientos, Otros servicios (cardiología, oftalmología y ecografía abdominal) y Peluquería canina y felina (corte y baño, baño medicado), en las dos sedes.
- **Atención a domicilio:** cubre Santiago en general (no solo las comunas de las sedes). Hoy no aparece como servicio en el sitio. No hay condiciones ni precios publicados: no inventarlos.
- **Equipo por sede:** en el día a día, Sara Vásquez (cirujana) atiende en Puente Alto y Gabriel Cabré (anestesiólogo) en Santiago Centro. En las cirugías programadas, atienden los dos juntos. El sitio no promete atención de urgencias.
- **Técnico:** Next.js (App Router), Tailwind CSS 4 y Framer Motion. `/` redirige a `/home`, que es la URL canónica. Las URLs, los datos estructurados (JSON-LD) y la metadata SEO ya están trabajados y no se deben romper.

## Brand Commitments

- **Nombre:** Dogtoralia Vet ("Dogtoralia Clínicas Veterinarias" en el logo).
- **Voz:** cercana, confiable, con humor suave. Nunca corporativa. Se tutea al lector, en español de Chile.
- **Límite del humor:** nunca en salud seria (enfermedad, cirugía, eutanasia, urgencias) ni en precios. Cabe en peluquería, tienda, microtextos y estados vacíos.
- **Activos que se protegen (no reemplazar ni alterar):**
  - Logo multicolor redondo: `public/img/LOGO.png`.
  - Foto del equipo con Gabriel Cabré y Sara Vásquez junto a un perro: `public/images/portada.png`.
  - Fachadas reales de las sedes: `public/images/puentealto1.jpeg` y `public/images/centro.jpeg`.
  - Reseñas de Google: 4,9 en ambas fichas, más de 240 en total (151 en Puente Alto y 94 en Santiago Centro, en `src/data/reviews.ts`).
- **Acción principal:** agendar por WhatsApp, eligiendo la sede.

## Evidence on Hand

- Reseñas reales de Google copiadas sin modificar (`src/data/reviews.ts`). Varias nombran al Dr. Gabriel y a la Dra. Sara.
- Foto real del equipo y fotos reales de ambas fachadas (rutas arriba).
- Fotos de producto en `public/images/products/`. Algunos productos no tienen foto propia.
- Fotos de servicios en `public/images/services/`. Son de stock, no de la clínica.
- Imagen para compartir: `public/images/og-dogtoralia.jpg`.
- **No existen y no se deben inventar:** precios, años de trayectoria, cantidad de pacientes atendidos, certificaciones, testimonios fuera de Google, fotos individuales del equipo ni fotos del interior de las clínicas.

## Product Principles

1. **WhatsApp primero.** Toda página deja a un toque el WhatsApp de la sede correcta; nada compite con esa acción.
2. **Lo real por sobre lo genérico.** Personas, fachadas, calles y reseñas verdaderas pesan más que cualquier foto de stock o frase que podría ser de otra veterinaria.
3. **Pensado para el celular.** El caso principal es una familia con el teléfono en la mano: lo importante se ve sin buscarlo.
4. **Barrio, no cadena.** Se habla como la veterinaria de la esquina que conoce a tu mascota, con nombres propios y sin lenguaje corporativo.
5. **Confianza clínica con calidez.** El humor acompaña, pero la salud se trata en serio.

## Accessibility & Inclusion

Público amplio en edad y manejo digital, mayormente en celular: textos legibles, contraste WCAG AA y objetivos táctiles cómodos (44px) en las acciones de WhatsApp, mapas y teléfonos.
