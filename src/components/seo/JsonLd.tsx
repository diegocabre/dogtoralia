// Inyecta datos estructurados (JSON-LD) en la página. Se escapa "<" para que
// ningún texto (ej. la descripción de un producto) pueda cerrar el <script>.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
