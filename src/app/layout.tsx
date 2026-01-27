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
        {/* Schema.org LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "OVA VISION",
              "description": "Agencia de Automatización IA & Branding en Venezuela. Transformamos empresas con automatización inteligente, agentes de IA y branding estratégico.",
              "url": "https://www.ovavisionagency.com",
              "logo": "https://www.ovavisionagency.com/assets/logo-ova-vision.png",
              "image": "https://www.ovavisionagency.com/og-image.png",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "VE",
                "addressRegion": "Venezuela"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "10.4806",
                "longitude": "-66.9036"
              },
              "areaServed": ["Venezuela", "LATAM"],
              "serviceType": ["Automatización", "Inteligencia Artificial", "Branding", "Diseño Web", "Agentes IA"],
              "priceRange": "$$",
              "sameAs": [
                "https://www.instagram.com/ovavision.ve"
              ]
            })
          }}
        />
        {/* Schema.org ProfessionalService JSON-LD for GEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "OVA VISION - Servicios de Automatización e IA",
              "description": "Servicios profesionales de automatización empresarial, desarrollo de agentes de inteligencia artificial y branding digital en Venezuela y Latinoamérica.",
              "url": "https://www.ovavisionagency.com/servicios",
              "provider": {
                "@type": "Organization",
                "name": "OVA VISION",
                "url": "https://www.ovavisionagency.com"
              },
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "10.4806",
                  "longitude": "-66.9036"
                },
                "geoRadius": "5000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios OVA VISION",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Automatización Empresarial",
                      "description": "Sistemas de automatización low-code y no-code para optimizar procesos empresariales, desde gestión de pagos hasta ERPs completos."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Agentes de IA Personalizados",
                      "description": "Desarrollo de asistentes virtuales y chatbots con inteligencia artificial entrenados para tu negocio específico."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Branding y Diseño Web",
                      "description": "Creación de identidad de marca completa, logos, diseño de empaques y desarrollo de sitios web profesionales."
                    }
                  }
                ]
              }
            })
          }}
        />
        {/* Schema.org FAQPage JSON-LD for GEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "¿Qué es la automatización empresarial con IA?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La automatización empresarial con IA es el uso de inteligencia artificial y herramientas low-code/no-code para optimizar procesos repetitivos como gestión de pagos, inventario, CRM, facturación y atención al cliente. Permite a las empresas reducir errores humanos, ahorrar tiempo y operar 24/7 sin intervención manual constante."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Cuánto cuesta implementar automatización en mi empresa?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "El costo varía según el nivel de automatización. La automatización básica (pagos, inventario, reservas) toma 1-2 semanas. La automatización media (CRM, reportes, facturación) requiere 3-4 semanas. Los sistemas avanzados tipo ERP pueden tomar 1-3 meses. Ofrecemos consultoría gratuita para evaluar tus necesidades específicas."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Qué es un agente de IA y cómo puede ayudar a mi negocio?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Un agente de IA es un asistente virtual inteligente entrenado específicamente para tu negocio. Puede atender clientes 24/7 por WhatsApp, web o redes sociales, responder consultas complejas, calificar leads, agendar reuniones y resolver problemas automáticamente. Esto reduce costos de atención al cliente y mejora la experiencia del usuario."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿OVA VISION trabaja con empresas fuera de Venezuela?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí, OVA VISION ofrece servicios de automatización, agentes de IA y branding a empresas en toda Latinoamérica. Trabajamos de forma remota con clientes en Colombia, México, Argentina, Chile, Perú y otros países de la región, adaptando nuestras soluciones a las necesidades específicas de cada mercado."
                  }
                },
                {
                  "@type": "Question",
                  "name": "¿Qué incluye el servicio de branding de OVA VISION?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nuestro servicio de branding incluye: concepto de marca completa, diseño de logo profesional con variaciones, paleta de colores, tipografías, manual de marca, ilustraciones personalizadas, diseño de empaques y desarrollo de sitio web con SEO optimizado. Cada proyecto se adapta a las necesidades específicas del cliente."
                  }
                }
              ]
            })
          }}
        />
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
