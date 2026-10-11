import Link from "next/link";
import { PiWhatsappLogoBold } from "react-icons/pi";
import type { Product } from "@/types/product";
import { cleanAndCapitalize } from "@/lib/utils";
import { MAIN_WHATSAPP_PHONE, whatsappUrl } from "@/data/locations";
import { ProductImage } from "./ProductImage";
import { EtiquetaReceta } from "./EtiquetaReceta";

// Las consultas de productos llegan a un solo número (MAIN_WHATSAPP_PHONE,
// ver data/locations.ts): la tienda no depende de la sede.

/**
 * Producto en la vitrina: placa blanca con contorno grafito, foto, nombre
 * completo, tipo de producto y si requiere receta. En la esquina, el
 * disco verde para consultar por WhatsApp (la única acción que escribe).
 */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const name = cleanAndCapitalize(product.name);
  const productWhatsappUrl = whatsappUrl(
    MAIN_WHATSAPP_PHONE,
    `Hola! Me interesa este producto: ${name}`
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[6px] border-[3px] border-grafito bg-white text-grafito transition-shadow duration-200 hover:shadow-tarjeta">
      <Link href={`/product/${product.id}`} className="flex flex-col">
        <div className="relative aspect-square border-b-[3px] border-grafito bg-white">
          <ProductImage
            imageUrl={product.imageUrl}
            alt={name}
            label={product.subCategory}
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        {/* Nombre completo, sin recortar: reserva dos líneas para que las
            tarjetas cortas no queden más bajas */}
        <h3 className="min-h-[2.75em] px-3 pt-3 text-sm font-semibold leading-snug group-hover:underline group-hover:underline-offset-4 sm:px-4 sm:text-base">
          {name}
        </h3>
      </Link>
      <div className="mt-auto flex items-end justify-between gap-2 px-3 pb-3 pt-2 sm:px-4">
        <p className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-grafito-suave sm:text-sm">
          <span>{product.subCategory}</span>
          {product.requiresPrescription && <EtiquetaReceta />}
        </p>
        <a
          href={productWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar por WhatsApp: ${name}`}
          title="Consultar por WhatsApp"
          className="presionable flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-whatsapp text-[1.4rem] text-white transition-colors duration-200 hover:bg-whatsapp-dark"
        >
          <PiWhatsappLogoBold aria-hidden />
        </a>
      </div>
    </article>
  );
}
