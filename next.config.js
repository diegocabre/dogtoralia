/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Fotos del feed de Instagram: el CDN usa hosts distintos según la
      // región/servidor (scontent-gru1-1, scontent-xxx-2, *.fbcdn.net...),
      // así que se permite el dominio completo en vez de hosts sueltos.
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clarity.ms https://c.bing.com",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              // data: para la fuente de íconos embebida en el CSS de Swiper
              "font-src 'self' data: fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://*.clarity.ms https://c.bing.com",
              "frame-src 'self' https://www.google.com",
              "frame-ancestors 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
