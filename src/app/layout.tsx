import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  THEME_COLOR,
  OG_IMAGE,
} from "@/data/site";
import { graph, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
const inter = Inter({ subsets: ["latin"] });

const DEFAULT_TITLE = `${SITE_NAME} | Veterinaria en Puente Alto y Santiago Centro`;

// Metadata base: la heredan todas las páginas. Cada página define la suya
// con pageMetadata() (src/lib/seo.ts) para título, descripción y canónica.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "veterinary",
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    url: "/home",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Evita que iOS/Android conviertan textos en enlaces sin control, pero deja
  // el teléfono y la dirección como enlaces tocables.
  formatDetection: { telephone: true, address: true, email: true },
  other: {
    // Señales geográficas (las usan algunos buscadores además de Google)
    "geo.region": "CL-RM",
    "geo.placename": "Puente Alto, Santiago",
    "geo.country": "CL",
    language: "es-CL",
    "apple-mobile-web-app-title": SITE_NAME,
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CL">
      <body className={inter.className}>
        {/* Datos estructurados del negocio, presentes en todas las páginas */}
        <JsonLd data={graph(organizationJsonLd(), websiteJsonLd())} />
        {/* Microsoft Clarity: analítica de comportamiento (mapas de calor,
            grabaciones de sesión). afterInteractive = no bloquea la carga
            inicial de la página. */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ylhv39f8zq");
          `}
        </Script>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
