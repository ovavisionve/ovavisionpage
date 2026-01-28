"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  Send, Sparkles, Mail, Building2, User,
  TrendingDown, Clock, DollarSign, Zap,
  ArrowRight, CheckCircle2, Play
} from "lucide-react";
import Link from "next/link";

const services = [
  "Automatización con IA",
  "Agentes de IA",
  "Branding Estratégico",
  "Desarrollo Web",
  "Consultoría",
];

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000, startOnMount: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startOnMount) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Small delay before starting
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, startOnMount]);

  return count;
}

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const savingsCounter = useAnimatedCounter(847, 2500);
  const hoursCounter = useAnimatedCounter(120, 2000);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Error",
          description: data.error || "Hubo un error al enviar tu solicitud",
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Mensaje enviado!",
          description: "Nos pondremos en contacto contigo pronto.",
        });
        setFormData({ name: "", email: "", company: "", service: "", message: "" });
        setShowForm(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Error al procesar tu solicitud",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen pt-20 pb-16 hero-gradient relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-ova-amber/20 blur-xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-32 h-32 rounded-full bg-secondary/20 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-ova-cyan/20 blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center pt-8 pb-12">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <img
                src="/assets/logo-ova-vision.png"
                alt="OVA Vision"
                className="h-24 md:h-32 lg:h-36 w-auto animate-fade-in"
              />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-ova-amber/20 to-secondary/20 border border-ova-amber/30 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-ova-amber" />
              <span className="text-foreground">Agencia #1 de Automatización IA en Venezuela</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              <span className="block text-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Deja de perder
              </span>
              <span className="block bg-gradient-to-r from-ova-amber via-ova-orange to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,180,0,0.5)]">
                ${savingsCounter}+ al mes
              </span>
              <span className="block text-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                en tareas manuales
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto animate-fade-in">
              Automatizamos tus procesos repetitivos con IA para que tu equipo se enfoque en{" "}
              <span className="text-secondary font-semibold">hacer crecer tu negocio</span>
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in">
              <div className="flex items-center gap-2 text-foreground/80">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-green-400" />
                </div>
                <span><strong className="text-green-400">-70%</strong> tareas manuales</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <span><strong className="text-secondary">{hoursCounter}+ hrs</strong> recuperadas/mes</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <div className="w-10 h-10 rounded-full bg-ova-amber/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-ova-amber" />
                </div>
                <span><strong className="text-ova-amber">24/7</strong> trabajando para ti</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
              <Button
                variant="hero"
                size="xl"
                className="text-lg px-8 py-6 shadow-lg shadow-ova-amber/30"
                onClick={() => setShowForm(true)}
              >
                Quiero automatizar mi empresa
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Link href="/servicios">
                <Button
                  variant="outline"
                  size="xl"
                  className="text-lg px-8 py-6 border-2"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Ver cómo funciona
                </Button>
              </Link>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-foreground/60 animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Consultoría inicial gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Resultados en semanas</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="glass-card p-6 md:p-8 mb-8 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-ova-amber to-ova-orange bg-clip-text text-transparent">
                  3x
                </p>
                <p className="text-sm text-foreground/70">ROI promedio</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-ova-cyan bg-clip-text text-transparent">
                  2 sem
                </p>
                <p className="text-sm text-foreground/70">Primera automatización</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  60%
                </p>
                <p className="text-sm text-foreground/70">Reducción de costos</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  100%
                </p>
                <p className="text-sm text-foreground/70">Personalizado</p>
              </div>
            </div>
          </div>

          {/* "What we automate" preview */}
          <div className="text-center animate-fade-in">
            <p className="text-foreground/60 mb-4">Automatizamos:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Atención al cliente', 'Facturación', 'Inventario', 'CRM', 'Reportes', 'Leads', 'Emails'].map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 rounded-full bg-muted/50 border border-border/30 text-sm text-foreground/80 hover:border-secondary/50 hover:bg-secondary/10 transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2 text-center">
              Agenda tu Consultoría{" "}
              <span className="text-ova-amber">Gratuita</span>
            </h2>
            <p className="text-center text-foreground/60 mb-6 text-sm">
              Te contactaremos en menos de 24 horas
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <Input
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <Input
                  type="email"
                  placeholder="Tu email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>

              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
                <Input
                  placeholder="Tu empresa (opcional)"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="pl-10"
                />
              </div>

              <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="¿Qué quieres automatizar?" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Cuéntanos brevemente qué procesos te gustaría automatizar..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
              />

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Solicitar Consultoría Gratis"}
                <Send className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-xs text-center text-foreground/50">
                Sin spam. Sin compromiso. 100% confidencial.
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
