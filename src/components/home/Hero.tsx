"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaClock, FaMapMarkerAlt, FaPaw, FaStore, FaWhatsapp } from "react-icons/fa";
import { locationList, whatsappUrl } from "@/data/locations";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const trustItems = [
  { icon: FaMapMarkerAlt, title: "2 sedes", text: "Puente Alto y Santiago Centro" },
  { icon: FaClock, title: "Lunes a sábado", text: "L–V 10:00 a 19:00 · Sáb 10:00 a 17:00" },
  { icon: FaPaw, title: "Todo en uno", text: "Clínica, peluquería y tienda" },
] as const;

export function Hero() {
  // El estado abierto/cerrado depende de la hora actual, así que se calcula
  // solo en el navegador: si se renderizara en el servidor, el HTML quedaría
  // "congelado" con la hora del build.
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24"
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 60%, var(--color-quaternary) 100%)",
      }}
    >
      <div className="container relative mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14">
        <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">
          {/* Reserva el alto para que la página no salte cuando aparece el estado */}
          <motion.div variants={item} className="min-h-9">
            {status && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 rounded-full ${status.open ? "bg-green-400" : "bg-amber-300"}`}
                />
                {status.label}
              </span>
            )}
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Clínica veterinaria en Puente Alto y Santiago Centro
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-xl text-base text-white/90 sm:text-lg lg:mx-0"
          >
            Cuidamos a tu mascota como parte de la familia: consultas, vacunas,
            exámenes, peluquería y tienda online, todo con atención cercana.
          </motion.p>

          {/* Agendar: un botón de WhatsApp por sede */}
          <motion.div variants={item} className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
              Agenda una hora por WhatsApp
            </p>
            <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              {locationList.map((location) => (
                <motion.a
                  key={location.name}
                  href={whatsappUrl(location.phone, "Hola! Quiero agendar una hora.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-green-700 sm:w-auto"
                >
                  <FaWhatsapp className="text-xl" />
                  {location.name}
                </motion.a>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-5 text-sm font-medium lg:justify-start">
              <Link
                href="/service"
                className="text-white underline underline-offset-4 transition-opacity hover:opacity-80"
              >
                Ver servicios
              </Link>
              <Link
                href="/store"
                className="inline-flex items-center gap-1.5 text-white underline underline-offset-4 transition-opacity hover:opacity-80"
              >
                <FaStore /> Ir a la tienda
              </Link>
            </div>
          </motion.div>

          {/* Franja de confianza */}
          <motion.ul
            variants={item}
            className="mt-10 grid gap-4 border-t border-white/25 pt-6 text-left sm:grid-cols-3"
          >
            {trustItems.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-3">
                <Icon aria-hidden className="mt-1 flex-shrink-0 text-lg text-white/90" />
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="text-xs text-white/80">{text}</p>
                </div>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Foto real del equipo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          {/* Bloque de color desfasado detrás de la foto */}
          <div aria-hidden className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl bg-secondary/60" />
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-2xl shadow-black/30">
            <Image
              src="/images/portada.png"
              alt="Veterinarios de Dogtoralia junto a un perrito"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover object-bottom"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
