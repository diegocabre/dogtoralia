export interface ServiceItem {
  title: string;
  text: string;
}

export interface ServiceData {
  /** Identificador estable; la página de servicios lo usa para elegir el ícono */
  slug: string;
  title: string;
  image: string;
  description: string;
  /** Puntos destacados que se muestran en lista (opcional) */
  items?: ServiceItem[];
}

// Única fuente de datos de los servicios: la usan la página de servicios y
// los datos estructurados (JSON-LD) que leen los buscadores.
export const services: ServiceData[] = [
  {
    slug: "consultas",
    title: "Consultas",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80",
    description: "Atención veterinaria personalizada para el diagnóstico y tratamiento de tu mascota. ¡Tu tranquilidad y la salud de tu compañero son nuestra prioridad!",
  },
  {
    slug: "vacunas",
    title: "Vacunas",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=80",
    description: "Aplicación de vacunas esenciales para prevenir enfermedades y proteger a tu mascota durante todas las etapas de su vida.",
  },
  {
    slug: "examenes",
    title: "Exámenes",
    image: "/images/services/examenes.jpg",
    description: "Exámenes clínicos y de laboratorio para un diagnóstico preciso y un seguimiento completo de la salud de tu mascota.",
  },
  {
    slug: "procedimientos",
    title: "Procedimientos",
    image: "/images/services/procedimientos.jpg",
    description: "Procedimientos veterinarios menores y mayores realizados con profesionalismo y cuidado, asegurando el bienestar de tu mascota.",
  },
  {
    slug: "peluqueria",
    title: "Peluquería Canina y Felina",
    image: "/images/services/peluqueria.jpg",
    description: "Servicios de estética y cuidado para perros y gatos, realizados por expertos en bienestar animal.",
    items: [
      { title: "Corte y baño", text: "Higiene y estilo para tu mascota, con productos de calidad y atención personalizada." },
      { title: "Baño medicado", text: "Baños especiales para tratar problemas dermatológicos, recomendados por nuestros veterinarios." },
    ],
  },
];
