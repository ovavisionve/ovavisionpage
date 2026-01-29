'use client';

import { type BlogPost } from "@/lib/blog-data";
import { Author, getAuthorByName } from "@/lib/authors-data";

interface ArticleSchemaProps {
  post: BlogPost;
  url: string;
}

export default function ArticleSchema({ post, url }: ArticleSchemaProps) {
  const author = getAuthorByName(post.author_name);

  // Estimar palabras del contenido
  const wordCount = post.content ? post.content.split(/\s+/).length : 500;

  // Schema.org Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt || `Artículo sobre ${post.category} por OVA VISION`,
    "image": post.cover_image || "https://www.ovavisionagency.com/images/og-image.jpg",
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.published_at || post.created_at,
    "author": {
      "@type": author.id === "ova-vision" ? "Organization" : "Person",
      "name": author.name,
      "url": author.linkedin || "https://www.ovavisionagency.com/que-es-ova",
      "description": author.shortBio,
      ...(author.id !== "ova-vision" && {
        "jobTitle": author.role,
        "worksFor": {
          "@type": "Organization",
          "name": "OVA VISION",
          "url": "https://www.ovavisionagency.com"
        }
      })
    },
    "publisher": {
      "@type": "Organization",
      "name": "OVA VISION",
      "url": "https://www.ovavisionagency.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ovavisionagency.com/images/ova-logo.png"
      },
      "sameAs": [
        "https://www.instagram.com/ovavisionagency",
        "https://www.linkedin.com/company/ovavision"
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": post.category || "Automatización",
    "keywords": post.tags?.join(", ") || "automatización, IA, inteligencia artificial",
    "wordCount": wordCount,
    "inLanguage": "es-VE",
    "isAccessibleForFree": true,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["article h1", "article p"]
    }
  };

  // BreadcrumbList para mejor navegación en Google
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://www.ovavisionagency.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Insights",
        "item": "https://www.ovavisionagency.com/insights"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": url
      }
    ]
  };

  // FAQPage schema si el artículo tiene preguntas y respuestas
  // (Se puede expandir si los artículos tienen formato Q&A)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

// Componente para Schema de lista de artículos (página principal de Insights)
interface InsightsListSchemaProps {
  posts: BlogPost[];
}

export function InsightsListSchema({ posts }: InsightsListSchemaProps) {
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Insights - OVA VISION",
    "description": "Artículos, guías y recursos sobre automatización empresarial, inteligencia artificial y transformación digital para empresas latinoamericanas.",
    "url": "https://www.ovavisionagency.com/insights",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": posts.length,
      "itemListElement": posts.slice(0, 10).map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Article",
          "name": post.title,
          "description": post.excerpt,
          "url": `https://www.ovavisionagency.com/insights/${post.slug}`,
          "image": post.cover_image,
          "datePublished": post.published_at || post.created_at,
          "author": {
            "@type": "Organization",
            "name": post.author_name || "OVA VISION"
          }
        }
      }))
    },
    "publisher": {
      "@type": "Organization",
      "name": "OVA VISION",
      "url": "https://www.ovavisionagency.com"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://www.ovavisionagency.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Insights",
        "item": "https://www.ovavisionagency.com/insights"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
