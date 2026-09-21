import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso del sitio web y de la vitrina de productos de Dogtoralia Vet.",
  path: "/terminos",
});

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 mt-12">
          <h1 className="text-3xl font-bold text-tertiary mb-2">
            Términos y Condiciones
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Última actualización: {new Date().toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <p>
              Al usar el sitio web de Dogtoralia aceptas los siguientes términos.
            </p>

            <h2 className="text-xl font-semibold text-tertiary">1. Productos</h2>
            <p>
              La tienda es una vitrina informativa de nuestros productos. La
              disponibilidad y los precios se confirman directamente con
              nosotros (por WhatsApp o en nuestras sedes) y pueden cambiar sin
              previo aviso. Los productos que requieren receta veterinaria se
              entregan solo con la receta correspondiente.
            </p>

            <h2 className="text-xl font-semibold text-tertiary">2. Datos personales</h2>
            <p>
              El tratamiento de tus datos personales se rige por nuestra{" "}
              <a href="/privacidad" className="text-primary hover:underline">
                Política de Privacidad
              </a>
              .
            </p>

            <h2 className="text-xl font-semibold text-tertiary">3. Contacto</h2>
            <p>
              Ante dudas sobre estos términos, escríbenos a través de nuestro{" "}
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
