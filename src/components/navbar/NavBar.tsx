"use client";

import { Logo } from "../logo/Logo";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    HiBars3,
    HiXMark,
    HiOutlineHome,
    HiOutlineShoppingBag,
    HiOutlineCalendarDays,
    HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
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
        { href: "/home", label: "Inicio", icon: <HiOutlineHome /> },
        { href: "/store", label: "Tienda", icon: <HiOutlineShoppingBag /> },
        { href: "/service", label: "Servicios", icon: <HiOutlineCalendarDays /> },
        { href: "/contact", label: "Contacto", icon: <HiOutlineChatBubbleLeftRight /> },
    ];


    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-lg backdrop-blur-md text-tertiary' : 'bg-primary text-white'
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
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className={`hover:text-secondary focus:outline-none p-2 ${isScrolled ? "text-tertiary" : "text-white"}`}
                                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                            >
                                {isOpen ? <HiXMark size={26} /> : <HiBars3 size={26} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

                {/* Mobile Menu: fuera del <nav> porque backdrop-filter crea un containing block que rompe `fixed` */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-0 bg-primary z-[60] md:hidden"
                        >
                            <button
                                onClick={toggleMenu}
                                className="absolute top-4 right-4 text-white hover:text-secondary focus:outline-none p-2"
                                aria-label="Cerrar menú"
                            >
                                <HiXMark size={26} />
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
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
        </>
    );
}
