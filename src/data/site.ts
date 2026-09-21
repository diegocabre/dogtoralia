// Datos del sitio usados por SEO (metadata, JSON-LD, sitemap, manifest).
// Los datos de las sedes viven en locations.ts; aquí va lo común a todo el
// negocio.

// URL pública del sitio, sin "/" final. Se puede sobreescribir con
// NEXT_PUBLIC_SITE_URL (ej. para probar en un dominio de preview).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dogtoraliavet.cl"
).replace(/\/+$/, "");

export const SITE_NAME = "Dogtoralia Vet";
export const SITE_TAGLINE = "Clínicas veterinarias en Puente Alto y Santiago Centro";

export const SITE_DESCRIPTION =
  "Clínicas veterinarias Dogtoralia en Puente Alto y Santiago Centro: consultas, vacunas, exámenes, procedimientos y peluquería canina y felina. Tienda con medicamentos y shampoos para perros y gatos.";

export const SITE_KEYWORDS = [
  "veterinaria Puente Alto",
  "veterinaria Santiago Centro",
  "veterinaria Santiago",
  "clínica veterinaria",
  "Dogtoralia",
  "Dogtoralia Vet",
  "veterinario a domicilio Puente Alto",
  "vacunas para perros",
  "vacunas para gatos",
  "peluquería canina",
  "peluquería felina",
  "baño medicado para perros",
  "exámenes veterinarios",
  "tienda veterinaria",
  "medicamentos para mascotas",
  "antiparasitarios para perros y gatos",
  "shampoo para perros",
  "consulta veterinaria",
];

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/dogtoraliavet/",
  instagram: "https://www.instagram.com/dogtoraliavet/",
};

export const LOGO_PATH = "/img/LOGO.png";
// Imagen que se ve al compartir el sitio (WhatsApp, Facebook, X...): 1200x630.
export const OG_IMAGE = {
  url: "/images/og-dogtoralia.jpg",
  width: 1200,
  height: 630,
  alt: "Dogtoralia Clínicas Veterinarias en Puente Alto y Santiago Centro",
};

export const THEME_COLOR = "#2893b9";

// Horario de atención. Lo usan el footer y los datos estructurados
// (Google lo muestra en el resultado de búsqueda y en Maps).
export const businessHours = [
  {
    label: "Lunes a Viernes",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "19:00",
  },
  {
    label: "Sábados",
    days: ["Saturday"],
    opens: "10:00",
    closes: "17:00",
  },
];

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
