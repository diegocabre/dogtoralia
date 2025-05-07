"use client";

import Image from 'next/image';
import Link from 'next/link';
import { cleanAndCapitalize, formatPrice } from '@/lib/utils';
import ProductActions from './ProductActions';

interface ProductClientProps {
    product: {
        id: string;
        name: string;
        price: number;
        imageUrl: string;
        iva: number;
        description: string;
    };
}

export default function ProductClient({ product }: ProductClientProps) {
    const precioConIVA = Math.round(Number(product.price) * (1 + (product.iva ?? 0) / 100));

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
                        <span className="text-2xl font-bold">${formatPrice(Number(product.price))}</span>
                        <div className="text-sm text-gray-500 mt-1">
                            Precio final con IVA: <span className="font-semibold">${formatPrice(precioConIVA)}</span>
                        </div>
                    </div>
                    <ProductActions product={product} />
                </div>
            </div>
        </div>
    );
} 