import Link from "next/link";
import {
    PiClockBold,
    PiEnvelopeSimpleBold,
    PiFacebookLogoBold,
    PiInstagramLogoBold,
    PiMapPinBold,
    PiWhatsappLogoBold,
} from "react-icons/pi";
import { formatPhone, locationList, whatsappUrl } from "@/data/locations";
import { SOCIAL_LINKS } from "@/data/site";

const whatsappMessage = "Hola! Me gustaría recibir información sobre los servicios de Dogtoralia.";

const linkClass =
    "inline-flex min-h-11 items-center gap-2 text-white/85 transition-colors hover:text-vinilo-mostaza";

export default function Footer() {
    return (
        <footer className="border-t-[3px] border-vinilo-mostaza bg-grafito text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr_0.8fr]">
                    {locationList.map((location) => (
                        <div key={location.name}>
                            <h3 className="rotulo text-xl">Sede {location.name}</h3>
                            <ul className="mt-3 grid gap-1 text-sm">
                                <li>
                                    <a
                                        href={whatsappUrl(location.phone, whatsappMessage)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={linkClass}
                                    >
                                        <PiWhatsappLogoBold aria-hidden className="text-base" />
                                        {formatPhone(location.phone)}
                                    </a>
                                </li>
                                <li>
                                    <a href={`mailto:${location.email}`} className={linkClass}>
                                        <PiEnvelopeSimpleBold aria-hidden className="text-base" />
                                        {location.email}
                                    </a>
                                </li>
                                <li className="inline-flex min-h-11 items-center gap-2 text-white/85">
                                    <PiMapPinBold aria-hidden className="text-base" />
                                    {location.address}
                                </li>
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h3 className="rotulo text-xl">Horario</h3>
                        <ul className="mt-3 grid gap-3 text-sm text-white/85">
                            {locationList.map((location) => (
                                <li key={location.name} className="flex items-start gap-2">
                                    <PiClockBold aria-hidden className="mt-0.5 text-base" />
                                    <span>
                                        <span className="font-semibold text-white">{location.name}</span>
                                        {location.hours.map((block) => (
                                            <span key={block.label} className="block">
                                                {block.label}: {block.opens} a {block.closes}
                                            </span>
                                        ))}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="rotulo text-xl">Síguenos</h3>
                        <div className="mt-3 flex gap-2">
                            <a
                                href={SOCIAL_LINKS.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex h-11 w-11 items-center justify-center rounded-[8px] border-2 border-white/30 text-2xl transition-colors hover:border-vinilo-mostaza hover:text-vinilo-mostaza"
                            >
                                <PiFacebookLogoBold />
                            </a>
                            <a
                                href={SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex h-11 w-11 items-center justify-center rounded-[8px] border-2 border-white/30 text-2xl transition-colors hover:border-vinilo-mostaza hover:text-vinilo-mostaza"
                            >
                                <PiInstagramLogoBold />
                            </a>
                        </div>
                        <nav aria-label="Secciones" className="mt-6">
                            <ul className="grid grid-cols-2 gap-x-4 text-sm">
                                <li><Link href="/home" className={linkClass}>Inicio</Link></li>
                                <li><Link href="/service" className={linkClass}>Servicios</Link></li>
                                <li><Link href="/store" className={linkClass}>Tienda</Link></li>
                                <li><Link href="/contact" className={linkClass}>Contacto</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {new Date().getFullYear()} Dogtoralia Vet. Todos los derechos reservados.</p>
                    <p className="flex gap-4">
                        <Link href="/privacidad" className="underline underline-offset-2 hover:text-vinilo-mostaza">
                            Política de Privacidad
                        </Link>
                        <Link href="/terminos" className="underline underline-offset-2 hover:text-vinilo-mostaza">
                            Términos y Condiciones
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
