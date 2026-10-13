import Link from "next/link";
import { PiArrowLeftBold, PiWhatsappLogoBold } from "react-icons/pi";
import { cleanAndCapitalize } from "@/lib/utils";
import { MAIN_WHATSAPP_PHONE, whatsappUrl } from "@/data/locations";
import { ProductImage } from "@/components/store/ProductImage";
import { EtiquetaReceta } from "@/components/store/EtiquetaReceta";

interface ProductClientProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        description: string;
        subCategory: string;
        requiresPrescription: boolean;
    };
}

/** Ficha de producto: la foto y los datos en dos paneles del mismo marco. */
export default function ProductClient({ product }: ProductClientProps) {
    const name = cleanAndCapitalize(product.name);
    const productWhatsappUrl = whatsappUrl(
        MAIN_WHATSAPP_PHONE,
        `Hola! Me interesa este producto: ${name}`
    );

    return (
        <main className="min-h-screen bg-muro pb-14 pt-[76px] sm:pb-20 lg:pt-[88px]">
            <div className="mx-auto max-w-6xl px-3 sm:px-6">
                <Link
                    href="/store"
                    className="mb-3 inline-flex min-h-11 items-center gap-2 px-1 font-semibold text-grafito underline decoration-vinilo-mostaza decoration-[3px] underline-offset-[6px] hover:decoration-grafito"
                >
                    <PiArrowLeftBold aria-hidden /> Volver a la tienda
                </Link>

                <div className="grid gap-1.5 rounded-md bg-grafito p-1.5 sm:gap-2 sm:p-2 md:grid-cols-2">
                    <div className="relative aspect-[4/3] max-h-[38vh] w-full min-w-0 overflow-hidden rounded-[3px] bg-white md:aspect-auto md:max-h-none md:min-h-[360px] lg:aspect-square lg:min-h-0">
                        <ProductImage
                            imageUrl={product.imageUrl}
                            alt={name}
                            label={product.subCategory}
                            sizes="(max-width: 768px) 100vw, 560px"
                            priority
                            large
                        />
                    </div>

                    <div className="flex min-w-0 flex-col rounded-[3px] bg-white px-5 py-7 text-grafito sm:px-9 sm:py-10">
                        <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-grafito-suave">
                            <span>{product.subCategory}</span>
                            <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-grafito-suave">
                            Se retira en la sede de Puente Alto o de Santiago Centro.
                        </p>
                        {product.requiresPrescription && (
                                <EtiquetaReceta />
                            )}
                        </p>
                        <h1 className="mt-3 text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-tight">{name}</h1>
                        <a
                            href={productWhatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Consultar por WhatsApp: ${name}`}
                            className="presionable mt-6 inline-flex min-h-12 items-center justify-between gap-3 self-start rounded-[10px] border-[3px] border-grafito bg-white py-1.5 pl-4 pr-1.5 text-grafito shadow-letrero"
                        >
                            <span className="rotulo text-base lg:whitespace-nowrap lg:text-lg">
                                <span className="lg:hidden">Consultar</span>
                                <span className="hidden lg:inline">Consultar por WhatsApp</span>
                            </span>
                            <span
                                aria-hidden
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-2xl text-white"
                            >
                                <PiWhatsappLogoBold />
                            </span>
                        </a>
                        {product.description && (
                            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-grafito-suave">
                                {product.description}
                            </p>
                        )}
                        <p className="mt-5 max-w-[60ch] text-sm leading-relaxed text-grafito-suave">
                            Se retira en la sede de Puente Alto o de Santiago Centro.
                        </p>
                        {product.requiresPrescription && (
                            <p className="mt-5 max-w-[60ch] rounded-[3px] bg-muro px-4 py-3 text-sm leading-relaxed">
                                Este producto requiere receta veterinaria. Si no la tienes, podemos ver a tu
                                mascota en consulta.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
