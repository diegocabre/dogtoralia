"use client";

import { Logo } from "../logo/Logo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiListBold, PiXBold } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { href: "/home", label: "Inicio" },
    { href: "/service", label: "Servicios" },
    { href: "/store", label: "Tienda" },
    { href: "/contact", label: "Contacto" },
];

/**
 * Letrero de la sede: franja blanca con el logo y la navegación, cerrada por
 * el mismo contorno grafito del logo. No cambia al hacer scroll.
 */
export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Bloquea el scroll de la página mientras el menú móvil está abierto.
    // (Cada enlace del menú lo cierra al navegar.)
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            <nav className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-grafito bg-white text-grafito">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:h-[72px]">
                    <Logo className="h-14 w-auto lg:h-[66px]" />

                    <ul className="hidden items-center gap-1 md:flex">
                        {navItems.map((item) => {
                            const active = pathname.startsWith(item.href);
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={active ? "page" : undefined}
                                        className="group relative flex min-h-11 items-center px-3 lg:px-4"
                                    >
                                        <span className="rotulo text-[0.95rem] lg:text-base">{item.label}</span>
                                        <span
                                            aria-hidden
                                            className={`absolute inset-x-3 bottom-1 h-[4px] rounded-full bg-vinilo-mostaza transition-transform duration-200 ease-[var(--ease-out-fuerte)] lg:inset-x-4 ${
                                                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                            }`}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="flex h-11 w-11 items-center justify-center rounded-[8px] text-[1.6rem] md:hidden"
                        aria-label="Abrir menú"
                        aria-expanded={isOpen}
                        aria-controls="menu-movil"
                    >
                        <PiListBold />
                    </button>
                </div>
            </nav>

            {/* Menú móvil: un panel de vinilo azul con cada sección como rótulo */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="menu-movil"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menú"
                        // "y" (no "transform") para que MotionConfig la salte con movimiento reducido y deje el fundido.
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed inset-0 z-[60] flex flex-col bg-vinilo-azul px-4 pb-8 pt-3 text-white md:hidden"
                    >
                        <div className="flex h-12 items-center justify-end">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex h-11 w-11 items-center justify-center rounded-[8px] text-[1.6rem]"
                                aria-label="Cerrar menú"
                            >
                                <PiXBold />
                            </button>
                        </div>

                        <ul className="mt-6 grid gap-3">
                            {navItems.map((item) => {
                                const active = pathname.startsWith(item.href);
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            aria-current={active ? "page" : undefined}
                                            onClick={() => setIsOpen(false)}
                                            className={`presionable flex min-h-14 items-center rounded-[8px] px-5 ${
                                                active ? "bg-vinilo-mostaza text-grafito" : "bg-grafito text-white"
                                            }`}
                                        >
                                            <span className="rotulo text-2xl">{item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
