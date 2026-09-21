import type { MetadataRoute } from "next";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  THEME_COLOR,
} from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dogtoralia Clínicas Veterinarias",
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    lang: "es-CL",
    start_url: "/home",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: THEME_COLOR,
    categories: ["health", "shopping", "lifestyle"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
