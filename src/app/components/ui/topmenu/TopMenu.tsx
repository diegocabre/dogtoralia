"use client"; // Habilita interactividad en Next.js 14

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FcShop } from "react-icons/fc";
import { IoIosPerson } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi"; // Íconos para el menú hamburguesa
import { useUIStore } from "@/store";

export const TopMenu = () => {
    const [isOpen, setIsOpen] = useState(false); // Estado para el menú móvil
    const openSideMenu = useUIStore(state => state.openSideMenu);

    return (
        <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* LOGO */}
                    <Link href="/home" className="flex items-center">
                        <Image
                            src="/img/logo/logo.png"
                            alt="Logo Dogtoralia"
                            width={200}
                            height={160}
                            className="h-10 w-auto"
                            priority
                        />
                    </Link>

                    {/* MENÚ DESPLEGABLE EN MÓVILES */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 focus:outline-none"
                        >
                            {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
                        </button>
                    </div>

                    {/* NAVBAR ENLACES - Escritorio */}
                    <div className="hidden md:flex space-x-6">
                        <Link href="/home" className="flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-primary)]">
                            <IoHomeOutline className="text-xl text-[var(--color-secondary)]" />
                            Inicio
                        </Link>
                        <Link href="/store" className="flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-primary)]">
                            <FcShop className="text-xl" />
                            Tienda
                        </Link>
                        <Link href="#" className="text-[var(--color-accent)] hover:text-[var(--color-primary)]">Servicios</Link>
                        <Link href="#" className="text-[var(--color-accent)] hover:text-[var(--color-primary)]">Contacto</Link>
                    </div>

                    {/* ICONO CARRITO Y LOGIN EN ESCRITORIO */}
                    <div className="hidden md:flex items-center gap-4">

                        {/* BOTÓN LOGIN */}
                        <Link
                            href="/auth/login"
                            className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white px-4 py-2 rounded-md"
                        >
                            <IoIosPerson className="text-xl" />
                            Login
                        </Link>
                        <button
                            onClick={() => openSideMenu()}
                            className="flex items-center gap-2 px-4 py-2"
                        >
                            Menú
                        </button>
                    </div>
                </div>
            </div>

            {/* MENÚ MÓVIL DESPLEGABLE */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md absolute w-full left-0 top-16 flex flex-col space-y-2 py-4 px-6">
                    <Link href="/home" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
                        <IoHomeOutline className="text-xl" />
                        Home
                    </Link>
                    <Link href="/store" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
                        <FcShop className="text-xl" />
                        Tienda
                    </Link>
                    <Link href="#" className="text-gray-700 hover:text-blue-500">Servicios</Link>
                    <Link href="#" className="text-gray-700 hover:text-blue-500">Contacto</Link>


                    {/* LOGIN EN MÓVIL */}
                    <Link
                        href="/auth/login"
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        <IoIosPerson className="text-xl" />
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
};
