import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, graph, servicesJsonLd, breadcrumbJsonLd } from "@/lib/seo";

// La página es un componente de cliente (animaciones), que no puede exportar
// metadata; por eso la metadata y los datos estructurados van en este layout.
export const metadata = pageMetadata({
  title: "Servicios veterinarios y peluquería canina y felina",
  description:
    "Consultas, vacunas, exámenes, procedimientos y peluquería canina y felina en Puente Alto y Santiago Centro. Agenda tu hora por WhatsApp.",
  path: "/service",
  keywords: [
    "servicios veterinarios",
    "consulta veterinaria Puente Alto",
    "vacunas perros y gatos",
    "exámenes veterinarios",
    "peluquería canina Puente Alto",
    "peluquería felina",
    "baño medicado perros",
    "cirugía veterinaria",
  ],
});

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          servicesJsonLd(),
          breadcrumbJsonLd([
            { name: "Inicio", path: "/home" },
            { name: "Servicios", path: "/service" },
          ])
        )}
      />
      {children}
    </>
  );
}
