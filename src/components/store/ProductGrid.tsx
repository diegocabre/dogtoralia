import React from "react";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    category: string;
    subCategory: string;
    price: number;
    iva: number;
    requiresPrescription: boolean;
    stock: number;
    imageUrl: string;
    description: string;
    scopes: string[];
    apiResources: string[];
    proxies: string[];
}

interface ProductGridProps {
    products: Product[];
    loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
    if (loading) {
        return <div className="col-span-full text-center text-gray-500">Cargando productos...</div>;
    }
    if (products.length === 0) {
        return <div className="col-span-full text-center text-gray-500">No se encontraron productos.</div>;
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={300}
                        height={160}
                        className="w-full h-40 object-contain mb-4"
                        priority={false}
                    />
                    <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <span className="font-bold text-primary mb-2">${product.price}</span>
                    {/* Aquí irá el botón de comprar o agregar al carrito */}
                </div>
            ))}
        </div>
    );
};

export default ProductGrid; 