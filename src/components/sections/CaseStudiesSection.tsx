"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingCart,
  MessageSquare,
  FileText,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react";

const caseStudies = [
  {
    title: "E-commerce Automatizado",
    category: "Automatización",
    description:
      "Sistema completo de gestión de pedidos, inventario y facturación automática para tienda online.",
    image: "/cases/ecommerce.jpg", // Placeholder - se puede cambiar después
    color: "from-green-400 to-emerald-500",
    icon: ShoppingCart,
    results: [
      { icon: Clock, value: "85%", label: "menos tiempo en gestión" },
      { icon: TrendingUp, value: "3x", label: "más pedidos procesados" },
      { icon: DollarSign, value: "$2,400", label: "ahorro mensual" },
    ],
    tags: ["Inventario", "Facturación", "Notificaciones"],
  },
  {
    title: "Agente de Atención 24/7",
    category: "Agentes IA",
    description:
      "Chatbot inteligente que atiende consultas, agenda citas y califica leads automáticamente.",
    image: "/cases/chatbot.jpg",
    color: "from-purple-400 to-pink-500",
    icon: MessageSquare,
    results: [
      { icon: Clock, value: "24/7", label: "disponibilidad" },
      { icon: TrendingUp, value: "60%", label: "leads calificados" },
      { icon: DollarSign, value: "70%", label: "reducción en soporte" },
    ],
    tags: ["WhatsApp", "Web", "CRM"],
  },
  {
    title: "Sistema de Reportes",
    category: "Automatización",
    description:
      "Generación automática de reportes financieros, ventas y KPIs con envío programado.",
    image: "/cases/reports.jpg",
    color: "from-secondary to-ova-cyan",
    icon: FileText,
    results: [
      { icon: Clock, value: "10hrs", label: "ahorradas por semana" },
      { icon: TrendingUp, value: "100%", label: "precisión en datos" },
      { icon: DollarSign, value: "Real-time", label: "dashboards" },
    ],
    tags: ["Google Sheets", "Email", "Dashboard"],
  },
];

const CaseStudiesSection = () => {
  return (
    <section className="py-20 lg:py-28 section-gradient-2">
      <div className="container px-6 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <ScrollReveal animation="fade-up" className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
              Lo que podemos crear
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ejemplos de{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Soluciones Reales
              </span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Estos son ejemplos del tipo de proyectos que desarrollamos. Cada
              solución se personaliza 100% según las necesidades de tu empresa.
            </p>
          </ScrollReveal>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {caseStudies.map((study, index) => (
              <ScrollReveal
                key={study.title}
                animation="fade-up"
                delay={index * 150}
              >
                <div className="glass-card h-full overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                  {/* Image placeholder with gradient */}
                  <div
                    className={`h-40 bg-gradient-to-br ${study.color} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <study.icon className="w-16 h-16 text-white/80" />
                    </div>
                    {/* Category badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-medium">
                      {study.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-foreground/70 text-sm mb-4">
                      {study.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-md bg-muted/50 text-foreground/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/30">
                      {study.results.map((result) => (
                        <div key={result.label} className="text-center">
                          <p
                            className={`text-lg font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}
                          >
                            {result.value}
                          </p>
                          <p className="text-xs text-foreground/50">
                            {result.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal animation="fade-up" delay={450}>
            <div className="text-center">
              <p className="text-foreground/60 mb-4">
                ¿Tienes un proyecto similar en mente?
              </p>
              <Link href="/contacto">
                <Button variant="hero" size="lg">
                  Solicita tu solución personalizada
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
