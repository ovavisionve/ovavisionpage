"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, AlertCircle, Users, Calendar, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  service_type: string;
  progress: number;
  start_date: string;
  estimated_end_date: string | null;
  client_id: string;
  created_at: string;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de datos dummy (ya que Supabase está desactivado)
    setTimeout(() => {
      setProjects([
        {
          id: "proj-1",
          name: "Rediseño Web OVA",
          description: "Actualización completa del sitio principal con nuevo branding",
          status: "En progreso",
          service_type: "Desarrollo Web",
          progress: 65,
          start_date: "2025-11-15",
          estimated_end_date: "2026-02-28",
          client_id: "cli-101",
          created_at: "2025-11-10",
        },
        {
          id: "proj-2",
          name: "Campaña Marketing Digital",
          description: "Estrategia SEO + redes sociales para Q1 2026",
          status: "Completado",
          service_type: "Marketing Digital",
          progress: 100,
          start_date: "2025-10-01",
          estimated_end_date: "2025-12-31",
          client_id: "cli-102",
          created_at: "2025-09-25",
        },
        {
          id: "proj-3",
          name: "Branding Corporativo Nuevo",
          description: "Diseño de logo, paleta y manual de identidad",
          status: "Pendiente",
          service_type: "Branding",
          progress: 20,
          start_date: "2026-01-05",
          estimated_end_date: "2026-04-15",
          client_id: "cli-103",
          created_at: "2026-01-03",
        },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Proyectos</h2>
        <p className="text-muted-foreground">Gestiona todos los proyectos activos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No hay proyectos disponibles (datos simulados)
          </div>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                 <Badge variant={
  project.status === "Completado" ? "default" :
  project.status === "En progreso" ? "outline" : "secondary"
}>
  {project.status}
</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Servicio: {project.service_type}
                    </span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>

                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary rounded-full h-2"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Inicio: {new Date(project.start_date).toLocaleDateString("es-ES")}
                    </div>
                    {project.estimated_end_date && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Fin estimado: {new Date(project.estimated_end_date).toLocaleDateString("es-ES")}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProjects;