export type ReviewLocation = "Puente Alto" | "Santiago Centro";

export interface Review {
  /** Nombre tal como aparece en Google (puede ser solo nombre y apellido inicial) */
  author: string;
  /** Estrellas, de 1 a 5 */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Texto de la reseña, copiado de Google sin modificar */
  text: string;
  /** Sede a la que corresponde la reseña */
  location?: ReviewLocation;
  /** Cuándo se escribió, ej. "marzo 2026". Google muestra fechas relativas ("hace un mes"), que envejecen mal en una página fija. */
  date?: string;
}

/**
 * Cantidad de reseñas de cada ficha de Google. Se muestra como "Más de 240
 * reseñas en Google" (suma de las dos sedes, redondeada hacia abajo a la
 * decena para que no quede desactualizada enseguida). Actualízala de vez en
 * cuando mirando las fichas en Google Maps.
 */
export const googleReviewCounts: Record<ReviewLocation, number> = {
  "Puente Alto": 151,
  "Santiago Centro": 94,
};

/**
 * Calificación promedio real de las fichas de Google. Puente Alto y Santiago
 * Centro tienen 4,9 cada una, así que el promedio de ambas también es 4,9.
 * Si una cambia, actualiza este valor. No la calcules con las reseñas de
 * abajo: son solo una selección. Con `null` se muestra solo el total.
 */
export const googleRating: number | null = 4.9;

// Reseñas destacadas, copiadas de las fichas de Google tal cual están
// escritas (con sus errores de tipeo). Se intercalan las sedes para que cada
// fila de la página muestre las dos. Mientras esta lista esté vacía, la
// sección no se muestra.
export const reviews: Review[] = [
  {
    author: "marielena pinto",
    rating: 5,
    location: "Puente Alto",
    text: "Agradecida enormemente con la atención. Visitamos a esta veterinaria solo por vacunas y decidimos esterilizarla acá por la confianza que nos dio. Todo el proceso fue excelente desde el agendamiento hasta la quitada de puntos. Siempre atentos a cualquier duda, a cualquier inquietud, con una paciencia enorme. Mi perrita Cookie es demasiado ansiosa el cual nos preocupó cierta actitudes que tenía pero ellos siempre fueron pacientes y empaticos. Muchas gracias a la Doctora Sara y a La recepcionista. Excelente atención, los recomendamos al 100%",
  },
  {
    author: "Eliseo Henriquez Henriquez",
    rating: 5,
    location: "Santiago Centro",
    text: "Es un buen lugar con las 3B para atender a las mascotas, criterio ante todo para atenderlas y eso es lo que valoro del doc Gabriel",
  },
  {
    author: "Daniela Jara",
    rating: 5,
    location: "Puente Alto",
    text: "Siempre son muy amables con su atención y tratan con mucho cariño a nuestros gatitos. La Fifi y el Newen siempre salen conformes , nunca se han estresado con la toma de exámenes ni nada parecido. Lugar realmente confiable y recomendable",
  },
  {
    author: "Adriana Pascuzzo",
    rating: 5,
    location: "Santiago Centro",
    text: "Los SÚPER RECOMIENDO!!! inicialmente llegamos a ellos por una recomendación de una amiga veterinaria en donde operaron a mi perrita que adoptamos y que no sabíamos que tenía displasia de cadera, luego nos apareció un gatito que estaba muy mal y lo llevamos para que lo pudieran evaluar y además bañar porque era de la calle y olía muy mal. Ambos, tanto Lucky (la perrita) como papucho (el gatito recién adoptado) lo trataron super bien y se están recuperando. A pesar de que somos de san Miguel, preferimos traerlos hasta acá ya que la atención es excelente.",
  },
  {
    author: "Andrea yheraldine Castiblanco pachon",
    rating: 5,
    location: "Puente Alto",
    text: "Chikillos excelente veterinaria personas que le ponen el alma a nuestros peludos los felicito deverdad lel día de hoy llegue con una perrita que avían estrellado aún no siendo mía en ningún otro lado me atendieron solo ellas q aún que estaban cerrando abrieron de nuevo contal de ayudarmen y poder calmar el dolor de aquel angel peludo los recomiendo y les agradezco por tan linda vocación con nuestros hijos peludos dios los bendiga",
  },
  {
    author: "roxana silva",
    rating: 5,
    location: "Santiago Centro",
    text: "Llegué a esta veterinaria destrozada después de un tour por un montón de veterinarias con mi perrita luego de unos diagnósticos poco claros y fatalistas, acá nos atendió el Doctor Gabriel que fue muy claro y empático con la situación, les agradezco inmensamente el cariño con que trataron a mi anciana, la diligencia y la preocupación aún después de su cirugía, a la Niña de la recepción por su proactividad y amabilidad, los recomiendo de todas maneras! Sigan así!  Mil gracias!",
  },
];
