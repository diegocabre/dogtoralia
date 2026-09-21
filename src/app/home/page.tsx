import { InstagramCarousel } from "@/components/instagram/InstagramCarousel";
import { Locations } from "@/components/locations/Locations";
import { Hero } from "@/components/home/Hero";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AnimatedSection>
        <Locations />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <InstagramCarousel />
      </AnimatedSection>
    </main>
  );
}
