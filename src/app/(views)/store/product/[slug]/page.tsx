import { seedData } from "@/app/seed/seed";
import { notFound } from "next/navigation";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, WeighSelector } from "../../components";

interface Props {
    params: { slug: string };
}

// ✅ Pre-generamos rutas estáticas (SSG)
export async function generateStaticParams() {
    return seedData.flatMap(category =>
        category.products.map(product => ({
            slug: product.name.replace(/\s+/g, '-').toLowerCase(), // Convertimos nombres a slugs
        }))
    );
}

export default function ProductPage({ params }: Props) {
    const slug = decodeURIComponent(params.slug);

    const product = seedData.flatMap(category => category.products).find(product =>
        product.name.replace(/\s+/g, '-').toLowerCase() === slug
    );

    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="col-span-1 md:col-span-2">
                <ProductMobileSlideshow
                    name={product.name}
                    images={product.images.map(img => img.url)}
                    className="block md:hidden"
                />
                <ProductSlideshow
                    name={product.name}
                    images={product.images.map(img => img.url)}
                    className="hidden md:block"
                />
            </div>

            <div className="col-span-1 px-5">
                <h1 className="font-montserrat font-bold text-xl">{product.name}</h1>
                <p className="text-lg mb-5">${product.price}</p>

                {product.weight && (
                    <WeighSelector
                        selectedWeigh={product.weight ? (product.weight[0] as any) : undefined}
                        availableWeigh={product.weight as any}
                    />
                )}

                <QuantitySelector quantity={2} />
                <button className="btn-primary my-5">Agregar al carrito</button>

                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">{product.description}</p>
            </div>
        </div>
    );
}
