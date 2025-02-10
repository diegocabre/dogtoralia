"use client";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
}


export const QuantitySelector = ({ quantity }: Props) => {
    const [count, setCount] = useState(quantity);

    const onQuantityChange = (value: number) => {
        if (count + value < 1) return;

        setCount(count + value);
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={() => onQuantityChange(- 1)}
                className=" text-accent py-2 px-4 rounded-lg cursor-pointer"><IoRemoveCircleOutline size={30} /></button>
            <span className="w-20 mx-3 px-5 py-2 text-center text-lg border border-accent bg-amber-100">{count}</span>
            <button
                onClick={() => onQuantityChange(+ 1)}
                className=" text-accent py-2 px-4 rounded-lg cursor-pointer"><IoAddCircleOutline size={30} /></button>
        </div>
    )
}

