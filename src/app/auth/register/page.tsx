import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-extrabold text-tertiary">
                    Veterinaria Ecommerce
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Crea tu cuenta para comenzar a comprar
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
} 