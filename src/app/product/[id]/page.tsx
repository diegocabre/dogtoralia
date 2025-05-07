import { notFound } from 'next/navigation';
import { Product } from '@/types/product';
import fs from 'fs';
import path from 'path';
import ProductClient from './ProductClient';

export default function Page({ params }: { params: { id: string } }) {
  try {
    const filePath = path.join(process.cwd(), 'src/data/products.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const products: Product[] = JSON.parse(data);

    const id = decodeURIComponent(params.id);
    const product = products.find((p) => String(p.id) === id);

    if (!product) return notFound();

    return (
      <ProductClient
        product={{
          id: String(product.id),
          name: product.name,
          price: Number(product.price),
          imageUrl: product.imageUrl || '',
          iva: product.iva ?? 0,
          description: product.description || '',
        }}
      />
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return notFound();
  }
}
