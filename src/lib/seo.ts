import type { Metadata } from "next";
import {
  locations,
  googleMapsSearchUrl,
} from "@/data/locations";
import { services } from "@/data/services";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SOCIAL_LINKS,
  LOGO_PATH,
  OG_IMAGE,
  businessHours,
  absoluteUrl,
} from "@/data/site";

interface PageMetadataOptions {
  /** Título corto de la página; el layout le agrega " | Dogtoralia Vet" */
  title: string;
  description: string;
  /** Ruta canónica, ej. "/service" */
  path: string;
  keywords?: string[];
  /** Imagen para compartir; si se omite, se usa la imagen de marca */
  image?: { url: string; alt: string; width?: number; height?: number };
  /** Páginas que no deben aparecer en Google */
  noindex?: boolean;
}

// Next NO combina "openGraph" de la página con el del layout (lo reemplaza
// completo), así que cada página lo define entero desde aquí.
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image = OG_IMAGE,
  noindex,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_CL",
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

// Constructores de datos estructurados (schema.org / JSON-LD). Es lo que
// permite a Google mostrar teléfono, dirección, horario y mapa de cada
// sede directamente en los resultados de búsqueda y en Google Maps.

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const sameAs = Object.values(SOCIAL_LINKS);

// Las imágenes locales van con URL absoluta; las externas se dejan tal cual.
const toAbsolute = (url: string) => (url.startsWith("http") ? url : absoluteUrl(url));

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: ["Dogtoralia", "Dogtoralia Clínicas Veterinarias"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(LOGO_PATH),
      width: 1773,
      height: 705,
    },
    image: absoluteUrl("/images/portada.png"),
    description: SITE_DESCRIPTION,
    sameAs,
    contactPoint: Object.values(locations).map((location) => ({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: location.phone,
      email: location.email,
      areaServed: "CL",
      availableLanguage: "es",
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "es-CL",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

const openingHoursSpecification = businessHours.map((block) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: block.days,
  opens: block.opens,
  closes: block.closes,
}));

// Una entidad VeterinaryCare por sede: Google las trata como negocios
// locales distintos (cada una con su dirección, teléfono y mapa).
export function veterinaryCareJsonLd() {
  return Object.entries(locations).map(([key, location]) => ({
    "@type": "VeterinaryCare",
    "@id": `${SITE_URL}/#${key}`,
    name: `${SITE_NAME} - Sede ${location.name}`,
    description: `Clínica veterinaria Dogtoralia en ${location.locality}: consultas, vacunas, exámenes, procedimientos y peluquería canina y felina.`,
    url: absoluteUrl("/contact"),
    image: [absoluteUrl(location.image), absoluteUrl("/images/portada.png")],
    logo: absoluteUrl(LOGO_PATH),
    telephone: location.phone,
    email: location.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.locality,
      addressRegion: "Región Metropolitana de Santiago",
      addressCountry: "CL",
    },
    hasMap: googleMapsSearchUrl(location.fullAddress),
    areaServed: { "@type": "City", name: location.locality },
    openingHoursSpecification,
    parentOrganization: { "@id": ORGANIZATION_ID },
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios veterinarios",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title },
      })),
    },
  }));
}

export function servicesJsonLd() {
  return services.map((service) => ({
    "@type": "Service",
    "@id": absoluteUrl(`/service#${service.slug}`),
    name: service.title,
    description: service.description,
    image: toAbsolute(service.image),
    serviceType: service.title,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: Object.values(locations).map((location) => ({
      "@type": "City",
      name: location.locality,
    })),
    url: absoluteUrl("/service"),
  }));
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// Envuelve varios nodos en un solo documento JSON-LD.
export function graph(...nodes: (object | object[])[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.flat(),
  };
}
