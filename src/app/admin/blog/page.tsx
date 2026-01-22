'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminGuard from '@/components/admin/AdminGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import {
  Plus, Search, Edit, Trash2, Eye, LogOut,
  FileText, Calendar, User, LayoutDashboard, Video
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  author_name: string | null;
  category: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export default function AdminBlogPage() {
  return (
    <AdminGuard>
      <AdminBlogContent />
    </AdminGuard>
  );
}

function AdminBlogContent() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este artículo?')) return;

    setDeleting(id);
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error al eliminar el artículo');
    } finally {
      setDeleting(null);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/assets/logo-ova-vision.png"
                alt="OVA VISION"
                width={120}
                height={60}
                className="h-10 w-auto"
              />
              <div className="h-8 w-px bg-border/50" />
              <h1 className="text-lg font-bold">Admin Blog</h1>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/admin/videos">
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4 mr-2" />
                  Videos
                </Button>
              </Link>
              <Link href="/" target="_blank">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver sitio
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{posts.length}</p>
                <p className="text-sm text-muted-foreground">Total artículos</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{posts.filter(p => p.published).length}</p>
                <p className="text-sm text-muted-foreground">Publicados</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-ova-amber/20 flex items-center justify-center">
                <Edit className="w-6 h-6 text-ova-amber" />
              </div>
              <div>
                <p className="text-2xl font-bold">{posts.filter(p => !p.published).length}</p>
                <p className="text-sm text-muted-foreground">Borradores</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/30 border-border/50"
            />
          </div>
          <Link href="/admin/blog/new">
            <Button variant="hero">
              <Plus className="w-5 h-5 mr-2" />
              Nuevo Artículo
            </Button>
          </Link>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="flex gap-6">
                  <div className="w-32 h-20 bg-muted/50 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-muted/50 rounded w-3/4" />
                    <div className="h-4 bg-muted/50 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <LayoutDashboard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">
              {searchTerm ? 'No se encontraron artículos' : 'No hay artículos aún'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm
                ? 'Intenta con otros términos de búsqueda'
                : 'Crea tu primer artículo para empezar'}
            </p>
            {!searchTerm && (
              <Link href="/admin/blog/new">
                <Button variant="hero">
                  <Plus className="w-5 h-5 mr-2" />
                  Crear Artículo
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="glass-card p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Thumbnail */}
                  <div className="w-full md:w-40 h-24 rounded-lg overflow-hidden bg-muted/30 flex-shrink-0">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            post.published
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-ova-amber/20 text-ova-amber'
                          }`}>
                            {post.published ? 'Publicado' : 'Borrador'}
                          </span>
                          {post.category && (
                            <span className="px-2 py-0.5 rounded bg-secondary/20 text-secondary text-xs">
                              {post.category}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-lg mb-1 truncate">{post.title}</h3>
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author_name || 'OVA VISION'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {format(new Date(post.published_at || post.created_at), "d MMM yyyy", { locale: es })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2 flex-shrink-0">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/blog/edit/${post.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting === post.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
