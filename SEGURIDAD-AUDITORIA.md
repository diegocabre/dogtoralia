# Auditoría de seguridad: secretos e historial de git

Fecha: 2026-10-02 · Rama: `chore/seguridad-stack-catalogo`

> Este informe **no contiene valores** de ningún secreto, solo nombres de
> variables, commits y largo de los valores (para distinguir un valor real de
> uno vacío).

## 1. Resumen

| Pregunta | Respuesta |
| --- | --- |
| ¿Hubo secretos en el historial de git? | **Sí.** El archivo `.env.local` se commiteó en `ec002a2` (2025-05-05) y se borró en `5fdb201`. |
| ¿Están en el repositorio remoto hoy? | **No.** Ninguna rama ni `refs/pull/*` de `origin` contiene esos commits, y la API de GitHub responde `422 No commit found` para ambos SHA. |
| ¿Dónde están? | Solo en **dos ramas locales**: `clean-main` (contiene `ec002a2`) y `recovery` (contiene `ec002a2` y `5fdb201`). |
| ¿El repo remoto es público? | **Sí.** `github.com/diegocabre/dogtoralia` es público (0 forks). |
| ¿Hay secretos en el código actual o en `public/`? | **No.** No hay coincidencias de `AIza`, `GOCSPX-`, `sk_`, `re_…_`, `IGQ…`, `EAA…` ni claves privadas. |
| ¿`.env` se commiteó alguna vez? | **No** (`.env`, `.env.production` y `.env.development` no aparecen en el historial). |

### ¿Por qué tratarlo como exposición real?

El repositorio público se creó el 2025-05-02. El commit con `.env.local` es del
2025-05-05, y ese mismo día el reflog muestra que `main` se reconstruyó dos
veces desde un commit nuevo llamado *"chore: initial commit with clean
history"* (`89ec97b` y luego `dbbc068`). Eso indica que se limpió el
historial después del problema, y no se puede probar que `ec002a2` nunca
llegó a GitHub (aunque fuera por unos minutos, los bots que rastrean GitHub
buscando claves actúan en segundos). Además:

- Las variables `NEXT_PUBLIC_*` se incrustan en el JavaScript que descarga el
  navegador. Si esa versión se desplegó en Vercel, la clave de Firebase y el
  token de Instagram fueron públicos por diseño.
- Todas las credenciales siguen en texto plano en el disco (ramas locales y
  posiblemente en el `.env` actual).

**Conclusión: hay que rotar o revocar todo lo de la tabla siguiente.**

## 2. Variables encontradas en `ec002a2:.env.local`

| Variable | ¿Tenía valor? | ¿La usa el código hoy? | Acción |
| --- | --- | --- | --- |
| `GOOGLE_CLIENT_ID` | Sí (72 car.) | No | Eliminar el cliente OAuth |
| `GOOGLE_CLIENT_SECRET` (`GOCSPX-…`) | Sí (35 car.) | No | Eliminar el cliente OAuth |
| `NEXTAUTH_SECRET` | Sí (31 car.) | No | Borrar de Vercel/`.env` (no hay servicio que revocar) |
| `NEXTAUTH_URL` | Sí (no es secreto) | No | Borrar |
| `EMAIL_USER_PUENTE_ALTO` / `EMAIL_PASSWORD_PUENTE_ALTO` | Sí (contraseña de aplicación, 16 car.) | No | **Revocar la contraseña de aplicación** |
| `EMAIL_USER_CENTRO` / `EMAIL_PASSWORD_CENTRO` | Sí (contraseña de aplicación, 16 car.) | No | **Revocar la contraseña de aplicación** |
| `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN` | Sí (184 car.) | No (hoy es `INSTAGRAM_ACCESS_TOKEN`, solo servidor) | Revocar y generar uno nuevo |
| `INSTAGRAM_CLIENT_ID` / `INSTAGRAM_CLIENT_SECRET` | Sí | No | Restablecer la clave secreta de la app |
| `INSTAGRAM_USER_ID` | Sí (no es secreto) | No | Borrar |
| `NEXT_PUBLIC_FIREBASE_API_KEY` (`AIza…`) y el resto de `NEXT_PUBLIC_FIREBASE_*` | Sí | No | Eliminar el proyecto o restringir/borrar la clave |

Otros resultados de la búsqueda `git log -S` (por ejemplo `dbbc068`, `6663c6b`,
`732fd72`) corresponden a **nombres** de variables en código o en
`.env.example`, no a valores. Se verificó cada versión de `.env.example`: solo
tuvo valores no secretos (`NEXT_PUBLIC_SITE_URL`, `CONTACT_FROM_EMAIL`,
`NEXTAUTH_URL=http://localhost…`). `RESEND_API_KEY` nunca tuvo valor en git.

## 3. Checklist de rotación (hazlo tú, en este orden)

