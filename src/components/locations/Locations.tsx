"use client";

import { FaClock, FaMapMarkerAlt, FaWaze, FaDirections } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LocationData {
    name: string;
    address: string;
    image: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

const locations: LocationData[] = [
    {
        name: "Sede Puente Alto",
        address: "Av. Concha y Toro 3859",
        image: "/images/puente.jpeg",
        coordinates: {
            lat: -33.5785,
            lng: -70.5785
        }
    },
    {
        name: "Sede Santiago Centro",
        address: "Av. Presidente Balmaceda 2776",
        image: "/images/centro.jpeg",
        coordinates: {
            lat: -33.4369,
            lng: -70.6483
        }
    }
];

export function Locations() {
    const openInGoogleMaps = (location: LocationData) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`;
        window.open(url, '_blank');
    };

    const openInWaze = (location: LocationData) => {
        const url = `https://www.waze.com/ul?ll=${location.coordinates.lat},${location.coordinates.lng}&navigate=yes`;
        window.open(url, '_blank');
    };

    return (
        <section className="py-8 sm:py-12 bg-white">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-12 text-tertiary"
                >
                    Nuestras Sedes
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    {locations.map((location, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ y: -6 }}
                            className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-full aspect-video sm:aspect-[16/10] md:aspect-[16/9] relative rounded-lg overflow-hidden mb-4 group">
                                    <Image
                                        src={location.image}
                                        alt={location.name}
                                        fill
                                        className="object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority
                                    />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-2">{location.name}</h3>
                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                    <FaMapMarkerAlt className="text-primary" />
                                    <p className="text-sm sm:text-base">{location.address}</p>
                                </div>
                                <div className="flex gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => openInGoogleMaps(location)}
                                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary-dark transition-colors"
                                    >
                                        <FaDirections />
                                        <span>Google Maps</span>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => openInWaze(location)}
                                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors"
                                    >
                                        <FaWaze />
                                        <span>Waze</span>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Horarios */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 sm:mt-12 bg-primary text-white rounded-lg p-6 sm:p-8"
                >
                    <div className="flex flex-col items-center">
                        <FaClock className="text-3xl sm:text-4xl mb-3 sm:mb-4" />
                        <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Horarios de Atención</h3>
                        <div className="text-center space-y-2">
                            <p className="text-base sm:text-lg">
                                <span className="font-semibold">Lunes a Viernes:</span> 10:00 - 19:00
                            </p>
                            <p className="text-base sm:text-lg">
                                <span className="font-semibold">Sábados:</span> 10:00 - 17:00
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
