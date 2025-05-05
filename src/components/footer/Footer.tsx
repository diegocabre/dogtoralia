import Link from "next/link";
import { FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaShoppingCart, FaStore, FaHome, FaCalendar, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const locations = {
    puenteAlto: {
        name: 'Puente Alto',
        address: 'Av. Concha y Toro 3859',
        phone: '+56957830195',
        email: 'dogtoralia.cl@gmail.com'
    },
    santiagoCentro: {
        name: 'Santiago Centro',
        address: 'Av. Presidente Balmaceda 2776',
        phone: '+56927492520',
        email: 'dogtoraliavet@gmail.com'
    }
};

const whatsappMessage = encodeURIComponent('Hola! Me gustaría recibir información sobre los servicios de Dogtoralia.');

export function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="container mx-auto px-4 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Información de Contacto */}
                    <div className="space-y-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-secondary">Contacto</h3>

                        {/* Sede Puente Alto */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-secondary">Sede {locations.puenteAlto.name}</h4>
                            <p className="flex items-center gap-2 text-sm sm:text-base">
                                <FaPhone className="text-secondary" />
                                <Link
                                    href={`https://wa.me/${locations.puenteAlto.phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-secondary transition-colors flex items-center gap-2"
                                >
                                    <FaWhatsapp className="text-green-500" />
                                    {locations.puenteAlto.phone}
                                </Link>
                            </p>
                            <p className="flex items-center gap-2 text-sm sm:text-base">
                                <FaEnvelope className="text-secondary" />
                                <Link href={`mailto:${locations.puenteAlto.email}`} className="hover:text-secondary transition-colors">
                                    {locations.puenteAlto.email}
                                </Link>
                            </p>
                            <p className="flex items-start gap-2 text-sm sm:text-base">
                                <FaMapMarkerAlt className="text-secondary mt-1" />
                                <span>{locations.puenteAlto.address}</span>
                            </p>
                        </div>

                        {/* Sede Santiago Centro */}
                        <div className="space-y-3">
                            <h4 className="font-medium text-secondary">Sede {locations.santiagoCentro.name}</h4>
                            <p className="flex items-center gap-2 text-sm sm:text-base">
                                <FaPhone className="text-secondary" />
                                <Link
                                    href={`https://wa.me/${locations.santiagoCentro.phone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-secondary transition-colors flex items-center gap-2"
                                >
                                    <FaWhatsapp className="text-green-500" />
                                    {locations.santiagoCentro.phone}
                                </Link>
                            </p>
                            <p className="flex items-center gap-2 text-sm sm:text-base">
                                <FaEnvelope className="text-secondary" />
                                <Link href={`mailto:${locations.santiagoCentro.email}`} className="hover:text-secondary transition-colors">
                                    {locations.santiagoCentro.email}
                                </Link>
                            </p>
                            <p className="flex items-start gap-2 text-sm sm:text-base">
                                <FaMapMarkerAlt className="text-secondary mt-1" />
                                <span>{locations.santiagoCentro.address}</span>
                            </p>
                        </div>

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
                        <h3 className="text-lg sm:text-xl font-semibold text-secondary">Navegación</h3>
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
                            <li>
                                <Link href="/cart" className="flex items-center gap-2 text-sm sm:text-base hover:text-secondary transition-colors">
                                    <FaShoppingCart />
                                    <span>Carrito</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Redes Sociales y Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-secondary">Síguenos</h3>
                        <div className="flex space-x-4 mb-4">
                            <Link href="https://www.facebook.com/dogtoraliavet/" className="text-xl sm:text-2xl hover:text-secondary transition-colors" aria-label="Facebook">
                                <FaFacebook />
                            </Link>
                            <Link href="https://www.instagram.com/dogtoraliavet/" className="text-xl sm:text-2xl hover:text-secondary transition-colors" aria-label="Instagram">
                                <FaInstagram />
                            </Link>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm">Suscríbete a nuestro boletín</p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    placeholder="Tu correo"
                                    className="px-4 py-2 rounded-md bg-white text-tertiary w-full focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                                <button className="btn-secondary sm:w-auto">
                                    Suscribir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-secondary/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
                    <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} Dogtoralia Vet. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}