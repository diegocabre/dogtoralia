import Image from "next/image";

interface ProductCardProps {
    name: string;
    image: string;
    price: number;
    category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image, price, category }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
            <Image src={image} alt={name} width={200} height={200} className="rounded-lg object-cover" />
            <h3 className="text-lg font-semibold mt-2">{name}</h3>
            <p className="text-sm text-gray-500">{category}</p>
            <p className="text-primary font-bold text-xl mt-1">${price.toFixed(2)}</p>
            <button className="bg-primary text-white py-2 px-4 rounded-lg mt-3 w-full hover:bg-secondary transition">
                Agregar al Carrito
            </button>
        </div>
    );
};

export default ProductCard;
