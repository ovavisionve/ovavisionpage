'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Paintbrush, Shapes, Image, Package, Lightbulb, Globe,
  Zap, Layers, Cpu, Settings, Clock, Check,
  MessageSquare, Brain, Bot, Workflow
} from "lucide-react";

// Servicios Creativos
const brandingServices = [
  {
    icon: Shapes,
    title: "Branding",
    color: "from-ova-amber to-ova-orange",
    features: ["Concepto de marca completa", "Logo profesional", "Paleta de colores", "Tipografías", "Manual de marca básico"],
    ideal: "Empresas nuevas o en proceso de rebranding"
  },
  {
    icon: Paintbrush,
    title: "Diseño de Logo",
    color: "from-pink-400 to-rose-500",
    features: ["3 variaciones de logo", "Versiones positivo y negativo", "Paleta de colores", "Manual básico de uso"],
    ideal: "Negocios que necesitan identidad visual rápida"
  },
  {
    icon: Image,
    title: "Ilustraciones / Elementos Gráficos",
    color: "from-violet-400 to-purple-500",
    features: ["Arte visual personalizado", "Optimizado para digital", "Optimizado para impresión", "Archivos en múltiples formatos"],
    ideal: "Marcas que buscan diferenciarse visualmente"
  },
  {
    icon: Package,
    title: "Diseño de Empaques",
    color: "from-cyan-400 to-blue-500",
    features: ["Diseño de empaque completo", "Mockups de uso real", "Archivos listos para impresión", "Variantes de presentación"],
    ideal: "Productos físicos que necesitan packaging profesional"
  },
  {
    icon: Lightbulb,
    title: "Propuesta Creativa (desde cero con OVA)",
    color: "from-amber-400 to-orange-500",
    features: ["Branding completo", "Logo + Ilustraciones", "Diseño de empaques", "Sitio web incluido", "Manual de marca completo"],
    ideal: "Proyectos nuevos que necesitan todo desde cero"
  },
  {
    icon: Globe,
    title: "Creación Web",
    color: "from-emerald-400 to-teal-500",
    features: ["Desarrollo web completo", "Contenido optimizado SEO", "Diseño responsive", "Publicación incluida"],
    ideal: "Negocios que necesitan presencia digital profesional"
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
        
        {/* Hero Section - Formato "Respuesta Primero" para GEO */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
                Servicios
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                ¿Qué servicios de{" "}
                <span className="bg-gradient-to-r from-secondary via-ova-cyan to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,180,255,0.5)]">
                  Automatización e IA
                </span>
                {" "}ofrecemos?
              </h1>
              {/* Respuesta Primero: 40-60 palabras directos */}
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] mb-4">
                OVA VISION ofrece tres categorías de servicios: <strong>automatización empresarial</strong> (gestión de pagos, inventario, CRM y ERPs), <strong>agentes de IA</strong> (chatbots y asistentes virtuales 24/7) y <strong>servicios creativos</strong> (branding, logos y desarrollo web). Cada solución se adapta al tamaño y necesidades específicas de tu empresa.
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
                    ¿Qué incluyen los servicios creativos de OVA VISION?
                  </h2>
                  {/* Respuesta Primero */}
                  <p className="text-foreground/80 mb-8">
                    Nuestros servicios creativos incluyen branding completo, diseño de logos, ilustraciones personalizadas, diseño de empaques y desarrollo web. Creamos identidades de marca coherentes y memorables, desde el concepto inicial hasta la publicación de tu sitio web optimizado para SEO.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {brandingServices.map((service) => (
                      <div key={service.title} className="p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0`}>
                            <service.icon className="w-6 h-6 text-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold">{service.title}</h3>
                          </div>
                        </div>

                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-foreground/70">
                              <Check className="w-4 h-4 text-secondary" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <p className="text-xs text-foreground/60 italic">{service.ideal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Automation Tab */}
              <TabsContent value="automation" className="mt-0">
                <div className="glass-card p-8 lg:p-12 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    ¿Cuánto cuesta automatizar mi empresa?
                  </h2>
                  {/* Respuesta Primero */}
                  <p className="text-foreground/80 mb-8">
                    La automatización empresarial varía según la complejidad. Ofrecemos cuatro niveles: básico (1-2 semanas) para pagos e inventario, medio (3-4 semanas) para CRM y facturación, avanzado (1-3 meses) para ERPs completos, y personalizado para necesidades específicas. Todas las soluciones usan tecnología low-code/no-code para máxima flexibilidad.
                  </p>

                  {/* Tabla Comparativa para GEO */}
                  <div className="overflow-x-auto mb-8">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="p-3 text-left border border-border/30 font-bold">Nivel</th>
                          <th className="p-3 text-left border border-border/30 font-bold">Tiempo</th>
                          <th className="p-3 text-left border border-border/30 font-bold">Incluye</th>
                          <th className="p-3 text-left border border-border/30 font-bold">Ideal para</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-muted/20">
                          <td className="p-3 border border-border/30 font-medium text-green-400">Básico</td>
                          <td className="p-3 border border-border/30">1-2 semanas</td>
                          <td className="p-3 border border-border/30">Pagos, inventario, reservas, leads</td>
                          <td className="p-3 border border-border/30">Pequeñas empresas</td>
                        </tr>
                        <tr className="hover:bg-muted/20">
                          <td className="p-3 border border-border/30 font-medium text-secondary">Medio</td>
                          <td className="p-3 border border-border/30">3-4 semanas</td>
                          <td className="p-3 border border-border/30">CRM, reportes, facturación, nómina</td>
                          <td className="p-3 border border-border/30">Empresas en crecimiento</td>
                        </tr>
                        <tr className="hover:bg-muted/20">
                          <td className="p-3 border border-border/30 font-medium text-ova-amber">Avanzado</td>
                          <td className="p-3 border border-border/30">1-3 meses</td>
                          <td className="p-3 border border-border/30">ERP, proyectos, logística, e-learning</td>
                          <td className="p-3 border border-border/30">Corporaciones</td>
                        </tr>
                        <tr className="hover:bg-muted/20">
                          <td className="p-3 border border-border/30 font-medium text-purple-400">Personalizado</td>
                          <td className="p-3 border border-border/30">Variable</td>
                          <td className="p-3 border border-border/30">100% a medida</td>
                          <td className="p-3 border border-border/30">Requerimientos únicos</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
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
                    ¿Qué es un agente de IA y cómo funciona?
                  </h2>
                  {/* Respuesta Primero */}
                  <p className="text-foreground/80 mb-8">
                    Un agente de IA es un asistente virtual inteligente entrenado con los datos y procesos específicos de tu empresa. Puede atender clientes 24/7 por WhatsApp, web y redes sociales, responder consultas complejas, calificar leads y agendar reuniones automáticamente, reduciendo costos operativos hasta un 60%.
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

        {/* FAQ Section para GEO */}
        <section className="py-16 lg:py-24 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Preguntas Frecuentes sobre{" "}
                <span className="bg-gradient-to-r from-secondary to-ova-cyan bg-clip-text text-transparent">
                  Automatización e IA
                </span>
              </h2>

              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-3 text-secondary">¿Cuánto tiempo toma implementar automatización en mi empresa?</h3>
                  <p className="text-foreground/80">
                    El tiempo de implementación depende del nivel de automatización. La automatización básica (pagos, inventario, reservas) toma entre 1 y 2 semanas. Los sistemas de automatización media como CRM y facturación requieren de 3 a 4 semanas. Para soluciones avanzadas tipo ERP, el proceso puede tomar de 1 a 3 meses dependiendo de la complejidad.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-3 text-secondary">¿Los agentes de IA reemplazan completamente a los empleados?</h3>
                  <p className="text-foreground/80">
                    No, los agentes de IA están diseñados para complementar a tu equipo, no reemplazarlo. Se encargan de tareas repetitivas y consultas frecuentes, permitiendo que tus empleados se enfoquen en actividades de mayor valor como ventas complejas, estrategia y relaciones con clientes clave. Los casos que requieren intervención humana se escalan automáticamente.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-3 text-secondary">¿Qué diferencia a OVA VISION de otras agencias de automatización?</h3>
                  <p className="text-foreground/80">
                    Combinamos tres áreas clave en un solo lugar: automatización empresarial, agentes de IA y servicios creativos de branding. Esto permite una integración perfecta entre tu identidad de marca y tus sistemas automatizados. Además, usamos tecnología low-code/no-code que facilita ajustes futuros sin depender constantemente de desarrolladores.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-3 text-secondary">¿Trabajan con empresas pequeñas o solo corporaciones?</h3>
                  <p className="text-foreground/80">
                    Trabajamos con empresas de todos los tamaños. Nuestro sistema de niveles está diseñado precisamente para esto: el nivel básico es ideal para pequeñas empresas que están comenzando a automatizar, mientras que los niveles avanzados y personalizados atienden las necesidades complejas de corporaciones. La consultoría inicial es gratuita para evaluar qué nivel se adapta a tu presupuesto.
                  </p>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-3 text-secondary">¿Ofrecen soporte después de la implementación?</h3>
                  <p className="text-foreground/80">
                    Sí, todos nuestros servicios incluyen soporte post-implementación. Ofrecemos capacitación a tu equipo, documentación completa del sistema, y un período de acompañamiento para asegurar que todo funcione correctamente. También ofrecemos planes de mantenimiento mensual para empresas que requieren actualizaciones constantes o mejoras continuas.
                  </p>
                </div>
              </div>
            </div>
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