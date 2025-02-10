import type { Metadata } from "next";
import "./globals.css";
import { SideBar, TopMenu } from "./components";
import { moskFont, montserratFont } from "@/app/config/font";

export const metadata: Metadata = {
  title: "Dogtoralia",
  description: "Dogtoralia tu Veterinaria de confianza",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${moskFont.variable} ${montserratFont.variable}`}>
      <head />
      <body className={`font-mosk antialiased font-semibold`}>
        <TopMenu />
        <SideBar />
        {children}
      </body>
    </html>
  );
}
