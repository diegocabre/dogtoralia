import ProductCard from "./ProductCard";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: { name: string };
    images: { url: string }[];
}

interface ProductListProps {
    title: string;
    products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ title, products }) => {
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        image={product.images.length > 0 ? product.images[0].url : "/default.jpg"} // ✅ Manejo de imágenes vacías
                        price={product.price}
                        category={product.category.name}
                    />
                ))}
            </div>
        </section>
    );
};
