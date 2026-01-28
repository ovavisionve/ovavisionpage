"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Lightbulb, Cog, Rocket, ChevronDown, ChevronUp, CheckCircle2, ArrowRight, FileText, Users, Settings, BarChart3, Zap, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mainSteps = [
  {
    icon: Search,
    title: "Diagnóstico",
    description: "Analizamos tus procesos actuales e identificamos oportunidades de automatización.",
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    icon: Lightbulb,
    title: "Diseño",
    description: "Creamos una estrategia personalizada con soluciones adaptadas a tu negocio.",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
  },
  {
    icon: Cog,
    title: "Implementación",
    description: "Desarrollamos e integramos las soluciones de IA en tu flujo de trabajo.",
    color: "from-purple-400 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  {
    icon: Rocket,
    title: "Optimización",
    description: "Monitoreamos, ajustamos y escalamos para maximizar resultados.",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
];

const detailedSteps = [
  {
    phase: "Diagnóstico",
    phaseColor: "from-blue-400 to-cyan-500",
    steps: [
      { icon: MessageSquare, title: "Consulta inicial", description: "Conversamos sobre tu negocio y objetivos", duration: "30 min" },
      { icon: Search, title: "Análisis de procesos", description: "Identificamos tareas repetitivas y cuellos de botella", duration: "1-2 días" },
      { icon: FileText, title: "Informe de oportunidades", description: "Documentamos las áreas de mejora con prioridades", duration: "1 día" },
    ]
  },
  {
    phase: "Diseño",
    phaseColor: "from-yellow-400 to-orange-500",
    steps: [
      { icon: Lightbulb, title: "Propuesta de solución", description: "Presentamos opciones de automatización", duration: "2-3 días" },
      { icon: Users, title: "Validación contigo", description: "Ajustamos según tu feedback y presupuesto", duration: "1 día" },
      { icon: FileText, title: "Plan de implementación", description: "Cronograma detallado con entregables", duration: "1 día" },
    ]
  },
  {
    phase: "Implementación",
    phaseColor: "from-purple-400 to-pink-500",
    steps: [
      { icon: Settings, title: "Configuración inicial", description: "Preparamos las herramientas y conexiones", duration: "2-3 días" },
      { icon: Cog, title: "Desarrollo", description: "Construimos los flujos de automatización", duration: "1-2 semanas" },
      { icon: Zap, title: "Pruebas", description: "Verificamos que todo funcione correctamente", duration: "2-3 días" },
      { icon: Rocket, title: "Lanzamiento", description: "Activamos la automatización en producción", duration: "1 día" },
    ]
  },
  {
    phase: "Optimización",
    phaseColor: "from-green-400 to-emerald-500",
    steps: [
      { icon: BarChart3, title: "Monitoreo", description: "Seguimiento de métricas y rendimiento", duration: "Continuo" },
      { icon: Settings, title: "Ajustes finos", description: "Optimizamos según los resultados reales", duration: "Según necesidad" },
      { icon: Rocket, title: "Escalamiento", description: "Expandimos a otros procesos de tu empresa", duration: "Según objetivos" },
    ]
  },
];

