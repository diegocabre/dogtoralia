"use client";

import { useEffect, useState } from "react";
import { PiWhatsappLogoBold } from "react-icons/pi";
import { agendarMensaje, whatsappUrl, type Location } from "@/data/locations";
import { shortName, vetForLocation } from "@/data/team";
import { getOpenStatus, type OpenState, type OpenStatus } from "@/lib/hours";

/**
 * Estado abierto/cerrado en hora de Chile. Se calcula solo en el navegador
 * (en el servidor quedaría congelado con la hora del build) y se refresca
 * cada minuto. Mientras no hay estado, devuelve null.
 */
export function useOpenStatus() {
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return status;
}

const chipText: Record<OpenState, string> = {
  abierto: "Abierto",
  "cierra-pronto": "Cierra pronto",
  cerrado: "Cerrado",
};

const chipClass: Record<OpenState, string> = {
  abierto: "bg-whatsapp text-white",
  "cierra-pronto": "bg-vinilo-mostaza text-grafito",
  cerrado: "bg-grafito text-white",
};

/**
 * Letrero de puerta de una sede: el cartel ABIERTO/CERRADO en vivo, quién
 * atiende y el botón de WhatsApp, todo en una sola placa que se toca.
 */
export function LetreroPuerta({
  location,
  status,
  conCartel = true,
}: {
  location: Location;
  status: OpenStatus | null;
  /** Sin cartel colgado cuando el estado ya se muestra arriba (en el hero). */
  conCartel?: boolean;
}) {
  const vet = vetForLocation(location.name);
  const detalle = conCartel ? status?.detail : undefined;

  return (
    <a
      href={whatsappUrl(location.phone, agendarMensaje(location))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Agendar por WhatsApp en la sede ${location.name}${
        status && conCartel ? `, ${chipText[status.state].toLowerCase()}` : ""
      }`}
      className={`presionable group relative flex items-center gap-4 rounded-[10px] border-[3px] border-grafito bg-white px-4 text-grafito ${conCartel ? "pb-4 pt-6" : "py-4"} shadow-letrero hover:shadow-letrero-alto`}
    >
      {/* Cartel colgado de la placa. Reserva su alto aunque aún no haya
          estado, para que nada salte cuando aparece. */}
      {conCartel && (
      <span
        aria-hidden
        className={`absolute -top-3.5 left-3 rounded-[6px] border-2 border-grafito px-2.5 py-0.5 font-[family-name:var(--font-rotulo)] text-[0.72rem] font-bold uppercase tracking-wide ${
          status ? `letrero-colgante ${chipClass[status.state]}` : "invisible bg-white"
        }`}
      >
        {status ? chipText[status.state] : "Horario"}
      </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="rotulo block text-[1.35rem] sm:text-2xl">{location.name}</span>
        <span className="mt-1 block text-sm leading-snug text-grafito-suave">
          {vet && <>con {vet.honorific === "Dra." ? "la" : "el"} {shortName(vet)}</>}
          {vet && detalle && ", "}
          {detalle}
        </span>
      </span>

      <span
        aria-hidden
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-whatsapp text-[1.6rem] text-white transition-colors duration-200 group-hover:bg-whatsapp-dark"
      >
        <PiWhatsappLogoBold />
      </span>
    </a>
  );
}
