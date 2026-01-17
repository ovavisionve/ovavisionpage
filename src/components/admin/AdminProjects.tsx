import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Clock, CheckCircle2, AlertCircle, Users, Calendar } from "lucide-react";

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

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pendiente: { label: "Pendiente", color: "bg-yellow-500/20 text-yellow-400", icon: AlertCircle },
  en_progreso: { label: "En progreso", color: "bg-blue-500/20 text-blue-400", icon: Clock },
  revision: { label: "En revisión", color: "bg-amber-500/20 text-amber-400", icon: AlertCircle },
  completado: { label: "Completado", color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
};

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [projectsRes, profilesRes] = await Promise.all([
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("*"),
      ]);

      setProjects(projectsRes.data || []);

      const profilesMap: Record<string, Profile> = {};
      (profilesRes.data || []).forEach((p: Profile) => {
        profilesMap[p.id] = p;
      });
      setProfiles(profilesMap);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = projects.filter((p) => p.status === key).length;
          const Icon = config.icon;
          return (
            <Card key={key} className="glass-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{config.label}</p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${config.color.split(" ")[1]}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Projects List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => {
          const status = statusConfig[project.status] || statusConfig.en_progreso;
          const client = profiles[project.client_id];
          const StatusIcon = status.icon;

          return (
            <Link key={project.id} to={`/portal/proyecto/${project.id}`}>
              <Card className="glass-card border-border/50 hover:border-secondary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{project.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{project.service_type}</p>
                    </div>
                    <Badge className={status.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>

                  {project.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span className="truncate max-w-[100px]">
                        {client?.full_name || client?.email || "Sin asignar"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(project.start_date).toLocaleDateString("es-ES", { 
                        day: "2-digit", 
                        month: "short" 
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No hay proyectos registrados aún.
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
