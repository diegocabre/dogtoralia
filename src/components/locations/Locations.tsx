"use client";

import { FaClock, FaMapMarkerAlt, FaWaze, FaDirections } from 'react-icons/fa';
import Image from 'next/image';

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
                <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-12 text-tertiary">
                    Nuestras Sedes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    {locations.map((location, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow-lg transform transition-transform duration-300 hover:scale-102">
                            <div className="flex flex-col items-center">
                                <div className="w-full aspect-video sm:aspect-[16/10] md:aspect-[16/9] relative rounded-lg overflow-hidden mb-4">
                                    <Image
                                        src={location.image}
                                        alt={location.name}
                                        fill
                                        className="object-cover object-[center_30%] hover:scale-105 transition-transform duration-300"
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
                                    <button
                                        onClick={() => openInGoogleMaps(location)}
                                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary-dark transition-colors"
                                    >
                                        <FaDirections />
                                        <span>Google Maps</span>
                                    </button>
                                    <button
                                        onClick={() => openInWaze(location)}
                                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors"
                                    >
                                        <FaWaze />
                                        <span>Waze</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Horarios */}
                <div className="mt-8 sm:mt-12 bg-primary text-white rounded-lg p-6 sm:p-8">
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
                </div>
            </div>
        </section>
    );
} 