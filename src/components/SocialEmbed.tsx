'use client';

import { useEffect, useRef } from 'react';

interface SocialEmbedProps {
  url: string;
  type: string;
}

export default function SocialEmbed({ url, type }: SocialEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load platform-specific scripts
    if (type === 'twitter') {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.body.appendChild(script);
    } else if (type === 'instagram') {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
      // @ts-ignore
      if (window.instgrm) {
        // @ts-ignore
        window.instgrm.Embeds.process();
      }
    }
  }, [type, url]);

  // YouTube embed
  if (type === 'youtube') {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden my-8">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      );
    }
  }

  // TikTok embed
  if (type === 'tiktok') {
    const videoId = extractTikTokId(url);
    if (videoId) {
      return (
        <div className="my-8 flex justify-center">
          <blockquote
            className="tiktok-embed"
            cite={url}
            data-video-id={videoId}
            style={{ maxWidth: '605px', minWidth: '325px' }}
          >
            <section>
              <a target="_blank" href={url} rel="noopener noreferrer">
                Ver en TikTok
              </a>
            </section>
          </blockquote>
          <script async src="https://www.tiktok.com/embed.js"></script>
        </div>
      );
    }
  }

  // Twitter/X embed
  if (type === 'twitter') {
    return (
      <div className="my-8 flex justify-center" ref={containerRef}>
        <blockquote className="twitter-tweet" data-theme="dark">
          <a href={url}>Ver tweet</a>
        </blockquote>
      </div>
    );
  }

  // Instagram embed
  if (type === 'instagram') {
    return (
      <div className="my-8 flex justify-center" ref={containerRef}>
        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: 0,
            borderRadius: '3px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px',
            maxWidth: '540px',
            minWidth: '326px',
            padding: 0,
            width: '99.375%',
          }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            Ver en Instagram
          </a>
        </blockquote>
      </div>
    );
  }

  // Facebook embed
  if (type === 'facebook') {
    return (
      <div className="my-8 flex justify-center">
        <iframe
          src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true&width=500`}
          width="500"
          height="600"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
    );
  }

  // Fallback - just show link
  return (
    <div className="my-8 p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
      <p className="text-sm text-muted-foreground mb-2">Contenido de {type}:</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary hover:underline"
      >
        Ver contenido original
      </a>
    </div>
  );
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractTikTokId(url: string): string | null {
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}
