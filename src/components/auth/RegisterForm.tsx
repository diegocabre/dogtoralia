"use client";

import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { signInWithGoogle } from '@/services/auth';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica de registro
        console.log('Register attempt:', formData);
    };

    const handleGoogleRegister = async () => {
        try {
            await signInWithGoogle();
            router.push('/');
        } catch (error) {
            setError('Error al registrarse con Google');
            console.error('Google register error:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-tertiary mb-2">
                    Crear Cuenta
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                    Regístrate para comenzar a comprar
                </p>
            </div>

            {error && (
                <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}

            {/* Google Register Button */}
            <button
                type="button"
                onClick={handleGoogleRegister}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mb-6"
            >
                <FaGoogle className="text-[#4285F4]" />
                Registrarse con Google
            </button>

            {/* Divider */}
            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">O</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
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

                {/* Phone */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                    </div>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Tu número de teléfono"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    />
                </div>

                {/* Password */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-400" />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Tu contraseña"
                        required
                        minLength={8}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-400" />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirma tu contraseña"
                        required
                        minLength={8}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    />
                </div>

                {/* Terms and conditions */}
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            type="checkbox"
                            required
                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label className="text-gray-600">
                            Acepto los{' '}
                            <Link
                                href="/terms"
                                className="text-primary hover:text-primary-dark transition-colors"
                            >
                                términos y condiciones
                            </Link>
                        </label>
                    </div>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    Crear Cuenta
                </button>

                {/* Login link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                            href="/auth/login"
                            className="text-primary hover:text-primary-dark transition-colors font-medium"
                        >
                            Inicia Sesión
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
} 