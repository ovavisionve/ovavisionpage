"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ShoppingCart,
  MessageSquare,
  FileText,
  TrendingUp,
  Clock,
  DollarSign,
  X,
  CheckCircle2,
  Database,
  Bell,
  CreditCard,
  Package,
  BarChart3,
  Users,
  Mail,
  Calendar,
  Bot,
  Headphones,
  Target,
  Zap,
  PieChart,
  FileSpreadsheet,
  Send,
  Settings,
} from "lucide-react";

const caseStudies = [
  {
    id: "ecommerce",
    title: "E-commerce Automatizado",
    category: "Automatización",
    description:
      "Sistema completo de gestión de pedidos, inventario y facturación automática para tienda online.",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-400 to-emerald-500",
    icon: ShoppingCart,
    results: [
      { icon: Clock, value: "85%", label: "menos tiempo en gestión" },
      { icon: TrendingUp, value: "3x", label: "más pedidos procesados" },
      { icon: DollarSign, value: "$2,400", label: "ahorro mensual" },
    ],
    tags: ["Inventario", "Facturación", "Notificaciones"],
    // Proceso detallado
    clientType: "Tienda de ropa online con 500+ productos",
    challenge: "Gestión manual de pedidos causaba errores y retrasos. El equipo pasaba 6+ horas diarias en tareas repetitivas.",
    solution: "Sistema automatizado end-to-end que conecta tienda, inventario, facturación y logística.",
    timeline: "3 semanas",
    process: [
      {
        phase: "Integración de Tienda",
        icon: ShoppingCart,
        steps: [
          "Conexión con plataforma e-commerce (Shopify/WooCommerce)",
          "Sincronización automática de productos y precios",
          "Webhook para capturar pedidos en tiempo real",
        ],
      },
      {
        phase: "Gestión de Inventario",
        icon: Package,
        steps: [
          "Dashboard centralizado de stock",
          "Alertas automáticas de bajo inventario",
          "Actualización en tiempo real tras cada venta",
          "Reportes de productos más vendidos",
        ],
      },
      {
        phase: "Facturación Automática",
        icon: CreditCard,
        steps: [
          "Generación automática de facturas",
          "Integración con sistema fiscal local",
          "Envío automático al cliente por email",
          "Registro contable automático",
        ],
      },
      {
        phase: "Notificaciones",
        icon: Bell,
        steps: [
          "Email de confirmación de pedido",
          "WhatsApp con tracking de envío",
          "Notificación de entrega exitosa",
          "Encuesta de satisfacción post-compra",
        ],
      },
    ],
    tools: ["Make", "Shopify API", "Google Sheets", "WhatsApp Business", "Facturero"],
  },
  {
    id: "chatbot",
    title: "Agente de Atención 24/7",
    category: "Agentes IA",
    description:
      "Chatbot inteligente que atiende consultas, agenda citas y califica leads automáticamente.",
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-400 to-pink-500",
    icon: MessageSquare,
    results: [
      { icon: Clock, value: "24/7", label: "disponibilidad" },
      { icon: TrendingUp, value: "60%", label: "leads calificados" },
      { icon: DollarSign, value: "70%", label: "reducción en soporte" },
    ],
    tags: ["WhatsApp", "Web", "CRM"],
    clientType: "Clínica dental con 3 sucursales",
    challenge: "Perdían el 40% de llamadas fuera de horario. Recepcionistas saturadas con preguntas repetitivas.",
    solution: "Agente de IA multicanal que atiende, agenda y califica pacientes 24/7.",
    timeline: "2 semanas",
    process: [
      {
        phase: "Entrenamiento del Agente",
        icon: Bot,
        steps: [
          "Análisis de preguntas frecuentes (100+ consultas)",
          "Creación de base de conocimiento de servicios",
          "Definición de personalidad y tono de voz",
          "Entrenamiento con casos reales",
        ],
      },
      {
        phase: "Integración Multicanal",
        icon: MessageSquare,
        steps: [
          "Widget de chat en sitio web",
          "Conexión con WhatsApp Business",
          "Integración con Instagram DMs",
          "Panel unificado de conversaciones",
        ],
      },
      {
        phase: "Sistema de Citas",
        icon: Calendar,
        steps: [
          "Conexión con calendario de doctores",
          "Verificación de disponibilidad en tiempo real",
          "Confirmación automática por WhatsApp",
          "Recordatorios 24h y 1h antes de la cita",
        ],
      },
      {
        phase: "Calificación de Leads",
        icon: Target,
        steps: [
          "Preguntas de calificación automáticas",
          "Scoring basado en urgencia y servicio",
          "Notificación a ventas de leads calientes",
          "Seguimiento automático de leads fríos",
        ],
      },
    ],
    tools: ["OpenAI GPT", "WhatsApp Business API", "Google Calendar", "HubSpot CRM", "Make"],
  },
  {
    id: "reports",
    title: "Sistema de Reportes",
    category: "Automatización",
    description:
      "Generación automática de reportes financieros, ventas y KPIs con envío programado.",
    color: "from-secondary to-ova-cyan",
    bgColor: "bg-gradient-to-br from-secondary to-ova-cyan",
    icon: FileText,
    results: [
      { icon: Clock, value: "10hrs", label: "ahorradas por semana" },
      { icon: TrendingUp, value: "100%", label: "precisión en datos" },
      { icon: DollarSign, value: "Real-time", label: "dashboards" },
    ],
    tags: ["Google Sheets", "Email", "Dashboard"],
    clientType: "Distribuidora con 15 vendedores y 200+ clientes",
    challenge: "Gerente pasaba 2 días por semana compilando reportes manualmente de múltiples fuentes.",
    solution: "Sistema automatizado que recopila, procesa y distribuye reportes automáticamente.",
    timeline: "2 semanas",
    process: [
      {
        phase: "Conexión de Fuentes",
        icon: Database,
        steps: [
          "Integración con sistema de ventas",
          "Conexión con banco para movimientos",
          "Sincronización con inventario",
          "API de gastos y nómina",
        ],
      },
      {
        phase: "Procesamiento de Datos",
        icon: Settings,
        steps: [
          "Limpieza y normalización automática",
          "Cálculo de KPIs predefinidos",
          "Comparativas vs. período anterior",
          "Detección de anomalías",
        ],
      },
      {
        phase: "Dashboards en Vivo",
        icon: PieChart,
        steps: [
          "Panel de ventas en tiempo real",
          "Gráficos de tendencias",
          "Rankings de vendedores",
          "Alertas de metas cumplidas",
        ],
      },
      {
        phase: "Distribución Automática",
        icon: Send,
        steps: [
          "Reporte diario de ventas (7am)",
          "Resumen semanal los lunes",
          "Informe mensual completo",
          "Alertas especiales por WhatsApp",
        ],
      },
    ],
    tools: ["Google Sheets", "Looker Studio", "Make", "Gmail", "WhatsApp Business"],
  },
];

