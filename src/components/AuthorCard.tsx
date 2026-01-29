'use client';

import Link from "next/link";
import { Author } from "@/lib/authors-data";
import { Linkedin, Instagram, Twitter, Award, BookOpen } from "lucide-react";

interface AuthorCardProps {
  author: Author;
  variant?: 'inline' | 'full' | 'compact';
  showCredentials?: boolean;
}

export default function AuthorCard({ author, variant = 'full', showCredentials = true }: AuthorCardProps) {
  // Variante compacta para mostrar en el header del artículo
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted/50 flex-shrink-0">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={`Foto de ${author.name}, ${author.role} en OVA VISION`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                const span = document.createElement('span');
                span.className = 'text-lg font-bold text-muted-foreground';
                span.textContent = author.name.charAt(0);
                target.parentElement?.appendChild(span);
              }}
            />
          ) : (
            <span className="text-lg font-bold text-muted-foreground flex items-center justify-center w-full h-full">
              {author.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <p className="font-medium text-sm">{author.name}</p>
          <p className="text-xs text-muted-foreground">{author.role}</p>
        </div>
      </div>
    );
  }

  // Variante inline para mostrar al lado del contenido
  if (variant === 'inline') {
    return (
      <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/20 border border-border/50">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted/50 flex-shrink-0">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={`Foto de ${author.name}, ${author.role} en OVA VISION`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <span className="text-xl font-bold text-muted-foreground flex items-center justify-center w-full h-full">
              {author.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold">{author.name}</p>
          <p className="text-sm text-muted-foreground mb-1">{author.role}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{author.shortBio}</p>
        </div>
      </div>
    );
  }

  // Variante completa para mostrar al final del artículo
  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-2 text-secondary mb-4">
        <BookOpen className="w-5 h-5" />
        <span className="text-sm font-medium uppercase tracking-wider">Sobre el Autor</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-muted/50">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={`Foto de ${author.name}, ${author.role} en OVA VISION - Experto en ${author.expertise.join(', ')}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <span className="text-4xl font-bold text-muted-foreground flex items-center justify-center w-full h-full">
                {author.name.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold mb-1">{author.name}</h3>
          <p className="text-secondary font-medium mb-3">{author.role}</p>
          <p className="text-muted-foreground mb-4 leading-relaxed">{author.bio}</p>

          {/* Expertise tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {author.expertise.map((exp) => (
              <span
                key={exp}
                className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium"
              >
                {exp}
              </span>
            ))}
          </div>

          {/* Credentials */}
          {showCredentials && author.credentials.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Credenciales</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {author.credentials.map((cred) => (
                  <li key={cred} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ova-amber" />
                    {cred}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social links */}
          <div className="flex items-center gap-3">
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/30 hover:bg-secondary/20 hover:text-secondary transition-colors"
                aria-label={`Perfil de LinkedIn de ${author.name}`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/30 hover:bg-secondary/20 hover:text-secondary transition-colors"
                aria-label={`Perfil de Twitter de ${author.name}`}
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {author.instagram && (
              <a
                href={author.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/30 hover:bg-secondary/20 hover:text-secondary transition-colors"
                aria-label={`Perfil de Instagram de ${author.name}`}
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
