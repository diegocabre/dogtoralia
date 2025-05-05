"use client";

import { InstagramCarousel } from "@/components/instagram/InstagramCarousel";
import { Locations } from "@/components/locations/Locations";

export default function HomePage() {
  return (
    <main className="pt-16">
      <Locations />
      <InstagramCarousel />
    </main>
  );
}