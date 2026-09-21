"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { cleanAndCapitalize } from '@/lib/utils';
import { MAIN_WHATSAPP_PHONE, whatsappUrl } from '@/data/locations';

interface ProductClientProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        description: string;
    };
}

export default function ProductClient({ product }: ProductClientProps) {
    const name = cleanAndCapitalize(product.name);
    const productWhatsappUrl = whatsappUrl(
        MAIN_WHATSAPP_PHONE,
        `Hola! Me interesa este producto: ${name}`
    );

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
                        alt={name}
                        width={400}
                        height={400}
                        className="object-contain rounded-lg shadow-lg bg-white"
                        style={{ maxHeight: 400, width: '100%', height: 'auto' }}
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{name}</h1>
                    {product.description && (
                        <p className="text-gray-600 mb-6">{product.description}</p>
                    )}
                    <motion.a
                        href={productWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                        <FaWhatsapp className="text-xl" />
                        Consultar por WhatsApp
                    </motion.a>
                </div>
            </div>
        </div>
    );
}
