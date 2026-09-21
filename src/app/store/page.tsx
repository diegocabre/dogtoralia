"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCategory, Product } from '@/types/product';
import ProductGrid from '@/components/ProductGrid';

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
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        fetch('/api/products')
            .then(res => {
                if (!res.ok) throw new Error('No se pudieron cargar los productos');
                return res.json();
            })
            .then((data: Product[]) => setProducts(data))
            .catch(error => {
                console.error('Error al cargar productos:', error);
                setLoadError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredProducts = products.filter(product =>
        (selectedCategory === 'all' || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6"
                >
                    <h1 className="text-4xl font-bold text-tertiary mb-4 mt-12">Nuestra Tienda</h1>
                    <p className="text-lg text-gray-600">Productos veterinarios de calidad para tu mascota</p>
                </motion.div>

                {/* Aviso: compra en línea aún no disponible */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="mb-8 mx-auto max-w-2xl bg-secondary/10 border border-secondary/30 text-tertiary text-center text-sm sm:text-base rounded-lg px-4 py-3"
                >
                    Por ahora esta es una vitrina de nuestros productos. Para comprar,
                    escríbenos directo por WhatsApp desde cada producto.
                </motion.div>

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
                {loadError ? (
                    <div className="text-center text-gray-500">
                        No pudimos cargar los productos. Recarga la página o escríbenos por WhatsApp.
                    </div>
                ) : (
                    <ProductGrid products={filteredProducts} loading={loading} />
                )}
            </div>
        </div>
    );
}
