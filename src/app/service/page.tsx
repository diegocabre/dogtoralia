import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  PiBathtubBold,
  PiEyeBold,
  PiFirstAidKitBold,
  PiFlaskBold,
  PiHeartbeatBold,
  PiScissorsBold,
  PiSquaresFourBold,
  PiStethoscopeBold,
  PiSyringeBold,
  PiWaveformBold,
} from "react-icons/pi";
import { services, type ServiceData } from "@/data/services";
import RequestAppointment from "@/components/appointments/RequestAppointment";
import { PedirHoraServicio } from "@/components/appointments/PedirHoraServicio";

// Cada servicio es un panel de vinilo de la vitrina. Color, tamaño en la
// grilla e ícono se eligen por slug; el texto vive en data/services.ts
// (también lo lee el SEO).
const panelStyle: Record<
  string,
  { panel: string; span: string; icon: IconType; note?: string; itemIcons?: IconType[] }
> = {
  consultas: {
    panel: "bg-vinilo-azul text-white",
    span: "lg:col-span-3",
    icon: PiStethoscopeBold,
  },
  vacunas: {
    panel: "bg-vinilo-mostaza text-grafito",
    span: "lg:col-span-3",
    icon: PiSyringeBold,
  },
  examenes: {
    panel: "bg-vinilo-verde text-white",
    span: "lg:col-span-2",
    icon: PiFlaskBold,
  },
  procedimientos: {
    panel: "bg-grafito-suave text-white",
    span: "lg:col-span-4",
    icon: PiFirstAidKitBold,
    note: "En cirugías operan juntos la Dra. Sara (cirujana) y el Dr. Gabriel (anestesiólogo).",
  },
  otros: {
    panel: "bg-vinilo-mostaza text-grafito",
    span: "lg:col-span-6",
    icon: PiSquaresFourBold,
    itemIcons: [PiHeartbeatBold, PiEyeBold, PiWaveformBold],
  },
  peluqueria: {
    panel: "bg-vinilo-azul text-white",
    span: "lg:col-span-6",
    icon: PiScissorsBold,
    itemIcons: [PiScissorsBold, PiBathtubBold],
  },
};

const fallbackStyle = { panel: "bg-vinilo-azul text-white", span: "lg:col-span-3", icon: PiStethoscopeBold };

// Barras de los puntos destacados: alternan dos colores y nunca repiten el
// color del panel donde van (regla de las barras de rótulo).
const itemBarsFor = (panel: string): [string, string] => {
  if (panel.includes("bg-vinilo-mostaza")) return ["bg-grafito text-white", "bg-vinilo-azul text-white"];
  if (panel.includes("bg-grafito")) return ["bg-vinilo-mostaza text-grafito", "bg-vinilo-azul text-white"];
  return ["bg-grafito text-white", "bg-vinilo-mostaza text-grafito"];
};

function ServicePanel({ service }: { service: ServiceData }) {
  const style = panelStyle[service.slug] ?? fallbackStyle;
  const Icon = style.icon;
  const wide = style.span.includes("col-span-6");

  return (
    <section
      id={service.slug}
      aria-labelledby={`${service.slug}-titulo`}
      className={`scroll-mt-24 rounded-[3px] px-6 py-8 sm:px-9 sm:py-10 ${style.panel} ${style.span} ${
        wide ? "lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-10" : "flex flex-col"
      }`}
    >
      <div className="flex flex-col">
        <Icon aria-hidden className="text-4xl" />
        <h2 id={`${service.slug}-titulo`} className="rotulo mt-4 text-[clamp(1.9rem,3.4vw,2.75rem)]">
          {service.title}
        </h2>
        <p className="mt-3 max-w-[52ch] text-base leading-relaxed sm:text-lg">
          {service.description}
        </p>
        {style.note && (
          <p className="mt-4 max-w-[52ch] border-t-2 border-current/25 pt-4 text-sm font-semibold sm:text-base">
            {style.note}
          </p>
        )}
      </div>

      <div className={`flex flex-col ${wide ? "mt-6 lg:mt-0 lg:justify-center" : "mt-auto"}`}>
        {service.items && (
          <ul className="mt-6 grid gap-2.5 lg:mt-0">
            {service.items.map((item, index) => {
              const ItemIcon = style.itemIcons?.[index] ?? PiBathtubBold;
              return (
                <li key={item.title} className={`rounded-[8px] px-4 py-3 ${itemBarsFor(style.panel)[index % 2]}`}>
                  <span className="flex items-center gap-2">
                    <ItemIcon aria-hidden />
                    <span className="rotulo text-lg">{item.title}</span>
                  </span>
                  <span className="mt-1 block text-sm leading-snug">{item.text}</span>
                </li>
              );
            })}
          </ul>
        )}
        <PedirHoraServicio serviceTitle={service.title} />
      </div>
    </section>
  );
}

