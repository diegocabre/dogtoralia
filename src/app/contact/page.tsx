"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactForm } from '@/components/contact/ContactForm';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

// mapQuery usa el formato "q=<dirección>&output=embed": no requiere API
// key y es mucho más confiable que los enlaces "pb=..." (esos se generan
// desde el botón "Compartir" de Google Maps para un lugar puntual, y si
// se escriben a mano casi siempre terminan rotos, que era justo lo que
// pasaba antes aquí).
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
    const [selectedLocation, setSelectedLocation] = useState('puenteAlto');
    const currentLocation = locations[selectedLocation as keyof typeof locations];

    const handleLocationChange = (location: string) => {
        setSelectedLocation(location);
    };

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
                    <p className="text-lg text-gray-600">Estamos aquí para ayudarte con cualquier consulta</p>
                </motion.div>

                {/* Location Selector */}
                <div className="flex justify-center gap-4 mb-8">
                    {Object.entries(locations).map(([key, loc]) => (
                        <motion.button
                            key={key}
                            onClick={() => handleLocationChange(key)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-lg transition-colors ${selectedLocation === key
                                ? 'bg-primary text-white shadow-md shadow-primary/30'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {loc.name}
                        </motion.button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedLocation}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg shadow-lg p-8"
                        >
                            <h2 className="text-2xl font-semibold text-tertiary mb-6">Información de Contacto</h2>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <FaMapMarkerAlt className="text-primary text-xl mt-1" />
                                    <div className="ml-4">
                                        <h3 className="font-medium text-gray-900">Dirección</h3>
                                        <p className="text-gray-600">{currentLocation.address}</p>
                                        <div className="mt-2 space-x-4">
                                            <Link
                                                href={googleMapsSearchUrl(currentLocation.fullAddress)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:text-primary-dark text-sm"
                                            >
                                                Google Maps
                                            </Link>
                                            <Link
                                                href={currentLocation.wazeUrl}
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
                                    <FaPhone className="text-primary text-xl mt-1" />
                                    <div className="ml-4">
                                        <h3 className="font-medium text-gray-900">Teléfono</h3>
                                        <Link
                                            href={`https://wa.me/${currentLocation.phone.replace('+', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-primary"
                                        >
                                            {currentLocation.phone}
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FaEnvelope className="text-primary text-xl mt-1" />
                                    <div className="ml-4">
                                        <h3 className="font-medium text-gray-900">Email</h3>
                                        <Link
                                            href={`mailto:${currentLocation.email}`}
                                            className="text-gray-600 hover:text-primary"
                                        >
                                            {currentLocation.email}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Mapas: ambas sucursales siempre visibles, sin
                        depender de la pestaña seleccionada */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col divide-y divide-gray-100"
                    >
                        {Object.entries(locations).map(([key, loc]) => (
                            <div key={key} className="flex-1 flex flex-col min-h-[240px]">
                                <div className={`px-4 py-2 text-sm font-medium ${selectedLocation === key
                                    ? 'bg-primary/10 text-primary'
                                    : 'bg-gray-50 text-gray-600'
                                    }`}>
                                    {loc.name}
                                </div>
                                <iframe
                                    src={mapEmbedUrl(loc.fullAddress)}
                                    width="100%"
                                    height="100%"
                                    style={{ minHeight: '220px', border: 0, flex: 1 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`Mapa de ${loc.name}`}
                                ></iframe>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Contact Form */}
                <div className="mt-12">
                    <ContactForm selectedLocation={currentLocation.name} />
                </div>
            </div>
        </div>
    );
}
