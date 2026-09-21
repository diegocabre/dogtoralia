import { InstagramCarousel } from "@/components/instagram/InstagramCarousel";
import { Locations } from "@/components/locations/Locations";
import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
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
    <main>
      <JsonLd data={graph(veterinaryCareJsonLd())} />
      <Hero />
      <ServicesPreview />
      <AnimatedSection>
        <Locations />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <InstagramCarousel />
      </AnimatedSection>
    </main>
  );
}
