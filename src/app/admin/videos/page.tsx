'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus, Trash2, Eye, EyeOff, ArrowLeft, Video,
  Upload, Link as LinkIcon, Play
} from 'lucide-react';

interface VideoShort {
  id: string;
  title: string;
  video_url: string;
  thumbnail: string | null;
  platform: string;
  published: boolean;
  created_at: string;
}

export default function AdminVideosPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [videos, setVideos] = useState<VideoShort[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [platform, setPlatform] = useState('tiktok');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    } else if (user) {
      fetchVideos();
    }
  }, [user, authLoading, router]);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('video_shorts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const { data, error } = await supabase
        .from('video_shorts')
        .insert({
          title,
          video_url: videoUrl,
          thumbnail: thumbnail || null,
          platform,
          published: true
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        alert(`Error: ${error.message}\nCode: ${error.code}\nDetails: ${error.details || 'N/A'}`);
        return;
      }

      // Reset form
      setTitle('');
      setVideoUrl('');
      setThumbnail('');
      setPlatform('tiktok');
      setShowAddForm(false);
      fetchVideos();
    } catch (error) {
      console.error('Error adding video:', error);
      alert('Error al agregar el video: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setVideoUrl(publicUrl);
      setPlatform('custom');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error al subir el video. Asegúrate de tener el bucket "media" creado en Supabase Storage.');
    } finally {
      setUploading(false);
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('video_shorts')
        .update({ published: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchVideos();
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const deleteVideo = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este video?')) return;

    try {
      const { error } = await supabase
        .from('video_shorts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const getEmbedPreview = (url: string, plat: string) => {
    if (plat === 'tiktok') {
      // Extract TikTok video ID
      const match = url.match(/video\/(\d+)/);
      if (match) {
        return `https://www.tiktok.com/embed/v2/${match[1]}`;
      }
    } else if (plat === 'instagram') {
      // Extract Instagram post ID
      const match = url.match(/\/(p|reel)\/([^\/\?]+)/);
      if (match) {
        return `https://www.instagram.com/${match[1]}/${match[2]}/embed`;
      }
    } else if (plat === 'youtube') {
      // Extract YouTube video ID
      const match = url.match(/(?:shorts\/|v=|youtu\.be\/)([^&\?\/]+)/);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }
    return url;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/blog" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Video className="w-6 h-6 text-secondary" />
                <h1 className="text-xl font-bold">Videos</h1>
              </div>
            </div>
            <Button onClick={() => setShowAddForm(true)} variant="hero" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Video
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Add Video Form */}
        {showAddForm && (
          <div className="glass-card p-6 mb-8">
            <h2 className="text-lg font-bold mb-4">Agregar Video</h2>
            <form onSubmit={handleAddVideo} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Título</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título del video"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Plataforma</label>
                <div className="flex gap-2 flex-wrap">
                  {['tiktok', 'instagram', 'youtube', 'custom'].map((p) => (
                    <Button
                      key={p}
                      type="button"
                      variant={platform === p ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPlatform(p)}
                    >
                      {p === 'custom' ? 'Video Propio' : p.charAt(0).toUpperCase() + p.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {platform === 'custom' ? (
                <div>
                  <label className="text-sm font-medium mb-2 block">Subir Video</label>
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleUploadVideo}
                      disabled={uploading}
                    />
                    {videoUrl && (
                      <span className="text-green-500 text-sm flex items-center">✓ Subido</span>
                    )}
                  </div>
                  {videoUrl && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">{videoUrl}</p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    URL del Video ({platform})
                  </label>
                  <Input
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder={
                      platform === 'tiktok'
                        ? 'https://www.tiktok.com/@usuario/video/123456'
                        : platform === 'instagram'
                        ? 'https://www.instagram.com/reel/ABC123/'
                        : 'https://youtube.com/shorts/abc123'
                    }
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Pega el link completo del video de {platform}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Thumbnail (opcional)</label>
                <Input
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="URL de la imagen de portada"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="hero" disabled={uploading || !title || !videoUrl}>
                  {uploading ? 'Subiendo...' : 'Agregar Video'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Videos List */}
        {videos.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass-card p-12 max-w-lg mx-auto">
              <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2">No hay videos aún</h3>
              <p className="text-muted-foreground mb-6">
                Agrega tu primer video para mostrarlo en Insights
              </p>
              <Button onClick={() => setShowAddForm(true)} variant="hero">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Video
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="glass-card overflow-hidden">
                <div className="aspect-[9/16] bg-muted/30 relative">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/50 text-xs">
                    {video.platform}
                  </div>
                  {!video.published && (
                    <div className="absolute top-2 left-2 px-2 py-1 rounded bg-yellow-500/80 text-xs text-black">
                      Oculto
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm line-clamp-2 mb-3">{video.title}</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublished(video.id, video.published)}
                      title={video.published ? 'Ocultar' : 'Publicar'}
                    >
                      {video.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteVideo(video.id)}
                      className="text-red-500 hover:text-red-400"
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
