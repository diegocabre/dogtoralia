import Image from 'next/image';

const services = [
    {
        title: 'Consultas',
        image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
        description: 'Atención veterinaria personalizada para el diagnóstico y tratamiento de tu mascota. ¡Tu tranquilidad y la salud de tu compañero son nuestra prioridad!'
    },
    {
        title: 'Vacunas',
        image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=600&q=80',
        description: 'Aplicación de vacunas esenciales para prevenir enfermedades y proteger a tu mascota durante todas las etapas de su vida.'
    },
    {
        title: 'Exámenes',
        image: '/images/services/examenes.jpg',
        description: 'Exámenes clínicos y de laboratorio para un diagnóstico preciso y un seguimiento completo de la salud de tu mascota.'
    },
    {
        title: 'Procedimientos',
        image: '/images/services/procedimientos.jpg',
        description: 'Procedimientos veterinarios menores y mayores realizados con profesionalismo y cuidado, asegurando el bienestar de tu mascota.'
    },
    {
        title: 'Peluquería Canina y Felina',
        image: '/images/services/peluqueria.jpg',
        description: `Servicios de estética y cuidado para perros y gatos, realizados por expertos en bienestar animal. Ofrecemos:
• Corte y baño: Higiene y estilo para tu mascota, con productos de calidad y atención personalizada.
• Baño medicado: Baños especiales para tratar problemas dermatológicos, recomendados por nuestros veterinarios.`
    }
];

const fallbackImage = '/images/no-image.png';

export default function ServicePage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-tertiary mb-4 mt-12">Nuestros Servicios</h1>
                    <p className="text-lg text-gray-600">Cuidamos a tu mascota en cada etapa de su vida</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.title} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100 min-h-[420px]">
                            <div className="relative w-full aspect-[3/2] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <Image
                                    src={service.image || fallbackImage}
                                    alt={service.title}
                                    fill
                                    className="object-cover rounded-t-2xl"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={false}
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-start p-5">
                                <h2 className="text-xl font-bold text-primary mb-2 text-center">{service.title}</h2>
                                <p className="text-gray-700 text-center whitespace-pre-line leading-relaxed">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}