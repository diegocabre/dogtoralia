"use client";

import { Logo } from "../logo/Logo";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaStore, FaHome, FaCalendar, FaPhone } from "react-icons/fa";

export function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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
        { href: "/cart", label: "Carrito", icon: <FaShoppingCart /> },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 shadow-lg' : 'bg-primary'
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
                                className="flex items-center gap-1 lg:gap-2 text-sm lg:text-base text-white hover:text-secondary transition-colors"
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
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
                                className="flex items-center gap-3 text-white hover:text-secondary transition-colors text-xl"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}