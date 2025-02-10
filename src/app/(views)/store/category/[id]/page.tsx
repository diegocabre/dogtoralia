import Link from "next/link";
import { seedData } from "../../../../seed/seed";
import { ProductGridItem } from "../../components";
import { Weigh } from "../../../../interfaces/product.interface"; // Importa el tipo `Weigh`

interface Props {
    params: { id: string };
}

// ✅ Lista de valores permitidos en Weigh[]
const validWeights: Weigh[] = ["7kg", "15kg", "20kg"];

export default function CategoryPage({ params }: Props) {
    const { id } = params;

    // Buscar la categoría que coincide con el 'id' proporcionado
    const category = seedData.find(
        (cat) => cat.name.toLowerCase() === id.toLowerCase()
    );

    // Si no se encuentra la categoría, manejar el caso aquí
    if (!category) {
        return (
            <div className="text-center px-5 mx-5 my-5 gap-5 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">Categoría no encontrada</p>
                <Link
                    href="/views/store"
                    className="bg-primary text-white py-2 px-4 rounded-lg mt-3 hover:bg-secondary hover:underline hover:text-accent transition"
                >
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1>{category.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.products.map((product) => (
                    <ProductGridItem
                        key={product.name}
                        product={{
                            ...product,
                            slug: product.name.toLowerCase().replace(/\s+/g, "-"), // ✅ Corrige los espacios en el slug
                            weight: product.weight
                                ? product.weight.filter((w): w is Weigh => validWeights.includes(w as Weigh)) // ✅ Filtra solo valores válidos
                                : undefined,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
