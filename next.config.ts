import type { NextConfig } from "next";

const WWW_HOST = [{ type: "host" as const, value: "www.dogtoraliavet.cl" }];

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  experimental: {
    // Sin la caché persistente de Turbopack en `next build`: Vercel restauró
    // una caché vieja y publicó el CSS de un globals.css anterior (HTML nuevo
    // sin colores ni tipografías). Compilar siempre desde cero evita que el
    // CSS quede desfasado del código.
    turbopackFileSystemCacheForBuild: false,
  },
  async redirects() {
    return [
      // www responde con 200 y canónica al dominio sin www: Search Console lo
      // marca como "alternativa". La raíz va directo a /home, en un solo salto.
      { source: "/", has: WWW_HOST, destination: "https://dogtoraliavet.cl/home", permanent: true },
      { source: "/:path*", has: WWW_HOST, destination: "https://dogtoraliavet.cl/:path*", permanent: true },
      {
        // La página de inicio es /home. Es un redirect real (HTTP 308 con
        // cabecera Location) para que Google lo siga y consolide todo en
        // /home; el redirect() de una página puede no enviar esa cabecera.
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Aplica a todas las rutas del sitio
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // Content-Security-Policy: ajusta los dominios si agregas nuevos
            // servicios externos (analytics, fuentes, etc.)
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Clarity carga su script real desde scripts.clarity.ms (no solo www)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clarity.ms https://c.bing.com https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              // Las fuentes las sirve next/font desde el propio sitio
              "font-src 'self' fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://*.clarity.ms https://c.bing.com https://challenges.cloudflare.com",
              "frame-src 'self' https://www.google.com https://challenges.cloudflare.com",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
