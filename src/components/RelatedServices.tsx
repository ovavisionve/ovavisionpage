'use client';

import Link from "next/link";
import { RelatedService, getRelatedServices } from "@/lib/authors-data";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RelatedServicesProps {
  category: string | null;
  articleTitle?: string;
}

export default function RelatedServices({ category, articleTitle }: RelatedServicesProps) {
  const services = getRelatedServices(category);

  return (
    <div className="glass-card p-6 md:p-8 mt-8">
      <div className="flex items-center gap-2 text-ova-amber mb-4">
        <Sparkles className="w-5 h-5" />
        <span className="text-sm font-medium uppercase tracking-wider">Servicios Relacionados</span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold mb-2">
        Lleva este conocimiento a la práctica
      </h3>
      <p className="text-muted-foreground mb-6">
        En OVA VISION te ayudamos a implementar soluciones de {category || 'automatización'} adaptadas a tu negocio.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="group p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{service.icon}</span>
              <div className="flex-1">
                <h4 className="font-semibold group-hover:text-secondary transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {service.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all mt-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/contacto" className="flex-1">
          <Button variant="hero" size="lg" className="w-full">
            Agendar Consultoría Gratis
          </Button>
        </Link>
        <Link href="/servicios" className="flex-1">
          <Button variant="outline" size="lg" className="w-full">
            Ver Todos los Servicios
          </Button>
        </Link>
      </div>
    </div>
  );
}
