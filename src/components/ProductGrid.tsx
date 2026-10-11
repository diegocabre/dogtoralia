import { ProductCard } from "@/components/store/ProductCard";
import type { Product } from "@/types/product";

/** Grilla de productos: dos columnas en el celular para recorrer rápido. */
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <li key={product.id}>
          {/* La primera fila se ve al cargar: sus fotos no esperan. */}
          <ProductCard product={product} priority={index < 4} />
        </li>
      ))}
    </ul>
  );
}
