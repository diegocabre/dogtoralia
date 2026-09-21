import { JsonLd } from "@/components/seo/JsonLd";
import { locationList } from "@/data/locations";
import { absoluteUrl } from "@/data/site";
import { pageMetadata, graph, veterinaryCareJsonLd, breadcrumbJsonLd } from "@/lib/seo";

// La página es un componente de cliente (animaciones), que no puede exportar
// metadata; por eso la metadata y los datos estructurados van en este layout.
export const metadata = pageMetadata({
  title: "Contacto y sedes: Puente Alto y Santiago Centro",
  description: `Escríbenos o visítanos: ${locationList
    .map((location) => `${location.address} (${location.name})`)
    .join(" y ")}. Teléfonos, WhatsApp, horarios y mapa.`,
  path: "/contact",
  keywords: [
    "contacto veterinaria",
    "dirección veterinaria Puente Alto",
    "dirección veterinaria Santiago Centro",
    "veterinaria cerca de mí",
    "WhatsApp veterinaria",
    "horario veterinaria",
  ],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "ContactPage",
            "@id": absoluteUrl("/contact#page"),
            url: absoluteUrl("/contact"),
            name: "Contacto Dogtoralia Vet",
          },
          veterinaryCareJsonLd(),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/home" },
            { name: "Contacto", path: "/contact" },
          ])
        )}
      />
      {children}
    </>
  );
}
