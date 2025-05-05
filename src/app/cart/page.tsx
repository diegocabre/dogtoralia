"use client";

import { AuthGuard } from '@/components/auth/AuthGuard';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
    const { items: cartItems, removeFromCart, clearCart } = useCartStore();

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
                                {cartItems.map((item) => (
                                    <li key={item.id} className="p-4 sm:p-6">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-24 h-24">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    width={100}
                                                    height={100}
                                                    className="w-24 h-24 object-cover rounded"
                                                />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-lg font-medium text-gray-900">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-lg font-medium text-tertiary">
                                                        ${item.price.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500">
                                                            Cantidad: {item.quantity}
                                                        </span>
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
                                ))}
                            </ul>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total</p>
                                    <p>${total.toLocaleString()}</p>
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
                                        className="px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark"
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