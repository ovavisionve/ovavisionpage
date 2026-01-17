// src/app/contacto/page.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
import { useToast } from "@/hooks/use-toast";
import { Send, Mail, Building2, User, Phone, MapPin, MessageSquare, Calendar } from "lucide-react";

const services = [
  { value: "branding", label: "Branding y Diseño Gráfico" },
  { value: "web", label: "Desarrollo Web" },
  { value: "3d", label: "Render 3D y Digitalización" },
  { value: "automation-basic", label: "Automatización Básica" },
  { value: "automation-advanced", label: "Automatización Avanzada" },
  { value: "ai-agents", label: "Agentes de IA" },
  { value: "custom", label: "Solución Personalizada" },
];

export default function ContactoPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.website) {
      toast({
        title: "¡Mensaje enviado!",
        description: "Hemos recibido tu mensaje. Te contactaremos pronto.",
      });
      return;
    }
    
    if (!formData.name || !formData.email || !formData.service) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa nombre, email y tipo de servicio.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          _hp: formData.website,
        }),
      });

      if (!response.ok) throw new Error("Error al enviar");

      toast({
        title: "¡Mensaje enviado!",
        description: "Hemos recibido tu mensaje. Te contactaremos pronto.",
      });
      
      setFormData({ name: "", email: "", company: "", service: "", message: "", website: "" });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error al enviar",
        description: "Hubo un problema al enviar tu mensaje. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] -top-40 -left-40 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-[500px] h-[500px] top-1/4 -right-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-6">
                Contacto
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Hablemos de tu{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Transformación Digital
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Agenda una consultoría gratuita y descubre cómo podemos automatizar tus procesos.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-8 lg:py-16">
          <div className="container px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-cyan-500" />
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <a 
                            href="mailto:ovavision.ve@gmail.com" 
                            className="text-muted-foreground hover:text-cyan-500 transition-colors"
                          >
                            ovavision.ve@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-cyan-500" />
                        </div>
                        <div>
                          <p className="font-medium">Teléfono</p>
                          <a 
                            href="tel:+584245781707" 
                            className="text-muted-foreground hover:text-cyan-500 transition-colors"
                          >
                            +58 424 578 1707
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-5 h-5 text-cyan-500" />
                        </div>
                        <div>
                          <p className="font-medium">WhatsApp</p>
                          <a 
                            href="https://wa.me/584245781707" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-cyan-500 transition-colors"
                          >
                            Enviar mensaje directo
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-cyan-500" />
                        </div>
                        <div>
                          <p className="font-medium">Ubicación</p>
                          <p className="text-muted-foreground">
                            Venezuela (Atención Internacional)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-bold mb-4">
                      ¿Prefieres una reunión?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Agenda una consultoría gratuita de 30 minutos para discutir tu proyecto.
                    </p>
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white w-full"
                      onClick={() => window.open('https://cal.com/ova-vision-lvxwzg', '_blank')}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Agendar Reunión
                    </Button>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12">
                  <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field */}
                    <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
                      <label htmlFor="website-hp-contacto">Website</label>
                      <input
                        type="text"
                        id="website-hp-contacto"
                        name="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          Nombre completo
                        </label>
                        <Input
                          placeholder="Tu nombre"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-muted/30 border-border/50 h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          Correo electrónico
                        </label>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-muted/30 border-border/50 h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          Empresa
                        </label>
                        <Input
                          placeholder="Nombre de tu empresa"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="bg-muted/30 border-border/50 h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Tipo de servicio
                        </label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) => setFormData({ ...formData, service: value })}
                        >
                          <SelectTrigger className="bg-muted/30 border-border/50 h-12">
                            <SelectValue placeholder="Selecciona un servicio" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service.value} value={service.value}>
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Mensaje</label>
                      <Textarea
                        placeholder="Cuéntanos sobre tu proyecto o las necesidades de tu empresa..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="bg-muted/30 border-border/50 resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Enviando..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar mensaje
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <WhatsAppButton />
    </main>
  );
}
