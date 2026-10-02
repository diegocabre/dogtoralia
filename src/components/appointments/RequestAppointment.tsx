"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { locationList, whatsappUrl, type Location } from "@/data/locations";
import { services } from "@/data/services";

// Mensaje que llega al WhatsApp de la sede. Deja espacios para que el
// cliente complete los datos que la clínica necesita para confirmar.
export function appointmentMessage(location: Location, serviceTitle: string): string {
  return [
    "Hola! Quiero solicitar una hora.",
    `Sede: ${location.name}`,
    `Servicio: ${serviceTitle}`,
    "Nombre y especie de mi mascota: ",
    "Día y horario de preferencia: ",
  ].join("\n");
}

const selectClass =
  "w-full rounded-lg border border-white/30 bg-white px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary";

/**
 * Solicitud de hora por WhatsApp con confirmación humana: el visitante
 * elige sede y servicio, y se abre el chat de esa sede con el mensaje listo.
 * La clínica responde confirmando el horario.
 */
export default function RequestAppointment() {
  const [locationName, setLocationName] = useState(locationList[0].name);
  const [serviceTitle, setServiceTitle] = useState(services[0].title);

  const location = locationList.find((l) => l.name === locationName) ?? locationList[0];
  const href = whatsappUrl(location.phone, appointmentMessage(location, serviceTitle));

  return (
    <div className="mx-auto mt-8 grid max-w-2xl gap-4 text-left sm:grid-cols-2">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-white/90">Sede</span>
        <select
          className={selectClass}
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
        >
          {locationList.map((l) => (
            <option key={l.name} value={l.name}>
              {l.name} ({l.address})
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-white/90">Servicio</span>
        <select
          className={selectClass}
          value={serviceTitle}
          onChange={(e) => setServiceTitle(e.target.value)}
        >
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <div className="flex justify-center sm:col-span-2">
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-green-700"
        >
          <FaWhatsapp className="text-xl" />
          Solicitar hora
        </motion.a>
      </div>
      <p className="text-center text-sm text-white/70 sm:col-span-2">
        Te responderemos por WhatsApp para confirmar el día y la hora.
      </p>
    </div>
  );
}
