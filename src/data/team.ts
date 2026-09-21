export interface TeamMember {
  name: string;
  /** Cargo o especialidad, ej. "Médico veterinario" */
  role: string;
  /** Foto en public/images/team/, ej. "/images/team/nombre.jpg". Sin foto se muestran las iniciales. */
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
    role: "Médico veterinario · Anestesiólogo",
  },
  {
    name: "Sara Vásquez",
    role: "Médico veterinario · Cirujano",
  },
];
