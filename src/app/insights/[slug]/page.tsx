'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Clock, Tag, Share2, Bookmark } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import { type BlogPost } from "@/lib/blog-data";
import { getAuthorByName } from "@/lib/authors-data";
import DOMPurify from "dompurify";
import SocialEmbed from "@/components/SocialEmbed";
import AuthorCard from "@/components/AuthorCard";
import RelatedServices from "@/components/RelatedServices";
import ArticleSchema from "@/components/ArticleSchema";

// Simple markdown-like parser for basic formatting
function parseContent(content: string): string {
  let html = content
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-8 mb-4 text-foreground">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-10 mb-6 text-foreground">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-12 mb-8 text-foreground">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gm, '<li class="ml-4 text-muted-foreground">$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 text-muted-foreground list-decimal">$2</li>')
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-secondary pl-4 my-4 italic text-muted-foreground">$1</blockquote>')
    .replace(/^(?!<[hlubt]|<li|<block)(.+)$/gm, '<p class="text-muted-foreground mb-4 leading-relaxed">$1</p>');

  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-4 space-y-2">$&</ul>');

  return html;
}

export default function InsightPostPage() {
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
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setPost(data);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

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
              <Link href="/insights">
                <Button variant="hero">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver a Insights
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
  const author = getAuthorByName(post.author_name);
  const articleUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://www.ovavisionagency.com/insights/${post.slug}`;

  // Generar alt text descriptivo para SEO
  const imageAlt = `${post.title} - Artículo sobre ${post.category || 'automatización'} por ${author.name} en OVA VISION`;

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Schema.org JSON-LD para SEO */}
      <ArticleSchema post={post} url={articleUrl} />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="bg-orb bg-orb-amber w-[600px] h-[600px] -top-40 -left-40" style={{ animationDelay: '0s' }} />
        <div className="bg-orb bg-orb-cyan w-[500px] h-[500px] top-1/4 -right-32" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <Navbar />

        <article className="pt-32 pb-16 lg:pt-40 lg:pb-24 w-full" itemScope itemType="https://schema.org/Article">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb navigation */}
              <nav className="mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/" className="hover:text-secondary transition-colors">
                      Inicio
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href="/insights" className="hover:text-secondary transition-colors">
                      Insights
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-foreground truncate max-w-[200px]" aria-current="page">
                    {post.title}
                  </li>
                </ol>
              </nav>

              {post.category && (
                <Link
                  href={`/insights?category=${encodeURIComponent(post.category)}`}
                  className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6 hover:bg-secondary/20 transition-colors"
                >
                  {post.category}
                </Link>
              )}

              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                itemProp="headline"
              >
                {post.title}
              </h1>

              {/* Información del autor mejorada para EEAT */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-8 border-b border-border/50">
                <AuthorCard author={author} variant="compact" />
                <div className="flex items-center gap-4 text-sm text-muted-foreground sm:ml-auto">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <time
                      dateTime={post.published_at || post.created_at}
                      itemProp="datePublished"
                    >
                      {format(new Date(post.published_at || post.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{estimateReadingTime(post.content || post.excerpt)} min de lectura</span>
                  </div>
                </div>
              </div>

              {post.cover_image && (
                <figure className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
                  <img
                    src={post.cover_image}
                    alt={imageAlt}
                    className="w-full h-full object-cover"
                    itemProp="image"
                    loading="eager"
                  />
                  <figcaption className="sr-only">{imageAlt}</figcaption>
                </figure>
              )}

              {post.excerpt && (
                <p
                  className="text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-secondary pl-6"
                  itemProp="description"
                >
                  {post.excerpt}
                </p>
              )}

              <div
                className="prose prose-invert max-w-none"
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />

              {post.social_embed && post.social_embed_type && (
                <SocialEmbed url={post.social_embed} type={post.social_embed_type} />
              )}

              {/* Tags con enlaces */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/50">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/insights?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 rounded-full bg-muted/30 text-muted-foreground text-sm hover:bg-secondary/20 hover:text-secondary transition-colors"
                      itemProp="keywords"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Servicios relacionados (Internal Linking para SEO) */}
              <RelatedServices category={post.category} articleTitle={post.title} />

              {/* Información completa del autor (EEAT) */}
              <div className="mt-12">
                <AuthorCard author={author} variant="full" showCredentials={true} />
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
