import {
  PiEnvelopeSimpleBold,
  PiMapPinBold,
  PiNavigationArrowBold,
  PiWhatsappLogoBold,
} from "react-icons/pi";
import { ContactForm } from "@/components/contact/ContactForm";
import { LetrerosContacto } from "@/components/contact/LetrerosContacto";
import {
  agendarMensaje,
  formatPhone,
  googleMapsEmbedUrl,
  googleMapsSearchUrl,
  locationList,
  wazeUrl,
  whatsappUrl,
} from "@/data/locations";
import { businessHours } from "@/data/site";
import { shortName, vetForLocation } from "@/data/team";

// Los mapas usan el formato "q=<dirección>&output=embed": no requiere API
// key y es más confiable que los enlaces "pb=..." de "Compartir". Para que
// el iframe se muestre, el origen debe estar permitido en la
// Content-Security-Policy (frame-src), ver next.config.ts.

// "Av. Concha y Toro 3859" -> calle y número, para la placa de la puerta.
const splitAddress = (address: string) => {
  const match = address.match(/^(.*?)\s+(\d+[A-Za-z]?)$/);
  return match ? { street: match[1], number: match[2] } : { street: address, number: "" };
};

const plateLink =
  "presionable inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border-2 border-grafito bg-white px-3.5 py-2 text-sm font-semibold text-grafito hover:bg-muro";

export default function ContactPage() {
  return (
    <main className="bg-muro pb-14 pt-[76px] sm:pb-20 lg:pt-[88px]">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        {/* Encabezado: la forma más rápida de contacto, en vivo */}
        <div className="rounded-md bg-grafito p-1.5 sm:p-2">
          <div className="grid gap-8 rounded-[3px] bg-vinilo-azul px-5 py-8 text-white sm:px-9 sm:py-10 lg:grid-cols-[0.8fr_1.4fr] lg:items-center lg:gap-10">
            <div>
              <h1 className="rotulo text-[clamp(2.6rem,6vw,4.4rem)]">Contacto</h1>
              <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-white/90 sm:text-lg">
                Lo más rápido es WhatsApp: escríbele a tu sede. Si prefieres el correo, el
                formulario está más abajo.
              </p>
            </div>
            <LetrerosContacto />
          </div>
        </div>

        {/* Las dos sedes, cada una con su mapa y sus datos */}
        <h2 className="rotulo mt-12 px-1 text-[clamp(2rem,4.5vw,3.25rem)] text-grafito sm:mt-16">
          Las dos sedes
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-4">
          {locationList.map((location) => {
            const { street, number } = splitAddress(location.address);
            const vet = vetForLocation(location.name);
            return (
              <article key={location.name} className="flex flex-col rounded-md bg-grafito p-1.5 sm:p-2">
                <div className="grid grid-cols-[auto_1fr] items-stretch gap-1.5 sm:gap-2">
                  <div className="flex items-center rounded-[3px] bg-vinilo-azul px-3 text-white sm:px-5">
                    <span className="rotulo text-[2rem] sm:text-5xl">{number}</span>
                  </div>
                  <div className="rounded-[3px] bg-white px-4 py-3 text-grafito sm:px-5">
                    <h3 className="rotulo text-xl sm:text-2xl">Sede {location.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-grafito-suave">
                      <PiMapPinBold aria-hidden className="flex-shrink-0" />
                      {street}
                    </p>
                    {vet && (
                      <p className="mt-0.5 text-sm text-grafito-suave">
                        Atiende a diario {vet.honorific === "Dra." ? "la" : "el"} {shortName(vet)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-1.5 overflow-hidden rounded-[3px] bg-white sm:mt-2">
                  <iframe
                    src={googleMapsEmbedUrl(location.fullAddress)}
                    width="100%"
                    height="260"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mapa de la sede ${location.name}`}
                  />
                </div>

                <ul className="mt-1.5 grid gap-1 rounded-[3px] bg-white px-4 py-3 text-sm text-grafito sm:mt-2 sm:px-5">
                  <li>
                    <a
                      href={whatsappUrl(location.phone, agendarMensaje(location))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-vinilo-mostaza decoration-[3px] underline-offset-[5px] hover:decoration-grafito"
                    >
                      <PiWhatsappLogoBold aria-hidden className="text-lg text-whatsapp" />
                      {formatPhone(location.phone)}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${location.email}`}
                      className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4 hover:text-vinilo-azul"
                    >
                      <PiEnvelopeSimpleBold aria-hidden className="text-lg" />
                      {location.email}
                    </a>
                  </li>
                </ul>

                <div className="mt-1.5 grid grid-cols-2 gap-2 rounded-[3px] bg-grafito-suave p-2.5 sm:mt-2 sm:flex sm:p-3">
                  <a
                    href={googleMapsSearchUrl(location.fullAddress)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={plateLink}
                  >
                    <PiMapPinBold aria-hidden /> Google Maps
                  </a>
                  <a
                    href={wazeUrl(location.fullAddress)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={plateLink}
                  >
                    <PiNavigationArrowBold aria-hidden /> Waze
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Horario común */}
        <div className="mt-4 rounded-md bg-grafito p-1.5 sm:p-2">
          <div className="grid gap-x-8 gap-y-3 rounded-[3px] bg-vinilo-mostaza px-5 py-5 text-grafito sm:grid-cols-[auto_1fr_1fr_1fr] sm:items-center sm:px-7">
            <h2 className="rotulo text-2xl">Horario</h2>
            {businessHours.map((block) => (
              <p key={block.label}>
                <span className="block text-sm font-semibold">{block.label}</span>
                <span className="rotulo block text-xl">
                  {block.opens} a {block.closes}
                </span>
              </p>
            ))}
            <p>
              <span className="block text-sm font-semibold">Domingos</span>
              <span className="rotulo block text-xl">Cerrado</span>
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
