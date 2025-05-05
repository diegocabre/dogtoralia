import Image from "next/image";
import Link from "next/link";
export function Logo() {
    return (
        <div className="mt-10">
            <Link href="/">
                <Image src="/img/LOGO.png" alt="Logo" width={300} height={300} />
            </Link>
        </div>
    );
}   