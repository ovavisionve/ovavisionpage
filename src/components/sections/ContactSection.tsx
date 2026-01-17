"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Mail, Building2, User, Sparkles } from "lucide-react";

const services = [
  { value: "branding", label: "Branding y Diseño Gráfico" },
  { value: "web", label: "Desarrollo Web" },
  { value: "3d", label: "Render 3D y Digitalización" },
  { value: "automation-basic", label: "Automatización Básica" },
  { value: "automation-advanced", label: "Automatización Avanzada" },
  { value: "custom", label: "Solución Personalizada" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", service: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Conectar con API
    console.log("Form submitted:", formData);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("¡Mensaje enviado!");
      setFormData({ name: "", email: "", company: "", service: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contacto" className="py-24 lg:py-32">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Contacto
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              ¿Listo para <span className="text-primary">automatizar</span> tu empresa?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Agenda una reunión gratuita y descubre cómo podemos transformar tu negocio.
            </p>
          </div>
          
          <div className="p-8 lg:p-12 rounded-xl border bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" /> Nombre
                  </label>
                  <Input placeholder="Tu nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" /> Email
                  </label>
                  <Input type="email" placeholder="tu@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" /> Empresa
                  </label>
                  <Input placeholder="Nombre de tu empresa" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-muted-foreground" /> Servicio
                  </label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                    <SelectTrigger><SelectValue placeholder="Selecciona un servicio" /></SelectTrigger>
                    <SelectContent>
                      {services.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Mensaje</label>
                <Textarea placeholder="Cuéntanos sobre tu proyecto..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} />
              </div>
              
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : <><Send className="w-5 h-5 mr-2" /> Enviar mensaje</>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
