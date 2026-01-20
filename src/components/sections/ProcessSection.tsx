import { Search, Lightbulb, Cog, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Diagnóstico",
    description: "Analizamos tus procesos actuales e identificamos oportunidades de automatización.",
  },
  {
    icon: Lightbulb,
    title: "Diseño",
    description: "Creamos una estrategia personalizada con soluciones adaptadas a tu negocio.",
  },
  {
    icon: Cog,
    title: "Implementación",
    description: "Desarrollamos e integramos las soluciones de IA en tu flujo de trabajo.",
  },
  {
    icon: Rocket,
    title: "Optimización",
    description: "Monitoreamos, ajustamos y escalamos para maximizar resultados.",
  },
];

export default function ProcessSection() {
  return (
    <section id="proceso" className="py-24 lg:py-32 section-gradient-2">
      <div className="container px-6 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-ova-cyan/10 text-ova-cyan text-sm font-medium mb-4">
              Nuestro Proceso
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Cómo{" "}
              <span className="bg-gradient-to-r from-ova-cyan via-secondary to-white bg-clip-text text-transparent">
                Trabajamos
              </span>
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Un proceso claro y transparente para transformar tu empresa con tecnología de vanguardia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-ova-cyan to-secondary flex items-center justify-center group-hover:shadow-lg group-hover:shadow-ova-cyan/30 transition-shadow">
                    <step.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-ova-amber text-black text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
