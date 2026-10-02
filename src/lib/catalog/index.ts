import { JsonCatalogRepository } from "./jsonRepository";
import type { CatalogRepository } from "./types";

export type { CatalogQuery, CatalogRepository, CategorySummary } from "./types";
export type { Product, ProductCategory } from "./schema";

let repository: CatalogRepository | null = null;

/**
 * Punto único de acceso al catálogo (solo servidor). Para migrar a otro
 * proveedor, basta con devolver aquí otra implementación de
 * CatalogRepository.
 */
export function getCatalog(): CatalogRepository {
  repository ??= new JsonCatalogRepository();
  return repository;
}
