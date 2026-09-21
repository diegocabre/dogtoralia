import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dogtoralia",
  description: "Tu tienda de mascotas",
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
