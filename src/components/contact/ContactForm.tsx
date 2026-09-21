"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaComment } from 'react-icons/fa';
import { contactSchema } from '@/lib/security/validation';

interface ContactFormProps {
    selectedLocation: string;
}

const MESSAGE_MAX_LENGTH = 2000;

export function ContactForm({ selectedLocation }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        location: selectedLocation
    });

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [consentAccepted, setConsentAccepted] = useState(false);
    const [consentError, setConsentError] = useState(false);
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
        // Limpia el error del campo apenas la persona empieza a corregirlo
        if (fieldErrors[name]) {
            setFieldErrors((prev) => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus({ type: null, message: '' });

        // Validación en el cliente: mismas reglas que el servidor
        // (src/lib/security/validation.ts), para dar feedback inmediato.
        // La validación que realmente protege es la del servidor — esta
        // es solo para mejor experiencia de usuario.
        const parsed = contactSchema.safeParse({
            ...formData,
            location: selectedLocation,
        });

        if (!parsed.success) {
            const errors: Record<string, string> = {};
            for (const issue of parsed.error.issues) {
                const field = issue.path[0] as string;
                if (!errors[field]) errors[field] = issue.message;
            }
            setFieldErrors(errors);
            return;
        }

        if (!consentAccepted) {
            setConsentError(true);
            return;
        }
        setConsentError(false);

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsed.data),
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
            setConsentAccepted(false);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setSubmitStatus({
                type: 'error',
                message: error instanceof Error ? error.message : 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-8 sm:py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8 sm:mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl font-semibold text-tertiary mb-4">
                            Contáctanos
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
                    >
                        <form onSubmit={handleSubmit} noValidate className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Nombre */}
                                <div>
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
                                            maxLength={100}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${fieldErrors.name ? 'border-red-400' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {fieldErrors.name && (
                                        <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
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
                                            maxLength={200}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${fieldErrors.email ? 'border-red-400' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {fieldErrors.email && (
                                        <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
                                    )}
                                </div>

                                {/* Teléfono */}
                                <div className="sm:col-span-2">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaPhone className="text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Tu número de teléfono (opcional)"
                                            maxLength={30}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${fieldErrors.phone ? 'border-red-400' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    {fieldErrors.phone && (
                                        <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
                                    )}
                                </div>

                                {/* Mensaje */}
                                <div className="sm:col-span-2">
                                    <div className="relative">
                                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                            <FaComment className="text-gray-400" />
                                        </div>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tu mensaje (mínimo 10 caracteres)"
                                            rows={4}
                                            maxLength={MESSAGE_MAX_LENGTH}
                                            suppressHydrationWarning
                                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none ${fieldErrors.message ? 'border-red-400' : 'border-gray-300'
                                                }`}
                                        />
                                    </div>
                                    <div className="mt-1 flex justify-between">
                                        {fieldErrors.message ? (
                                            <p className="text-xs text-red-600">{fieldErrors.message}</p>
                                        ) : <span />}
                                        <p className="text-xs text-gray-400">
                                            {formData.message.length}/{MESSAGE_MAX_LENGTH}
                                        </p>
                                    </div>
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

                            {/* Consentimiento de datos personales */}
                            <div>
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        checked={consentAccepted}
                                        onChange={(e) => {
                                            setConsentAccepted(e.target.checked);
                                            if (e.target.checked) setConsentError(false);
                                        }}
                                        className={`mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary ${consentError ? 'ring-2 ring-red-400' : ''
                                            }`}
                                    />
                                    <label htmlFor="consent" className="text-sm text-gray-600">
                                        He leído y acepto la{' '}
                                        <a
                                            href="/privacidad"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            Política de Privacidad
                                        </a>{' '}
                                        y autorizo el uso de mis datos para responder esta consulta.
                                    </label>
                                </div>
                                {consentError && (
                                    <p className="mt-1 text-xs text-red-600">
                                        Debes aceptar la Política de Privacidad para enviar el mensaje.
                                    </p>
                                )}
                            </div>

                            {/* Estado del envío */}
                            <AnimatePresence>
                                {submitStatus.type && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`p-4 rounded-lg overflow-hidden ${submitStatus.type === 'success'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {submitStatus.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Botón de envío */}
                            <div className="flex justify-center">
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.97 } : {}}
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
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
