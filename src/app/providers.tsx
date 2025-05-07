"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import AutoLogout from "@/components/auth/AutoLogout";
import { CartProvider } from "@/store/cartStore";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AuthProvider>
                <CartProvider>
                    <AutoLogout />
                    {children}
                </CartProvider>
            </AuthProvider>
        </SessionProvider>
    );
}
