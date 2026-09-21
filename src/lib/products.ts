import fs from "fs";
import path from "path";
import type { Product } from "@/types/product";

const PRODUCTS_FILE = path.join(process.cwd(), "src/data/products.json");

// Solo para código de servidor (páginas, sitemap, metadata).
export function loadProducts(): Product[] {
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf8"));
}
