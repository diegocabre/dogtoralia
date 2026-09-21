"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { services } from "@/data/services";
import { iconForService } from "@/components/services/serviceIcons";

export function ServicesPreview() {
  return (
    <section className="bg-gradient-to-b from-sky-50 to-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-semibold text-tertiary sm:text-3xl">Nuestros servicios</h2>
          <p className="mt-3 text-gray-600">
            Todo lo que tu mascota necesita para estar sana, en cada etapa de su vida.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          {services.map((service, index) => {
            const Icon = iconForService(service.slug);
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]"
              >
                <Link
                  href={`/service#${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon aria-hidden />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-tertiary">{service.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Ver más
                    <FaArrowRight
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
