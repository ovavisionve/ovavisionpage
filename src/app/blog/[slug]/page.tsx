"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, Tag, Search, ArrowRight, Clock } from "lucide-react";

// Datos estáticos (luego los reemplazas con Supabase)
const staticPosts = [
  {
    id: "1",
    title: "Cómo la IA está transformando empresas en Venezuela",
    slug: "ia-transformando-empresas-venezuela",
    excerpt: "Descubre cómo las empresas venezolanas están adoptando la inteligencia artificial para mejorar sus procesos.",
    cover_image: "/blog-covers/tendencias-ia-venezuela-cover.jpg",
    author_name: "OVA VISION",
    category: "Inteligencia Artificial",
    published_at: "2025-01-10",
  },
  {
    id: "2", 
    title: "Guía completa de automatización para PyMEs",
    slug: "guia-automatizacion-pymes",
    excerpt: "Todo lo que necesitas saber para empezar a automatizar tu pequeña o mediana empresa.",
    cover_image: "/blog-covers/guia-automatizacion-ia-cover.jpg",
    author_name: "OVA VISION",
    category: "Automatización",
    published_at: "2025-01-05",
  },
  {
    id: "3",
    title: "5 errores comunes al automatizar procesos",
    slug: "errores-comunes-automatizacion",
    excerpt: "Evita estos errores frecuentes que cometen las empresas al implementar automatización.",
    cover_image: "/blog-covers/errores-automatizacion-cover.jpg",
    author_name: "OVA VISION",
    category: "Guías Prácticas",
    published_at: "2025-01-01",
  },
];

const categories = ["Automatización", "Inteligencia Artificial", "Casos de Estudio", "Tendencias", "Guías Prácticas"];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = staticPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] -top-40 -left-40 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[500px] h-[500px] top-1/4 -right-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-6">
                Blog
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Insights sobre{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  IA y Automatización
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Aprende cómo la automatización inteligente está transformando empresas.
              </p>
            </div>
          </div>
        </section>

        <section className="pb-8">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-muted/30 border-border/50"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Todos
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 lg:py-16">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="relative w-full h-48">
                    <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 text-xs font-medium mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author_name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.published_at}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-cyan-500 text-sm font-medium">
                      Leer más <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <WhatsAppButton />
    </main>
  );
}
