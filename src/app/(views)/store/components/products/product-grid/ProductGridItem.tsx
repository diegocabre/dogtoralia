"use client";
import { Product } from "@/app/interfaces";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";


interface Props {
    product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0].url);
    return (
        <div className="rounded-md overflow-hidden shadow-md">
            <Link href={`/store/product/${product.slug}`}>
                <Image
                    src={`/products/${product.images[0].url}`}
                    alt={product.images[0]?.altText ?? product.name}
                    width={500}
                    height={500}
                    className="w-full h-48 object-cover"
                    onMouseEnter={() => setDisplayImage(product.images[1].url)}
                    onMouseLeave={() => setDisplayImage(product.images[0].url)}
                />
            </Link>
            <div className="p-4 flex flex-col justify-between">
                <Link
                    className="text-lg font-semibold mb-2 hover:underline hover:text-secondary"
                    href={`/store/product/${product.slug}`}>
                    {product.name}
                </Link>
                <span className="font-bold text-terciary ">${product.price}</span>
            </div>
        </div>
    )
}

