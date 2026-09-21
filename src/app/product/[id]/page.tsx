import { notFound } from 'next/navigation';
import { Product } from '@/types/product';
import fs from 'fs';
import path from 'path';
import ProductClient from './ProductClient';

function loadProducts(): Product[] {
  const filePath = path.join(process.cwd(), 'src/data/products.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export default function Page({ params }: { params: { id: string } }) {
  // notFound() lanza una excepción especial de Next.js, así que se llama
  // fuera de cualquier try/catch para que no se registre como error.
  let products: Product[];
  try {
    products = loadProducts();
  } catch (error) {
    console.error('Error loading products:', error);
    return notFound();
  }

  const id = decodeURIComponent(params.id);
  const product = products.find((p) => String(p.id) === id);

  if (!product) return notFound();

  return (
    <ProductClient
      product={{
        id: String(product.id),
        name: product.name,
        imageUrl: product.imageUrl || '',
        description: product.description || '',
      }}
    />
  );
}
