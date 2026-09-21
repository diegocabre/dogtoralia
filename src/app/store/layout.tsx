import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, graph, breadcrumbJsonLd } from "@/lib/seo";

// La página es un componente de cliente (carga los productos en el
// navegador), que no puede exportar metadata; por eso va en este layout.
export const metadata = pageMetadata({
  title: "Tienda veterinaria: medicamentos y shampoos para mascotas",
  description:
    "Catálogo de Dogtoralia Vet: medicamentos, antiparasitarios y shampoos para perros y gatos. Consulta disponibilidad y compra por WhatsApp.",
  path: "/store",
  keywords: [
    "tienda veterinaria",
    "medicamentos para perros",
    "medicamentos para gatos",
    "antiparasitario perros",
    "antiparasitario gatos",
    "shampoo para perros",
    "productos veterinarios Chile",
  ],
});

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbJsonLd([
            { name: "Inicio", path: "/home" },
            { name: "Tienda", path: "/store" },
          ])
        )}
      />
      {children}
    </>
  );
}
