import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <div className="relative mx-auto w-64 h-64 mb-8">
                    <Image
                        src="/images/portada.png"
                        alt="Dogtoralia"
                        fill
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-contain rounded-lg"
                        priority
                    />
                </div>
                <p className="text-base font-semibold text-emerald-600">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    ¡Ups! Página no encontrada
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Lo sentimos, parece que esta página se perdió persiguiendo su cola.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        href="/"
                        className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-300"
                    >
                        Volver al inicio
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-semibold text-gray-900 hover:text-emerald-600 transition-all duration-300"
                    >
                        Contactar soporte <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
