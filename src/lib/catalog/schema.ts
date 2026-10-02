/**
 * Esquema del catálogo. Es la única definición de qué es un producto válido:
 * la usan el repositorio (al cargar) y `npm run catalog:check`.
 *
 * Este archivo no debe importar nada con alias "@/" ni usar sintaxis
 * exclusiva de TypeScript (enum, namespace), porque el script de chequeo lo
 * carga directo con Node (type stripping nativo).
 */
import { z } from "zod";

export const PRODUCT_CATEGORIES = ["Medicamento", "Shampoos"] as const;

export const productSchema = z
  .object({
    // Código de barras UPC/EAN. En el JSON viene como número; se normaliza a
    // texto para que las URLs y las comparaciones no dependan del tipo.
    id: z
      .union([z.string(), z.number().int().nonnegative()])
      .transform((value) => String(value).trim())
      .pipe(z.string().regex(/^\d{8,14}$/, "El id debe ser un código de barras de 8 a 14 dígitos")),
    name: z.string().trim().min(1, "Falta el nombre"),
    category: z.enum(PRODUCT_CATEGORIES, {
      error: `La categoría debe ser una de: ${PRODUCT_CATEGORIES.join(", ")}`,
    }),
    subCategory: z.string().trim().min(1, "Falta la subcategoría"),
    // Precio en CLP, entero y con IVA incluido.
    price: z.number().int("El precio debe ser un entero en CLP").positive("El precio debe ser mayor a 0"),
    iva: z.number().int().min(0).max(100),
    imageUrl: z
      .string()
      .trim()
      .regex(
        /^(\/|https:\/\/).+\.(jpe?g|png|webp|avif)$/i,
        "La imagen debe ser una ruta local (/images/...) o https con extensión de imagen"
      ),
    stock: z.number().int().nonnegative(),
    description: z.string().trim().optional(),
    requiresPrescription: z.boolean(),
  })
  .strict();

export const catalogSchema = z.array(productSchema).superRefine((products, ctx) => {
  const seen = new Map<string, number>();
  products.forEach((product, index) => {
    const first = seen.get(product.id);
    if (first !== undefined) {
      ctx.addIssue({
        code: "custom",
        path: [index, "id"],
        message: `Id duplicado (${product.id}), ya usado en la posición ${first}`,
      });
    } else {
      seen.set(product.id, index);
    }
  });
});

export type Product = z.output<typeof productSchema>;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
