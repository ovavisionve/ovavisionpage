'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { Calendar, User, Tag, Search, ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { staticBlogPosts, blogCategories, type BlogPost } from "@/lib/blog-data";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image, author_name, category, tags, published_at, created_at")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;

      // Use static posts as fallback if no posts from Supabase
      if (data && data.length > 0) {
        setPosts(data);
      } else {
        setPosts(staticBlogPosts.filter(p => p.published));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Use static posts as fallback on error
      setPosts(staticBlogPosts.filter(p => p.published));
    } finally {
      setLoading(false);
    }
  };

  const categories = blogCategories;

  // Estimate reading time based on content length (avg 200 words per minute)
  const estimateReadingTime = (content: string | null) => {
    if (!content) return 5;
    const words = content.split(/\s+/).length;
    return Math.max(3, Math.ceil(words / 200));
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="bg-orb bg-orb-amber w-[600px] h-[600px] -top-40 -left-40" style={{ animationDelay: '0s' }} />
        <div className="bg-orb bg-orb-cyan w-[500px] h-[500px] top-1/4 -right-32" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-ova-amber/10 text-ova-amber text-sm font-medium mb-6">
                Blog
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Insights sobre{" "}
                <span className="bg-gradient-to-r from-ova-amber to-ova-orange bg-clip-text text-transparent">
                  IA y Automatización
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Aprende cómo la automatización inteligente está transformando empresas en Venezuela y el mundo.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="pb-8 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-8 lg:py-16 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-card p-6 animate-pulse">
                      <div className="h-48 bg-muted/50 rounded-lg mb-4" />
                      <div className="h-6 bg-muted/50 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-muted/50 rounded w-full mb-2" />
                      <div className="h-4 bg-muted/50 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="glass-card p-12 max-w-lg mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Próximamente</h3>
                    <p className="text-muted-foreground mb-6">
                      Estamos preparando contenido increíble sobre automatización, IA y transformación digital. 
                      ¡Vuelve pronto!
                    </p>
                    <Link href="/contacto">
                      <Button variant="hero">
                        Suscríbete para notificaciones
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300"
                    >
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-ova-amber/20 to-secondary/20 flex items-center justify-center">
                          <Tag className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      
                      <div className="p-6">
                        {post.category && (
                          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium mb-3">
                            {post.category}
                          </span>
                        )}
                        
                        <h3 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">
                          {post.title}
                        </h3>
                        
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author_name || "OVA VISION"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {format(new Date(post.published_at || post.created_at), "d MMM yyyy", { locale: es })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{estimateReadingTime(post.excerpt)} min</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-secondary text-sm font-medium group-hover:gap-3 transition-all">
                          Leer más <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 lg:py-24 section-gradient-1 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Suscríbete a{" "}
                <span className="bg-gradient-to-r from-ova-amber to-ova-orange bg-clip-text text-transparent">
                  Insights Mensuales
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Recibe las últimas tendencias en automatización e IA directamente en tu bandeja de entrada.
              </p>
              <Link href="/contacto">
                <Button variant="hero" size="xl">
                  Suscribirme
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <WhatsAppButton />
      <ChatBot />
    </main>
  );
}