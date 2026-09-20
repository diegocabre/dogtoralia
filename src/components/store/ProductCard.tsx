"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { formatPrice, cleanAndCapitalize } from '@/lib/utils';
import { FaPrescriptionBottleAlt, FaShoppingCart } from 'react-icons/fa';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <motion.div
            className="block group h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -6 }}
        >
            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-300 h-full flex flex-col overflow-hidden border border-gray-100 group-hover:border-primary/60">
                <Link href={`/product/${product.id}`} className="flex-grow">
                    <div className="relative h-44 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                        <Image
                            src={product.imageUrl}
                            alt={cleanAndCapitalize(product.name)}
                            fill
                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={false}
                            onError={(e) => { (e.target as HTMLImageElement).src = '/images/no-image.png'; }}
                        />
                    </div>

                    <div className="flex flex-col gap-1 px-2 pt-3">
                        <h3 className="text-base font-semibold text-gray-900 text-center truncate w-full mb-1" title={cleanAndCapitalize(product.name)}>
                            {cleanAndCapitalize(product.name)}
                        </h3>
                        {product.requiresPrescription && (
                            <span className="flex items-center justify-center gap-1 text-xs text-red-600 bg-red-50 rounded px-2 py-0.5 mb-1 mx-auto w-fit">
                                <FaPrescriptionBottleAlt className="inline-block" /> Requiere receta
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col items-center mt-2">
                        <span className="text-lg font-bold text-primary mb-1">${formatPrice(product.price)}</span>
                    </div>
                </Link>
                <motion.button
                    onClick={() => onAddToCart(product)}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded-b-2xl hover:bg-primary/90 transition-colors"
                >
                    <FaShoppingCart className="text-sm" />
                    Agregar al carrito
                </motion.button>
            </div>
        </motion.div>
    );
}
