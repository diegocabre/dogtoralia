import { montserratFont } from "@/app/config/font";
import React from "react";

interface Props {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
}

export const Title = ({ title, description, icon, className }: Props) => {
    return (
        <div className={`flex flex-row items-center justify-center text-center ${className}`}>
            {icon && icon}
            <h1 className={`${montserratFont.className} antialiased text-3xl font-bold text-primary my-10`}>
                {title}
            </h1>
            {description && <h3 className="text-accent ml-5">{description}</h3>}
        </div>
    );
};
