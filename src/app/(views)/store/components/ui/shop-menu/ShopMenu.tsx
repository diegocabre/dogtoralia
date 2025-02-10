import Link from "next/link";
import { GiShop } from "react-icons/gi";
import { MdMoveToInbox, MdPets } from "react-icons/md";
import { PiStethoscopeThin } from "react-icons/pi";
import CartPage from "../../../cart/page";
import { BsCart4 } from "react-icons/bs";

export const ShopMenu = () => {
    return (
        <div className="flex justify-between items-center border-b-2 border-terciary">
            <nav className="-mb-0.5 flex flex-wrap justify-center items-center gap-x-6">
                <Link className="m-2 p-2 rounded-md transition-all duration-300 hover:text-secondary" href="/store">
                    <GiShop className="w-5 h-5" />
                    Todos
                </Link>
                <Link className="m-2 p-2 rounded-md transition-all duration-300 hover:text-secondary" href="/store/category/alimentos">
                    <MdPets className="w-5 h-5" />
                    Alimentos
                </Link>
                <Link className="m-2 p-2 rounded-md transition-all duration-300 hover:text-secondary" href="/store/category/medicamentos">
                    <PiStethoscopeThin className="w-5 h-5" />
                    Medicamentos
                </Link>
                <Link className="m-2 p-2 rounded-md transition-all duration-300 hover:text-secondary" href="/store/category/accesorios">
                    <MdMoveToInbox className="w-5 h-5" />
                    Accesorios
                </Link>

            </nav>
            <div className="ml-auto">
                <Link href="/store/cart" className="relative flex items-center gap-2">
                    <BsCart4 className="w-6 h-6 text-gray-700 hover:text-[var(--color-secondary)]" />
                    <span className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white text-xs px-2 rounded-full">
                        3
                    </span>
                </Link>
            </div>
        </div>
    );
};
