"use client";

import AuthGuard from '@/components/auth/AuthGuard';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { useCartStore, CartItem } from '@/store/cartStore';
import { formatPrice, cleanAndCapitalize } from '@/lib/utils';
import DeliveryOptions from '@/components/checkout/DeliveryOptions';
import { useState } from 'react';

export default function CartPage() {
    const { items: cartItems, removeFromCart, clearCart, updateQuantity } = useCartStore();
    const [delivery, setDelivery] = useState<any>(null);
    const [error, setError] = useState<string>("");

    // Total con IVA
    let subtotal = cartItems.reduce((sum: number, item: CartItem) => sum + Math.round(Number(item.price) * (1 + (item.iva ?? 0) / 100) * item.quantity), 0);
    if (isNaN(subtotal)) subtotal = 0;
    const shippingCost = typeof delivery?.shippingCost === 'number' ? delivery.shippingCost : 0;
    const total = subtotal + (isNaN(shippingCost) ? 0 : shippingCost);

    // Validación de entrega
    const isValidDelivery =
        delivery?.method === 'store'
            ? !!delivery.store
            : delivery?.method === 'shipping'
                ? !!delivery.region && !!delivery.comuna && !!delivery.address
                : false;

    const handleProceed = () => {
        if (!isValidDelivery) {
            setError("Por favor selecciona y completa una opción de entrega antes de continuar.");
            return;
        }
        setError("");
        // Aquí iría la lógica para continuar con el pago
        alert("¡Procediendo al pago!");
    };

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-tertiary mb-8">Mi Carrito</h1>

                    {cartItems.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-8 text-center">
                            <FaShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Tu carrito está vacío</h3>
                            <p className="mt-1 text-sm text-gray-500">Comienza a agregar productos para continuar</p>
                            <div className="mt-6">
                                <a
                                    href="/store"
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
                                >
                                    Ver productos
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <ul className="divide-y divide-gray-200">
                                {cartItems.map((item: CartItem) => {
                                    const precioConIVA = Math.round(Number(item.price) * (1 + (item.iva ?? 0) / 100));
                                    return (
                                        <li key={item.id} className="p-4 sm:p-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-24 h-24">
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={cleanAndCapitalize(item.name)}
                                                        width={100}
                                                        height={100}
                                                        className="w-24 h-24 object-cover rounded"
                                                    />
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-lg font-medium text-gray-900">
                                                            {cleanAndCapitalize(item.name)}
                                                        </h4>
                                                        <div className="text-right">
                                                            <div className="text-base text-gray-700">
                                                                ${formatPrice(Number(item.price))}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                c/IVA: ${formatPrice(precioConIVA)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                                onClick={() =>
                                                                    item.quantity > 1
                                                                        ? updateQuantity(item.id, item.quantity - 1)
                                                                        : removeFromCart(item.id)
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                            <span className="text-sm text-gray-500">{item.quantity}</span>
                                                            <button
                                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="text-red-600 hover:text-red-800"
                                                            onClick={() => removeFromCart(item.id)}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                            <DeliveryOptions onChange={setDelivery} />
                            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${formatPrice(subtotal)}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900 mt-2">
                                    <p>Envío</p>
                                    <p>
                                        {delivery?.method === 'shipping'
                                            ? (typeof delivery.shippingCost === 'number'
                                                ? `$${formatPrice(delivery.shippingCost)}`
                                                : delivery.shippingCost)
                                            : delivery?.method === 'store'
                                                ? 'Retiro en tienda'
                                                : '-'}
                                    </p>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-tertiary mt-4">
                                    <p>Total a pagar</p>
                                    <p>${formatPrice(total)}</p>
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <button
                                        type="button"
                                        className="text-sm text-red-500 hover:underline"
                                        onClick={clearCart}
                                    >
                                        Vaciar carrito
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark disabled:opacity-50"
                                        disabled={!isValidDelivery}
                                        onClick={handleProceed}
                                    >
                                        Proceder al pago
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthGuard>
    );
}