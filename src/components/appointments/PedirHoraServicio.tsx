"use client";

import { PiArrowDownBold } from "react-icons/pi";

/** Evento con que un panel de servicio elige el servicio en el formulario de agenda. */
export const ELEGIR_SERVICIO = "dogtoralia:elegir-servicio";

/**
 * Botón "Pedir hora" de cada servicio: baja al formulario de agenda con ese
 * servicio ya elegido, para que la familia escoja ahí su sede. Sin JavaScript
 * igual funciona como enlace al formulario.
 */
export function PedirHoraServicio({ serviceTitle }: { serviceTitle: string }) {
  return (
    <a
      href="#agendar"
      onClick={() =>
        window.dispatchEvent(new CustomEvent(ELEGIR_SERVICIO, { detail: serviceTitle }))
      }
      aria-label={`Pedir hora para ${serviceTitle}: elegir sede`}
      className="presionable mt-7 inline-flex min-h-12 items-center justify-between gap-3 self-start rounded-[10px] border-[3px] border-grafito bg-white py-1.5 pl-4 pr-1.5 text-grafito shadow-letrero"
    >
      <span className="rotulo whitespace-nowrap text-lg">Pedir hora</span>
      <span
        aria-hidden
        className="flex h-10 w-10 items-center justify-center rounded-full bg-grafito text-xl text-white"
      >
        <PiArrowDownBold />
      </span>
    </a>
  );
}
