export interface ServiceItem {
  title: string;
  text: string;
}

export interface ServiceData {
  /** Identificador estable; la página de servicios lo usa para elegir el ícono */
  slug: string;
  title: string;
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
    description: "Revisamos a tu mascota, te explicamos qué tiene y cómo tratarla. En Puente Alto te atiende la Dra. Sara y en Santiago Centro, el Dr. Gabriel.",
  },
  {
    slug: "vacunas",
    title: "Vacunas",
    description: "Las vacunas esenciales, en cada etapa de su vida. Pide hora en la sede que te quede más cerca.",
  },
  {
    slug: "examenes",
    title: "Exámenes",
    description: "Exámenes clínicos y de laboratorio, para saber bien qué tiene y seguir cómo evoluciona.",
  },
  {
    slug: "procedimientos",
    title: "Procedimientos",
    description: "Procedimientos menores y mayores, cirugías incluidas.",
  },
  {
    slug: "otros",
    title: "Otros servicios",
    description: "Cuando hace falta mirar más a fondo, también hacemos evaluaciones de especialidad.",
    items: [
      { title: "Cardiología", text: "Evaluación del corazón de tu mascota." },
      { title: "Oftalmología", text: "Evaluación y tratamiento de los ojos." },
      { title: "Ecografía abdominal", text: "Para ver sus órganos por dentro, sin intervenir." },
    ],
  },
  {
    slug: "peluqueria",
    title: "Peluquería Canina y Felina",
    description: "Corte, baño y baño medicado para perros y gatos, en las dos sedes. Para que salga oliendo a limpio y sin estrés.",
    items: [
      { title: "Corte y baño", text: "Corte y baño completo, para perros y gatos." },
      { title: "Baño medicado", text: "Para problemas de piel, cuando lo indica la Dra. Sara o el Dr. Gabriel." },
    ],
  },
];
