import { Cpu, Palette, Zap } from "lucide-react";

const features = [
  { icon: Cpu, title: "Automatización Inteligente", description: "Sistemas que trabajan por ti las 24 horas, eliminando errores y tareas repetitivas." },
  { icon: Palette, title: "Branding Estratégico", description: "Identidades visuales que comunican con claridad, propósito y autenticidad." },
  { icon: Zap, title: "Soluciones Tecnológicas", description: "Herramientas que transforman procesos, liberan tiempo e impulsan marcas." },
];

const AboutSection = () => {
  return (
    <section id="que-es" className="py-24 lg:py-32">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              ¿Qué es <span className="text-primary">OVA VISION</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              OVA VISION es una agencia venezolana de innovación, automatización e inteligencia artificial 
              que transforma empresas mediante sistemas inteligentes, diseño estratégico y soluciones 
              tecnológicas capaces de aumentar su rendimiento.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="p-8 rounded-xl border bg-card hover:scale-105 transition-transform">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <blockquote className="text-xl md:text-2xl italic text-muted-foreground max-w-4xl mx-auto">
              "Nacimos para unir lo mejor de dos mundos: 
              <span className="text-foreground font-medium"> la creatividad que da vida a las marcas </span>
              y 
              <span className="text-foreground font-medium"> la tecnología que las impulsa hacia el futuro</span>."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
