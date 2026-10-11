"use client";

import { MotionConfig } from "framer-motion";

/**
 * Con "user", toda animación de Framer Motion respeta prefers-reduced-motion:
 * se saltan los movimientos (transform, layout) y se mantienen los fundidos.
 * Las animaciones en CSS tienen su propia regla en globals.css.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
