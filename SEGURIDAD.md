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
3. **Rate limiting en `/api/contact`**: máximo 5 mensajes cada 10
   minutos por IP (`src/lib/security/rateLimit.ts`), para frenar spam y
   ataques de fuerza bruta contra el formulario. Nota: es en memoria,
   así que solo protege bien si el sitio corre en un único servidor
   (ver comentario en el archivo).
4. **Escape de HTML en el correo de contacto**: el nombre, teléfono y
   mensaje del visitante se insertaban directo en el HTML del correo,
   lo que permitía inyectar etiquetas HTML. Ahora se escapan.
5. **`.env.example`**: plantilla sin secretos reales para que cualquier
   persona (tú, tu equipo, o un futuro colaborador) sepa qué variables
   necesita sin exponer las reales.

## ⚠️ Pendiente — hazlo tú (no lo pude hacer desde aquí)

1. **Rota estas credenciales** como precaución, ya que estuvieron en un
   archivo `.env` en texto plano en tu disco:
   - Contraseñas de aplicación de Gmail (Puente Alto y Centro) — en
     Google Account → Seguridad → Contraseñas de aplicaciones.
   - `GOOGLE_CLIENT_SECRET` (OAuth) — en Google Cloud Console.
   - `NEXTAUTH_SECRET` — genera uno nuevo con
     `openssl rand -base64 32` y actualízalo en `.env` y en el hosting.
   - Verifica también el token de Instagram (expiran solos, pero
     revisa que no esté filtrado en ningún commit viejo).

2. **Revisa el historial de git** para confirmar que `.env` nunca se
   subió a un commit:
   ```
   git log --all --full-history -- .env
   ```
   Si aparece algo, esas credenciales quedaron expuestas igual (aunque
   borres el archivo después) y hay que rotarlas sin excepción.

3. **Reglas de seguridad de Firestore**: esto se configura en la
   consola de Firebase, no en este repositorio, y es tan importante
   como el código. Verifica que las reglas no permitan lectura/escritura
   pública sin autenticación (`allow read, write: if true;` es la señal
   de alarma clásica).

4. **Formulario de registro** (`RegisterForm.tsx`): actualmente no crea
   usuarios de verdad (el `handleSubmit` solo hace `console.log`). Antes
   de lanzarlo a producción, decide si el registro se hace con
   Firebase Auth o si solo se usará el login con Google — un formulario
   de registro que "parece funcionar" pero no hace nada es un problema
   de confianza con el cliente, no solo de seguridad.

5. **Content-Security-Policy**: quedó en modo "razonable pero flexible"
   (permite `unsafe-inline`/`unsafe-eval` porque Next.js los necesita
   por defecto). Si más adelante quieres endurecerla con nonces, es un
   paso extra que podemos hacer juntos.
