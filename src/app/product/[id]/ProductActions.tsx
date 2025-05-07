"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCartStore } from "@/store/cartStore";

interface ProductActionsProps {
    product: {
        id: string;
        name: string;
        price: number;
        imageUrl: string;
        iva: number;
    };
}

export default function ProductActions({ product }: ProductActionsProps) {
    const { user } = useAuth();
    const { addToCart } = useCartStore();

    if (!user) {
        return (
            <div className="mt-6 text-center text-gray-500 text-sm">
                Inicia sesión para comprar este producto.
            </div>
        );
    }

    return (
        <button
            className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1,
                iva: product.iva,
            })}
        >
            Agregar al carrito
        </button>
    );
} 