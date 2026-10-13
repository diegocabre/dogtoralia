import type { ReactNode } from "react";
import { PiCaretDownBold } from "react-icons/pi";

export interface LegalSectionRef {
  id: string;
  label: string;
}

/**
 * Página legal en el mundo de la vitrina: encabezado azul con el título y la
 * fecha, y el texto en un panel blanco con un largo de línea cómodo. Si hay
 * índice, en escritorio va a la izquierda y queda fijo al bajar.
 */
export function LegalPage({
  title,
  updated,
  toc,
  children,
}: {
  title: string;
  updated: string;
  toc?: LegalSectionRef[];
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-muro pb-14 pt-[76px] sm:pb-20 lg:pt-[88px]">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="rounded-md bg-grafito p-1.5 sm:p-2">
          <header className="rounded-[3px] bg-vinilo-azul px-5 py-8 text-white sm:px-9 sm:py-10">
            <h1 className="rotulo text-[clamp(2.2rem,5vw,3.5rem)]">{title}</h1>
            <p className="mt-3 text-sm text-white/85">Última actualización: {updated}</p>
          </header>
        </div>

        <div
          className={`mt-4 grid gap-3 sm:mt-6 sm:gap-4 ${
            toc && toc.length > 0 ? "lg:grid-cols-[16rem_1fr]" : ""
          }`}
        >
          {toc && toc.length > 0 && (
            <nav
              aria-label="Contenido"
              className="rounded-md bg-grafito-suave text-white lg:sticky lg:top-24 lg:self-start"
            >
              {/* En el celular el índice va plegado para que el texto empiece
                  en la primera pantalla; desde lg queda siempre abierto. */}
              <details className="group lg:hidden">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 py-3 [&::-webkit-details-marker]:hidden">
                  <span className="rotulo text-lg">Contenido</span>
                  <PiCaretDownBold aria-hidden className="text-lg transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <TocList toc={toc} className="px-5 pb-5" />
              </details>
              <div className="hidden px-5 py-5 lg:block">
                <p className="rotulo text-lg">Contenido</p>
                <TocList toc={toc} className="mt-3" />
              </div>
            </nav>
          )}

          <article className="legal-texto rounded-md bg-white px-5 py-8 text-grafito sm:px-10 sm:py-10">
            {children}
          </article>
        </div>
      </div>
    </main>
  );
}

function TocList({ toc, className = "" }: { toc: LegalSectionRef[]; className?: string }) {
  return (
    <ol className={`grid gap-1 text-sm ${className}`}>
      {toc.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="inline-flex min-h-11 items-center text-white/90 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-vinilo-mostaza"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Sección con ancla para el índice. */
export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-24">
      <h2 id={`${id}-titulo`}>{title}</h2>
      {children}
    </section>
  );
}
