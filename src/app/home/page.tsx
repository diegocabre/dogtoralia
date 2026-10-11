import { Locations } from "@/components/locations/Locations";
import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { Team } from "@/components/home/Team";
import { Reviews } from "@/components/home/Reviews";
import { CierreAgenda } from "@/components/home/CierreAgenda";
import { BarraWhatsapp } from "@/components/home/BarraWhatsapp";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_DESCRIPTION, SITE_KEYWORDS } from "@/data/site";
import { pageMetadata, graph, veterinaryCareJsonLd } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Veterinaria en Puente Alto y Santiago Centro",
    description: SITE_DESCRIPTION,
    path: "/home",
    keywords: SITE_KEYWORDS,
  }),
  // El título de la home ya incluye la marca: se usa tal cual, sin plantilla.
  title: { absolute: "Dogtoralia Vet | Veterinaria en Puente Alto y Santiago Centro" },
};

export default function HomePage() {
  return (
    <main className="bg-muro">
      <JsonLd data={graph(veterinaryCareJsonLd())} />
      <Hero />
      <ServicesPreview />
      <Team />
      <Reviews />
      <Locations />
      <CierreAgenda />
      <BarraWhatsapp />
    </main>
  );
}
