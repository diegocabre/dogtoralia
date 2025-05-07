"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={0}>
      <AuthProvider>
        <NavBar />
        {children}
        <Footer />
      </AuthProvider>
    </SessionProvider>
  );
} 