"use client";

import { useEffect, useState } from 'react';
import { ProductCategory, Product } from '@/types/product';
import ProductGrid from '@/components/ProductGrid';
import { useSession, signIn } from "next-auth/react";
import { useCartStore } from '@/store/cartStore';
import { cleanAndCapitalize } from '@/lib/utils';

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
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-tertiary mb-4 mt-12">Nuestra Tienda</h1>
                    <p className="text-lg text-gray-600">Productos veterinarios de calidad para tu mascota</p>
                </div>

                {/* Toast */}
                {toast && (
                    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg font-semibold animate-fade-in">
                        {toast}
                    </div>
                )}

                {/* Search and Filter Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        {/* Search Bar */}
                        <div className="w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Category Filter */}
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === 'all'
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setSelectedCategory('Medicamento')}
                            className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === 'Medicamento'
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Medicamentos
                        </button>
                        <button
                            onClick={() => setSelectedCategory('Shampoos')}
                            className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === 'Shampoos'
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            Shampoos
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <ProductGrid products={filteredProducts} loading={loading} onAddToCart={handleAddToCart} />
            </div>
        </div>
    );
}