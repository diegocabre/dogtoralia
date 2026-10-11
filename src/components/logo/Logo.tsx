import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "h-11 w-auto" }: { className?: string }) {
    return (
        <Link href="/home" aria-label="Dogtoralia Vet, ir al inicio" className="block">
            <Image
                src="/img/LOGO.png"
                alt="Dogtoralia Vet"
                width={1773}
                height={705}
                loading="eager"
                sizes="180px"
                className={className}
            />
        </Link>
    );
}
