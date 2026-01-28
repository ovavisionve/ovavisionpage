import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import AnimatedStatsSection from "@/components/sections/AnimatedStatsSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ROICalculatorSection from "@/components/sections/ROICalculatorSection";
import AIAssistantPromoSection from "@/components/sections/AIAssistantPromoSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Cpu, Palette, Zap, Bot, TrendingUp, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Automatización con IA",
    description: "Sistemas inteligentes que automatizan tareas repetitivas y optimizan tus operaciones.",
  },
  {
    icon: Bot,
    title: "Agentes de IA",
    description: "Asistentes virtuales entrenados para tu negocio que trabajan 24/7.",
  },
  {
    icon: Palette,
    title: "Branding Estratégico",
    description: "Identidades visuales memorables que conectan con tu audiencia.",
  },
  {
    icon: Zap,
    title: "Mejora de Procesos",
    description: "Análisis y optimización de workflows para máxima eficiencia.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="bg-orb bg-orb-amber w-[600px] h-[600px] -top-40 -left-40" style={{ animationDelay: '0s' }} />
        <div className="bg-orb bg-orb-cyan w-[500px] h-[500px] top-1/4 -right-32" style={{ animationDelay: '2s' }} />
        <div className="bg-orb bg-orb-blue w-[700px] h-[700px] top-1/2 -left-48" style={{ animationDelay: '4s' }} />
        <div className="bg-orb bg-orb-orange w-[400px] h-[400px] bottom-1/4 right-1/4" style={{ animationDelay: '6s' }} />
        <div className="bg-orb bg-orb-cyan w-[550px] h-[550px] -bottom-32 left-1/3" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        
        {/* Services Overview Section */}
        <section id="servicios" className="py-24 lg:py-32 section-gradient-1">
          <div className="container px-6 mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                  Nuestros Servicios
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Soluciones que{" "}
                  <span className="bg-gradient-to-r from-secondary via-ova-cyan to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,180,255,0.5)]">
                    Transforman
                  </span>
                </h2>
                <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                  Combinamos automatización inteligente, IA y branding estratégico para impulsar tu empresa al siguiente nivel.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="glass-card p-6 group hover:scale-105 transition-all duration-300 hover:border-secondary/30"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-secondary to-ova-cyan flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-secondary/30 transition-shadow">
                      <feature.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-foreground/70">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link href="/servicios">
                  <Button variant="hero" size="xl">
                    Ver todos los servicios
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Stats Section */}
        <AnimatedStatsSection />

        {/* Why Choose Us Section */}
        <section className="py-24 lg:py-32 section-gradient-3">
          <div className="container px-6 mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block px-4 py-2 rounded-full bg-ova-amber/10 text-ova-amber text-sm font-medium mb-4">
                    ¿Por qué OVA VISION?
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    Automatización Inteligente que{" "}
                    <span className="bg-gradient-to-r from-ova-amber via-ova-orange to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,180,0,0.5)]">
                      Transforma tu Negocio
                    </span>
                  </h2>
                  <p className="text-lg text-foreground/80 mb-8">
                    No somos solo proveedores de tecnología. Somos socios estratégicos que entienden 
                    tus procesos y diseñan soluciones a medida para maximizar tu productividad.
                  </p>
                  <Link href="/que-es-ova">
                    <Button variant="outline" size="lg">
                      Conoce nuestra historia
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="glass-card p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Resultados Medibles</h3>
                      <p className="text-sm text-foreground/70">
                        Cada proyecto tiene KPIs claros y ROI definido desde el inicio.
                      </p>
                    </div>
                  </div>

                  <div className="glass-card p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Soporte Continuo</h3>
                      <p className="text-sm text-foreground/70">
                        No desaparecemos después de la implementación. Estamos contigo siempre.
                      </p>
                    </div>
                  </div>

                  <div className="glass-card p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Experiencia Local</h3>
                      <p className="text-sm text-foreground/70">
                        Entendemos el mercado venezolano con estándares internacionales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Assistant Promo Section */}
        <AIAssistantPromoSection />

        <ProcessSection />

        {/* Tech Stack Section */}
        <TechStackSection />

        {/* ROI Calculator Section */}
        <ROICalculatorSection />

        {/* CTA Section */}
        <section className="py-24 lg:py-32 section-gradient-4">
          <div className="container px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                ¿Listo para{" "}
                <span className="bg-gradient-to-r from-ova-amber via-ova-orange to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,180,0,0.5)]">
                  automatizar
                </span>{" "}
                tu empresa?
              </h2>
              <p className="text-lg text-foreground/80 mb-8">
                Agenda una consultoría gratuita y descubre cómo podemos transformar tu negocio 
                con automatización inteligente y branding estratégico.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto">
                  <Button variant="hero" size="xl">
                    Agenda Consultoría Gratuita
                  </Button>
                </Link>
                <Link href="/servicios">
                  <Button variant="outline" size="xl">
                    Ver Servicios
                  </Button>
                </Link>
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
