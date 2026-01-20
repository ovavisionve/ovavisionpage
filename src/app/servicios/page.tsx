'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { 
  Paintbrush, Shapes, Image, Package, FileImage, Lightbulb, Globe,
  Zap, Layers, Cpu, Settings, Clock, Check,
  MessageSquare, Brain, Bot, Workflow
} from "lucide-react";

// Servicios Creativos según el PDF actualizado
const brandingServices = [
  { 
    icon: Shapes, 
    title: "Branding Completo", 
    description: "Concepto de marca completa: brief estratégico, personalidad, voz y tono. Incluye manual de marca básico y aplicaciones.",
    entregables: ["AI", "PDF", "JPG (fondo transparente)"]
  },
  { 
    icon: Paintbrush, 
    title: "Diseño de Logo", 
    description: "3 variaciones de logo con versiones en positivo y negativo. Paleta de colores, tipografía y manual básico del logo.",
    entregables: ["AI", "PDF", "PNG", "JPG"]
  },
  { 
    icon: Image, 
    title: "Ilustraciones / Elementos Gráficos", 
    description: "Arte visual personalizado. Ilustraciones finales aprobadas con adaptaciones de tamaño según uso.",
    entregables: ["AI", "PDF", "PNG", "JPG"]
  },
  { 
    icon: Package, 
    title: "Diseño de Empaques", 
    description: "Diseño final del empaque (plano mecánico). Mockups de uso real y archivos listos para impresión.",
    entregables: ["AI", "PDF", "PNG", "JPG"]
  },
  { 
    icon: FileImage, 
    title: "Mockups y Aplicaciones", 
    description: "Visualizaciones realistas para redes sociales, papelería y material POP.",
    entregables: ["AI", "PDF", "PNG"]
  },
  { 
    icon: Lightbulb, 
    title: "Propuesta Creativa Completa", 
    description: "Branding completo + Logo + Ilustraciones + Empaques (2) + Creación Web + Manual de marca + Aplicaciones reales.",
    entregables: ["AI", "PDF", "PNG", "JPG"]
  },
  { 
    icon: Globe, 
    title: "Creación Web", 
    description: "Desarrollo del sitio web, carga de contenido, optimización básica de navegación y publicación.",
    entregables: ["Sitio web publicado", "Accesos administrativos"]
  },
];

const automationLevels = [
  {
    level: 1, title: "Automatización Básica", time: "1-2 semanas", icon: Zap, color: "from-green-400 to-emerald-500",
    features: ["Gestión automática de pagos", "Control de inventario básico", "Sistema de reservas y citas", "Recolección automática de leads"],
    ideal: "Pequeñas empresas que quieren empezar a automatizar"
  },
  {
    level: 2, title: "Automatización Media", time: "3-4 semanas", icon: Layers, color: "from-secondary to-ova-cyan",
    features: ["Time tracking para empleados", "Generación automática de reportes", "CRM simplificado", "Facturación automatizada", "Portal de empleados + nómina"],
    ideal: "Empresas en crecimiento con procesos manuales complejos"
  },
  {
    level: 3, title: "Automatización Avanzada", time: "1-3 meses", icon: Cpu, color: "from-ova-amber to-ova-orange",
    features: ["ERP modular completo", "Sistema de gestión de proyectos", "Logística con rutas optimizadas", "Plataforma e-learning", "Gestión documental con OCR"],
    ideal: "Corporaciones que necesitan sistemas enterprise"
  },
  {
    level: 4, title: "Servicios Especializados", time: "Personalizado", icon: Settings, color: "from-purple-400 to-pink-500",
    features: ["Solución 100% a la medida", "Combina servicios de todos los niveles", "Presupuesto ajustado a necesidades", "Integración con sistemas existentes"],
    ideal: "Empresas con requerimientos únicos"
  },
];

const aiAgentServices = [
  { icon: MessageSquare, title: "Atención al Cliente 24/7", description: "Agentes que responden consultas, resuelven problemas y escalan casos complejos automáticamente." },
  { icon: Brain, title: "Asistentes Especializados", description: "IA entrenada específicamente para tu industria y procesos de negocio." },
  { icon: Bot, title: "Integración Multi-canal", description: "Despliega agentes en WhatsApp, web, email y redes sociales simultáneamente." },
  { icon: Workflow, title: "Automatización de Ventas", description: "Agentes que califican leads, agendan reuniones y nutren prospectos automáticamente." },
];

