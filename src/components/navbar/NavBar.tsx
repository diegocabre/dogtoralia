"use client";

import { Logo } from "../logo/Logo";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaStore, FaHome, FaCalendar, FaPhone } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { CartItem, useCartStore } from "@/store/cartStore";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user } = useAuth();
    const { items: cartItems } = useCartStore();
    const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { href: "/home", label: "Inicio", icon: <FaHome /> },
        { href: "/store", label: "Tienda", icon: <FaStore /> },
        { href: "/service", label: "Servicios", icon: <FaCalendar /> },
        { href: "/contact", label: "Contacto", icon: <FaPhone /> },
    ];

    if (user) {
        navItems.push({
            href: "/cart",
            label: "Carrito",
            icon: (
                <span className="relative">
                    <FaShoppingCart />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                            {totalItems}
                        </span>
                    )}
                </span>
            ),
        });
    }

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 shadow-lg text-tertiary' : 'bg-primary text-white'
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Logo />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-1 lg:gap-2 text-sm lg:text-base hover:text-secondary transition-colors
                                    ${pathname.startsWith(item.href)
                                        ? "underline underline-offset-8 decoration-4 decoration-tertiary text-tertiary"
                                        : isScrolled ? "text-tertiary shadow-lg" : "text-white"
                                    }`}
                                style={{}}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                        {user && (
                            <span className="ml-4 font-semibold text-white">{user.name}</span>
                        )}
                        {user && (
                            <button
                                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                                className="ml-4 px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition-colors"
                            >
                                Cerrar sesión
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-secondary focus:outline-none p-2"
                            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 bg-primary z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        } md:hidden`}
                >
                    {/* Close button for mobile menu */}
                    <button
                        onClick={toggleMenu}
                        className="absolute top-4 right-4 text-white hover:text-secondary focus:outline-none p-2"
                        aria-label="Cerrar menú"
                    >
                        <FaTimes size={24} />
                    </button>

                    <div className="flex flex-col h-full justify-center items-center space-y-8 p-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 hover:text-secondary transition-colors text-xl
                                    ${pathname.startsWith(item.href)
                                        ? "font-bold underline underline-offset-8 decoration-4 decoration-secondary text-secondary"
                                        : isScrolled ? "text-tertiary" : "text-white"
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                        {user && (
                            <span className="mt-8 font-semibold text-white text-xl">{user.name}</span>
                        )}
                        {user && (
                            <button
                                onClick={() => { setIsOpen(false); signOut({ callbackUrl: "/auth/login" }); }}
                                className="mt-4 px-6 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition-colors text-xl"
                            >
                                Cerrar sesión
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}