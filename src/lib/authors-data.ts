// Datos de autores para EEAT (Expertise, Experience, Authoritativeness, Trustworthiness)
export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  shortBio: string;
  avatar: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  expertise: string[];
  credentials: string[];
}

export const authors: Author[] = [
  {
    id: "oriana-russo",
    name: "Oriana Russo",
    slug: "oriana-russo",
    role: "Co-Fundadora & Directora de Estrategia Digital",
    bio: "Oriana es co-fundadora de OVA VISION, donde lidera la estrategia digital y la implementación de soluciones de automatización con IA para empresas en Venezuela y Latinoamérica. Con más de 8 años de experiencia en transformación digital, ha ayudado a decenas de empresas a optimizar sus procesos y aumentar su productividad mediante tecnología inteligente.",
    shortBio: "Co-fundadora de OVA VISION. Especialista en automatización empresarial e IA.",
    avatar: "/images/authors/oriana-russo.jpg",
    linkedin: "https://www.linkedin.com/in/oriana-russo",
    instagram: "https://www.instagram.com/ovavisionagency",
    expertise: ["Automatización Empresarial", "Inteligencia Artificial", "Estrategia Digital", "Transformación Digital"],
    credentials: ["Certificada en AI & Machine Learning", "Google Analytics Certified", "HubSpot Inbound Marketing"]
  },
  {
    id: "ova-vision",
    name: "OVA VISION",
    slug: "ova-vision",
    role: "Equipo Editorial",
    bio: "OVA VISION es una agencia de automatización e inteligencia artificial enfocada en el mercado latinoamericano. Nuestro equipo combina expertise en tecnología, branding y estrategia digital para ayudar a empresas a transformar sus operaciones con soluciones innovadoras adaptadas a la realidad local.",
    shortBio: "Agencia de automatización e IA para empresas latinoamericanas.",
    avatar: "/images/ova-logo-square.png",
    linkedin: "https://www.linkedin.com/company/ovavision",
    instagram: "https://www.instagram.com/ovavisionagency",
    expertise: ["Automatización", "Branding", "Agentes de IA", "Desarrollo Web"],
    credentials: ["Agencia certificada", "Partners oficiales de herramientas líderes"]
  }
];

// Función para obtener autor por nombre
export function getAuthorByName(name: string | null): Author {
  if (!name) return authors[1]; // Default: OVA VISION

  const author = authors.find(
    a => a.name.toLowerCase() === name.toLowerCase() ||
         a.id === name.toLowerCase().replace(/\s+/g, '-')
  );

  return author || authors[1]; // Default: OVA VISION
}

// Función para obtener autor por ID
export function getAuthorById(id: string): Author | undefined {
  return authors.find(a => a.id === id);
}

// Mapeo de categorías a servicios relacionados para internal linking
export interface RelatedService {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export const categoryServiceMap: Record<string, RelatedService[]> = {
  "Automatización": [
    {
      title: "Automatización de Procesos",
      description: "Optimiza tus operaciones con flujos de trabajo automatizados",
      href: "/servicios#automatizacion",
      icon: "⚡"
    },
    {
      title: "Agentes de IA",
      description: "Asistentes inteligentes para atención al cliente 24/7",
      href: "/servicios#agentes-ia",
      icon: "🤖"
    }
  ],
  "Inteligencia Artificial": [
    {
      title: "Agentes de IA Personalizados",
      description: "Chatbots y asistentes virtuales entrenados para tu negocio",
      href: "/servicios#agentes-ia",
      icon: "🤖"
    },
    {
      title: "Consultoría en IA",
      description: "Te ayudamos a identificar oportunidades de automatización",
      href: "/contacto",
      icon: "💡"
    }
  ],
  "Casos de Estudio": [
    {
      title: "Automatización Empresarial",
      description: "Transforma tus procesos como las empresas de nuestros casos",
      href: "/servicios#automatizacion",
      icon: "📈"
    },
    {
      title: "Consultoría Gratuita",
      description: "Agenda una evaluación de tu negocio sin compromiso",
      href: "/contacto",
      icon: "📞"
    }
  ],
  "Tendencias": [
    {
      title: "Mantente al Día",
      description: "Implementa las últimas tendencias en tu empresa",
      href: "/servicios",
      icon: "🚀"
    },
    {
      title: "Agentes de IA",
      description: "La tendencia más importante: automatización inteligente",
      href: "/servicios#agentes-ia",
      icon: "🤖"
    }
  ],
  "Guías Prácticas": [
    {
      title: "Implementación Guiada",
      description: "Te ayudamos a poner en práctica lo que aprendiste",
      href: "/contacto",
      icon: "🎯"
    },
    {
      title: "Servicios de Automatización",
      description: "Desde flujos simples hasta sistemas complejos",
      href: "/servicios#automatizacion",
      icon: "⚙️"
    }
  ],
  "Branding": [
    {
      title: "Branding Estratégico",
      description: "Crea una identidad visual que conecte con tu audiencia",
      href: "/servicios#branding",
      icon: "🎨"
    },
    {
      title: "Diseño Web",
      description: "Sitios web que reflejan la esencia de tu marca",
      href: "/servicios#desarrollo-web",
      icon: "💻"
    }
  ]
};

// Función para obtener servicios relacionados por categoría
export function getRelatedServices(category: string | null): RelatedService[] {
  if (!category) return categoryServiceMap["Automatización"];
  return categoryServiceMap[category] || categoryServiceMap["Automatización"];
}
