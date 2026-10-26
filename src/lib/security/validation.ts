import { z } from "zod";

/**
 * Esquema de validación para el formulario de contacto.
 * Se usa tanto en el cliente (mensajes de error más rápidos) como en el
 * servidor (la validación que realmente importa: el cliente siempre se
 * puede saltar).
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  email: z
    .string()
    .trim()
    .email("Correo electrónico inválido")
    .max(200, "El correo es demasiado largo"),
  phone: z
    .string()
    .trim()
    .max(30, "El teléfono es demasiado largo")
    // Móvil o fijo chileno, con o sin +56; se ignoran espacios, guiones y paréntesis
    .refine((v) => /^(\+?56)?[29]\d{8}$/.test(v.replace(/[\s\-()]/g, "")), {
      message: "Ingresa un teléfono chileno válido (ej: +56 9 1234 5678)",
    })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje es demasiado largo (máx. 2000 caracteres)")
    .refine((v) => /\S+\s+\S+/.test(v), {
      message: "Escribe tu mensaje con algunas palabras",
    }),
  location: z.enum(["Puente Alto", "Santiago Centro"], {
    error: "Elige la sede a la que quieres escribir",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Tiempo mínimo que una persona tarda en llenar el formulario. */
export const MIN_FILL_MS = 3000;

/**
 * Señales de bot que se descartan en silencio (el bot recibe "éxito" y
 * no aprende qué lo delató): honeypot lleno, envío demasiado rápido o
 * sin marca de tiempo, nombres tipo "izmGqCmtNYjOEevMvNw" y Gmail con
 * puntos sembrados ("ov.u.n.uto.lo.62.0@gmail.com").
 */
export function isLikelySpam(
  data: Pick<ContactInput, "name" | "email">,
  meta: { website?: unknown; elapsedMs?: unknown }
): boolean {
  if (typeof meta.website === "string" && meta.website.trim() !== "") return true;
  if (typeof meta.elapsedMs !== "number" || meta.elapsedMs < MIN_FILL_MS) return true;
  // 3+ mayúsculas en medio de una palabra ("McDonald" tiene 1)
  if (data.name.split(/\s+/).some((w) => (w.slice(1).match(/[A-Z]/g)?.length ?? 0) >= 3)) {
    return true;
  }
  const [local, domain] = data.email.toLowerCase().split("@");
  if ((domain === "gmail.com" || domain === "googlemail.com") && (local.match(/\./g)?.length ?? 0) >= 4) {
    return true;
  }
  return false;
}

/**
 * Escapa caracteres HTML especiales para evitar inyección de markup
 * cuando insertamos texto del usuario dentro del cuerpo HTML del correo.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
