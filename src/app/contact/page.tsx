"use client";

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/contact/ContactForm';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

// mapQuery usa el formato "q=<dirección>&output=embed": no requiere API
// key y es mucho más confiable que los enlaces "pb=..." (esos se generan
// desde el botón "Compartir" de Google Maps para un lugar puntual, y si
// se escriben a mano casi siempre terminan rotos, que era justo lo que
// pasaba antes aquí). Además, para que el iframe se muestre hace falta
// permitir el origen en la Content-Security-Policy (frame-src) — ver
// next.config.js.
const locations = {
    puenteAlto: {
        name: 'Puente Alto',
        address: 'Av. Concha y Toro 3859',
        fullAddress: 'Av. Concha y Toro 3859, Puente Alto, Región Metropolitana, Chile',
        phone: '+56957830195',
        email: 'dogtoralia.cl@gmail.com',
        wazeUrl: 'https://www.waze.com/ul?ll=-33.58944497333844,-70.58159492427287&navigate=yes',
    },
    santiagoCentro: {
        name: 'Santiago Centro',
        address: 'Av. Presidente Balmaceda 2776',
        fullAddress: 'Av. Presidente Balmaceda 2776, Santiago, Región Metropolitana, Chile',
        phone: '+56927492520',
        email: 'dogtoraliavet@gmail.com',
        wazeUrl: 'https://www.waze.com/ul?ll=-33.43944497333844,-70.67159492427287&navigate=yes',
    }
};

const mapEmbedUrl = (address: string) =>
    `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

const googleMapsSearchUrl = (address: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 mt-12"
                >
                    <h1 className="text-4xl font-bold text-tertiary mb-4">Contáctanos</h1>
                    <p className="text-lg text-gray-600">Tenemos dos sedes. Elige la más cercana para escribirnos o visitarnos.</p>
                </motion.div>

                {/* Ambas sucursales, siempre visibles, cada una con su
                    información de contacto y su mapa */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {Object.entries(locations).map(([key, loc], index) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
                        >
                            <div className="p-8">
                                <h2 className="text-2xl font-semibold text-tertiary mb-6">
                                    Sede {loc.name}
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <FaMapMarkerAlt className="text-primary text-xl mt-1 flex-shrink-0" />
                                        <div className="ml-4">
                                            <h3 className="font-medium text-gray-900">Dirección</h3>
                                            <p className="text-gray-600">{loc.address}</p>
                                            <div className="mt-2 space-x-4">
                                                <Link
                                                    href={googleMapsSearchUrl(loc.fullAddress)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:text-primary-dark text-sm"
                                                >
                                                    Google Maps
                                                </Link>
                                                <Link
                                                    href={loc.wazeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:text-primary-dark text-sm"
                                                >
                                                    Waze
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaPhone className="text-primary text-xl mt-1 flex-shrink-0" />
                                        <div className="ml-4">
                                            <h3 className="font-medium text-gray-900">Teléfono</h3>
                                            <Link
                                                href={`https://wa.me/${loc.phone.replace('+', '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-primary"
                                            >
                                                {loc.phone}
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FaEnvelope className="text-primary text-xl mt-1 flex-shrink-0" />
                                        <div className="ml-4">
                                            <h3 className="font-medium text-gray-900">Email</h3>
                                            <Link
                                                href={`mailto:${loc.email}`}
                                                className="text-gray-600 hover:text-primary"
                                            >
                                                {loc.email}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <iframe
                                src={mapEmbedUrl(loc.fullAddress)}
                                width="100%"
                                height="260"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Mapa de ${loc.name}`}
                            ></iframe>
                        </motion.div>
                    ))}
                </div>

                {/* Formulario: la persona elige su sucursal aquí mismo */}
                <ContactForm />
            </div>
        </div>
    );
}
