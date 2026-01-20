'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Clock, Tag } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import { staticBlogPosts, type BlogPost } from "@/lib/blog-data";
import DOMPurify from "dompurify";
import SocialEmbed from "@/components/SocialEmbed";

// Simple markdown-like parser for basic formatting
function parseContent(content: string): string {
  // Split into lines
  let html = content
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-8 mb-4 text-foreground">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-10 mb-6 text-foreground">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-12 mb-8 text-foreground">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^- (.*$)/gm, '<li class="ml-4 text-muted-foreground">$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 text-muted-foreground list-decimal">$2</li>')
    // Blockquotes
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-secondary pl-4 my-4 italic text-muted-foreground">$1</blockquote>')
    // Tables (basic)
    .replace(/\|(.*)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.some(c => c.includes('---'))) {
        return '';
      }
      const cellsHtml = cells.map(c => `<td class="border border-border/50 px-4 py-2">${c.trim()}</td>`).join('');
      return `<tr>${cellsHtml}</tr>`;
    })
    // Paragraphs
    .replace(/^(?!<[hlubt]|<li|<block)(.+)$/gm, '<p class="text-muted-foreground mb-4 leading-relaxed">$1</p>');

  // Wrap lists
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-4 space-y-2">$&</ul>');

  // Wrap tables
  html = html.replace(/(<tr>.*<\/tr>\n?)+/g, '<table class="w-full border-collapse my-6">$&</table>');

  return html;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      // Try to fetch from Supabase first
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error || !data) {
        // Fallback to static posts
        const staticPost = staticBlogPosts.find(p => p.slug === slug && p.published);
        if (staticPost) {
          setPost(staticPost);
        } else {
          setNotFound(true);
        }
      } else {
        setPost(data);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      // Fallback to static posts
      const staticPost = staticBlogPosts.find(p => p.slug === slug && p.published);
      if (staticPost) {
        setPost(staticPost);
      } else {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // Estimate reading time
  const estimateReadingTime = (content: string | null) => {
    if (!content) return 5;
    const words = content.split(/\s+/).length;
    return Math.max(3, Math.ceil(words / 200));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="bg-orb bg-orb-amber w-[600px] h-[600px] -top-40 -left-40" style={{ animationDelay: '0s' }} />
          <div className="bg-orb bg-orb-cyan w-[500px] h-[500px] top-1/4 -right-32" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative z-10">
          <Navbar />
          <div className="container mx-auto px-6 pt-32 pb-16">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-muted/50 rounded w-3/4" />
                <div className="h-4 bg-muted/50 rounded w-1/2" />
                <div className="h-64 bg-muted/50 rounded mt-8" />
                <div className="space-y-2 mt-8">
                  <div className="h-4 bg-muted/50 rounded" />
                  <div className="h-4 bg-muted/50 rounded" />
                  <div className="h-4 bg-muted/50 rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="bg-orb bg-orb-amber w-[600px] h-[600px] -top-40 -left-40" style={{ animationDelay: '0s' }} />
          <div className="bg-orb bg-orb-cyan w-[500px] h-[500px] top-1/4 -right-32" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative z-10">
          <Navbar />
          <div className="container mx-auto px-6 pt-32 pb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
              <p className="text-muted-foreground mb-8">
                El artículo que buscas no existe o ha sido removido.
              </p>
              <Link href="/blog">
                <Button variant="hero">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Blog
                </Button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
        <WhatsAppButton />
        <ChatBot />
      </main>
    );
  }

  const contentHtml = post.content ? parseContent(post.content) : '';
  const sanitizedContent = typeof window !== 'undefined' ? DOMPurify.sanitize(contentHtml) : contentHtml;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="bg-orb bg-orb-amber w-[600px] h-[600px] -top-40 -left-40" style={{ animationDelay: '0s' }} />
        <div className="bg-orb bg-orb-cyan w-[500px] h-[500px] top-1/4 -right-32" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Article Header */}
        <article className="pt-32 pb-16 lg:pt-40 lg:pb-24 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Back button */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al Blog
              </Link>

              {/* Category */}
              {post.category && (
                <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
                  {post.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author_name || "OVA VISION"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(new Date(post.published_at || post.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{estimateReadingTime(post.content || post.excerpt)} min de lectura</span>
                </div>
              </div>

              {/* Cover Image */}
              {post.cover_image && (
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-secondary pl-6">
                  {post.excerpt}
                </p>
              )}

              {/* Content */}
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />

              {/* Social Embed */}
              {post.social_embed && post.social_embed_type && (
                <SocialEmbed url={post.social_embed} type={post.social_embed_type} />
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/50">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-muted/30 text-muted-foreground text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="glass-card p-8 mt-12 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  ¿Te interesa automatizar tu empresa?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Agenda una consultoría gratuita y descubre cómo podemos ayudarte.
                </p>
                <Link href="/contacto">
                  <Button variant="hero" size="xl">
                    Agendar Consultoría Gratis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </div>
      <WhatsAppButton />
      <ChatBot />
    </main>
  );
}
