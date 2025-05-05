"use client";

import { useState } from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

const locations = {
    puenteAlto: {
        name: 'Puente Alto',
        address: 'Av. Concha y Toro 3859',
        phone: '+56957830195',
        email: 'dogtoralia.cl@gmail.com',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.0982772772772!2d-70.58159492427287!3d-33.58944497333844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a7b5f5f5f5%3A0x7e8a12b3f4f7f0a0!2sAv.%20Concha%20y%20Toro%203859%2C%20Puente%20Alto%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1647886421234!5m2!1ses!2scl',
        wazeUrl: 'https://www.waze.com/ul?ll=-33.58944497333844,-70.58159492427287&navigate=yes',
        googleMapsUrl: 'https://goo.gl/maps/1234567890'
    },
    santiagoCentro: {
        name: 'Santiago Centro',
        address: 'Av. Presidente Balmaceda 2776',
        phone: '+56927492520',
        email: 'dogtoraliavet@gmail.com',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.0982772772772!2d-70.67159492427287!3d-33.43944497333844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a7b5f5f5f5%3A0x7e8a12b3f4f7f0a0!2sAv.%20Presidente%20Balmaceda%202776%2C%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1647886421234!5m2!1ses!2scl',
        wazeUrl: 'https://www.waze.com/ul?ll=-33.43944497333844,-70.67159492427287&navigate=yes',
        googleMapsUrl: 'https://goo.gl/maps/0987654321'
    }
};

export default function ContactPage() {
    const [selectedLocation, setSelectedLocation] = useState('puenteAlto');
    const currentLocation = locations[selectedLocation as keyof typeof locations];

    const handleLocationChange = (location: string) => {
        setSelectedLocation(location);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 mt-12">
                    <h1 className="text-4xl font-bold text-tertiary mb-4">Contáctanos</h1>
                    <p className="text-lg text-gray-600">Estamos aquí para ayudarte con cualquier consulta</p>
                </div>

                {/* Location Selector */}
                <div className="flex justify-center gap-4 mb-8">
                    {Object.entries(locations).map(([key, loc]) => (
                        <button
                            key={key}
                            onClick={() => handleLocationChange(key)}
                            className={`px-6 py-3 rounded-lg transition-colors ${selectedLocation === key
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {loc.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-tertiary mb-6">Información de Contacto</h2>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <FaMapMarkerAlt className="text-primary text-xl mt-1" />
                                <div className="ml-4">
                                    <h3 className="font-medium text-gray-900">Dirección</h3>
                                    <p className="text-gray-600">{currentLocation.address}</p>
                                    <div className="mt-2 space-x-4">
                                        <Link
                                            href={currentLocation.googleMapsUrl}
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
                    </div>

                    {/* Map */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <iframe
                            src={currentLocation.mapUrl}
                            width="100%"
                            height="100%"
                            style={{ minHeight: '400px', border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="mt-12">
                    <ContactForm selectedLocation={currentLocation.name} />
                </div>
            </div>
        </div>
    );
}