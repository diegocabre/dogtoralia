import Link from "next/link";
import { FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaStore, FaHome, FaCalendar, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { locationList, whatsappUrl } from "@/data/locations";

const whatsappMessage = "Hola! Me gustaría recibir información sobre los servicios de Dogtoralia.";

export default function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Información de Contacto */}
                    <div className="space-y-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-tertiary">Contacto</h3>

                        {locationList.map((location) => (
                            <div key={location.name} className="space-y-3">
                                <h4 className="font-medium text-tertiary">Sede {location.name}</h4>
                                <p className="flex items-center gap-2 text-sm sm:text-base">
                                    <FaPhone className="text-secondary" />
                                    <Link
                                        href={whatsappUrl(location.phone, whatsappMessage)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-secondary transition-colors flex items-center gap-2"
                                    >
                                        <FaWhatsapp className="text-green-500" />
                                        {location.phone}
                                    </Link>
                                </p>
                                <p className="flex items-center gap-2 text-sm sm:text-base">
                                    <FaEnvelope className="text-secondary" />
                                    <Link href={`mailto:${location.email}`} className="hover:text-secondary transition-colors">
                                        {location.email}
                                    </Link>
                                </p>
                                <p className="flex items-start gap-2 text-sm sm:text-base">
                                    <FaMapMarkerAlt className="text-secondary mt-1" />
                                    <span>{location.address}</span>
                                </p>
                            </div>
                        ))}

                        {/* Horarios */}
                        <div className="space-y-2">
                            <p className="flex items-center gap-2 text-sm sm:text-base">
                                <FaClock className="text-secondary" />
                                <span>Lunes a Viernes: 10:00 - 19:00</span>
                            </p>
                            <p className="ml-6 text-sm sm:text-base">Sábados: 10:00 - 17:00</p>
                        </div>
                    </div>

                    {/* Enlaces Rápidos */}
                    <div className="space-y-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-tertiary">Navegación</h3>
                        <ul className="grid grid-cols-2 gap-3">
                            <li>
                                <Link href="/home" className="flex items-center gap-2 text-sm sm:text-base hover:text-secondary transition-colors">
                                    <FaHome />
                                    <span>Inicio</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/store" className="flex items-center gap-2 text-sm sm:text-base hover:text-secondary transition-colors">
                                    <FaStore />
                                    <span>Tienda</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/service" className="flex items-center gap-2 text-sm sm:text-base hover:text-secondary transition-colors">
                                    <FaCalendar />
                                    <span>Servicios</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="flex items-center gap-2 text-sm sm:text-base hover:text-secondary transition-colors">
                                    <FaPhone />
                                    <span>Contacto</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Redes Sociales */}
                    <div className="space-y-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-tertiary">Síguenos</h3>
                        <div className="flex space-x-4">
                            <Link
                                href="https://www.facebook.com/dogtoraliavet/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl sm:text-2xl hover:text-secondary transition-colors"
                                aria-label="Facebook"
                            >
                                <FaFacebook />
                            </Link>
                            <Link
                                href="https://www.instagram.com/dogtoraliavet/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl sm:text-2xl hover:text-secondary transition-colors"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-secondary/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center space-y-2">
                    <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} Dogtoralia Vet. Todos los derechos reservados.</p>
                    <p className="text-xs sm:text-sm flex justify-center gap-4">
                        <Link href="/privacidad" className="hover:text-secondary transition-colors underline underline-offset-2">
                            Política de Privacidad
                        </Link>
                        <Link href="/terminos" className="hover:text-secondary transition-colors underline underline-offset-2">
                            Términos y Condiciones
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
