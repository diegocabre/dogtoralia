"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCategory, Product } from '@/types/product';
import ProductGrid from '@/components/ProductGrid';
import { useSession, signIn } from "next-auth/react";
import { useCartStore } from '@/store/cartStore';
import { cleanAndCapitalize } from '@/lib/utils';

const categories: { value: ProductCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'Medicamento', label: 'Medicamentos' },
    { value: 'Shampoos', label: 'Shampoos' },
];

export default function StorePage() {
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const { addToCart } = useCartStore();
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter(product =>
        (selectedCategory === 'all' || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddToCart = (product: Product) => {
        if (!session) {
            signIn();
            return;
        }
        addToCart({ ...product, quantity: 1 });
        setToast(`Producto agregado: ${cleanAndCapitalize(product.name)}`);
        setTimeout(() => setToast(null), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-tertiary mb-4 mt-12">Nuestra Tienda</h1>
                    <p className="text-lg text-gray-600">Productos veterinarios de calidad para tu mascota</p>
                </motion.div>

                {/* Toast */}
                <AnimatePresence>
                    {toast && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: -20, x: "-50%" }}
                            className="fixed top-6 left-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg font-semibold"
                        >
                            {toast}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Search and Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        {/* Search Bar */}
                        <div className="w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2">
                            {categories.map((cat) => (
                                <motion.button
                                    key={cat.value}
                                    onClick={() => setSelectedCategory(cat.value)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === cat.value
                                        ? 'bg-primary text-white shadow-md shadow-primary/30'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    {cat.label}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Products Grid */}
                <ProductGrid products={filteredProducts} loading={loading} onAddToCart={handleAddToCart} />
            </div>
        </div>
    );
}
