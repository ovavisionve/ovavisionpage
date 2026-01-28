'use client';

import { useEffect, useState, useRef } from 'react';
import { Zap, Clock, TrendingUp, Bot } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: 70,
    suffix: '%',
    label: 'Reducción de tareas manuales',
    description: 'Promedio en proyectos de automatización'
  },
  {
    icon: Clock,
    value: 500,
    suffix: '+',
    label: 'Horas ahorradas mensualmente',
    description: 'Por empresa automatizada'
  },
  {
    icon: Bot,
    value: 24,
    suffix: '/7',
    label: 'Disponibilidad de agentes IA',
    description: 'Sin costos adicionales'
  },
  {
    icon: Zap,
    value: 3,
    suffix: 'x',
    label: 'ROI promedio',
    description: 'Retorno en el primer año'
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const AnimatedStatsSection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              Resultados Reales
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              El poder de la{' '}
              <span className="bg-gradient-to-r from-secondary to-ova-cyan bg-clip-text text-transparent">
                Automatización Inteligente
              </span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Estos son los resultados típicos que las empresas logran al implementar nuestras soluciones de automatización e IA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300 hover:border-secondary/30"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-secondary to-ova-cyan flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-secondary/30 transition-shadow">
                  <stat.icon className="w-7 h-7 text-foreground" />
                </div>
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-ova-amber via-ova-orange to-white bg-clip-text text-transparent mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-semibold text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-foreground/60">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStatsSection;
