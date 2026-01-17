"use client";

import { useState } from "react";
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

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  company: string | null;
}

const AdminProjects = () => {
  const [projects] = useState<Project[]>([]);
  const [profiles] = useState<Profile[]>([]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Proyectos</h2>
        <p className="text-muted-foreground">Gestiona todos los proyectos activos</p>
      </div>

      <div className="grid gap-6">
        {projects.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No hay proyectos disponibles
          </div>
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Estado: {project.status}</p>
                  <p>Progreso: {project.progress}%</p>
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
