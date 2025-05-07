"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "loading") {
            setLoading(true);
            return;
        }

        if (session?.user) {
            setUser({
                id: session.user.email || "",
                name: session.user.name || "",
                email: session.user.email || "",
                image: session.user.image || undefined,
            });
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [session, status]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext); 