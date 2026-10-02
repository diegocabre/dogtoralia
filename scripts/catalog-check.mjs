// Valida src/data/products.json con el mismo esquema zod que usa el sitio y
// revisa que existan las imágenes locales. Sale con código 1 si hay errores.
//
// Uso: npm run catalog:check   (requiere Node 22.18+ por el type stripping)
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 18)) {
  console.error(`catalog:check necesita Node 22.18 o superior (tienes ${process.versions.node}).`);
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { z } = await import("zod");
const { productSchema } = await import("../src/lib/catalog/schema.ts");
z.config(z.locales.es()); // mensajes genéricos de zod en español

const file = join(root, "src/data/products.json");
let raw;
try {
  raw = JSON.parse(readFileSync(file, "utf8"));
} catch (error) {
  console.error(`No se pudo leer ${file}: ${error.message}`);
  process.exit(1);
}

const errors = [];
if (!Array.isArray(raw)) {
  console.error("El catálogo debe ser una lista de productos.");
  process.exit(1);
}

// Se valida producto por producto para informar todos los problemas de una
// vez (incluidos duplicados e imágenes faltantes de los productos válidos).
const products = [];
const seen = new Map();
raw.forEach((item, index) => {
  const label = `#${index}${item?.id !== undefined ? ` (id ${item.id})` : ""}`;
  const parsed = productSchema.safeParse(item);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      errors.push(`${label} ${issue.path.join(".") || "(producto)"}: ${issue.message}`);
    }
    return;
  }
  const product = parsed.data;
  if (seen.has(product.id)) {
    errors.push(`${label} id: duplicado, ya usado en #${seen.get(product.id)}`);
  } else {
    seen.set(product.id, index);
  }
  if (product.imageUrl.startsWith("/") && !existsSync(join(root, "public", product.imageUrl))) {
    errors.push(`${label} imageUrl: no existe public${product.imageUrl}`);
  }
  products.push(product);
});

if (errors.length > 0) {
  console.error(`Catálogo con ${errors.length} error(es):`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(`Catálogo OK: ${products.length} productos válidos.`);
