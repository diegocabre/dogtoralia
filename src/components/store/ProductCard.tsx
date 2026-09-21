"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { cleanAndCapitalize } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';
import { MAIN_WHATSAPP_PHONE, whatsappUrl } from '@/data/locations';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const name = cleanAndCapitalize(product.name);
    const productWhatsappUrl = whatsappUrl(
        MAIN_WHATSAPP_PHONE,
        `Hola! Me interesa este producto: ${name}`
    );

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
                            alt={name}
                            fill
                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    <div className="px-3 py-4">
                        <h3 className="text-base font-semibold text-gray-900 text-center truncate w-full" title={name}>
                            {name}
                        </h3>
                    </div>
                </Link>
                <motion.a
                    href={productWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-b-2xl hover:bg-green-700 transition-colors"
                >
                    <FaWhatsapp className="text-base" />
                    Consultar por WhatsApp
                </motion.a>
            </div>
        </motion.div>
    );
}
