import { Product } from "@/app/interfaces"
import { ProductGridItem } from "./ProductGridItem"

interface Props {
    products: Product[]
}

export const ProductGrid = ({ products }: Props) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-5">
            {
                products.map((product) => (
                    <ProductGridItem 
                    key={product.slug} 
                    product={product}
                    />
                ))
            }
        </div>
    )
}

