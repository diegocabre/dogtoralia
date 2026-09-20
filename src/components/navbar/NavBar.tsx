"use client";

import { Logo } from "../logo/Logo";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaStore, FaHome, FaCalendar, FaPhone } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { CartItem, useCartStore } from "@/store/cartStore";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
                    <AnimatePresence>
                        {totalItems > 0 && (
                            <motion.span
                                key={totalItems}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1"
                            >
                                {totalItems}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </span>
            ),
        });
    }

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 shadow-lg backdrop-blur-sm text-tertiary' : 'bg-primary text-white'
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Logo />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
                        {navItems.map((item) => {
                            const active = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative flex items-center gap-1 lg:gap-2 text-sm lg:text-base py-1 transition-colors group
                                        ${active
                                            ? "text-tertiary"
                                            : isScrolled ? "text-tertiary" : "text-white"
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                    <span
                                        className={`absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"
                                            }`}
                                    />
                                </Link>
                            );
                        })}
                        {user && (
                            <span className="ml-4 font-semibold text-white">{user.name}</span>
                        )}
                        {user && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                                className="ml-4 px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition-colors"
                            >
                                Cerrar sesión
                            </motion.button>
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
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-primary z-40 md:hidden"
                    >
                        <button
                            onClick={toggleMenu}
                            className="absolute top-4 right-4 text-white hover:text-secondary focus:outline-none p-2"
                            aria-label="Cerrar menú"
                        >
                            <FaTimes size={24} />
                        </button>

                        <div className="flex flex-col h-full justify-center items-center space-y-8 p-4">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * i + 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 hover:text-secondary transition-colors text-xl
                                            ${pathname.startsWith(item.href)
                                                ? "font-bold underline underline-offset-8 decoration-4 decoration-secondary text-secondary"
                                                : "text-white"
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </motion.div>
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
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
