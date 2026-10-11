"use client";

import { useEffect, useRef, useState } from "react";
import { PiArrowUpRightBold, PiGoogleLogoBold, PiStarFill } from "react-icons/pi";
import { googleReviewsUrl, googleWriteReviewUrl, locationList } from "@/data/locations";
import { googleRating, googleReviewCounts, reviews, type Review } from "@/data/reviews";

// Suma de las fichas de Google, redondeada hacia abajo a la decena ("Más de
// 240") para que la cifra siga siendo cierta aunque lleguen reseñas nuevas.
const totalReviews = Object.values(googleReviewCounts).reduce((sum, count) => sum + count, 0);
const reviewsFloor = Math.floor(totalReviews / 10) * 10;

// La cita grande y las que la acompañan en la fila de abajo.
const DESTACADA = "roxana silva";
const EN_FILA = 3;

function Stars({ rating, color = "text-vinilo-mostaza" }: { rating: number; color?: string }) {
  return (
    <span role="img" aria-label={`${rating} de 5 estrellas`} className={`flex gap-0.5 ${color}`}>
      {Array.from({ length: rating }, (_, index) => (
        <PiStarFill key={index} aria-hidden />
      ))}
    </span>
  );
}

/**
 * Texto recortado a 3 líneas con "Leer completa". El botón aparece solo si
 * el texto de verdad no cabe, medido en el navegador.
 */
function TextoRecortado({ text, className }: { text: string; className: string }) {
  const ref = useRef<HTMLQuoteElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [recortado, setRecortado] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || expanded) return;
    const observer = new ResizeObserver(() => {
      setRecortado(element.scrollHeight > element.clientHeight + 1);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <>
      <blockquote ref={ref} className={`${className} ${expanded ? "" : "line-clamp-3"}`}>
        “{text}”
      </blockquote>
      {(recortado || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="min-h-11 self-start font-semibold underline decoration-[3px] underline-offset-[5px]"
        >
          {expanded ? "Mostrar menos" : "Leer completa"}
        </button>
      )}
    </>
  );
}

function Autor({ review }: { review: Review }) {
  return (
    <figcaption className="text-sm">
      <span className="block font-semibold">{review.author}</span>
      {review.location && <span className="block opacity-80">Sede {review.location}</span>}
    </figcaption>
  );
}

/**
 * Reseñas en el vinilo mostaza: el 4,9 de Google como cifra grande, una cita
 * destacada y una fila corta con otras tres.
 */
export function Reviews() {
  // Sin reseñas cargadas no se muestra la sección: mejor nada que una
  // sección vacía o inventada.
  if (reviews.length === 0) return null;

  const destacada = reviews.find((review) => review.author === DESTACADA) ?? reviews[0];
  const fila = reviews.filter((review) => review !== destacada).slice(0, EN_FILA);

  return (
    <section className="bg-vinilo-mostaza py-16 text-grafito sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="sr-only">Reseñas en Google</h2>

        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-20">
          {/* La cifra */}
          <div>
            {googleRating !== null && (
              <p className="flex items-end gap-3">
                <span className="rotulo text-[6rem] leading-[0.8] sm:text-[8rem]">
                  {googleRating.toLocaleString("es-CL", { minimumFractionDigits: 1 })}
                </span>
                <PiStarFill aria-hidden className="mb-1 text-5xl sm:text-6xl" />
              </p>
            )}
            {reviewsFloor > 0 && (
              <p className="mt-4 flex items-center gap-2 text-lg font-semibold">
                <PiGoogleLogoBold aria-hidden className="text-2xl" />
                Más de {reviewsFloor} reseñas en Google
              </p>
            )}
            <p className="mt-2 max-w-[30ch] text-[0.95rem] leading-relaxed">
              Varias nombran al Dr. Gabriel y a la Dra. Sara.
            </p>
          </div>

          {/* La cita destacada */}
          <figure className="flex flex-col gap-3 lg:pt-2">
            <Stars rating={destacada.rating} color="text-grafito" />
            <TextoRecortado
              text={destacada.text}
              className="max-w-[38ch] text-[1.45rem] font-semibold leading-snug sm:text-[2rem]"
            />
            <Autor review={destacada} />
          </figure>
        </div>

        {/* Fila corta */}
        {fila.length > 0 && (
          <ul className="mt-12 grid gap-3 sm:mt-16 md:grid-cols-3 md:gap-4">
            {fila.map((review) => (
              <li key={review.author}>
                <figure className="flex h-full flex-col gap-2 rounded-[6px] border-[3px] border-grafito bg-white p-5">
                  <Stars rating={review.rating} />
                  <TextoRecortado
                    text={review.text}
                    className="mt-1 text-[0.95rem] leading-relaxed"
                  />
                  <div className="mt-auto border-t-2 border-muro pt-3">
                    <Autor review={review} />
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 grid gap-x-10 gap-y-1 text-[0.95rem] sm:grid-cols-2 lg:flex lg:flex-wrap">
          {locationList.map((location) => (
            <p key={location.name} className="flex flex-wrap items-center gap-x-4">
              <a
                href={googleReviewsUrl(location)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 font-semibold underline decoration-[3px] underline-offset-[5px] hover:decoration-white"
              >
                Ver reseñas de {location.name} <PiArrowUpRightBold aria-hidden />
              </a>
              <a
                href={googleWriteReviewUrl(location)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center underline underline-offset-4 hover:decoration-[3px]"
              >
                Reseñar
              </a>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