### 3.1 Gmail: contraseñas de aplicación (URGENTE)
Dan acceso completo para **enviar correo** como la clínica.
1. Entra a la cuenta de Gmail de **Puente Alto**.
2. Ve a <https://myaccount.google.com/apppasswords> (Cuenta de Google → Seguridad → Verificación en 2 pasos → Contraseñas de aplicaciones).
3. Elimina **todas** las contraseñas de aplicación (el sitio ya no las usa: el correo sale por Resend).
4. Revisa <https://myaccount.google.com/notifications> y <https://myaccount.google.com/device-activity> por accesos extraños, y en Gmail → Configuración → Reenvío y POP/IMAP, que no haya reenvíos que no reconozcas.
5. Repite los pasos 1 a 4 con la cuenta de **Centro**.

### 3.2 Google Cloud: cliente OAuth (login con Google eliminado)
1. <https://console.cloud.google.com/apis/credentials> → selecciona el proyecto.
2. En "IDs de clientes OAuth 2.0", **elimina** el cliente que usaba el sitio (o, si lo vas a reutilizar, "Restablecer secreto").
3. Si el proyecto no tiene otro uso, ciérralo: <https://console.cloud.google.com/iam-admin/settings> → "Cerrar".

### 3.3 Firebase (ya no se usa)
1. <https://console.firebase.google.com> → proyecto → ⚙️ Configuración del proyecto → General → **Eliminar proyecto** (opción recomendada).
2. Si prefieres conservarlo: revisa Firestore → Reglas y Storage → Reglas (no debe existir `allow read, write: if true;`), y en <https://console.cloud.google.com/apis/credentials> borra la clave `AIza…` o restríngela por referente HTTP y API.

### 3.4 Instagram / Meta
1. <https://developers.facebook.com/apps> → tu app → Configuración de la app → Básica → **Clave secreta de la app → Restablecer**.
2. En la cuenta de Instagram: Configuración → Seguridad → Apps y sitios web → quita el acceso de la app (invalida tokens antiguos).
3. Vuelve a autorizar y genera un **token de larga duración nuevo** (Productos → Instagram → Configuración de la API con inicio de sesión de Instagram → Generar token).
4. Guárdalo solo como `INSTAGRAM_ACCESS_TOKEN` (sin `NEXT_PUBLIC_`) en Vercel. Caduca a los ~60 días: agenda la renovación.

### 3.5 Resend (no se filtró, rotación preventiva)
1. <https://resend.com/api-keys> → crea una clave nueva con permiso **"Sending access"** limitada al dominio `dogtoraliavet.cl`.
2. Reemplázala en Vercel y en tu `.env`, haz redeploy y **borra la clave anterior**.

### 3.6 Vercel: limpiar variables
<https://vercel.com> → proyecto → Settings → Environment Variables. Deja solo:
`NEXT_PUBLIC_SITE_URL`, `INSTAGRAM_ACCESS_TOKEN`, `RESEND_API_KEY`,
`CONTACT_FROM_EMAIL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
Borra todas las de Google, NextAuth, Firebase, Gmail e Instagram antiguas.
Haz lo mismo en tu `.env` local (no lo revisé, por instrucción).

### 3.7 GitHub
1. <https://github.com/diegocabre/dogtoralia/settings/security_analysis> → activa **Secret scanning** y **Push protection** (gratis en repos públicos).
2. Revisa <https://github.com/diegocabre/dogtoralia/security> por alertas antiguas.

## 4. Limpieza del historial local (para tu aprobación; NO ejecutado)

Como `main` y todas las ramas remotas ya están limpias, **no hace falta
reescribir el historial publicado**. Basta con eliminar las dos ramas locales
que conservan el commit y purgar los objetos huérfanos:

```bash
# 1. Respaldo por si acaso (queda FUERA del repo; bórralo cuando termines de rotar)
git bundle create ../dogtoralia-respaldo.bundle --all

# 2. Borrar las ramas locales que contienen ec002a2 / 5fdb201
git branch -D clean-main recovery

# 3. Purgar reflog y objetos inalcanzables
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 4. Verificar (debe salir vacío)
git log --all --oneline -- .env.local
git cat-file -t ec002a23e8a67433146f584dccecf0642395600f
```

Si prefieres **conservar** esas ramas, la alternativa es `git filter-repo`
(requiere `pip install git-filter-repo`), en un clon espejo:

```bash
git clone --mirror git@github.com:diegocabre/dogtoralia.git dogtoralia-mirror
cd dogtoralia-mirror
git filter-repo --invert-paths --path .env.local --path .env --force
```

…pero eso cambia los SHA de todas las ramas afectadas y obliga a un
`push --force`; no lo recomiendo porque no es necesario aquí.

**Importante:** limpiar el historial no "des-filtra" nada. La rotación de la
sección 3 es obligatoria aunque borres las ramas.

## 5. Otras revisiones

- **`.gitignore`**: listaba `.env.example` como ignorado (aunque ya estaba
  versionado). Se cambió a `.env*` con la excepción `!.env.example`.
- **Dependencias sin uso**: no quedan paquetes de Firebase, NextAuth,
  nodemailer ni Google en `package.json` ni en `package-lock.json`, ni código
  que los importe. No hay nada que eliminar.
- **`.env.example`**: ya listaba solo variables en uso
  (`NEXT_PUBLIC_SITE_URL`, `INSTAGRAM_ACCESS_TOKEN`, `RESEND_API_KEY`,
  `CONTACT_FROM_EMAIL`). En la fase 1 se suman las de Upstash.
