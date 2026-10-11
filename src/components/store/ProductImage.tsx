import Image from "next/image";
import { PiCameraBold } from "react-icons/pi";
import { hasOwnProductImage } from "@/lib/utils";

/**
 * Foto del producto sobre fondo blanco. Si el producto aún no tiene foto
 * propia, en vez de la foto genérica de pastillas muestra un panel de marca
 * con el tipo de producto.
 */
export function ProductImage({
  imageUrl,
  alt,
  label,
  sizes,
  priority = false,
  large = false,
}: {
  imageUrl?: string | null;
  alt: string;
  /** Tipo de producto que se muestra en el panel sin foto, ej. "Antiparasitario" */
  label: string;
  sizes: string;
  priority?: boolean;
  /** Panel sin foto en tamaño de ficha (rótulo grande) */
  large?: boolean;
}) {
  if (!hasOwnProductImage(imageUrl)) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-vinilo-azul px-4 text-center text-white ${
          large ? "gap-4" : "gap-2"
        }`}
      >
        <PiCameraBold aria-hidden className={large ? "text-5xl" : "text-3xl"} />
        <span className={`rotulo max-w-full break-words ${large ? "text-[clamp(1.75rem,3.4vw,3rem)]" : "text-[0.85rem] min-[400px]:text-base lg:text-lg"}`}>
          {label}
        </span>
        <span className={large ? "text-base text-white/90" : "text-xs text-white/85"}>
          Foto en camino
        </span>
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      fill
      preload={priority}
      loading={priority ? "eager" : undefined}
      sizes={sizes}
      className="object-contain p-4"
    />
  );
}
