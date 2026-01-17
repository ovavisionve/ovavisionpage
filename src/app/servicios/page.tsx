// src/app/servicios/page.tsx
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { 
  Paintbrush, Shapes, Image, Package, FileImage, Lightbulb,
  Globe, Layout, Palette, Users, Box, Sparkles,
  Zap, Layers, Cpu, Settings, Clock, Check,
  MessageSquare, Brain, Bot, Workflow
} from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios de Automatización IA y Branding | OVA VISION",
  description: "Automatización con IA, agentes inteligentes, mejora de procesos y branding estratégico. Descubre cómo nuestros servicios pueden revolucionar tu empresa.",
};

const brandingServices = [
  { icon: Shapes, title: "Identidad Visual Completa", description: "Desarrollo integral de la identidad de marca que refleja los valores y personalidad de tu empresa." },
  { icon: Paintbrush, title: "Diseño de Logotipo", description: "Logotipos únicos y memorables que comunican la esencia de tu marca." },
  { icon: Image, title: "Ilustraciones", description: "Arte visual personalizado que da vida a tus ideas y conceptos de marca." },
  { icon: FileImage, title: "Mockups", description: "Visualizaciones realistas de cómo se verá tu marca en diferentes aplicaciones." },
  { icon: Package, title: "Diseño de Empaques", description: "Empaques atractivos que destacan en el mercado y conectan con tu audiencia." },
  { icon: Lightbulb, title: "Propuestas Creativas", description: "Estrategias creativas y conceptos innovadores para posicionar tu marca." },
];

const webServices = [
  { icon: Layout, title: "Diseño Web Moderno", description: "Interfaces atractivas y funcionales adaptadas a tu identidad visual." },
  { icon: Globe, title: "Desarrollo Funcional", description: "Sitios web rápidos, seguros y optimizados para conversión." },
  { icon: Palette, title: "Adaptación Visual", description: "Integración perfecta con tu identidad de marca existente." },
  { icon: Users, title: "Experiencia de Usuario", description: "Navegación intuitiva que convierte visitantes en clientes." },
  { icon: Box, title: "Modelado 3D", description: "Visualización profesional de productos y empaques." },
  { icon: Sparkles, title: "Renderizado", description: "Imágenes fotorrealistas para marketing y catálogos." },
];

const automationLevels = [
  {
    level: 1, title: "Automatización Básica", time: "1-2 semanas", icon: Zap, color: "from-green-400 to-emerald-500",
    features: ["Gestión automática de pagos", "Control de inventario básico", "Sistema de reservas y citas", "Recolección automática de leads"],
    ideal: "Pequeñas empresas que quieren empezar a automatizar"
  },
  {
    level: 2, title: "Automatización Media", time: "3-4 semanas", icon: Layers, color: "from-cyan-400 to-cyan-500",
    features: ["Time tracking para empleados", "Generación automática de reportes", "CRM simplificado", "Facturación automatizada", "Portal de empleados + nómina"],
    ideal: "Empresas en crecimiento con procesos manuales complejos"
  },
  {
    level: 3, title: "Automatización Avanzada", time: "1-3 meses", icon: Cpu, color: "from-amber-500 to-orange-500",
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

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] -top-40 -left-40 rounded-full bg-amber-500/10 blur-3xl animate-pulse" />
        <div className="absolute w-[500px] h-[500px] top-1/4 -right-32 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute w-[700px] h-[700px] top-1/2 -left-48 rounded-full bg-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="container px-6">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-500 text-sm font-medium mb-6">
                Servicios
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Nuestros Servicios de{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-white bg-clip-text text-transparent">
                  Automatización e IA
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transformamos procesos complejos en sistemas automatizados que trabajan 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* Services Tabs */}
        <section className="py-8 lg:py-16">
          <div className="container px-6">
            <Tabs defaultValue="branding" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent p-0 mb-12">
                <TabsTrigger 
                  value="branding" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-foreground bg-muted/50 py-3 px-4 rounded-lg"
                >
                  Branding & Diseño
                </TabsTrigger>
                <TabsTrigger 
                  value="web" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-400 data-[state=active]:to-cyan-500 data-[state=active]:text-foreground bg-muted/50 py-3 px-4 rounded-lg"
                >
                  Web & 3D
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

              {/* Branding Tab */}
              <TabsContent value="branding" className="mt-0">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Branding y Diseño Gráfico
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Construimos identidades de marca coherentes y memorables que conectan con tu audiencia ideal.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brandingServices.map((service) => (
                      <div key={service.title} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-3">
                          <service.icon className="w-5 h-5 text-foreground" />
                        </div>
                        <h3 className="font-bold mb-1">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <h4 className="font-bold text-amber-500 mb-2">Ideal para:</h4>
                    <p className="text-muted-foreground">Startups, empresas en rebranding, nuevos productos/servicios</p>
                  </div>
                </div>
              </TabsContent>

              {/* Web & 3D Tab */}
              <TabsContent value="web" className="mt-0">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Desarrollo Web y Render 3D
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Sitios web profesionales y visualizaciones 3D que elevan tu presencia digital.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {webServices.map((service) => (
                      <div key={service.title} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-500 flex items-center justify-center mb-3">
                          <service.icon className="w-5 h-5 text-foreground" />
                        </div>
                        <h3 className="font-bold mb-1">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <h4 className="font-bold text-cyan-500 mb-2">Ideal para:</h4>
                    <p className="text-muted-foreground">Empresas que necesitan presencia digital profesional y visualización de productos</p>
                  </div>
                </div>
              </TabsContent>

              {/* Automation Tab */}
              <TabsContent value="automation" className="mt-0">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Niveles de Automatización
                  </h2>
                  <p className="text-muted-foreground mb-8">
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
                            <span className="text-sm text-muted-foreground">Nivel {level.level}</span>
                            <h3 className="font-bold">{level.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {level.time}
                            </div>
                          </div>
                        </div>
                        
                        <ul className="space-y-2 mb-4">
                          {level.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-cyan-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <p className="text-xs text-muted-foreground italic">{level.ideal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* AI Agents Tab */}
              <TabsContent value="agents" className="mt-0">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Agentes de IA Personalizados
                  </h2>
                  <p className="text-muted-foreground mb-8">
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
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <h4 className="font-bold text-purple-400 mb-2">Beneficios</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Atención 24/7 sin costos adicionales</li>
                        <li>• Respuestas consistentes y precisas</li>
                        <li>• Aprenden y mejoran con cada interacción</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
                      <h4 className="font-bold text-pink-400 mb-2">Ideal para:</h4>
                      <p className="text-sm text-muted-foreground">
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
        <section className="py-16 lg:py-24 bg-muted/20">
          <div className="container px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Listo para{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  transformar tu empresa
                </span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Agenda una consultoría gratuita y descubre qué servicios se adaptan mejor a tus necesidades.
              </p>
              <Link href="/contacto">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                  Solicita una Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <WhatsAppButton />
    </main>
  );
}
