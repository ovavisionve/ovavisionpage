"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const serviceCategories = [
  {
    category: "Branding y Diseño Gráfico",
    services: ["Identidad Visual Completa", "Diseño de Logotipo", "Ilustraciones", "Mockups", "Diseño de Empaques"],
  },
  {
    category: "Desarrollo Web y Render 3D",
    services: ["Diseño web moderno", "Desarrollo de páginas funcionales", "Optimización UX", "Modelado 3D", "Renderizado de productos"],
  },
  {
    category: "Automatización",
    services: ["Nivel 1: Básica", "Nivel 2: Media", "Nivel 3: Avanzada", "Nivel 4: Personalizada"],
  },
];

const ServiceConfiguratorSection = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  const toggleService = (service: string) => {
    setSelectedServices((prev) => prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote request:", { ...formData, services: selectedServices });
    alert("¡Solicitud enviada!");
  };

  return (
    <section id="cotizar" className="py-24 lg:py-32">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Cotización Personalizada
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Diseña tu <span className="text-primary">Servicio a Medida</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {serviceCategories.map((cat) => (
                <div key={cat.category} className="p-6 rounded-xl border bg-card space-y-4">
                  <h3 className="text-lg font-bold text-primary">{cat.category}</h3>
                  <div className="space-y-3">
                    {cat.services.map((service) => (
                      <label key={service} className="flex items-start gap-3 cursor-pointer">
                        <Checkbox checked={selectedServices.includes(service)} onCheckedChange={() => toggleService(service)} />
                        <span className="text-sm text-muted-foreground">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {selectedServices.length > 0 && (
              <div className="p-6 rounded-xl border bg-card">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" /> Servicios seleccionados ({selectedServices.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedServices.map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm cursor-pointer" onClick={() => toggleService(s)}>{s} ×</span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 lg:p-8 rounded-xl border bg-card">
              <h4 className="font-semibold mb-6">Información de contacto</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre *</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label>Mensaje adicional</Label>
                <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} />
              </div>
            </div>

            <div className="text-center">
              <Button type="submit" size="lg"><Send className="w-5 h-5 mr-2" /> Solicitar Cotización</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ServiceConfiguratorSection;
