"use client";

import Image from "next/image";
import { locationList } from "@/data/locations";
import type { OpenState } from "@/lib/hours";
import { LetreroPuerta, useOpenStatus } from "./LetreroPuerta";

const estadoTexto: Record<OpenState, string> = {
  abierto: "Abierto",
  "cierra-pronto": "Cierra pronto",
  cerrado: "Cerrado",
};

// Si las sedes están en estados distintos, el cartel muestra el "más abierto"
// y el detalle nombra cada sede.
const estadoRango: Record<OpenState, number> = { abierto: 2, "cierra-pronto": 1, cerrado: 0 };

const estadoClase: Record<OpenState, string> = {
  abierto: "bg-whatsapp text-white",
  "cierra-pronto": "bg-vinilo-mostaza text-grafito",
  cerrado: "bg-grafito text-white",
};

/**
 * Primera pantalla: el equipo real a sangre y el vinilo azul de la sede con
 * lo justo para agendar. El estado en vivo, el nombre, una frase y una placa
 * de WhatsApp por sede. Horario y direcciones viven en "Dónde estamos".
 */
export function Hero() {
  const status = useOpenStatus();
  const estados = status ? locationList.map((location) => ({ location, ...status[location.name] })) : null;
  const general = estados?.reduce((a, b) => (estadoRango[b.state] > estadoRango[a.state] ? b : a)).state;
  const iguales = estados?.every((e) => e.detail === estados[0].detail);

  return (
    // Relleno superior = alto exacto del menú fijo (64 o 72 px más su borde):
    // la foto parte justo debajo, sin franja.
    <section className="bg-vinilo-azul pt-[67px] text-white lg:pt-[75px]">
      <div className="grid lg:min-h-[min(760px,calc(100svh-75px))] lg:grid-cols-2">
        {/* La foto llega al borde: en el celular arriba, en escritorio a la derecha */}
        <figure className="relative aspect-[4/3] overflow-hidden bg-grafito lg:order-2 lg:aspect-auto">
          <Image
            src="/images/portada.png"
            alt="La Dra. Sara Vásquez y el Dr. Gabriel Cabré con un perro blanco en brazos"
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[50%_92%] lg:object-top"
          />
        </figure>

        <div className="flex lg:justify-end">
          <div className="flex w-full max-w-[640px] flex-col justify-center px-4 pb-9 pt-6 sm:px-6 sm:pb-12 sm:pt-9 lg:py-14 lg:pr-12 xl:pr-16">
            {/* Estado en vivo. Reserva su alto antes de calcularse para que
                nada salte cuando aparece. */}
            <p
              aria-live="polite"
              className={`flex min-h-8 flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem] font-medium sm:text-base ${
                status ? "" : "invisible"
              }`}
            >
              <span
                className={`rounded-[6px] border-2 border-grafito px-2.5 py-0.5 font-[family-name:var(--font-rotulo)] text-[0.78rem] font-bold uppercase tracking-wide ${
                  general ? estadoClase[general] : "bg-white"
                }`}
              >
                {general ? estadoTexto[general] : "Horario"}
              </span>
              {estados && iguales ? (
                <span>
                  {estados[0].detail}
                  <span className="hidden sm:inline">
                    {estados[0].detail ? ", " : ""}en las dos sedes
                  </span>
                </span>
              ) : (
                <span>
                  {estados?.map((e) => `${e.location.shortName} ${e.detail}`).join(" y ")}
                </span>
              )}
            </p>

            <h1 className="rotulo mt-4 text-[clamp(2.05rem,5.2vw,4rem)] sm:mt-5">
              Veterinaria de barrio en Puente Alto y Santiago Centro
            </h1>

            <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-white/90 sm:mt-5 sm:text-lg">
              De lunes a sábado en Av. Concha y Toro y en Av. Presidente Balmaceda. Escríbenos y te damos hora.
            </p>

            <div
              id="letreros-vitrina"
              className="mt-7 grid gap-3 sm:mt-9 sm:grid-cols-2 sm:gap-4 lg:max-w-[460px] lg:grid-cols-1"
            >
              {locationList.map((location) => (
                <LetreroPuerta
                  key={location.name}
                  location={location}
                  status={status?.[location.name] ?? null}
                  conCartel={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
