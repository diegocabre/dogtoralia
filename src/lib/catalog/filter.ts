import type { Product } from "./schema";
import type { CatalogQuery } from "./types";

// Minúsculas y sin acentos, para que "solucion" encuentre "solución".
const normalize = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/**
 * Regla de búsqueda del catálogo. Es una función pura, así que la usan tanto
 * el repositorio (servidor) como el filtro instantáneo de la tienda
 * (navegador), y ambos dan el mismo resultado. Busca en el nombre y en el
 * tipo de producto ("antiparasitario"), sin distinguir acentos.
 */
export function matchesQuery(product: Product, { text = "", category = "all" }: CatalogQuery): boolean {
  if (category !== "all" && product.category !== category) return false;
  const query = normalize(text.trim());
  if (!query) return true;
  return normalize(`${product.name} ${product.subCategory}`).includes(query);
}
