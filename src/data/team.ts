export interface TeamMember {
  name: string;
  /** Trato con que se le nombra en el sitio, ej. "Dra." */
  honorific?: "Dr." | "Dra.";
  /** Cargo o especialidad, ej. "Médico veterinario" */
  role: string;
  /**
   * Retrato vertical 4:5 en public/images/. Mientras no haya foto individual
   * se usa un recorte de la foto del equipo. Sin foto, la persona no aparece
   * en los retratos de la home.
   */
  photo?: string;
  /** Sede donde atiende (opcional) */
  location?: "Puente Alto" | "Santiago Centro";
  /** Una frase corta sobre su experiencia o enfoque (opcional) */
  bio?: string;
}

// Equipo que se muestra en la home. Mientras esta lista esté vacía, la
// sección no se muestra en la página.
export const team: TeamMember[] = [
  {
    name: "Gabriel Cabré",
    honorific: "Dr.",
    role: "Médico veterinario · Anestesiólogo",
    location: "Santiago Centro",
    photo: "/images/recortes/gabriel.jpg",
  },
  {
    name: "Sara Vásquez",
    honorific: "Dra.",
    role: "Médica veterinaria · Cirujana",
    location: "Puente Alto",
    photo: "/images/recortes/sara.jpg",
  },
];

/** Veterinario que atiende a diario en una sede (ej. "la Dra. Sara"). */
export const vetForLocation = (location: string) =>
  team.find((member) => member.location === location);

/** "Dra. Sara" a partir del integrante del equipo. */
export const shortName = (member: TeamMember) =>
  [member.honorific, member.name.split(" ")[0]].filter(Boolean).join(" ");
