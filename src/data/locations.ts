export interface HoursBlock {
  label: string;
  /** Días en inglés, como los pide schema.org y como los entrega Intl */
  days: string[];
  opens: string;
  closes: string;
}

export interface Location {
  name: string;
  /** Nombre para frases ("Puente Alto", "el Centro") */
  shortName: string;
  /** Comuna, para los datos estructurados de SEO */
  locality: string;
  address: string;
  fullAddress: string;
  phone: string;
  email: string;
  image: string;
  /** Horario de la sede en hora de Chile. Domingo cerrado en ambas. */
  hours: HoursBlock[];
  /**
   * ID de la ficha de Google (empieza con "ChIJ..."). Con él los botones de
   * reseñas abren directo la ficha o el formulario de reseña; sin él se usa
   * la búsqueda de Google Maps por dirección.
   */
  googlePlaceId?: string;
}

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Única fuente de datos de las sedes: la usan la página de contacto, el
// footer, la sección "Nuestras Sedes" y el envío del formulario de contacto.
export const locations = {
  puenteAlto: {
    name: "Puente Alto",
    shortName: "Puente Alto",
    locality: "Puente Alto",
    address: "Av. Concha y Toro 3859",
    fullAddress: "Av. Concha y Toro 3859, Puente Alto, Región Metropolitana, Chile",
    phone: "+56957830195",
    email: "dogtoralia.cl@gmail.com",
    image: "/images/puentealto1.jpeg",
    hours: [
      { label: "Lunes a Viernes", days: WEEKDAYS, opens: "10:00", closes: "18:00" },
      { label: "Sábados", days: ["Saturday"], opens: "10:00", closes: "16:00" },
    ],
  },
  santiagoCentro: {
    name: "Santiago Centro",
    shortName: "el Centro",
    locality: "Santiago",
    address: "Av. Presidente Balmaceda 2776",
    fullAddress: "Av. Presidente Balmaceda 2776, Santiago, Región Metropolitana, Chile",
    phone: "+56927492520",
    email: "dogtoraliavet@gmail.com",
    image: "/images/centro.jpeg",
    hours: [
      { label: "Lunes a Viernes", days: WEEKDAYS, opens: "10:00", closes: "18:30" },
      { label: "Sábados", days: ["Saturday"], opens: "10:00", closes: "16:30" },
    ],
  },
} satisfies Record<string, Location>;

export const locationList: Location[] = Object.values(locations);

// Los enlaces de mapa se generan desde la dirección (no desde coordenadas
// escritas a mano), así una dirección corregida aquí se corrige en todas
// partes.
export const googleMapsEmbedUrl = (address: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

export const googleMapsSearchUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

// Reseñas de Google: con place ID abre la ficha (o el formulario para dejar
// una reseña); sin él cae a la búsqueda por dirección, que muestra la ficha.
export const googleReviewsUrl = (location: Location) =>
  location.googlePlaceId
    ? `https://search.google.com/local/reviews?placeid=${location.googlePlaceId}`
    : googleMapsSearchUrl(location.fullAddress);

export const googleWriteReviewUrl = (location: Location) =>
  location.googlePlaceId
    ? `https://search.google.com/local/writereview?placeid=${location.googlePlaceId}`
    : googleMapsSearchUrl(location.fullAddress);

export const wazeUrl =(address: string) =>
  `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;

export const whatsappUrl = (phone: string, message?: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

/** "+56957830195" -> "+56 9 5783 0195", más fácil de leer y dictar. */
export const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  const match = digits.match(/^56(9)(\d{4})(\d{4})$/);
  return match ? `+56 ${match[1]} ${match[2]} ${match[3]}` : phone;
};

// Mensaje con que se abre el WhatsApp de una sede al agendar.
export const agendarMensaje = (location: Location) =>
  `Hola! Quiero agendar una hora en la sede ${location.name}.`;

// Número al que llegan las consultas de productos y servicios por WhatsApp.
export const MAIN_WHATSAPP_PHONE = locations.puenteAlto.phone;
