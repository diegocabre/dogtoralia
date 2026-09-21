"use client";

import { motion } from "framer-motion";
import { FaGoogle, FaStar } from "react-icons/fa";
import { googleReviewsUrl, googleWriteReviewUrl, locationList } from "@/data/locations";
import { googleRating, googleReviewCounts, reviews } from "@/data/reviews";

// Suma de las fichas de Google, redondeada hacia abajo a la decena ("Más de
// 240") para que la cifra siga siendo cierta aunque lleguen reseñas nuevas.
const totalReviews = Object.values(googleReviewCounts).reduce((sum, count) => sum + count, 0);
const reviewsFloor = Math.floor(totalReviews / 10) * 10;

function Stars({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`${rating} de 5 estrellas`} className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          aria-hidden
          className={star <= rating ? "text-amber-400" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  // Sin reseñas cargadas no se muestra la sección (mismo criterio que el
  // carrusel de Instagram): mejor nada que una sección vacía o inventada.
  if (reviews.length === 0) return null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-semibold text-tertiary sm:text-3xl">
            Lo que dicen las familias que nos visitan
          </h2>
          {reviewsFloor > 0 && (
            <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-gray-600">
              <FaGoogle aria-hidden className="text-primary" />
              {googleRating !== null && (
                <>
                  <span className="font-semibold text-tertiary">
                    {googleRating.toLocaleString("es-CL", { minimumFractionDigits: 1 })}
                  </span>
                  <FaStar aria-hidden className="text-amber-400" />
                  <span aria-hidden>·</span>
                </>
              )}
              <span>Más de {reviewsFloor} reseñas en Google</span>
            </p>
          )}
        </motion.div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.figure
              key={`${review.author}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="flex h-full flex-col rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-md"
            >
              <Stars rating={review.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-gray-700">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white"
                >
                  {review.author.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-tertiary">{review.author}</span>
                  <span className="block text-xs text-gray-500">
                    {[review.location && `Sede ${review.location}`, review.date]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </span>
                <FaGoogle aria-hidden className="ml-auto text-gray-300" />
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Enlaces a la ficha de cada sede en Google */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm text-gray-600">Cuéntanos cómo fue tu experiencia:</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {locationList.map((location) => (
              <div key={location.name} className="flex items-center gap-2">
                <motion.a
                  href={googleWriteReviewUrl(location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary-dark"
                >
                  <FaStar aria-hidden /> Reseñar sede {location.name}
                </motion.a>
                <a
                  href={googleReviewsUrl(location)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary underline underline-offset-4 hover:opacity-80"
                >
                  Ver reseñas
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
