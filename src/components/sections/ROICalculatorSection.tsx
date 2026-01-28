'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ROICalculatorSection = () => {
  const [employees, setEmployees] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(15);

  // Calculations
  const weeklyManualCost = employees * hoursPerWeek * hourlyRate;
  const monthlyManualCost = weeklyManualCost * 4;
  const yearlyManualCost = monthlyManualCost * 12;

  // Assuming 70% automation efficiency
  const automationEfficiency = 0.7;
  const yearlySavings = yearlyManualCost * automationEfficiency;
  const monthlySavings = monthlyManualCost * automationEfficiency;
  const hoursRecovered = employees * hoursPerWeek * automationEfficiency * 52;

  return (
    <section className="py-20 lg:py-28 section-gradient-3">
      <div className="container px-6 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              Calculadora
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Calcula tu{' '}
              <span className="bg-gradient-to-r from-secondary to-ova-cyan bg-clip-text text-transparent">
                ROI de Automatización
              </span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Descubre cuánto podrías ahorrar automatizando las tareas repetitivas de tu empresa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="glass-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="text-xl font-bold">Datos de tu empresa</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Empleados que realizan tareas repetitivas
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex justify-between text-sm text-foreground/60 mt-1">
                    <span>1</span>
                    <span className="font-bold text-secondary">{employees} empleados</span>
                    <span>50</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Horas semanales en tareas manuales (por persona)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex justify-between text-sm text-foreground/60 mt-1">
                    <span>1h</span>
                    <span className="font-bold text-secondary">{hoursPerWeek} horas/semana</span>
                    <span>40h</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Costo promedio por hora (USD)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                  <div className="flex justify-between text-sm text-foreground/60 mt-1">
                    <span>$5</span>
                    <span className="font-bold text-secondary">${hourlyRate}/hora</span>
                    <span>$100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="glass-card p-6 md:p-8 bg-gradient-to-br from-secondary/10 to-ova-cyan/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-ova-amber/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-ova-amber" />
                </div>
                <h3 className="text-xl font-bold">Tu potencial de ahorro</h3>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex items-center gap-2 text-sm text-foreground/60 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Ahorro mensual estimado</span>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-ova-amber to-ova-orange bg-clip-text text-transparent">
                    ${monthlySavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex items-center gap-2 text-sm text-foreground/60 mb-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Ahorro anual estimado</span>
                  </div>
                  <p className="text-4xl font-bold bg-gradient-to-r from-secondary to-ova-cyan bg-clip-text text-transparent">
                    ${yearlySavings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-border/30">
                  <div className="flex items-center gap-2 text-sm text-foreground/60 mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Horas recuperadas al año</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {hoursRecovered.toLocaleString('en-US', { maximumFractionDigits: 0 })} horas
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/30">
                <p className="text-sm text-foreground/60 mb-4">
                  * Basado en 70% de eficiencia de automatización (promedio conservador)
                </p>
                <Link href="/contacto">
                  <Button variant="hero" size="lg" className="w-full">
                    Solicitar consultoría gratuita
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculatorSection;
