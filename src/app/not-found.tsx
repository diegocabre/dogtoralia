import Image from "next/image";
import Link from "next/link";
import { PiArrowRightBold, PiHouseLineBold } from "react-icons/pi";

/**
 * Página no encontrada en el mundo de la vitrina: el 404 como placa de
 * puerta, el equipo en el panel de al lado y la salida a la mano.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-muro pb-14 pt-[76px] sm:pb-20 lg:pt-[88px]">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="grid gap-1.5 rounded-md bg-grafito p-1.5 sm:gap-2 sm:p-2 md:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col justify-center rounded-[3px] bg-vinilo-azul px-6 py-9 text-white sm:px-10 sm:py-12">
            <p aria-hidden className="rotulo text-[5.5rem] leading-[0.85] sm:text-[6.5rem]">
              404
            </p>
            <h1 className="rotulo mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">¡Ups! Página no encontrada</h1>
            <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-white/90 sm:text-lg">
              Lo sentimos, parece que esta página se perdió persiguiendo su cola.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/home"
                className="presionable inline-flex min-h-12 items-center justify-between gap-3 rounded-[10px] border-[3px] border-grafito bg-white py-1.5 pl-4 pr-1.5 text-grafito shadow-letrero"
              >
                <span className="rotulo text-lg">Volver al inicio</span>
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-grafito text-xl text-white"
                >
                  <PiHouseLineBold />
                </span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-vinilo-mostaza decoration-[3px] underline-offset-[6px] hover:decoration-white"
              >
                Ir a contacto <PiArrowRightBold aria-hidden />
              </Link>
            </div>
          </div>

          <figure className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-grafito-suave md:aspect-auto md:min-h-[420px]">
            <Image
              src="/images/portada.png"
              alt="La Dra. Sara Vásquez y el Dr. Gabriel Cabré con un perro blanco en brazos"
              fill
              preload
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover object-[50%_22%]"
            />
          </figure>
        </div>
      </div>
    </main>
  );
}
