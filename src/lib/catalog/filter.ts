import type { Product } from "./schema";
import type { CatalogQuery } from "./types";

/**
 * Regla de búsqueda del catálogo. Es una función pura, así que la usan tanto
 * el repositorio (servidor) como el filtro instantáneo de la tienda
 * (navegador), y ambos dan el mismo resultado.
 */
export function matchesQuery(product: Product, { text = "", category = "all" }: CatalogQuery): boolean {
  return (
    (category === "all" || product.category === category) &&
    product.name.toLowerCase().includes(text.toLowerCase())
  );
}
