import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "OVA VISION | Agencia de Automatización IA & Branding en Venezuela",
  description: "Transformamos empresas con automatización inteligente, agentes de IA y branding estratégico.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${outfit.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
