"use client";

import { useEffect, useState } from "react";
import { PiWhatsappLogoBold } from "react-icons/pi";
import { locationList, whatsappUrl, type Location } from "@/data/locations";
import { services } from "@/data/services";
import { ELEGIR_SERVICIO } from "./PedirHoraServicio";

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
  "w-full min-h-12 rounded-[8px] border-[3px] border-grafito bg-white px-3 py-2 text-base text-grafito focus-visible:outline-vinilo-mostaza";

/**
 * Solicitud de hora por WhatsApp con confirmación humana: el visitante
 * elige sede y servicio, y se abre el chat de esa sede con el mensaje listo.
 * La clínica responde confirmando el horario. Va dentro de un panel azul de
 * la vitrina, con el botón como placa de puerta.
 */
export default function RequestAppointment() {
  const [locationName, setLocationName] = useState(locationList[0].name);
  const [serviceTitle, setServiceTitle] = useState(services[0].title);

  // Un panel de servicio puede elegir el servicio antes de bajar al formulario.
  useEffect(() => {
    const choose = (event: Event) => {
      const title = (event as CustomEvent<string>).detail;
      if (services.some((s) => s.title === title)) setServiceTitle(title);
    };
    window.addEventListener(ELEGIR_SERVICIO, choose);
    return () => window.removeEventListener(ELEGIR_SERVICIO, choose);
  }, []);

  const location = locationList.find((l) => l.name === locationName) ?? locationList[0];
  const href = whatsappUrl(location.phone, appointmentMessage(location, serviceTitle));

  return (
    <div className="rounded-md bg-grafito-suave p-1.5 sm:p-2">
      <div className="grid gap-4 rounded-[3px] bg-vinilo-azul px-5 py-6 text-left text-white sm:grid-cols-2 sm:px-7 sm:py-8">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Sede</span>
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
          <span className="mb-1.5 block text-sm font-semibold">Servicio</span>
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
        <div className="sm:col-span-2">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="presionable mt-2 flex min-h-14 w-full items-center justify-between gap-3 rounded-[10px] border-[3px] border-grafito bg-white py-1.5 pl-5 pr-1.5 text-grafito shadow-letrero"
          >
            <span className="rotulo text-xl">Solicitar hora en {location.name}</span>
            <span
              aria-hidden
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-whatsapp text-2xl text-white"
            >
              <PiWhatsappLogoBold />
            </span>
          </a>
          <p className="mt-3 text-sm text-white/85">
            Te respondemos por WhatsApp para confirmar el día y la hora.
          </p>
        </div>
      </div>
    </div>
  );
}