export default function Servicios() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="bg-orb bg-orb-amber w-[600px] h-[600px] -top-40 -left-40" style={{ animationDelay: '0s' }} />
        <div className="bg-orb bg-orb-cyan w-[500px] h-[500px] top-1/4 -right-32" style={{ animationDelay: '2s' }} />
        <div className="bg-orb bg-orb-blue w-[700px] h-[700px] top-1/2 -left-48" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
                Servicios
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Nuestros Servicios de{" "}
                <span className="bg-gradient-to-r from-secondary via-ova-cyan to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,180,255,0.5)]">
                  Automatización e IA
                </span>
              </h1>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                Transformamos procesos complejos en sistemas automatizados que trabajan 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* Services Tabs */}
        <section className="py-8 lg:py-16 w-full">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="branding" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 h-auto gap-2 bg-transparent p-0 mb-12">
                <TabsTrigger 
                  value="branding" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-ova-amber data-[state=active]:to-ova-orange data-[state=active]:text-foreground bg-muted/50 py-3 px-4 rounded-lg"
                >
                  Creativos & Web
                </TabsTrigger>
                <TabsTrigger 
                  value="automation" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-emerald-500 data-[state=active]:text-foreground bg-muted/50 py-3 px-4 rounded-lg"
                >
                  Automatización
                </TabsTrigger>
                <TabsTrigger 
                  value="agents" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400 data-[state=active]:to-pink-500 data-[state=active]:text-foreground bg-muted/50 py-3 px-4 rounded-lg"
                >
                  Agentes IA
                </TabsTrigger>
              </TabsList>

              {/* Servicios Creativos Tab */}
              <TabsContent value="branding" className="mt-0">
                <div className="glass-card p-8 lg:p-12 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Servicios Creativos
                  </h2>
                  <p className="text-foreground/80 mb-8">
                    Construimos identidades de marca coherentes y memorables. Desde el concepto hasta la web, todo en un solo lugar.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brandingServices.map((service) => (
                      <div key={service.title} className="p-5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-ova-amber to-ova-orange flex items-center justify-center mb-3">
                          <service.icon className="w-5 h-5 text-foreground" />
                        </div>
                        <h3 className="font-bold mb-2">{service.title}</h3>
                        <p className="text-sm text-foreground/70 mb-3">{service.description}</p>
                        {service.entregables && (
                          <div className="flex flex-wrap gap-1">
                            {service.entregables.map((ent) => (
                              <span key={ent} className="text-xs px-2 py-0.5 rounded bg-ova-amber/10 text-ova-amber">
                                {ent}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 rounded-lg bg-ova-amber/10 border border-ova-amber/20">
                    <h4 className="font-bold text-ova-amber mb-2">Ideal para:</h4>
                    <p className="text-foreground/80">Startups, empresas en rebranding, nuevos productos, negocios que necesitan presencia digital profesional</p>
                  </div>
                </div>
              </TabsContent>

              {/* Automation Tab */}
              <TabsContent value="automation" className="mt-0">
                <div className="glass-card p-8 lg:p-12 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Niveles de Automatización
                  </h2>
                  <p className="text-foreground/80 mb-8">
                    Soluciones low-code/no-code diseñadas para máxima flexibilidad. Elige el nivel que mejor se adapte a tu empresa.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {automationLevels.map((level) => (
                      <div key={level.level} className="p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${level.color} flex items-center justify-center flex-shrink-0`}>
                            <level.icon className="w-6 h-6 text-foreground" />
                          </div>
                          <div>
                            <span className="text-sm text-foreground/70">Nivel {level.level}</span>
                            <h3 className="font-bold">{level.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-foreground/70">
                              <Clock className="w-4 h-4" />
                              {level.time}
                            </div>
                          </div>
                        </div>
                        
                        <ul className="space-y-2 mb-4">
                          {level.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-foreground/70">
                              <Check className="w-4 h-4 text-secondary" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <p className="text-xs text-foreground/60 italic">{level.ideal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* AI Agents Tab */}
              <TabsContent value="agents" className="mt-0">
                <div className="glass-card p-8 lg:p-12 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Agentes de IA Personalizados
                  </h2>
                  <p className="text-foreground/80 mb-8">
                    Creamos asistentes de IA entrenados específicamente para tu negocio, capaces de atender clientes, 
                    responder consultas complejas y ejecutar tareas específicas.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {aiAgentServices.map((service) => (
                      <div key={service.title} className="p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mb-4">
                          <service.icon className="w-6 h-6 text-foreground" />
                        </div>
                        <h3 className="font-bold mb-2">{service.title}</h3>
                        <p className="text-sm text-foreground/70">{service.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <h4 className="font-bold text-purple-400 mb-2">Beneficios</h4>
                      <ul className="text-sm text-foreground/70 space-y-1">
                        <li>• Atención 24/7 sin costos adicionales</li>
                        <li>• Respuestas consistentes y precisas</li>
                        <li>• Aprenden y mejoran con cada interacción</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
                      <h4 className="font-bold text-pink-400 mb-2">Ideal para:</h4>
                      <p className="text-sm text-foreground/70">
                        Ventas, soporte al cliente, atención post-venta, calificación de leads
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 section-gradient-1 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Listo para{" "}
                <span className="bg-gradient-to-r from-ova-amber to-ova-orange bg-clip-text text-transparent">
                  transformar tu empresa
                </span>?
              </h2>
              <p className="text-lg text-foreground/80 mb-8">
                Agenda una consultoría gratuita y descubre qué servicios se adaptan mejor a tus necesidades.
              </p>
              <Link href="/contacto">
                <Button variant="hero" size="xl">
                  Solicita una Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <WhatsAppButton />
      <ChatBot />
    </main>
  );
}