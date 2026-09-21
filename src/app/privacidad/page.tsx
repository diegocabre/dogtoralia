export const metadata = {
  title: "Política de Privacidad | Dogtoralia",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 mt-12">
          <h1 className="text-3xl font-bold text-tertiary mb-2">
            Política de Privacidad
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Última actualización: {new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <p>
              En Dogtoralia (&quot;nosotros&quot;) respetamos tu privacidad y nos
              comprometemos a proteger los datos personales que nos entregas
              al usar este sitio web. Esta política explica de forma simple
              qué datos recopilamos, para qué los usamos y qué derechos
              tienes sobre ellos, conforme a la Ley N° 19.628 sobre
              Protección de la Vida Privada y su actualización mediante la
              Ley N° 21.719.
            </p>

            <h2 className="text-xl font-semibold text-tertiary">
              1. ¿Qué datos recopilamos?
            </h2>
            <ul className="list-disc pl-6 space-y-1">
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

            <h2 className="text-xl font-semibold text-tertiary">
              2. ¿Para qué usamos tus datos?
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Responder tus consultas enviadas por el formulario de contacto.</li>
              <li>Mejorar el funcionamiento y diseño del sitio.</li>
              <li>Cumplir obligaciones legales cuando corresponda.</li>
            </ul>
            <p>
              No vendemos ni compartimos tus datos personales con terceros
              para fines comerciales ajenos a Dogtoralia.
            </p>

            <h2 className="text-xl font-semibold text-tertiary">
              3. ¿Con quién compartimos datos?
            </h2>
            <p>
              Usamos proveedores de servicios que procesan datos en nuestro
              nombre, bajo sus propias políticas de privacidad:
            </p>
            <ul className="list-disc pl-6 space-y-1">
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

            <h2 className="text-xl font-semibold text-tertiary">
              4. Tus derechos
            </h2>
            <p>
              Puedes ejercer tus derechos de acceso, rectificación,
              cancelación, oposición y portabilidad sobre tus datos
              personales (derechos ARCOP) escribiéndonos a{" "}
              <a href="mailto:dogtoralia.cl@gmail.com" className="text-primary hover:underline">
                dogtoralia.cl@gmail.com
              </a>{" "}
              o{" "}
              <a href="mailto:dogtoraliavet@gmail.com" className="text-primary hover:underline">
                dogtoraliavet@gmail.com
              </a>
              . Responderemos tu solicitud dentro de un plazo razonable.
            </p>

            <h2 className="text-xl font-semibold text-tertiary">
              5. Conservación de datos
            </h2>
            <p>
              Conservamos tus datos solo durante el tiempo necesario para
              cumplir con las finalidades descritas en esta política.
            </p>

            <h2 className="text-xl font-semibold text-tertiary">
              6. Cambios a esta política
            </h2>
            <p>
              Podemos actualizar esta política ocasionalmente. Publicaremos
              cualquier cambio en esta misma página con su fecha de
              actualización.
            </p>

            <h2 className="text-xl font-semibold text-tertiary">Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política, contáctanos a través
              de nuestro{" "}
              <a href="/contact" className="text-primary hover:underline">
                formulario de contacto
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
