export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Nombre de producto para mostrar. Los nombres del catálogo ya vienen
 * escritos para leer ("Nexgard 11,3 mg (2 a 4 kg) x 3 comprimidos") y se
 * respetan tal cual. Si llega un nombre en el formato antiguo (mayúsculas con
 * guiones bajos, ej. "REVOLUTION_PLUS__5KG_a_10KG"), se limpia.
 */
export function cleanAndCapitalize(name: string): string {
  const isLegacy = name.includes("_") || name === name.toUpperCase();
  if (!isLegacy) return name.replace(/\s+/g, " ").trim();

  return name
    .replace(/[_-]+/g, " ")
    .replace(/[^\p{L}0-9.,' ]/gu, "") // conserva letras con acento
    .toLowerCase()
    .replace(/(^|\s)\p{L}/gu, (l) => l.toUpperCase()) // Capitaliza cada palabra
    // "5kg" -> "5 kg": número y unidad separados, unidad en minúscula
    .replace(/\b(\d+(?:[.,]\d+)?)\s?(kg|mg|ml|gr|g|cc|l)\b/gi, (_, n: string, u: string) => `${n} ${u.toLowerCase()}`)
    // Conectores en minúscula ("5 kg A 10 kg" -> "5 kg a 10 kg")
    .replace(/ (A|X|Y|De|Para|Con) /g, (m) => m.toLowerCase())
    .replace(/\s+/g, " ")
    .trim();
}

// Foto genérica (blísteres de pastillas) que usan los productos que aún no
// tienen foto propia. En la tienda se reemplaza por un panel de marca.
export const PRODUCT_PLACEHOLDER_IMAGE = "/images/products/medicamento/standar.jpg";

export const hasOwnProductImage = (imageUrl?: string | null): imageUrl is string =>
  Boolean(imageUrl) && imageUrl !== PRODUCT_PLACEHOLDER_IMAGE;