export default function ServicePage() {
  return (
    <main className="bg-muro">
      {/* Encabezado: la vitrina real de la sede junto al índice de servicios */}
      <section className="pb-10 pt-[76px] sm:pb-14 lg:pt-[88px]">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div className="grid gap-1.5 rounded-md bg-grafito p-1.5 sm:gap-2 sm:p-2 lg:grid-cols-[1fr_1.1fr]">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[3px] lg:aspect-auto lg:min-h-[420px]">
              <Image
                src="/images/centro.jpeg"
                alt="Vitrina de la sede Santiago Centro con los rótulos de consultas, vacunas, exámenes, procedimientos y peluquería"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-[60%_48%]"
              />
            </figure>

            <div className="flex flex-col justify-center rounded-[3px] bg-vinilo-azul px-5 py-8 text-white sm:px-9 sm:py-10">
              <h1 className="rotulo text-[clamp(2.6rem,6vw,4.4rem)]">Servicios</h1>
              <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-white/90 sm:text-lg">
                Consultas, vacunas, exámenes, cirugías y peluquería canina y felina, de lunes a sábado en Puente Alto y Santiago Centro.
              </p>
              <nav aria-label="Servicios" className="mt-7">
                <ul className="flex flex-wrap gap-2.5 sm:grid sm:grid-cols-3">
                  {services.map((service, index) => (
                    <li key={service.slug} className="flex-grow">
                      <Link
                        href={`#${service.slug}`}
                        className={`presionable flex min-h-12 items-center justify-center rounded-[8px] px-4 py-2 sm:justify-start ${
                          ["bg-vinilo-mostaza text-grafito", "bg-grafito text-white", "bg-vinilo-verde text-white"][index % 3]
                        }`}
                      >
                        <span className="rotulo whitespace-nowrap text-sm leading-tight sm:text-base">
                          {service.slug === "peluqueria" ? "Peluquería" : service.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Los servicios como paneles de distinto tamaño en un mismo marco */}
      <div className="mx-auto max-w-7xl px-3 pb-14 sm:px-6 sm:pb-20">
        <div className="grid gap-1.5 rounded-md bg-grafito p-1.5 sm:gap-2 sm:p-2 lg:grid-cols-6">
          {services.map((service) => (
            <ServicePanel key={service.slug} service={service} />
          ))}
        </div>
      </div>

      {/* Solicitud de hora */}
      <section id="agendar" className="scroll-mt-16 bg-grafito py-14 text-white sm:py-20 lg:scroll-mt-[72px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="rotulo text-[clamp(2.4rem,5.5vw,4rem)]">¿Te damos hora?</h2>
              <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-white/85 sm:text-lg">
                Elige la sede y el servicio. Se abre WhatsApp con el mensaje listo y te confirmamos
                el día y la hora.
              </p>
            </div>
            <RequestAppointment />
          </div>
        </div>
      </section>
    </main>
  );
}
