import Image from "next/image";
import { PiMapPinBold, PiNavigationArrowBold, PiWhatsappLogoBold } from "react-icons/pi";
import { agendarMensaje, googleMapsSearchUrl, locationList, wazeUrl, whatsappUrl } from "@/data/locations";
import { shortName, vetForLocation } from "@/data/team";

// "Av. Concha y Toro 3859" -> calle "Av. Concha y Toro" y número "3859",
// para mostrar el número como la placa de la puerta.
const splitAddress = (address: string) => {
  const match = address.match(/^(.*?)\s+(\d+[A-Za-z]?)$/);
  return match ? { street: match[1], number: match[2] } : { street: address, number: "" };
};

const plateLink =
  "presionable inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border-2 border-grafito bg-white px-3.5 py-2 text-sm font-semibold text-grafito hover:bg-muro";

/**
 * "Dónde estamos": cada sede es su fachada, con la placa del número de la
 * puerta, quién atiende, el horario y cómo llegar o agendar, todo junto.
 */
export function Locations() {
  return (
    <section className="bg-muro pb-16 pt-14 text-grafito sm:pb-24 sm:pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="rotulo text-[clamp(2.1rem,4.8vw,3.6rem)]">Dónde estamos</h2>

        <div className="mt-8 grid gap-14 sm:mt-12 md:grid-cols-2 md:gap-6 lg:gap-10">
          {locationList.map((location, index) => {
            const { street, number } = splitAddress(location.address);
            const vet = vetForLocation(location.name);
            return (
              <article key={location.name} className={index === 1 ? "md:mt-20" : ""}>
                <div className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] border-[3px] border-grafito bg-grafito-suave">
                    <Image
                      src={location.image}
                      alt={`Fachada de la sede ${location.name}, ${location.address}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 620px"
                      className="object-cover object-[50%_35%]"
                    />
                  </div>
                  {/* Placa con el número de la puerta, montada sobre la fachada */}
                  {number && (
                    <span className="rotulo absolute -bottom-5 left-4 rounded-[6px] border-[3px] border-grafito bg-vinilo-azul px-4 py-1.5 text-[2rem] text-white shadow-letrero sm:left-6 sm:text-[2.6rem]">
                      {number}
                    </span>
                  )}
                </div>

                <div className="mt-10 sm:px-1">
                  <h3 className="rotulo text-[1.9rem] sm:text-[2.3rem]">{location.name}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-grafito-suave">
                    <PiMapPinBold aria-hidden className="flex-shrink-0" />
                    {street} {number}
                  </p>
                  {vet && (
                    <p className="mt-0.5 text-grafito-suave">
                      Atiende a diario {vet.honorific === "Dra." ? "la" : "el"} {shortName(vet)}
                    </p>
                  )}

                  <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 border-y-2 border-grafito/15 py-4">
                    {location.hours.map((block) => (
                      <div key={block.label} className="contents">
                        <dt className="text-grafito-suave">{block.label}</dt>
                        <dd className="font-semibold tabular-nums">
                          {block.opens} a {block.closes}
                        </dd>
                      </div>
                    ))}
                    <dt className="text-grafito-suave">Domingos</dt>
                    <dd className="font-semibold">Cerrado</dd>
                  </dl>

                  <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
                    <a
                      href={whatsappUrl(location.phone, agendarMensaje(location))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="presionable col-span-2 inline-flex min-h-12 items-center justify-between gap-3 rounded-[10px] border-[3px] border-grafito bg-white py-1.5 pl-4 pr-1.5 text-grafito shadow-letrero sm:mr-2"
                    >
                      <span className="rotulo text-lg">Agendar aquí</span>
                      <span
                        aria-hidden
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-2xl text-white"
                      >
                        <PiWhatsappLogoBold />
                      </span>
                    </a>
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
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
