import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dogtoralia",
  description: "Tu tienda de mascotas",
  verification: {
    // Verificación de Google Search Console (método "Etiqueta HTML").
    // El valor es el mismo código que trae el archivo
    // "googlec9e1456a3d8383ce.html" que ofrece el método de archivo —
    // esta forma es más simple porque no depende de subir un archivo
    // suelto a la raíz del sitio (algo que Next.js no sirve tal cual).
    google: "c9e1456a3d8383ce",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
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
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
