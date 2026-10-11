"use client";

import { useId, useState } from "react";
import { PiMagnifyingGlassBold, PiWhatsappLogoBold, PiXBold } from "react-icons/pi";
import type { Product, ProductCategory } from "@/types/product";
import { matchesQuery } from "@/lib/catalog/filter";
import { MAIN_WHATSAPP_PHONE, whatsappUrl } from "@/data/locations";
import ProductGrid from "@/components/ProductGrid";

const categories: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "Todo" },
  { value: "Medicamento", label: "Medicamentos" },
  { value: "Shampoos", label: "Shampoos" },
];

// El catálogo llega ya cargado desde el servidor (page.tsx); aquí solo se
// filtra en el navegador para que la búsqueda sea instantánea.
// Productos que se muestran de una vez; el resto, con "Ver más".
const PAGE_SIZE = 24;

export default function StoreClient({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Al cambiar la búsqueda o el filtro, se vuelve a la primera tanda.
  const search = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(PAGE_SIZE);
  };
  const filterBy = (value: ProductCategory | "all") => {
    setSelectedCategory(value);
    setVisibleCount(PAGE_SIZE);
  };
  const searchId = useId();

  const filteredProducts = products.filter((product) =>
    matchesQuery(product, { text: searchQuery, category: selectedCategory })
  );

  const query = searchQuery.trim();
  const askMessage = query
    ? `Hola! Busqué "${query}" en la tienda y no lo encontré. ¿Lo tienen?`
    : "Hola! Quiero consultar por un producto de la tienda.";

  return (
    <main className="min-h-screen bg-muro pb-14 pt-[76px] sm:pb-20 lg:pt-[88px]">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        {/* Letrero de la tienda con buscador y filtros, dentro del marco */}
        <div className="grid gap-2 rounded-md bg-grafito p-2 sm:gap-3 sm:p-3 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[3px] bg-vinilo-mostaza px-5 py-6 text-grafito sm:px-8 sm:py-9">
            <h1 className="rotulo text-[clamp(2.6rem,6vw,4.4rem)]">Tienda</h1>
            <p className="mt-3 max-w-[44ch] text-base leading-relaxed sm:text-lg">
              Medicamentos y shampoos para perros y gatos.
              <span className="hidden sm:inline"> Por ahora es una vitrina: cada producto se</span>
              <span className="sm:hidden"> Cada producto se</span>{" "}
              consulta por WhatsApp y se retira en tu sede.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 rounded-[3px] bg-grafito-suave px-4 py-5 sm:gap-5 text-white sm:px-8">
            <div>
              <label htmlFor={searchId} className="mb-1.5 block text-sm font-semibold">
                Buscar en la tienda
              </label>
              <div className="relative">
                <PiMagnifyingGlassBold
                  aria-hidden
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-grafito-suave"
                />
                <input
                  id={searchId}
                  type="search"
                  placeholder="Ej: Simparica, antiparasitario, shampoo"
                  className="min-h-12 w-full rounded-[8px] border-[3px] border-grafito bg-white py-2 pl-11 pr-11 text-base text-grafito placeholder:text-grafito-suave/80 [&::-webkit-search-cancel-button]:appearance-none"
                  value={searchQuery}
                  onChange={(e) => search(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => search("")}
                    aria-label="Borrar búsqueda"
                    className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[6px] text-lg text-grafito"
                  >
                    <PiXBold />
                  </button>
                )}
              </div>
            </div>

            <div role="group" aria-label="Filtrar por tipo" className="grid grid-cols-[0.75fr_1.35fr_1fr] gap-1.5 sm:grid-cols-3 sm:gap-2">
              {categories.map((cat) => {
                const active = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => filterBy(cat.value)}
                    aria-pressed={active}
                    className={`presionable min-h-12 rounded-[8px] border-2 px-1 sm:px-2 ${
                      active
                        ? "border-vinilo-mostaza bg-vinilo-mostaza text-grafito"
                        : "border-white/35 bg-grafito text-white hover:border-white/70"
                    }`}
                  >
                    <span className="rotulo whitespace-nowrap text-[0.72rem] min-[400px]:text-sm sm:text-base">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p aria-live="polite" className="mt-6 px-1 text-sm font-semibold text-grafito-suave">
          {filteredProducts.length === 1 ? "1 producto" : `${filteredProducts.length} productos`}
          {query && <> para «{query}»</>}
        </p>

        <div className="mt-3">
          {filteredProducts.length > 0 ? (
            <>
              <ProductGrid products={filteredProducts.slice(0, visibleCount)} />
              {filteredProducts.length > visibleCount && (
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="presionable mx-auto mt-6 flex min-h-12 items-center justify-center rounded-[10px] border-[3px] border-grafito bg-white px-6 text-grafito"
                >
                  <span className="rotulo text-lg">
                    Ver más productos ({filteredProducts.length - visibleCount})
                  </span>
                </button>
              )}
            </>
          ) : (
            <div className="rounded-md bg-grafito p-2 sm:p-3">
              <div className="rounded-[3px] bg-white px-6 py-10 text-center text-grafito">
                <p className="rotulo text-2xl sm:text-3xl">No está en la vitrina</p>
                <p className="mx-auto mt-3 max-w-[42ch] text-base leading-relaxed text-grafito-suave">
                  Prueba con otra palabra, o pregúntanos por WhatsApp si lo tenemos.
                </p>
                <a
                  href={whatsappUrl(MAIN_WHATSAPP_PHONE, askMessage)}
                  aria-label="Preguntar por WhatsApp si tienen el producto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="presionable mt-6 inline-flex min-h-12 items-center gap-3 rounded-[10px] border-[3px] border-grafito bg-white py-1.5 pl-4 pr-1.5 text-grafito shadow-letrero"
                >
                  <span className="rotulo whitespace-nowrap text-lg">Preguntar</span>
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-2xl text-white"
                  >
                    <PiWhatsappLogoBold />
                  </span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