export default function ProcessSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Auto-animate through steps when expanded
  useEffect(() => {
    if (!isExpanded || !isAnimating) return;

    const currentPhaseSteps = detailedSteps[activePhase]?.steps.length || 0;

    const timer = setTimeout(() => {
      if (activeStep < currentPhaseSteps - 1) {
        setActiveStep(prev => prev + 1);
      } else if (activePhase < detailedSteps.length - 1) {
        setActivePhase(prev => prev + 1);
        setActiveStep(0);
      } else {
        setIsAnimating(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [isExpanded, isAnimating, activePhase, activeStep]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setActivePhase(0);
      setActiveStep(0);
      setIsAnimating(true);
    }
  };

  const handlePhaseClick = (index: number) => {
    setActivePhase(index);
    setActiveStep(0);
    setIsAnimating(false);
  };

  const isStepCompleted = (phaseIndex: number, stepIndex: number) => {
    if (phaseIndex < activePhase) return true;
    if (phaseIndex === activePhase && stepIndex <= activeStep) return true;
    return false;
  };

  return (
    <section id="proceso" className="py-24 lg:py-32 section-gradient-2">
      <div className="container px-6 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
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

          {/* Main 4 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {mainSteps.map((step, index) => (
              <div
                key={step.title}
                onClick={() => isExpanded && handlePhaseClick(index)}
                className={cn(
                  "glass-card p-6 text-center group transition-all duration-300",
                  isExpanded ? "cursor-pointer" : "",
                  isExpanded && activePhase === index
                    ? `${step.bgColor} ${step.borderColor} border-2 scale-105`
                    : "hover:scale-105"
                )}
              >
                <div className="relative mb-6">
                  <div className={cn(
                    "w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r flex items-center justify-center transition-all duration-300",
                    step.color,
                    isExpanded && activePhase === index ? "shadow-lg scale-110" : "group-hover:shadow-lg"
                  )}>
                    <step.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <span className={cn(
                    "absolute -top-2 -right-2 w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-all",
                    isExpanded && activePhase > index
                      ? "bg-green-500 text-white"
                      : "bg-ova-amber text-black"
                  )}>
                    {isExpanded && activePhase > index ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Ver Más Button */}
          <div className="text-center mb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={handleExpand}
              className="gap-2"
            >
              {isExpanded ? "Ver menos" : "Ver proceso detallado"}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>

          {/* Expanded Timeline */}
          <div
            ref={timelineRef}
            className={cn(
              "overflow-hidden transition-all duration-500 ease-in-out",
              isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="glass-card p-8 md:p-12">
              <h3 className="text-2xl font-bold text-center mb-8">
                Proceso detallado paso a paso
              </h3>

              {/* Timeline */}
              <div className="space-y-8">
                {detailedSteps.map((phase, phaseIndex) => (
                  <div key={phase.phase} className="relative">
                    {/* Phase Header */}
                    <div
                      className={cn(
                        "flex items-center gap-4 mb-6 cursor-pointer transition-all",
                        activePhase === phaseIndex ? "scale-100" : "scale-95 opacity-70"
                      )}
                      onClick={() => handlePhaseClick(phaseIndex)}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-full bg-gradient-to-r flex items-center justify-center font-bold text-lg text-white shadow-lg",
                        phase.phaseColor
                      )}>
                        {phaseIndex + 1}
                      </div>
                      <div>
                        <h4 className={cn(
                          "text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                          phase.phaseColor
                        )}>
                          {phase.phase}
                        </h4>
                        <p className="text-sm text-foreground/60">
                          {phase.steps.length} pasos
                        </p>
                      </div>
                      {activePhase > phaseIndex && (
                        <CheckCircle2 className="w-6 h-6 text-green-500 ml-auto" />
                      )}
                    </div>

                    {/* Steps */}
                    <div className={cn(
                      "ml-6 pl-6 border-l-2 space-y-4 transition-all duration-300",
                      activePhase === phaseIndex ? "border-secondary" : "border-border/30"
                    )}>
                      {phase.steps.map((step, stepIndex) => {
                        const completed = isStepCompleted(phaseIndex, stepIndex);
                        const isCurrent = activePhase === phaseIndex && activeStep === stepIndex;

                        return (
                          <div
                            key={step.title}
                            className={cn(
                              "relative flex items-start gap-4 p-4 rounded-lg transition-all duration-500",
                              completed ? "bg-secondary/10" : "bg-muted/30",
                              isCurrent && "ring-2 ring-secondary shadow-lg"
                            )}
                            style={{
                              transform: completed ? "translateX(0)" : "translateX(-10px)",
                              opacity: completed ? 1 : 0.5,
                            }}
                          >
                            {/* Connector dot */}
                            <div className={cn(
                              "absolute -left-[29px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300",
                              completed
                                ? "bg-secondary border-secondary"
                                : "bg-background border-border"
                            )}>
                              {completed && (
                                <CheckCircle2 className="w-3 h-3 text-white absolute -top-0.5 -left-0.5" />
                              )}
                            </div>

                            {/* Icon */}
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                              completed
                                ? `bg-gradient-to-r ${phase.phaseColor}`
                                : "bg-muted"
                            )}>
                              <step.icon className={cn(
                                "w-5 h-5",
                                completed ? "text-white" : "text-foreground/50"
                              )} />
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className={cn(
                                  "font-semibold transition-colors",
                                  completed ? "text-foreground" : "text-foreground/50"
                                )}>
                                  {step.title}
                                </h5>
                                <span className={cn(
                                  "text-xs px-2 py-1 rounded-full",
                                  completed
                                    ? "bg-secondary/20 text-secondary"
                                    : "bg-muted text-foreground/50"
                                )}>
                                  {step.duration}
                                </span>
                              </div>
                              <p className={cn(
                                "text-sm transition-colors",
                                completed ? "text-foreground/70" : "text-foreground/40"
                              )}>
                                {step.description}
                              </p>
                            </div>

                            {/* Arrow for current */}
                            {isCurrent && (
                              <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                                <ArrowRight className="w-5 h-5 text-secondary animate-pulse" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Connector to next phase */}
                    {phaseIndex < detailedSteps.length - 1 && (
                      <div className="flex justify-center my-4">
                        <div className={cn(
                          "w-0.5 h-8 transition-colors duration-300",
                          activePhase > phaseIndex ? "bg-green-500" : "bg-border/30"
                        )} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Replay Button */}
              <div className="text-center mt-8">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setActivePhase(0);
                    setActiveStep(0);
                    setIsAnimating(true);
                  }}
                  className="text-secondary"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Reproducir animación
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
