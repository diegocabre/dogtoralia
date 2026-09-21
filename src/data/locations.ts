export interface Location {
  name: string;
  address: string;
  fullAddress: string;
  phone: string;
  email: string;
  image: string;
}

// Única fuente de datos de las sedes: la usan la página de contacto, el
// footer, la sección "Nuestras Sedes" y el envío del formulario de contacto.
export const locations = {
  puenteAlto: {
    name: "Puente Alto",
    address: "Av. Concha y Toro 3859",
    fullAddress: "Av. Concha y Toro 3859, Puente Alto, Región Metropolitana, Chile",
    phone: "+56957830195",
    email: "dogtoralia.cl@gmail.com",
    image: "/images/puente.jpeg",
  },
  santiagoCentro: {
    name: "Santiago Centro",
    address: "Av. Presidente Balmaceda 2776",
    fullAddress: "Av. Presidente Balmaceda 2776, Santiago, Región Metropolitana, Chile",
    phone: "+56927492520",
    email: "dogtoraliavet@gmail.com",
    image: "/images/centro.jpeg",
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

export const wazeUrl = (address: string) =>
  `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;

export const whatsappUrl = (phone: string, message?: string) =>
  `https://wa.me/${phone.replace(/\D/g, "")}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

// Número al que llegan las consultas de productos y servicios por WhatsApp.
export const MAIN_WHATSAPP_PHONE = locations.puenteAlto.phone;
