import { pageMetadata } from "@/lib/seo";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({
  title: "Política de Privacidad",
  description:
    "Cómo Dogtoralia Vet recopila, usa y protege los datos personales que nos entregas al contactarnos.",
  path: "/privacidad",
});

const toc = [
  { id: "datos", label: "1. ¿Qué datos recopilamos?" },
  { id: "uso", label: "2. ¿Para qué usamos tus datos?" },
  { id: "terceros", label: "3. ¿Con quién compartimos datos?" },
  { id: "derechos", label: "4. Tus derechos" },
  { id: "conservacion", label: "5. Conservación de datos" },
  { id: "cambios", label: "6. Cambios a esta política" },
  { id: "contacto", label: "Contacto" },
];

export default function PrivacidadPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      updated={new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}
      toc={toc}
    >
      <p>
        En Dogtoralia (&quot;nosotros&quot;) respetamos tu privacidad y nos
        comprometemos a proteger los datos personales que nos entregas
        al usar este sitio web. Esta política explica de forma simple
        qué datos recopilamos, para qué los usamos y qué derechos
        tienes sobre ellos, conforme a la Ley N° 19.628 sobre
        Protección de la Vida Privada y su actualización mediante la
        Ley N° 21.719.
      </p>

      <LegalSection id="datos" title="1. ¿Qué datos recopilamos?">
        <ul>
          <li>
            <strong>Formulario de contacto:</strong> nombre, correo
            electrónico, teléfono (opcional) y el mensaje que escribes.
          </li>
          <li>
            <strong>Datos de navegación:</strong> mediante Microsoft
            Clarity y Google (Search Console) recopilamos de forma
            agregada cómo se usa el sitio (páginas visitadas,
            interacciones, mapas de calor) para mejorar la experiencia.
            Esta herramienta puede grabar sesiones de navegación de forma
            anónima.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="uso" title="2. ¿Para qué usamos tus datos?">
        <ul>
          <li>Responder tus consultas enviadas por el formulario de contacto.</li>
          <li>Mejorar el funcionamiento y diseño del sitio.</li>
          <li>Cumplir obligaciones legales cuando corresponda.</li>
        </ul>
        <p>
          No vendemos ni compartimos tus datos personales con terceros
          para fines comerciales ajenos a Dogtoralia.
        </p>
      </LegalSection>

      <LegalSection id="terceros" title="3. ¿Con quién compartimos datos?">
        <p>
          Usamos proveedores de servicios que procesan datos en nuestro
          nombre, bajo sus propias políticas de privacidad:
        </p>
        <ul>
          <li>
            <strong>Google (Search Console):</strong> estadísticas de
            búsqueda del sitio.
          </li>
          <li>
            <strong>Resend:</strong> envío de los correos generados por el
            formulario de contacto.
          </li>
          <li>
            <strong>Microsoft Clarity:</strong> analítica de comportamiento
            de navegación.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="derechos" title="4. Tus derechos">
        <p>
          Puedes ejercer tus derechos de acceso, rectificación,
          cancelación, oposición y portabilidad sobre tus datos
          personales (derechos ARCOP) escribiéndonos a{" "}
          <a href="mailto:dogtoralia.cl@gmail.com">dogtoralia.cl@gmail.com</a>{" "}
          o{" "}
          <a href="mailto:dogtoraliavet@gmail.com">dogtoraliavet@gmail.com</a>
          . Responderemos tu solicitud dentro de un plazo razonable.
        </p>
      </LegalSection>

      <LegalSection id="conservacion" title="5. Conservación de datos">
        <p>
          Conservamos tus datos solo durante el tiempo necesario para
          cumplir con las finalidades descritas en esta política.
        </p>
      </LegalSection>

      <LegalSection id="cambios" title="6. Cambios a esta política">
        <p>
          Podemos actualizar esta política ocasionalmente. Publicaremos
          cualquier cambio en esta misma página con su fecha de
          actualización.
        </p>
      </LegalSection>

      <LegalSection id="contacto" title="Contacto">
        <p>
          Si tienes preguntas sobre esta política, contáctanos a través
          de nuestro <a href="/contact">formulario de contacto</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
