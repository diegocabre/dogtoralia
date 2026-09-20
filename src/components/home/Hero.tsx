"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaPaw, FaStore, FaCalendarCheck } from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28"
      style={{
        // Se usa inline style porque "primary"/"quaternary" no tienen un
        // valor DEFAULT en tailwind.config.ts, así que utilidades tipo
        // "from-primary" no generan ninguna clase real en Tailwind v4.
        backgroundImage:
          "linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 85%, black) 55%, var(--color-quaternary) 100%)",
      }}
    >
      {/* Blobs animados de fondo, puramente decorativos */}
      <motion.div
        aria-hidden
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--color-secondary)", opacity: 0.35 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-white/20 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Huellitas flotando */}
      {[FaPaw, FaPaw, FaPaw, FaPaw].map((Icon, i) => (
        <motion.div
          key={i}
          aria-hidden
          className={`absolute text-white/40 ${
            i === 0
              ? "top-20 right-[18%] text-5xl sm:text-6xl"
              : i === 1
                ? "bottom-14 left-[8%] text-6xl sm:text-7xl"
                : i === 2
                  ? "top-1/2 right-[5%] text-4xl sm:text-5xl"
                  : "bottom-1/3 left-[20%] text-3xl sm:text-4xl"
          }`}
          animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        >
          <Icon />
        </motion.div>
      ))}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative mx-auto px-4 text-center"
      >
        <motion.span
          variants={item}
          className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur-sm"
          style={{ color: "white" }}
        >
          🐾 Cuidando a tu mejor amigo, siempre
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl"
          style={{ color: "white" }}
        >
          Todo lo que tu mascota necesita,
          <br className="hidden sm:block" /> en un solo lugar
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-2xl text-base sm:text-lg"
          style={{ color: "rgba(255,255,255,0.92)" }}
        >
          Atención veterinaria, tienda online y productos para el bienestar de
          tu mascota, con la cercanía de siempre y toda la comodidad de
          comprar desde tu celular.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/store">
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold shadow-lg shadow-black/20 transition-shadow hover:shadow-xl"
              style={{ color: "var(--color-primary)" }}
            >
              <FaStore /> Ir a la tienda
            </motion.span>
          </Link>
          <Link href="/service">
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full border-2 px-6 py-3 font-semibold transition-colors hover:bg-white/10"
              style={{ color: "white", borderColor: "rgba(255,255,255,0.7)" }}
            >
              <FaCalendarCheck /> Ver servicios
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
