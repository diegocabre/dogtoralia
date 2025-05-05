"use client";
import React from "react";
import { ProductCard } from '@/components/store/ProductCard';
import { Product } from '@/types/product';

interface ProductGridProps {
    products: Product[];
    loading: boolean;
    onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, onAddToCart }) => {
    if (loading) {
        return <div className="col-span-full text-center text-gray-500">Cargando productos...</div>;
    }
    if (products.length === 0) {
        return <div className="col-span-full text-center text-gray-500">No se encontraron productos.</div>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductGrid; 