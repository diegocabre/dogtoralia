import rawProducts from "@/data/products.json";
import { catalogSchema, PRODUCT_CATEGORIES, type Product } from "./schema";
import { matchesQuery } from "./filter";
import type { CatalogQuery, CatalogRepository, CategorySummary } from "./types";

/**
 * Implementación sobre src/data/products.json. El archivo se incluye en el
 * bundle del servidor al compilar y se valida una sola vez: si un producto
 * está mal formado, el build falla con el detalle del error.
 */
export class JsonCatalogRepository implements CatalogRepository {
  private products: Product[] | null = null;

  constructor(private readonly source: unknown = rawProducts) {}

  private load(): Product[] {
    if (!this.products) {
      const parsed = catalogSchema.safeParse(this.source);
      if (!parsed.success) {
        const detail = parsed.error.issues
          .slice(0, 5)
          .map((issue) => `[${issue.path.join(".")}] ${issue.message}`)
          .join("; ");
        throw new Error(`Catálogo inválido: ${detail}`);
      }
      this.products = parsed.data;
    }
    return this.products;
  }

  async list(): Promise<Product[]> {
    return this.load();
  }

  async search(query: CatalogQuery): Promise<Product[]> {
    return this.load().filter((product) => matchesQuery(product, query));
  }

  async getById(id: string): Promise<Product | null> {
    return this.load().find((product) => product.id === id) ?? null;
  }

  async listCategories(): Promise<CategorySummary[]> {
    const products = this.load();
    return PRODUCT_CATEGORIES.map((name) => ({
      name,
      count: products.filter((product) => product.category === name).length,
    }));
  }
}
