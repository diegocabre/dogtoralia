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
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje es demasiado largo (máx. 2000 caracteres)"),
  location: z.enum(["Puente Alto", "Santiago Centro"], {
    errorMap: () => ({ message: "Ubicación no válida" }),
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;

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
