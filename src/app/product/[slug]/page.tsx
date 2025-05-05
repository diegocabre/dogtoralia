import { notFound } from 'next/navigation';
import { Product } from '@/types/product';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { cleanAndCapitalize, formatPrice } from '@/lib/utils';
import Link from 'next/link';
// import { useAuth } from '@/contexts/AuthContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductPage({ params }: any) {
  // Hook de autenticación (solo funciona en componentes Client)
  // const { user, loading } = useAuth();

  try {
    const filePath = path.join(process.cwd(), 'src/data/products.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const products: Product[] = JSON.parse(data);

    // Usar params.slug directamente
    const product = products.find(p => String(p.id) === params.slug);

    if (!product) return notFound();

    // NOTA: El siguiente bloque debe ser movido a un componente Client para funcionar correctamente
    // Aquí solo se muestra la estructura para que puedas copiarla a un Client Component si lo deseas

    return (
      <div className="container mx-auto px-4 py-8 pt-28">
        <div className="mb-6 px-2">
          <Link href="/store" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-base">
            ← Volver a la tienda
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center bg-white">
            <Image
              src={product.imageUrl}
              alt={cleanAndCapitalize(product.name)}
              width={400}
              height={400}
              className="object-contain rounded-lg shadow-lg bg-white"
              style={{ maxHeight: 400, width: '100%', height: 'auto' }}
              priority={false}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{cleanAndCapitalize(product.name)}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">${formatPrice(product.price)}</span>
            </div>
            {/*
            {user ? (
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Agregar al carrito
              </button>
            ) : (
              <div className="mt-6 text-center text-gray-500 text-sm">
                Inicia sesión para comprar este producto.
              </div>
            )}
            */}
            <div className="mt-6 text-center text-gray-500 text-sm">
              Inicia sesión para comprar este producto.
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return notFound();
  }
}