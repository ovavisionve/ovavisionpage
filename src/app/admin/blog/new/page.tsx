'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminGuard from '@/components/admin/AdminGuard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import {
  ArrowLeft, Save, Eye, Image as ImageIcon, Video,
  Instagram, Youtube, Twitter, Facebook
} from 'lucide-react';
import Image from 'next/image';

const categories = [
  'Automatización',
  'Inteligencia Artificial',
  'Casos de Estudio',
  'Tendencias',
  'Guías Prácticas',
  'Branding',
];

export default function NewBlogPost() {
  return (
    <AdminGuard>
      <NewBlogPostContent />
    </AdminGuard>
  );
}

function NewBlogPostContent() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    category: '',
    author_name: 'OVA VISION',
    tags: '',
    published: false,
    social_embed: '',
    social_embed_type: '',
  });

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (publish: boolean) => {
    if (!formData.title || !formData.content) {
      alert('Por favor completa el título y el contenido');
      return;
    }

    setSaving(true);
    try {
      const postData = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt || null,
        content: formData.content,
        cover_image: formData.cover_image || null,
        category: formData.category || null,
        author_name: formData.author_name || 'OVA VISION',
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : null,
        published: publish,
        published_at: publish ? new Date().toISOString() : null,
        social_embed: formData.social_embed || null,
        social_embed_type: formData.social_embed_type || null,
      };

      const { error } = await supabase
        .from('blog_posts')
        .insert([postData]);

      if (error) throw error;

      router.push('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error al guardar el artículo. Verifica que la tabla blog_posts existe en Supabase.');
    } finally {
      setSaving(false);
    }
  };

  const insertSocialEmbed = (type: string) => {
    const url = prompt(`Ingresa la URL de ${type}:`);
    if (url) {
      setFormData({
        ...formData,
        social_embed: url,
        social_embed_type: type,
      });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/blog">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <div className="h-8 w-px bg-border/50" />
              <h1 className="text-lg font-bold">Nuevo Artículo</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handleSubmit(false)}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar Borrador
              </Button>
              <Button
                variant="hero"
                onClick={() => handleSubmit(true)}
                disabled={saving}
              >
                <Eye className="w-4 h-4 mr-2" />
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Título *</label>
              <Input
                placeholder="Escribe el título del artículo..."
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="bg-muted/30 border-border/50 h-14 text-xl"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Slug (URL)</label>
              <Input
                placeholder="url-del-articulo"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="bg-muted/30 border-border/50"
              />
              <p className="text-xs text-muted-foreground">
                /blog/{formData.slug || 'url-del-articulo'}
              </p>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Resumen</label>
              <Textarea
                placeholder="Un breve resumen del artículo (aparece en la vista previa)..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="bg-muted/30 border-border/50 min-h-[100px]"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Contenido *</label>
              <div className="text-xs text-muted-foreground mb-2">
                Puedes usar Markdown: # Título, ## Subtítulo, **negrita**, *cursiva*, - lista
              </div>
              <Textarea
                placeholder="Escribe el contenido del artículo aquí...

# Título Principal

Introduce el tema aquí...

## Sección 1

Contenido de la sección...

- Punto 1
- Punto 2
- Punto 3

## Conclusión

Resumen final..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="bg-muted/30 border-border/50 min-h-[400px] font-mono text-sm"
              />
            </div>

            {/* Social Embed */}
            <div className="space-y-4">
              <label className="text-sm font-medium">Embeber Redes Sociales</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertSocialEmbed('instagram')}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertSocialEmbed('youtube')}
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertSocialEmbed('twitter')}
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter/X
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertSocialEmbed('tiktok')}
                >
                  <Video className="w-4 h-4 mr-2" />
                  TikTok
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertSocialEmbed('facebook')}
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </Button>
              </div>
              {formData.social_embed && (
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">
                    Embed de {formData.social_embed_type}:
                  </p>
                  <p className="text-sm font-mono break-all">{formData.social_embed}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-destructive"
                    onClick={() => setFormData({ ...formData, social_embed: '', social_embed_type: '' })}
                  >
                    Eliminar embed
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cover Image */}
            <div className="glass-card p-6 space-y-4">
              <label className="text-sm font-medium">Imagen de Portada</label>
              <div className="space-y-4">
                {formData.cover_image ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={formData.cover_image}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-background/80"
                      onClick={() => setFormData({ ...formData, cover_image: '' })}
                    >
                      Cambiar
                    </Button>
                  </div>
                ) : (
                  <div className="aspect-video rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-sm">Sin imagen</span>
                  </div>
                )}
                <Input
                  placeholder="URL de la imagen..."
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  className="bg-muted/30 border-border/50"
                />
                <p className="text-xs text-muted-foreground">
                  Usa URLs de Unsplash o sube imágenes a un servicio externo
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="glass-card p-6 space-y-4">
              <label className="text-sm font-medium">Categoría</label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-muted/30 border-border/50">
                  <SelectValue placeholder="Selecciona categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Author */}
            <div className="glass-card p-6 space-y-4">
              <label className="text-sm font-medium">Autor</label>
              <Input
                placeholder="Nombre del autor"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                className="bg-muted/30 border-border/50"
              />
            </div>

            {/* Tags */}
            <div className="glass-card p-6 space-y-4">
              <label className="text-sm font-medium">Etiquetas</label>
              <Input
                placeholder="automatización, IA, productividad..."
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="bg-muted/30 border-border/50"
              />
              <p className="text-xs text-muted-foreground">
                Separa las etiquetas con comas
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
