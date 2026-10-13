"use client";

import { locationList } from "@/data/locations";
import { LetreroPuerta, useOpenStatus } from "./LetreroPuerta";

/** Cierre de la página: la misma pregunta de siempre en el mesón. */
export function CierreAgenda() {
  const status = useOpenStatus();

  return (
    <section className="bg-grafito py-12 text-white sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h2 className="rotulo text-[clamp(2.4rem,5.5vw,4rem)]">¿Te damos hora?</h2>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-white/85 sm:text-lg">
            Elige tu sede y escríbenos. Te respondemos por el mismo WhatsApp.
          </p>
        </div>
        <div id="letreros-cierre" className="grid gap-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1 lg:gap-6">
          {locationList.map((location) => (
            <LetreroPuerta key={location.name} location={location} status={status?.[location.name] ?? null} />
          ))}
        </div>
      </div>
    </section>
  );
}
