import { pageMetadata } from "@/lib/seo";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del sitio web y de la vitrina de productos de Dogtoralia Vet.",
  path: "/terminos",
});

export default function TerminosPage() {
  return (
    <LegalPage
      title="Términos y Condiciones"
      updated={new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}
    >
      <p>Al usar el sitio web de Dogtoralia aceptas los siguientes términos.</p>

      <LegalSection id="productos" title="1. Productos">
        <p>
          La tienda es una vitrina informativa de nuestros productos. La
          disponibilidad y los precios se confirman directamente con
          nosotros (por WhatsApp o en nuestras sedes) y pueden cambiar sin
          previo aviso. Los productos que requieren receta veterinaria se
          entregan solo con la receta correspondiente.
        </p>
      </LegalSection>

      <LegalSection id="datos-personales" title="2. Datos personales">
        <p>
          El tratamiento de tus datos personales se rige por nuestra{" "}
          <a href="/privacidad">Política de Privacidad</a>.
        </p>
      </LegalSection>

      <LegalSection id="contacto" title="3. Contacto">
        <p>
          Ante dudas sobre estos términos, escríbenos a través de nuestro{" "}
          <a href="/contact">formulario de contacto</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