const CaseStudiesSection = () => {
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState(0);

  const handleExpand = (caseId: string) => {
    if (expandedCase === caseId) {
      setExpandedCase(null);
    } else {
      setExpandedCase(caseId);
      setActivePhase(0);
    }
  };

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
              Estos son ejemplos del tipo de proyectos que desarrollamos. Haz clic en cada uno para ver el proceso completo.
            </p>
          </ScrollReveal>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {caseStudies.map((study, index) => (
              <ScrollReveal
                key={study.id}
                animation="fade-up"
                delay={index * 150}
              >
                <div
                  onClick={() => handleExpand(study.id)}
                  className={cn(
                    "glass-card h-full overflow-hidden cursor-pointer transition-all duration-300",
                    expandedCase === study.id
                      ? "ring-2 ring-purple-500 scale-[1.02]"
                      : "hover:border-purple-500/30 hover:scale-[1.02]"
                  )}
                >
                  {/* Image placeholder with gradient */}
                  <div className={cn("h-40 relative overflow-hidden", study.bgColor)}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <study.icon className="w-16 h-16 text-white/80" />
                    </div>
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-medium">
                      {study.category}
                    </span>
                    {expandedCase === study.id && (
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    )}
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
                          <p className={cn("text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent", study.color)}>
                            {result.value}
                          </p>
                          <p className="text-xs text-foreground/50">{result.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Expand hint */}
                    <div className="mt-4 text-center">
                      <span className="text-xs text-purple-400 font-medium">
                        {expandedCase === study.id ? "Clic para cerrar" : "Clic para ver proceso completo →"}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Expanded Detail View */}
          {expandedCase && (
            <div className="glass-card p-8 md:p-12 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {caseStudies
                .filter((s) => s.id === expandedCase)
                .map((study) => (
                  <div key={study.id}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", study.bgColor)}>
                          <study.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{study.title}</h3>
                          <p className="text-foreground/60">{study.clientType}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedCase(null)}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <h4 className="font-bold text-red-400 mb-2">El Problema</h4>
                        <p className="text-sm text-foreground/70">{study.challenge}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <h4 className="font-bold text-green-400 mb-2">La Solución</h4>
                        <p className="text-sm text-foreground/70">{study.solution}</p>
                      </div>
                    </div>

                    {/* Timeline badge */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10">
                        <Clock className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-medium">Tiempo de implementación: <strong>{study.timeline}</strong></span>
                      </div>
                    </div>

                    {/* Process Steps */}
                    <h4 className="text-xl font-bold mb-6">Proceso de Implementación</h4>

                    {/* Phase tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.process.map((phase, index) => (
                        <button
                          key={phase.phase}
                          onClick={() => setActivePhase(index)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                            activePhase === index
                              ? `${study.bgColor} text-white`
                              : "bg-muted/50 text-foreground/70 hover:bg-muted"
                          )}
                        >
                          <phase.icon className="w-4 h-4" />
                          {phase.phase}
                        </button>
                      ))}
                    </div>

                    {/* Active phase details */}
                    <div className="p-6 rounded-lg bg-muted/30 border border-border/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", study.bgColor)}>
                          {(() => {
                            const PhaseIcon = study.process[activePhase].icon;
                            return <PhaseIcon className="w-6 h-6 text-white" />;
                          })()}
                        </div>
                        <div>
                          <h5 className="font-bold text-lg">{study.process[activePhase].phase}</h5>
                          <p className="text-sm text-foreground/60">Fase {activePhase + 1} de {study.process.length}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {study.process[activePhase].steps.map((step, stepIndex) => (
                          <div
                            key={step}
                            className="flex items-start gap-3 p-3 rounded-lg bg-background/50 animate-in fade-in slide-in-from-left-2"
                            style={{ animationDelay: `${stepIndex * 100}ms` }}
                          >
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold", study.bgColor, "text-white")}>
                              {stepIndex + 1}
                            </div>
                            <p className="text-sm text-foreground/80">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools used */}
                    <div className="mt-6">
                      <p className="text-sm text-foreground/60 mb-3">Herramientas utilizadas:</p>
                      <div className="flex flex-wrap gap-2">
                        {study.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 text-sm rounded-full bg-secondary/10 text-secondary border border-secondary/20"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-center">
                      <p className="text-lg font-medium mb-4">
                        ¿Quieres una solución similar para tu empresa?
                      </p>
                      <Link href="/contacto">
                        <Button variant="hero" size="lg">
                          Solicitar propuesta personalizada
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Bottom CTA */}
          {!expandedCase && (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
