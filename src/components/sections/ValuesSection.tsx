import { Lightbulb, Sparkles, Brain, Palette, Zap, Code, Eye, Heart } from "lucide-react";

const values = [
  { icon: Lightbulb, label: "Curiosidad" },
  { icon: Sparkles, label: "Innovación" },
  { icon: Brain, label: "Pensamiento Crítico" },
  { icon: Palette, label: "Diseño Funcional" },
  { icon: Zap, label: "Impacto Real" },
  { icon: Code, label: "Inteligencia Técnica" },
  { icon: Heart, label: "Creatividad" },
  { icon: Eye, label: "Visión Estratégica" },
];

const ValuesSection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Cultura
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Nuestros <span className="text-primary">Valores</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lo que valoramos en nuestro equipo y reflejamos en cada proyecto.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {values.map((value) => (
              <div key={value.label} className="p-6 rounded-xl border bg-card text-center hover:scale-105 transition-all">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="font-semibold text-sm lg:text-base">{value.label}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <blockquote className="text-xl md:text-2xl italic text-muted-foreground max-w-3xl mx-auto">
              "Tecnología aplicada de forma humana para crear 
              <span className="text-foreground font-medium"> soluciones que generan impacto real</span>."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
