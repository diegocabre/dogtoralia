import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  PiArrowRightBold,
  PiFirstAidKitBold,
  PiFlaskBold,
  PiStethoscopeBold,
  PiSyringeBold,
} from "react-icons/pi";
import { services } from "@/data/services";

// Una línea por servicio de la clínica, en el tono de la casa. El detalle
// largo está en /service.
const clinica: Record<string, { icon: IconType; disco: string; linea: string }> = {
  consultas: {
    icon: PiStethoscopeBold,
    disco: "bg-vinilo-azul text-white",
    linea: "Diagnóstico y tratamiento, con quien ya conoce a tu mascota.",
  },
  vacunas: {
    icon: PiSyringeBold,
    disco: "bg-vinilo-mostaza text-grafito",
    linea: "Las esenciales, en cada etapa de su vida.",
  },
  examenes: {
    icon: PiFlaskBold,
    disco: "bg-vinilo-verde text-white",
    linea: "Clínicos y de laboratorio, para saber bien qué tiene.",
  },
  procedimientos: {
    icon: PiFirstAidKitBold,
    disco: "bg-grafito text-white",
    linea: "Menores y mayores, cirugías incluidas.",
  },
};

const filasClinica = services.filter((service) => service.slug in clinica);
const peluqueria = services.find((service) => service.slug === "peluqueria");

const enlaceVerMas =
  "inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-vinilo-mostaza decoration-[3px] underline-offset-[6px] hover:decoration-grafito";

/**
 * "Lo que hacemos adentro": la peluquería destacada con su foto y la clínica
 * como lista editorial en filas, sin cajas. La tienda cierra la lista.
 */
export function ServicesPreview() {
  return (
    <section className="bg-white py-16 text-grafito sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="rotulo max-w-[16ch] text-[clamp(2.1rem,4.8vw,3.6rem)]">
          Lo que hacemos adentro
        </h2>

        <div className="mt-10 grid gap-12 sm:mt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Destacado: peluquería */}
          {peluqueria && (
            <article className="grid gap-6 sm:grid-cols-[0.8fr_1fr] sm:items-center lg:grid-cols-1 xl:grid-cols-[0.8fr_1fr]">
              {/* El vinilo de peluquería en la vitrina real de Santiago Centro */}
              <Link
                href="/service#peluqueria"
                className="block w-full max-w-[320px] overflow-hidden rounded-[6px] border-[3px] border-grafito sm:max-w-none lg:max-w-[320px] xl:max-w-none"
              >
                <div className="relative aspect-[4/5] bg-muro">
                  <Image
                    src="/images/recortes/peluqueria-vitrina.jpg"
                    alt="Vinilo de peluquería canina y felina, corte y baño y baño medicado, en la vitrina de la sede Santiago Centro"
                    fill
                    sizes="(max-width: 640px) 320px, 300px"
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="flex flex-col">
              <h3 className="rotulo text-[clamp(1.9rem,3.4vw,2.6rem)]">
                Peluquería canina y felina
              </h3>
              <p className="mt-3 max-w-[44ch] text-base leading-relaxed text-grafito-suave sm:text-lg">
                Para que salga oliendo a limpio y sin estrés.
              </p>
              {peluqueria.items && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {peluqueria.items.map((item) => (
                    <li
                      key={item.title}
                      className="rounded-[6px] bg-vinilo-azul px-3 py-1.5 font-[family-name:var(--font-rotulo)] text-sm font-bold uppercase tracking-wide text-white"
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/service#peluqueria" className={`${enlaceVerMas} mt-5 self-start`}>
                Ver peluquería <PiArrowRightBold aria-hidden />
              </Link>
              </div>
            </article>
          )}

          {/* Clínica en filas */}
          <div>
            <h3 className="rotulo text-2xl">Clínica</h3>
            <ul className="mt-3 border-b-[3px] border-grafito">
              {filasClinica.map((service) => {
                const { icon: Icon, disco, linea } = clinica[service.slug];
                return (
                  <li key={service.slug} className="border-t-[3px] border-grafito">
                    <Link
                      href={`/service#${service.slug}`}
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 py-5 sm:gap-x-6 sm:py-6"
                    >
                      <span
                        aria-hidden
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl sm:h-14 sm:w-14 ${disco}`}
                      >
                        <Icon />
                      </span>
                      <span className="min-w-0">
                        <span className="rotulo block text-[1.6rem] sm:text-[2rem]">
                          {service.title}
                        </span>
                        <span className="mt-1 block text-[0.95rem] leading-snug text-grafito-suave sm:text-base">
                          {linea}
                        </span>
                      </span>
                      <PiArrowRightBold
                        aria-hidden
                        className="text-2xl transition-transform duration-200 ease-out group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <Link href="/service" className={enlaceVerMas}>
                Ver todos los servicios <PiArrowRightBold aria-hidden />
              </Link>
              <p className="text-[0.95rem] text-grafito-suave">
                Y lo que te recetamos, en{" "}
                <Link
                  href="/store"
                  className="inline-flex min-h-11 items-center font-semibold text-grafito underline decoration-vinilo-mostaza decoration-[3px] underline-offset-[6px] hover:decoration-grafito"
                >
                  la tienda
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
