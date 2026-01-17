import { Zap, Layers, Cpu, Settings, Clock, Check } from "lucide-react";

const levels = [
  {
    level: 1,
    title: "Automatización Básica",
    time: "1-2 semanas",
    icon: Zap,
    features: ["Gestión automática de pagos", "Control de inventario básico", "Sistema de reservas y citas", "Recolección automática de leads"],
  },
  {
    level: 2,
    title: "Automatización Media",
    time: "3-4 semanas",
    icon: Layers,
    features: ["Time tracking para empleados", "Generación automática de reportes", "CRM simplificado", "Facturación automatizada", "Portal de empleados + nómina"],
  },
  {
    level: 3,
    title: "Automatización Avanzada",
    time: "1-3 meses",
    icon: Cpu,
    features: ["ERP modular completo", "Sistema de gestión de proyectos", "Logística con rutas optimizadas", "Plataforma e-learning", "Gestión documental con OCR"],
  },
  {
    level: 4,
    title: "Servicios Especializados",
    time: "Personalizado",
    icon: Settings,
    features: ["Solución 100% a la medida", "Combina servicios de todos los niveles", "Presupuesto ajustado a necesidades", "Integración con sistemas existentes"],
  },
];

const AutomationLevelsSection = () => {
  return (
    <section id="automatizacion" className="py-24 lg:py-32">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Automatización
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Niveles de <span className="text-primary">Automatización</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Soluciones low-code/no-code diseñadas para máxima flexibilidad.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {levels.map((level) => (
              <div key={level.level} className="p-6 lg:p-8 rounded-xl border bg-card hover:scale-[1.02] transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <level.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Nivel {level.level}</span>
                    <h3 className="text-xl font-bold">{level.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {level.time}
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {level.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationLevelsSection;
