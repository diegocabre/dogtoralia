"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { FaPaw, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import { locationList, whatsappUrl, MAIN_WHATSAPP_PHONE } from '@/data/locations';
import { services as serviceData, type ServiceData } from '@/data/services';
import { iconForService } from '@/components/services/serviceIcons';

// El texto de cada servicio vive en data/services.ts (también lo lee el SEO);
// aquí solo se le asigna el ícono.
interface Service extends ServiceData {
    icon: IconType;
}

const services: Service[] = serviceData.map((service) => ({
    ...service,
    icon: iconForService(service.slug),
}));

const easeOut = [0.22, 1, 0.36, 1] as const;

// Fondos alternados para que cada sección se sienta distinta al hacer scroll
const sectionBackgrounds = [
    'bg-white',
    'bg-gradient-to-br from-sky-50 to-white',
    'bg-white',
    'bg-gradient-to-br from-amber-50 to-white',
    'bg-white',
];

function ServiceSection({ service, index }: { service: Service; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const Icon = service.icon;
    const imageOnRight = index % 2 === 1;
    const number = String(index + 1).padStart(2, '0');

    // Parallax: la foto se desplaza suavemente más lento que el scroll
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

    const message = `Hola! Quiero consultar por el servicio de ${service.title}.`;

    return (
        <section
            ref={ref}
            id={service.slug}
            className={`relative scroll-mt-16 overflow-hidden py-16 sm:py-24 ${sectionBackgrounds[index % sectionBackgrounds.length]}`}
        >
            {/* Número gigante de fondo */}
            <motion.span
                aria-hidden
                initial={{ opacity: 0, x: imageOnRight ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: easeOut }}
                className={`pointer-events-none absolute top-4 select-none text-[9rem] font-extrabold leading-none text-primary/10 sm:text-[14rem] ${imageOnRight ? 'left-4 lg:left-16' : 'right-4 lg:right-16'}`}
            >
                {number}
            </motion.span>

            <div className="container relative mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:gap-16">
                {/* Imagen */}
                <motion.div
                    initial={{ opacity: 0, x: imageOnRight ? 80 : -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, ease: easeOut }}
                    className={`relative ${imageOnRight ? 'lg:order-2' : ''}`}
                >
                    {/* Bloque de color desfasado detrás de la foto */}
                    <div
                        aria-hidden
                        className={`absolute -bottom-4 h-full w-full rounded-3xl bg-secondary/25 ${imageOnRight ? '-left-4' : '-right-4'}`}
                    />
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-primary/20">
                        <motion.div
                            className="absolute inset-x-0 -top-[10%] h-[120%]"
                            style={reduceMotion ? undefined : { y: imageY }}
                        >
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </motion.div>
                    </div>

                    {/* Ícono flotante */}
                    <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.4 }}
                        className={`absolute -top-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-3xl text-white shadow-xl ${imageOnRight ? '-left-2 sm:-left-5' : '-right-2 sm:-right-5'}`}
                    >
                        <motion.span
                            animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="flex"
                        >
                            <Icon />
                        </motion.span>
                    </motion.div>
                </motion.div>

                {/* Texto */}
                <div className={imageOnRight ? 'lg:order-1' : ''}>
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary"
                    >
                        <FaPaw /> Servicio {number}
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
                        className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl"
                    >
                        {service.title}
                    </motion.h2>

                    {/* Línea de acento que se dibuja al entrar */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.4, ease: easeOut }}
                        style={{ originX: 0 }}
                        className="mt-4 h-1.5 w-24 rounded-full bg-secondary"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="mt-6 text-lg leading-relaxed text-gray-700"
                    >
                        {service.description}
                    </motion.p>

                    {service.items && (
                        <ul className="mt-6 space-y-4">
                            {service.items.map((item, i) => (
                                <motion.li
                                    key={item.title}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.6 }}
                                    transition={{ duration: 0.5, delay: 0.45 + i * 0.15 }}
                                    className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                                >
                                    <FaCheckCircle className="mt-1 flex-shrink-0 text-xl text-quaternary" />
                                    <p className="text-gray-700">
                                        <strong className="text-tertiary">{item.title}:</strong> {item.text}
                                    </p>
                                </motion.li>
                            ))}
                        </ul>
                    )}

                    <motion.a
                        href={whatsappUrl(MAIN_WHATSAPP_PHONE, message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/30 transition-colors hover:bg-green-700"
                    >
                        <FaWhatsapp className="text-xl" />
                        Consultar por WhatsApp
                    </motion.a>
                </div>
            </div>
        </section>
    );
}

export default function ServicePage() {
    return (
        <div className="bg-white">
            {/* Encabezado */}
            <section
                className="relative overflow-hidden pb-16 pt-32 text-center sm:pb-24 sm:pt-40"
                style={{
                    backgroundImage:
                        'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 55%, var(--color-quaternary) 100%)',
                }}
            >
                <motion.div
                    aria-hidden
                    className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-secondary/40 blur-3xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        aria-hidden
                        className={`absolute text-white/30 ${i === 0 ? 'right-[12%] top-28 text-6xl' : i === 1 ? 'bottom-10 left-[10%] text-5xl' : 'right-[30%] bottom-8 text-4xl'}`}
                        animate={{ y: [0, -16, 0], rotate: [0, 12, 0] }}
                        transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                    >
                        <FaPaw />
                    </motion.div>
                ))}

                <div className="container relative mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: easeOut }}
                        className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                    >
                        Nuestros Servicios
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
                        className="mx-auto mt-5 max-w-2xl text-lg text-white/90 sm:text-xl"
                    >
                        Cuidamos a tu mascota en cada etapa de su vida
                    </motion.p>
                </div>
            </section>

            {services.map((service, index) => (
                <ServiceSection key={service.title} service={service} index={index} />
            ))}

            {/* Llamada final */}
            <section className="bg-tertiary py-16 sm:py-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold text-white sm:text-4xl"
                    >
                        ¿Quieres agendar una hora?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mx-auto mt-3 max-w-xl text-white/80"
                    >
                        Escríbenos por WhatsApp a la sede más cercana.
                    </motion.p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        {locationList.map((location, i) => (
                            <motion.a
                                key={location.name}
                                href={whatsappUrl(location.phone, 'Hola! Quiero agendar una hora.')}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-green-700"
                            >
                                <FaWhatsapp className="text-xl" />
                                Sede {location.name}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
