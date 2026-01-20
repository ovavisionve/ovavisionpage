'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import { Users, Lightbulb, Target, Heart, Globe, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const values = [
  {
    icon: Lightbulb,
    title: "Innovación Constante",
    description: "No nos conformamos con lo establecido. Buscamos continuamente nuevas formas de aplicar IA y automatización para generar valor real."
  },
  {
    icon: Heart,
    title: "Compromiso con el Cliente",
    description: "Tu éxito es nuestro éxito. Trabajamos como extensión de tu equipo, no como un proveedor más."
  },
  {
    icon: Target,
    title: "Simplicidad en la Complejidad",
    description: "La tecnología puede ser compleja, pero las soluciones no tienen que serlo. Diseñamos sistemas intuitivos y fáciles de usar."
  },
  {
    icon: Shield,
    title: "Resultados Medibles",
    description: "Cada proyecto tiene KPIs claros. Si no se puede medir, no vale la pena implementarlo."
  },
  {
    icon: Globe,
    title: "Impacto Positivo",
    description: "Creemos en usar la tecnología para mejorar no solo procesos, sino la calidad de vida de las personas que trabajan con esos procesos."
  },
];

const advantages = [
  "Experiencia Local, Estándares Internacionales: Entendemos el mercado venezolano pero aplicamos las mejores prácticas globales",
  "Resultados Comprobados: Casos de éxito con incrementos medibles en productividad",
  "Soporte Continuo: No desaparecemos después de la implementación",
  "Tecnología de Punta: Trabajamos con las plataformas líderes del mercado (Make, n8n, etc.)",
  "ROI Claro: Cada proyecto tiene un retorno de inversión definido desde el inicio"
];

export default function QueEsOva() {
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
              <span className="inline-block px-4 py-2 rounded-full bg-ova-amber/10 text-ova-amber text-sm font-medium mb-6">
                Nuestra Historia
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                ¿Qué es{" "}
                <span className="bg-gradient-to-r from-ova-amber to-ova-orange bg-clip-text text-transparent">
                  OVA VISION
                </span>?
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Somos una agencia venezolana que combina automatización inteligente, 
                inteligencia artificial y branding estratégico para transformar empresas.
              </p>
            </div>
          </div>
        </section>

        {/* Cómo nace OVA */}
        <section className="py-16 lg:py-24 section-gradient-1 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Cómo nace{" "}
                <span className="bg-gradient-to-r from-secondary to-ova-cyan bg-clip-text text-transparent">
                  OVA VISION
                </span>
              </h2>
              <div className="glass-card p-8 lg:p-12 space-y-6 text-lg text-muted-foreground">
                <p>
                  Nace de la visión de transformar la manera en que las empresas trabajan. 
                  En un mundo donde la eficiencia es clave, OVA VISION surge como respuesta 
                  a la necesidad de empresas venezolanas e internacionales de modernizar sus 
                  procesos sin perder el toque humano que las hace únicas.
                </p>
                <p>
                  Fundada por profesionales con experiencia en tecnología, diseño y estrategia 
                  de negocios, OVA VISION combina lo mejor de la automatización con inteligencia 
                  artificial con un entendimiento profundo de las necesidades empresariales reales.
                </p>
                <p>
                  Nuestra misión es clara: democratizar el acceso a la tecnología de automatización 
                  para que empresas de cualquier tamaño puedan competir en igualdad de condiciones 
                  en el mercado global.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Detrás del proyecto / Equipo */}
        <section id="equipo" className="py-16 lg:py-24 section-gradient-2 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Detrás del{" "}
                <span className="bg-gradient-to-r from-ova-amber to-ova-orange bg-clip-text text-transparent">
                  Proyecto
                </span>
              </h2>
              <div className="glass-card p-8 lg:p-12 space-y-6 text-lg text-muted-foreground">
                <p>
                  Detrás de cada proyecto de automatización hay un equipo multidisciplinario 
                  que entiende que la tecnología es un medio, no un fin. Nuestro enfoque es 
                  simple: escuchar, entender y ejecutar.
                </p>
                <p>
                  Trabajamos mano a mano con líderes empresariales para identificar cuellos 
                  de botella, procesos ineficientes y oportunidades de crecimiento que la 
                  automatización puede desbloquear. No vendemos software, construimos 
                  soluciones a medida.
                </p>
              </div>

              {/* Team Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <div className="glass-card p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-ova-amber to-ova-orange flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Oriana Russo León</h3>
                  <p className="text-secondary font-medium mb-2">Presidente</p>
                  <p className="text-sm text-muted-foreground">Venezolana</p>
                  <div className="flex justify-center gap-3 mt-4">
                    <a 
                      href="https://linkedin.com/in/oriana-russo-588093382" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-secondary/80 transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a 
                      href="https://wa.me/17863523702" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-secondary/80 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="glass-card p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-secondary to-ova-cyan flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Valeria V. Rodrigues Abreu</h3>
                  <p className="text-secondary font-medium mb-2">Vicepresidente</p>
                  <p className="text-sm text-muted-foreground">Portuguesa</p>
                  <div className="flex justify-center gap-3 mt-4">
                    <a 
                      href="https://wa.me/584245512363" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-secondary/80 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="py-16 lg:py-24 section-gradient-3 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Nuestros{" "}
                  <span className="bg-gradient-to-r from-secondary to-ova-cyan bg-clip-text text-transparent">
                    Valores
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value) => (
                  <div key={value.title} className="glass-card p-6 group hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-secondary to-ova-cyan flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="py-16 lg:py-24 section-gradient-4 w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  ¿Por qué{" "}
                  <span className="bg-gradient-to-r from-ova-amber to-ova-orange bg-clip-text text-transparent">
                    elegirnos
                  </span>?
                </h2>
              </div>

              <div className="glass-card p-8 lg:p-12">
                <ul className="space-y-6">
                  {advantages.map((advantage, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4 text-secondary" />
                      </div>
                      <p className="text-muted-foreground">{advantage}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 text-center">
                  <Link href="/servicios">
                    <Button variant="hero" size="xl">
                      Conoce Nuestros Servicios
                    </Button>
                  </Link>
                </div>
              </div>
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