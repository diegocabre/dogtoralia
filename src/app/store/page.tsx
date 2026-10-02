import { getCatalog } from "@/lib/catalog";
import StoreClient from "./StoreClient";

// Se genera al compilar desde el catálogo; los productos quedan en el HTML
// (mejor para buscadores) y no dependen de /api/products.
export default async function StorePage() {
  const products = await getCatalog().list();
  return <StoreClient products={products} />;
}
