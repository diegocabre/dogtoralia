import Link from "next/link";
import { QuantitySelector, Title } from "../components";
import { seedData } from "@/app/seed/seed";
import Image from "next/image";

// 🔥 Verifica que `seedData` tiene productos antes de acceder
const productsInCart = seedData[0]?.products?.slice(0, 3) || [];

export default function CartPage() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px] max-w-full">
                <Title title="Carrito de Compras" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">

                    {/* carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-2xl font-bold">Agregar más Productos</span>
                        <Link href="/store" className="text-[var(--color-primary)] hover:underline mt-5">
                            Continúa Comprando
                        </Link>
                    </div>

                    {/* Items */}
                    {productsInCart.length > 0 ? (
                        productsInCart.map((product) => (
                            <div key={product?.name} className="flex flex-col mt-5">
                                {product?.images?.[0]?.url ? ( // ✅ Verifica que la imagen existe antes de mostrarla
                                    <Image
                                        src={`/products/${product.images[0].url}`}
                                        alt={product.name}
                                        width={100}
                                        height={100}
                                        className="rounded-lg object-cover"
                                    />

                                ) : (
                                    <div className="w-[100px] h-[100px] bg-gray-200 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-500">Sin imagen</span>
                                    </div>
                                )}
                                <span className="text-2xl font-bold">{product?.name || "Producto sin nombre"}</span>
                                <span className="text-2xl font-bold">${product?.price || 0}</span>
                                <QuantitySelector quantity={3} />
                                <button className="text-[var(--color-primary)] hover:underline mt-5">
                                    <span className="text-2xl font-bold">Eliminar</span>
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-xl text-gray-500">No hay productos en el carrito</div>
                    )}

                </div>
            </div>
        </div>
    );
}
