/**
 * Rate limiter con ventana deslizante (sliding window) por IP.
 *
 * En producción usa Upstash Redis, así que el contador es compartido entre
 * todas las instancias serverless de Vercel (antes vivía en la memoria de
 * cada función y el límite real se multiplicaba por el número de
 * instancias).
 *
 * Variables de entorno: UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN.
 *
 * Sin esas variables:
 * - En desarrollo (`next dev`) se usa un contador en memoria y se avisa por
 *   consola.
 * - En producción falla de forma segura: rechaza la solicitud con 503 y
 *   registra el error. Lo mismo si Redis no responde.
 * - Para probar el build en local (`next start`) sin Upstash, se puede
 *   definir RATE_LIMIT_MEMORY_FALLBACK=1. Se ignora dentro de Vercel.
 */

import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
  /** true cuando no se pudo verificar el límite (Redis caído o sin
   * configurar en producción). La solicitud se rechaza igual. */
  unavailable?: boolean;
}

export interface RateLimitPolicy {
  /** Prefijo de la clave en Redis; separa los contadores de cada ruta. */
  name: string;
  limit: number;
  windowMs: number;
}

export const RATE_LIMITS = {
  contact: { name: "contact", limit: 5, windowMs: 10 * 60 * 1000 },
  instagram: { name: "instagram", limit: 60, windowMs: 60 * 1000 },
  products: { name: "products", limit: 60, windowMs: 60 * 1000 },
} as const satisfies Record<string, RateLimitPolicy>;

type Backend = "upstash" | "memory" | "none";

function resolveBackend(): Backend {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return "upstash";
  }
  if (process.env.NODE_ENV !== "production") return "memory";
  if (process.env.RATE_LIMIT_MEMORY_FALLBACK === "1" && !process.env.VERCEL) {
    return "memory";
  }
  return "none";
}

let warnedMemory = false;

// ---------------------------------------------------------------------------
// Upstash
// ---------------------------------------------------------------------------

let redis: Redis | null = null;
const limiters = new Map<string, Ratelimit>();

function getUpstashLimiter(limit: number, windowMs: number): Ratelimit {
  const id = `${limit}:${windowMs}`;
  let limiter = limiters.get(id);
  if (!limiter) {
    redis ??= Redis.fromEnv();
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
      prefix: "dogtoralia:rl",
      analytics: false,
    });
    limiters.set(id, limiter);
  }
  return limiter;
}

// ---------------------------------------------------------------------------
// Memoria (solo desarrollo). Ventana deslizante con marcas de tiempo.
// ---------------------------------------------------------------------------

const hits = new Map<string, number[]>();
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function memoryLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const since = now - windowMs;

  if (now - lastCleanup >= CLEANUP_INTERVAL_MS) {
    lastCleanup = now;
    for (const [k, times] of hits) {
      if (times[times.length - 1] <= since) hits.delete(k);
    }
  }

  const recent = (hits.get(key) ?? []).filter((t) => t > since);
  const resetAt = (recent[0] ?? now) + windowMs;

  if (recent.length >= limit) {
    hits.set(key, recent);
    return { success: false, remaining: 0, resetAt };
  }

  recent.push(now);
  hits.set(key, recent);
  return { success: true, remaining: limit - recent.length, resetAt };
}

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

/**
 * @param key identificador único (normalmente nombre de la ruta + IP)
 * @param limit cantidad máxima de solicitudes permitidas en la ventana
 * @param windowMs duración de la ventana en milisegundos
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const backend = resolveBackend();

  if (backend === "memory") {
    if (!warnedMemory) {
      warnedMemory = true;
      console.warn(
        "[rateLimit] UPSTASH_REDIS_REST_URL/TOKEN no configuradas: usando contador en memoria (solo válido en desarrollo)."
      );
    }
    return memoryLimit(key, limit, windowMs);
  }

  if (backend === "none") {
    console.error(
      "[rateLimit] Faltan UPSTASH_REDIS_REST_URL/TOKEN en producción: se rechaza la solicitud."
    );
    return { success: false, remaining: 0, resetAt: Date.now(), unavailable: true };
  }

  try {
    const { success, remaining, reset } = await getUpstashLimiter(limit, windowMs).limit(key);
    return { success, remaining, resetAt: reset };
  } catch (error) {
    console.error("[rateLimit] Error al consultar Upstash:", error);
    return { success: false, remaining: 0, resetAt: Date.now(), unavailable: true };
  }
}

/** Normaliza una IP candidata: quita puerto y corchetes y la valida. */
function parseIp(value: string | null): string | null {
  if (!value) return null;
  let ip = value.trim();
  if (ip.startsWith("[")) {
    // IPv6 con puerto: [2001:db8::1]:443
    ip = ip.slice(1, ip.indexOf("]") > 0 ? ip.indexOf("]") : undefined);
  } else if (/^\d{1,3}(\.\d{1,3}){3}:\d+$/.test(ip)) {
    // IPv4 con puerto: 1.2.3.4:5678
    ip = ip.slice(0, ip.lastIndexOf(":"));
  }
  return isIP(ip) ? ip.toLowerCase() : null;
}

/**
 * Extrae la IP del cliente. Se toma el primer valor de x-forwarded-for
 * (en Vercel lo fija la plataforma con la IP real) y luego x-real-ip. Solo
 * se aceptan IPs válidas, para que un header manipulado no genere claves
 * arbitrarias en Redis.
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  return (
    parseIp(forwardedFor ? forwardedFor.split(",")[0] : null) ??
    parseIp(headers.get("x-real-ip")) ??
    "unknown"
  );
}

/**
 * Aplica una política a la request. Devuelve la respuesta de rechazo
 * (429 o 503) o null si la solicitud puede seguir.
 */
export async function enforceRateLimit(
  request: Request,
  policy: RateLimitPolicy
): Promise<NextResponse | null> {
  const ip = getClientIp(request.headers);
  const result = await rateLimit(`${policy.name}:${ip}`, policy.limit, policy.windowMs);

  if (result.success) return null;

  if (result.unavailable) {
    return NextResponse.json(
      { success: false, error: "Servicio no disponible. Inténtalo más tarde." },
      { status: 503, headers: { "Retry-After": "60" } }
    );
  }

  const retryAfter = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
  return NextResponse.json(
    {
      success: false,
      error: "Demasiadas solicitudes. Inténtalo de nuevo en unos minutos.",
    },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}
