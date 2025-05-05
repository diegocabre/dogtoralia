"use client";

import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaComment } from 'react-icons/fa';

interface ContactFormProps {
    selectedLocation: string;
}

export function ContactForm({ selectedLocation }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        location: selectedLocation
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    location: selectedLocation
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar el mensaje');
            }

            setSubmitStatus({
                type: 'success',
                message: '¡Gracias por contactarnos! Te responderemos pronto.'
            });
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: '',
                location: selectedLocation
            });
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-8 sm:py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-tertiary mb-4">
                            Contáctanos
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Nombre */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                    />
                                </div>

                                {/* Email */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Tu correo electrónico"
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                    />
                                </div>

                                {/* Teléfono */}
                                <div className="relative sm:col-span-2">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaPhone className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Tu número de teléfono"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                                    />
                                </div>

                                {/* Mensaje */}
                                <div className="relative sm:col-span-2">
                                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                        <FaComment className="text-gray-400" />
                                    </div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tu mensaje"
                                        required
                                        rows={4}
                                        suppressHydrationWarning
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                                    />
                                </div>

                                {/* Sucursal */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sucursal seleccionada
                                    </label>
                                    <input
                                        type="text"
                                        value={selectedLocation}
                                        readOnly
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                                    />
                                </div>
                            </div>

                            {/* Estado del envío */}
                            {submitStatus.type && (
                                <div className={`p-4 rounded-lg ${submitStatus.type === 'success'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                    }`}>
                                    {submitStatus.message}
                                </div>
                            )}

                            {/* Botón de envío */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-lg font-medium transition-all duration-300 ${isSubmitting
                                        ? 'opacity-70 cursor-not-allowed'
                                        : 'hover:bg-primary-dark hover:shadow-lg'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enviando...
                                        </span>
                                    ) : (
                                        'Enviar Mensaje'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
} 