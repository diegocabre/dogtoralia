"use client";

import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";

const INACTIVITY_LIMIT = 3 * 60 * 1000; // 3 minutos en ms

export default function AutoLogout() {
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const resetTimer = () => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                setShowMessage(true);
                signOut({ callbackUrl: "/auth/login" });
            }, INACTIVITY_LIMIT);
        };

        // Eventos de actividad
        const events = ["mousemove", "keydown", "mousedown", "touchstart"];
        events.forEach((event) => window.addEventListener(event, resetTimer));
        resetTimer();

        return () => {
            if (timer.current) clearTimeout(timer.current);
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, []);

    return showMessage ? (
        <div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white text-center py-3 font-semibold shadow-lg">
            Tu sesión se cerró por inactividad. Por favor, vuelve a iniciar sesión.
        </div>
    ) : null;
} 