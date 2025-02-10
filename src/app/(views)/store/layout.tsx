import { ShopMenu } from "./components";
import Image from 'next/image';


export default function ShopLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="container mx-auto p-8 min-h-screen mt-10">
            <ShopMenu />
            {children}
        </main>
    );
}