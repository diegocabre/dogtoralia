"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { PiCheckBold, PiCircleNotchBold, PiPaperPlaneTiltBold } from 'react-icons/pi';
import { contactSchema } from '@/lib/security/validation';

const LOCATION_OPTIONS = ['Puente Alto', 'Santiago Centro'] as const;

const MESSAGE_MAX_LENGTH = 2000;

// Site Key pública del widget "dogtoralia"; en desarrollo, la clave de prueba de Cloudflare que siempre pasa
const TURNSTILE_SITE_KEY =
    process.env.NODE_ENV === 'production' ? '0x4AAAAAAFl_tCUmiDEFsz0b' : '1x00000000000000000000AA';

declare global {
    interface Window {
        turnstile?: {
            render: (el: HTMLElement, options: Record<string, unknown>) => string;
            reset: (widgetId: string) => void;
            remove: (widgetId: string) => void;
        };
    }
}

const inputBase =
    'w-full min-h-12 rounded-[8px] border-[3px] bg-white px-3.5 py-2.5 text-base text-grafito placeholder:text-grafito-suave/70';
const inputClass = (hasError: boolean) =>
    `${inputBase} ${hasError ? 'border-error' : 'border-grafito'}`;

/** Etiqueta encima del campo y error debajo, enlazados para lectores de pantalla. */
function Field({
    id,
    label,
    hint,
    error,
    className = '',
    children,
}: {
    id: string;
    label: string;
    hint?: string;
    error?: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={className}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-grafito">
                {label}
                {hint && <span className="font-normal text-grafito-suave"> {hint}</span>}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} className="mt-1.5 text-sm font-semibold text-error">
                    {error}
                </p>
            )}
        </div>
    );
}

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        location: ''
    });

    // Anti-bot: campo trampa invisible y momento en que se cargó el formulario
    const [website, setWebsite] = useState('');
    const loadedAt = useRef(0);
    useEffect(() => {
        loadedAt.current = Date.now();
    }, []);

    // Turnstile (Cloudflare): se renderiza a mano para que funcione también al navegar sin recargar
    const turnstileRef = useRef<HTMLDivElement>(null);
    const turnstileId = useRef<string | null>(null);
    const [turnstileToken, setTurnstileToken] = useState('');

    const renderTurnstile = useCallback(() => {
        if (!window.turnstile || !turnstileRef.current || turnstileId.current) return;
        turnstileId.current = window.turnstile.render(turnstileRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            language: 'es',
            callback: (token: string) => setTurnstileToken(token),
            'expired-callback': () => setTurnstileToken(''),
            'error-callback': () => setTurnstileToken(''),
        });
    }, []);

    useEffect(() => {
        renderTurnstile();
        return () => {
            if (turnstileId.current) window.turnstile?.remove(turnstileId.current);
            turnstileId.current = null;
        };
    }, [renderTurnstile]);

    // El token es de un solo uso: tras cada intento se pide uno nuevo
    const resetTurnstile = () => {
        setTurnstileToken('');
        if (turnstileId.current) window.turnstile?.reset(turnstileId.current);
    };

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
        const parsed = contactSchema.safeParse(formData);

        // Se muestran todos los errores de una vez, incluido el consentimiento.
        setConsentError(!consentAccepted);

        if (!parsed.success) {
            const errors: Record<string, string> = {};
            for (const issue of parsed.error.issues) {
                const field = issue.path[0] as string;
                if (!errors[field]) errors[field] = issue.message;
            }
            setFieldErrors(errors);
            return;
        }

        if (!consentAccepted) return;

        if (!turnstileToken) {
            setSubmitStatus({
                type: 'error',
                message: 'Espera un momento a que termine la verificación anti-bots e inténtalo de nuevo.',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...parsed.data,
                    website,
                    elapsedMs: Date.now() - loadedAt.current,
                    turnstileToken,
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
                location: ''
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
            resetTurnstile();
        }
    };

    const describedBy = (field: string) => (fieldErrors[field] ? `${field}-error` : undefined);

    return (
        <section aria-labelledby="formulario-titulo" className="mt-12 sm:mt-16">
            <h2 id="formulario-titulo" className="rotulo px-1 text-[clamp(2rem,4.5vw,3.25rem)] text-grafito">
                ¿Prefieres un correo?
            </h2>
            <p className="mt-3 max-w-[56ch] px-1 text-base leading-relaxed text-grafito-suave sm:text-lg">
                Llega al correo de la sede que elijas y te respondemos ahí.
            </p>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-6 grid gap-5 rounded-md bg-white px-5 py-7 sm:grid-cols-2 sm:px-9 sm:py-9"
            >
                {/* Honeypot: invisible para personas y lectores de pantalla; los bots lo llenan */}
                <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="website">Sitio web</label>
                    <input
                        id="website"
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>

                <Field id="name" label="Nombre" error={fieldErrors.name}>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={100}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={describedBy('name')}
                        className={inputClass(Boolean(fieldErrors.name))}
                    />
                </Field>

                <Field id="email" label="Correo" error={fieldErrors.email}>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={200}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={describedBy('email')}
                        className={inputClass(Boolean(fieldErrors.email))}
                    />
                </Field>

                <Field id="phone" label="Teléfono" hint="(opcional)" error={fieldErrors.phone} className="sm:col-span-2">
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={30}
                        aria-invalid={Boolean(fieldErrors.phone)}
                        aria-describedby={describedBy('phone')}
                        className={inputClass(Boolean(fieldErrors.phone))}
                    />
                </Field>

                <div className="sm:col-span-2">
                    <Field id="message" label="Mensaje" hint="(mínimo 10 caracteres)" error={fieldErrors.message}>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            maxLength={MESSAGE_MAX_LENGTH}
                            suppressHydrationWarning
                            aria-invalid={Boolean(fieldErrors.message)}
                            aria-describedby={describedBy('message')}
                            className={`${inputClass(Boolean(fieldErrors.message))} resize-y`}
                        />
                    </Field>
                    <p className="mt-1 text-right text-xs tabular-nums text-grafito-suave">
                        {formData.message.length}/{MESSAGE_MAX_LENGTH}
                    </p>
                </div>

                <Field id="location" label="Sede" error={fieldErrors.location} className="sm:col-span-2">
                    <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.location)}
                        aria-describedby={describedBy('location')}
                        className={inputClass(Boolean(fieldErrors.location))}
                    >
                        <option value="">Elige una sede</option>
                        {LOCATION_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </Field>

                {/* Consentimiento de datos personales */}
                <div className="sm:col-span-2">
                    <div className="flex items-start gap-3">
                        <span className="relative mt-0.5 flex h-6 w-6 flex-shrink-0">
                        <input
                            type="checkbox"
                            id="consent"
                            checked={consentAccepted}
                            onChange={(e) => {
                                setConsentAccepted(e.target.checked);
                                if (e.target.checked) setConsentError(false);
                            }}
                            aria-invalid={consentError}
                            aria-describedby={consentError ? 'consent-error' : undefined}
                            className={`peer h-6 w-6 cursor-pointer appearance-none rounded-[5px] border-[3px] bg-white checked:bg-grafito ${
                                consentError ? 'border-error' : 'border-grafito'
                            }`}
                        />
                        <PiCheckBold
                            aria-hidden
                            className="pointer-events-none absolute inset-0 m-auto hidden text-sm text-white peer-checked:block"
                        />
                        {/* Amplía el área táctil de la casilla a 44px sin agrandarla */}
                        <label htmlFor="consent" aria-hidden className="absolute -inset-2.5 cursor-pointer" />
                        </span>
                        <label htmlFor="consent" className="text-sm leading-relaxed text-grafito">
                            He leído y acepto la{' '}
                            <a
                                href="/privacidad"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold underline underline-offset-4 hover:text-vinilo-azul"
                            >
                                Política de Privacidad
                            </a>{' '}
                            y autorizo el uso de mis datos para responder esta consulta.
                        </label>
                    </div>
                    {consentError && (
                        <p id="consent-error" className="mt-1.5 text-sm font-semibold text-error">
                            Debes aceptar la Política de Privacidad para enviar el mensaje.
                        </p>
                    )}
                </div>

                <Script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                    onReady={renderTurnstile}
                />
                <div ref={turnstileRef} className="min-h-[65px] sm:col-span-2" />

                {/* Estado del envío */}
                {submitStatus.type && (
                    <div
                        role={submitStatus.type === 'error' ? 'alert' : 'status'}
                        className={`rounded-[3px] px-4 py-3 text-base font-semibold sm:col-span-2 ${
                            submitStatus.type === 'success'
                                ? 'bg-vinilo-verde text-white'
                                : 'bg-error-suave text-error'
                        }`}
                    >
                        {submitStatus.message}
                    </div>
                )}

                <div className="sm:col-span-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="presionable inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-[10px] border-[3px] border-grafito bg-grafito py-1.5 pl-5 pr-1.5 text-white shadow-letrero disabled:cursor-wait disabled:opacity-80 sm:w-auto"
                    >
                        <span className="rotulo text-lg">{isSubmitting ? 'Enviando…' : 'Enviar mensaje'}</span>
                        <span
                            aria-hidden
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-grafito"
                        >
                            {isSubmitting ? (
                                <PiCircleNotchBold className="animate-spin motion-reduce:animate-none" />
                            ) : (
                                <PiPaperPlaneTiltBold />
                            )}
                        </span>
                    </button>
                </div>
            </form>
        </section>
    );
}
