import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import FloatingWidgets from "@/components/FloatingWidgets";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthHandler from "@/components/AuthHandler";

const GA_ID = "G-FJE0KJMQNM";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "OVA VISION | Agencia de Automatización IA & Branding en Venezuela",
  description: "Transformamos empresas con automatización inteligente, agentes de IA y branding estratégico. Servicios de automatización, agentes IA y diseño de marca en Venezuela y LATAM.",
  keywords: ["automatización", "inteligencia artificial", "branding", "Venezuela", "agentes IA", "diseño web", "marketing digital", "LATAM"],
  authors: [{ name: "OVA VISION" }],
  creator: "OVA VISION",
  publisher: "OVA VISION",
  metadataBase: new URL("https://www.ovavisionagency.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: "https://www.ovavisionagency.com",
    siteName: "OVA VISION",
    title: "OVA VISION | Agencia de Automatización IA & Branding",
    description: "Transformamos empresas con automatización inteligente, agentes de IA y branding estratégico.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OVA VISION - Automatización e IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OVA VISION | Automatización IA & Branding",
    description: "Transformamos empresas con automatización inteligente y branding estratégico.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "44SwyeUsdejhunWpOdu-zBGpSWdD1H_qeegc170DYKA",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={`${outfit.className} antialiased`}>
        <AuthProvider>
          <AuthHandler />
          {children}
          <Toaster />
          <FloatingWidgets />
        </AuthProvider>
      </body>
    </html>
  );
}
