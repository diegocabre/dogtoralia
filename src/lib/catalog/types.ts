import type { Product, ProductCategory } from "./schema";

export interface CatalogQuery {
  /** Texto a buscar en el nombre del producto (sin distinguir mayúsculas). */
  text?: string;
  category?: ProductCategory | "all";
}

export interface CategorySummary {
  name: ProductCategory;
  count: number;
}

/**
 * Acceso al catálogo. Las páginas, el sitemap y la API solo hablan con esta
 * interfaz, así que cambiar el origen de los datos (JSON hoy; base de datos
 * o CMS mañana) es escribir otra implementación sin tocar la interfaz.
 */
export interface CatalogRepository {
  list(): Promise<Product[]>;
  search(query: CatalogQuery): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  listCategories(): Promise<CategorySummary[]>;
}
