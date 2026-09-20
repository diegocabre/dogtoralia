/**
 * Rate limiter simple en memoria (ventana fija por IP).
 *
 * OJO: esto vive en la memoria del proceso de Node. Sirve bien para un solo
 * servidor (VPS, contenedor único, `next start`). Si en el futuro se
 * despliega en una plataforma serverless con múltiples instancias
 * (Vercel con varias funciones, por ejemplo), cada instancia tendría su
 * propio contador y el límite real sería más alto que el configurado.
 * Para ese caso, reemplazar por un rate limiter con almacenamiento
 * compartido (Redis / Upstash).
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

// Limpieza periódica para no acumular memoria indefinidamente
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * @param key identificador único (normalmente IP + nombre de la ruta)
 * @param limit cantidad máxima de solicitudes permitidas en la ventana
 * @param windowMs duración de la ventana en milisegundos
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  cleanup(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/**
 * Extrae una IP razonable desde los headers de la request.
 * Next.js (App Router) no expone `request.ip` de forma consistente
 * según el entorno de despliegue, así que se revisan los headers
 * estándar que ponen los proxys/CDN.
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
