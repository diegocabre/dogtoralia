"use client";

import { useEffect, useState } from "react";
import { PiWhatsappLogoBold } from "react-icons/pi";
import { agendarMensaje, locationList, whatsappUrl } from "@/data/locations";

// Letreros de puerta de la página: mientras alguno se ve, la barra se esconde
// para no repetir la misma acción dos veces en pantalla.
const LETREROS = ["letreros-vitrina", "letreros-cierre"];

/** Barra fija inferior (solo móvil) con el WhatsApp de cada sede. */
export function BarraWhatsapp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = LETREROS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (targets.length === 0) return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio >= 0.6) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    }, { threshold: [0, 0.6, 1] });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Agendar por WhatsApp"
      data-barra-whatsapp
      data-visible={visible}
      className="barra-whatsapp fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-grafito bg-white px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden"
    >
      <p className="mb-1.5 text-center text-xs font-semibold text-grafito-suave">
        Agenda por WhatsApp
      </p>
      <div className="grid grid-cols-2 gap-2">
        {locationList.map((location) => (
          <a
            key={location.name}
            href={whatsappUrl(location.phone, agendarMensaje(location))}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? undefined : -1}
            className="presionable flex min-h-11 items-center justify-center gap-1.5 rounded-[8px] border-2 border-grafito bg-whatsapp px-2 text-white"
          >
            <PiWhatsappLogoBold aria-hidden className="text-lg" />
            <span className="rotulo whitespace-nowrap text-[0.85rem]">{location.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
