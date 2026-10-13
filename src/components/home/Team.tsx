import { PiHouseLineBold, PiWhatsappLogoBold } from "react-icons/pi";
import { DOMICILIO_WHATSAPP_PHONE, whatsappUrl } from "@/data/locations";
import { shortName, team, type TeamMember } from "@/data/team";
import Image from "next/image";

const domicilioMensaje = "Hola! Quiero pedir una atención a domicilio. Mi comuna es: ";

/**
 * Quién atiende: retratos grandes de los dos veterinarios, quién está en
 * cada sede y que operan juntos. Debajo, la franja verde de domicilio.
 */
export function Team() {
  const sara = team.find((member) => member.location === "Puente Alto");
  const gabriel = team.find((member) => member.location === "Santiago Centro");
  // Mismo orden que en la foto del equipo. Sin foto, no hay retrato.
  const retratos = [sara, gabriel].filter(
    (member): member is TeamMember & { photo: string } =>
      Boolean(member?.photo),
  );

  return (
    <>
      <section className="bg-muro pb-14 pt-16 text-grafito sm:pb-20 sm:pt-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="rotulo text-[clamp(1.8rem,4vw,3.3rem)] leading-[1.1]">
              {sara && (
                <span className="block">
                  <span className="text-vinilo-azul">{shortName(sara)}</span> en Puente Alto.
                </span>
              )}
              {gabriel && (
                <span className="block">
                  <span className="text-vinilo-verde">{shortName(gabriel)}</span> en el Centro.
                </span>
              )}
              <span className="mt-4 block text-[0.7em] font-bold leading-[1.15]">
                En cirugías programadas, los dos.
              </span>
            </h2>
            <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-grafito-suave sm:text-lg">
              Ella es cirujana y él, anestesiólogo. Cuando tu mascota necesita una operación, la
              atienden juntos.
            </p>
          </div>

          {retratos.length > 0 && (
            <ul className="grid grid-cols-2 gap-3 sm:gap-5">
              {retratos.map((member, index) => (
                <li key={member.name} className={index === 1 ? "mt-10 sm:mt-16" : ""}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-grafito">
                    <Image
                      src={member.photo}
                      alt={`Retrato ${member.honorific === "Dra." ? "de la" : "del"} ${member.honorific} ${member.name}`}
                      fill
                      sizes="(max-width: 1024px) 45vw, 300px"
                      className="object-cover"
                    />
                  </div>
                  <p className="rotulo mt-3 text-lg sm:text-2xl">
                    {member.honorific} {member.name}
                  </p>
                  <p className="mt-1 text-sm text-grafito-suave sm:text-base">
                    {member.role.split("·").pop()?.trim()} en {member.location}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-vinilo-verde py-10 text-white sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8">
          <PiHouseLineBold aria-hidden className="hidden text-5xl md:block" />
          <div>
            <h2 className="rotulo text-[clamp(1.9rem,3.6vw,2.8rem)]">Vamos a tu casa</h2>
            <p className="mt-2 max-w-[56ch] text-base leading-relaxed sm:text-lg">
              Atención veterinaria a domicilio en todo Santiago. Para el gato que se esconde apenas
              ve el transportador.
            </p>
          </div>
          <a
            href={whatsappUrl(DOMICILIO_WHATSAPP_PHONE, domicilioMensaje)}
            target="_blank"
            rel="noopener noreferrer"
            className="presionable inline-flex min-h-12 items-center justify-between gap-3 self-start rounded-[10px] border-[3px] border-grafito bg-white py-2 pl-4 pr-2 text-grafito shadow-letrero md:self-center"
          >
            <span className="rotulo whitespace-nowrap text-lg">Pedir a domicilio</span>
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-2xl text-white"
            >
              <PiWhatsappLogoBold />
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
