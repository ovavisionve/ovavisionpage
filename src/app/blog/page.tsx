"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Datos estáticos
const staticPosts: Record<string, any> = {
  "ia-transformando-empresas-venezuela": {
    title: "Cómo la IA está transformando empresas en Venezuela",
    excerpt: "Descubre cómo las empresas venezolanas están adoptando la inteligencia artificial.",
    content: `
      <h2>La revolución de la IA en Venezuela</h2>
      <p>La inteligencia artificial está cambiando la forma en que las empresas operan en Venezuela. Desde la automatización de procesos hasta la mejora en la toma de decisiones, la IA ofrece oportunidades sin precedentes.</p>
      <h3>Beneficios principales</h3>
      <ul>
        <li>Reducción de costos operativos hasta en un 40%</li>
        <li>Mejora en la eficiencia de procesos</li>
        <li>Atención al cliente 24/7 con chatbots</li>
        <li>Análisis predictivo para mejores decisiones</li>
      </ul>
      <p>En OVA VISION, ayudamos a empresas venezolanas a implementar estas tecnologías de manera efectiva y accesible.</p>
    `,
    cover_image: "/blog-covers/tendencias-ia-venezuela-cover.jpg",
    author_name: "OVA VISION",
    category: "Inteligencia Artificial",
    published_at: "2025-01-10",
    tags: ["IA", "Venezuela", "Transformación Digital"],
  },
  "guia-automatizacion-pymes": {
    title: "Guía completa de automatización para PyMEs",
    excerpt: "Todo lo que necesitas saber para empezar a automatizar tu empresa.",
    content: `
      <h2>¿Por qué automatizar tu PyME?</h2>
      <p>La automatización no es solo para grandes empresas. Las PyMEs pueden beneficiarse enormemente de procesos automatizados.</p>
      <h3>Pasos para empezar</h3>
      <ol>
        <li>Identifica procesos repetitivos</li>
        <li>Evalúa herramientas disponibles</li>
        <li>Comienza con un proyecto piloto</li>
        <li>Mide resultados y escala</li>
      </ol>
    `,
    cover_image: "/blog-covers/guia-automatizacion-ia-cover.jpg",
    author_name: "OVA VISION",
    category: "Automatización",
    published_at: "2025-01-05",
    tags: ["PyMEs", "Automatización", "Guía"],
  },
  "errores-comunes-automatizacion": {
    title: "5 errores comunes al automatizar procesos",
    excerpt: "Evita estos errores frecuentes en tu implementación.",
    content: `
      <h2>Errores que debes evitar</h2>
      <p>Muchas empresas cometen errores al implementar automatización. Aquí te mostramos los más comunes.</p>
      <h3>1. Automatizar sin analizar</h3>
      <p>No automatices procesos que ya están rotos. Primero optimiza, luego automatiza.</p>
      <h3>2. Ignorar a tu equipo</h3>
      <p>La capacitación es clave. Tu equipo debe entender y adoptar las nuevas herramientas.</p>
    `,
    cover_image: "/blog-covers/errores-automatizacion-cover.jpg",
    author_name: "OVA VISION",
    category: "Guías Prácticas",
    published_at: "2025-01-01",
    tags: ["Errores", "Tips", "Automatización"],
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { toast } = useToast();
  const post = staticPosts[slug];

  const handleShare = async () => {
    try {
      await navigator.share({ title: post?.title, url: window.location.href });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Enlace copiado", description: "Copiado al portapapeles." });
    }
  };

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-16 container px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
          <Link href="/blog">
            <Button><ArrowLeft className="w-4 h-4 mr-2" />Volver al Blog</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] -top-40 -left-40 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[500px] h-[500px] top-1/4 -right-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <article className="pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto">
              <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft className="w-4 h-4" />Volver al Blog
              </Link>

              <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-500 text-sm font-medium mb-4">
                {post.category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2"><User className="w-4 h-4" />{post.author_name}</div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{post.published_at}</div>
                <Button variant="ghost" size="sm" onClick={handleShare}><Share2 className="w-4 h-4 mr-2" />Compartir</Button>
              </div>

              {post.cover_image && (
                <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden">
                  <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
                </div>
              )}

              <div 
                className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-cyan-500"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags && (
                <div className="mt-12 pt-8 border-t border-border flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-muted/50 text-sm">#{tag}</span>
                  ))}
                </div>
              )}

              <div className="mt-12 bg-card/50 border border-border/50 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold mb-4">¿Te interesa automatizar tu empresa?</h3>
                <Link href="/contacto">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">Contactar ahora</Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </div>
      <WhatsAppButton />
    </main>
  );
}
