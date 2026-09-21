import type { IconType } from "react-icons";
import {
  FaStethoscope,
  FaSyringe,
  FaMicroscope,
  FaBriefcaseMedical,
  FaCut,
  FaPaw,
} from "react-icons/fa";

// Ícono de cada servicio, por slug (los slugs viven en data/services.ts).
// Lo comparten la página de servicios y la sección de servicios de la home.
const serviceIcons: Record<string, IconType> = {
  consultas: FaStethoscope,
  vacunas: FaSyringe,
  examenes: FaMicroscope,
  procedimientos: FaBriefcaseMedical,
  peluqueria: FaCut,
};

export const iconForService = (slug: string): IconType =>
  serviceIcons[slug] ?? FaPaw;
