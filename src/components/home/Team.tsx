"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import { team, type TeamMember } from "@/data/team";

function Avatar({ member }: { member: TeamMember }) {
  if (member.photo) {
    return (
      <Image
        src={member.photo}
        alt={`${member.name}, ${member.role}`}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  // Sin foto todavía: iniciales sobre el color de la marca
  const initials = member.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <div
      aria-hidden
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-quaternary text-5xl font-bold text-white"
    >
      {initials || <FaPaw />}
    </div>
  );
}

export function Team() {
  // Sin equipo cargado no se muestra la sección.
  if (team.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-white to-sky-50 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-semibold text-tertiary sm:text-3xl">Conoce a nuestro equipo</h2>
          <p className="mt-3 text-gray-600">
            Profesionales que aman a los animales y cuidan a tu mascota como si fuera suya.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group w-full max-w-xs overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <div className="relative aspect-square overflow-hidden">
                <Avatar member={member} />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-tertiary">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                {member.location && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-500">
                    <FaMapMarkerAlt aria-hidden /> Sede {member.location}
                  </p>
                )}
                {member.bio && <p className="mt-3 text-sm leading-relaxed text-gray-600">{member.bio}</p>}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
