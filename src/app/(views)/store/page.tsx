import { BiStoreAlt } from "react-icons/bi";
import { Title } from "./components";
import { seedData } from "../../seed/seed";
import { ProductGrid } from './components/products/product-grid/ProductGrid';
import { Weigh } from "@/app/interfaces"; // Asegúrate de importar la interfaz correcta

// Convertir el weight de string[] a Weigh[]
const products = seedData.flatMap(category =>
    category.products.map(product => ({
        ...product,
        slug: product.name.toLowerCase().replace(/\s+/g, "-"), // Reemplazo de espacios
        weight: product.weight ? product.weight.map(w => w as Weigh) : null, // ✅ Conversión correcta
    }))
);

export default async function ShopPage() {
    return (
        <div className="container mx-auto p-6">
            <Title
                title="Dogtoralia"
                description="Tu Veterinaria de confianza"
                icon={<BiStoreAlt size={40} className="text-terciary}" />}
            />

            <ProductGrid products={products} />
        </div>
    );
}
