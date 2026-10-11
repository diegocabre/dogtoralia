"use client";

import { locationList } from "@/data/locations";
import { LetreroPuerta, useOpenStatus } from "@/components/home/LetreroPuerta";

/** Los dos letreros de puerta (estado en vivo + WhatsApp de cada sede). */
export function LetrerosContacto() {
  const status = useOpenStatus();

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
        {locationList.map((location) => (
          <LetreroPuerta key={location.name} location={location} status={status} />
        ))}
      </div>
      {status && !status.open && (
        <p className="mt-5 text-sm text-white/85">
          ¿Fuera de horario? Escríbenos igual y te contestamos apenas subamos la cortina.
        </p>
      )}
    </>
  );
}
