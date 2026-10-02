# Revisión de seguridad — Dogtoralia (checklist OWASP)

Fecha de esta revisión: ver historial de git de este archivo.

## ✅ Ya corregido en esta pasada

1. **Cabeceras de seguridad** (`next.config.js`): CSP, X-Frame-Options,
   X-Content-Type-Options, Referrer-Policy, Permissions-Policy y
   Strict-Transport-Security.
2. **Validación de datos en el servidor** (`/api/contact`): antes solo
   se validaba en el navegador (fácil de saltarse con curl/Postman).
   Ahora se usa `zod` (`src/lib/security/validation.ts`) también en el
   backend.
3. **Rate limiting persistente** (`src/lib/security/rateLimit.ts`):
   ventana deslizante por IP guardada en Upstash Redis, compartida entre
   todas las instancias de Vercel (variables `KV_REST_API_*` de la
   integración de Vercel o `UPSTASH_REDIS_REST_*`; claves con prefijo
   `dogtoralia:rl`, así que la base se puede compartir con otros proyectos). Límites: `/api/contact` 5 cada 10
   minutos; `/api/instagram` y `/api/products` 60 por minuto. Si Upstash
   no está configurado o no responde en producción, la ruta responde 503
   (falla cerrada) y queda registrado en los logs. En desarrollo usa un
   contador en memoria.
4. **Escape de HTML en el correo de contacto**: el nombre, teléfono y
   mensaje del visitante se insertaban directo en el HTML del correo,
   lo que permitía inyectar etiquetas HTML. Ahora se escapan.
5. **`.env.example`**: plantilla sin secretos reales para que cualquier
   persona (tú, tu equipo, o un futuro colaborador) sepa qué variables
   necesita sin exponer las reales.

## ⚠️ Pendiente — hazlo tú (no lo pude hacer desde aquí)

> El detalle completo, con rutas de cada consola, está en
> [`SEGURIDAD-AUDITORIA.md`](SEGURIDAD-AUDITORIA.md).

1. **Rota estas credenciales SIN EXCEPCIÓN**: la auditoría del 2026-10-02
   encontró que `.env.local` se commiteó en `ec002a2` (2025-05-05). Hoy ese
   commit solo existe en las ramas locales `clean-main` y `recovery`, pero el
   repo es público y no se puede descartar que haya llegado a GitHub.
   - Contraseñas de aplicación de Gmail (Puente Alto y Centro): revócalas.
   - Cliente OAuth de Google (`GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`) y
     `NEXTAUTH_SECRET`: el login con Google ya no existe; elimina el cliente
     en Google Cloud y borra las variables.
   - Instagram: restablece la clave secreta de la app y genera un token
     nuevo (`INSTAGRAM_ACCESS_TOKEN`, solo servidor).
   - Firebase: elimina el proyecto o restringe su clave `AIza…`.

2. **Historial de git**: `main` y todas las ramas remotas están limpias. La
   limpieza de las dos ramas locales está documentada en la auditoría y
   requiere tu aprobación.

3. **Firebase**: el sitio ya no lo usa. Si el proyecto de Firebase sigue
   activo en la consola, revisa que sus reglas de Firestore/Storage no
   permitan acceso público (`allow read, write: if true;` es la señal de
   alarma clásica) o elimina el proyecto.

4. **Content-Security-Policy**: quedó en modo "razonable pero flexible"
   (permite `unsafe-inline`/`unsafe-eval` porque Next.js los necesita
   por defecto). Si más adelante quieres endurecerla con nonces, es un
   paso extra que podemos hacer juntos.
