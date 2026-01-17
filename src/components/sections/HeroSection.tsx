"use client";

import { useState } from "react";
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
import { Send, Sparkles, Mail, Building2, User } from "lucide-react";

const services = [
  "Automatización con IA",
  "Agentes de IA",
  "Branding Estratégico",
  "Desarrollo Web",
  "Consultoría",
];

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <section className="min-h-screen pt-24 pb-16 hero-gradient relative overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="animate-fade-in">
            {/* OVA Vision Logo */}
            <div className="mb-12">
              <img 
                src="/assets/logo-ova-vision.png" 
                alt="OVA Vision" 
                className="h-32 md:h-40 lg:h-48 w-auto"
              />
            </div>
            
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Agencia de Automatización IA
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transforma tu empresa con{" "}
              <span className="bg-gradient-to-r from-ova-amber via-ova-orange to-white bg-clip-text text-transparent">
                Inteligencia Artificial
              </span>
            </h1>
            
            <p className="text-lg text-foreground/80 mb-8 max-w-lg">
              Automatizamos procesos, creamos agentes de IA y diseñamos estrategias de branding 
              que impulsan el crecimiento de tu negocio en Venezuela y LATAM.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="glass-card px-6 py-3">
                <p className="text-2xl font-bold text-ova-amber">70%</p>
                <p className="text-sm text-foreground/70">Menos tareas manuales</p>
              </div>
              <div className="glass-card px-6 py-3">
                <p className="text-2xl font-bold text-secondary">24/7</p>
                <p className="text-sm text-foreground/70">Automatización</p>
              </div>
              <div className="glass-card px-6 py-3">
                <p className="text-2xl font-bold text-ova-cyan">100%</p>
                <p className="text-sm text-foreground/70">Personalizado</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="animate-fade-in delay-200">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Agenda tu Consultoría{" "}
                <span className="text-ova-amber">Gratuita</span>
              </h2>
              
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
                    <SelectValue placeholder="Selecciona un servicio" />
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
                  placeholder="Cuéntanos sobre tu proyecto..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                />
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="xl" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
