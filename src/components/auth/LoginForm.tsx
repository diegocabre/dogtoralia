"use client";

import { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica de autenticación
        console.log('Login attempt:', formData);
    };

    const handleGoogleLogin = async () => {
        try {
            await signIn('google');
            // NextAuth maneja la redirección automáticamente
        } catch (error) {
            setError('Error al iniciar sesión con Google');
            console.error('Google login error:', error);
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
                    Iniciar Sesión
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                    Ingresa tus credenciales para acceder a tu cuenta
                </p>
            </div>

            {error && (
                <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                    {error}
                </div>
            )}

            {/* Google Login Button */}
            <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mb-6"
            >
                <FaGoogle className="text-[#4285F4]" />
                Continuar con Google
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

                {/* Remember me and Forgot password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                        />
                        <span className="ml-2 text-sm text-gray-600">Recordarme</span>
                    </label>
                    <Link
                        href="/auth/forgot-password"
                        className="text-sm text-primary hover:text-primary-dark transition-colors"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    Iniciar Sesión
                </button>

                {/* Register link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <Link
                            href="/auth/register"
                            className="text-primary hover:text-primary-dark transition-colors font-medium"
                        >
                            Regístrate
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
} 