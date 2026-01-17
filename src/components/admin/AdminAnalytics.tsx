import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";
import { Users, FolderOpen, DollarSign, TrendingUp, Clock, CheckCircle2 } from "lucide-react";

interface AnalyticsData {
  totalLeads: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  conversionRate: number;
  leadsByStatus: { name: string; value: number; color: string }[];
  projectsByService: { name: string; count: number }[];
  leadsOverTime: { date: string; leads: number }[];
}

const COLORS = {
  nuevo: "#22c55e",
  contactado: "#3b82f6",
  negociacion: "#f59e0b",
  propuesta: "#8b5cf6",
  cerrado_ganado: "#10b981",
  cerrado_perdido: "#ef4444",
};

const STATUS_LABELS: Record<string, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  negociacion: "En Negociación",
  propuesta: "Propuesta Enviada",
  cerrado_ganado: "Cerrado (Ganado)",
  cerrado_perdido: "Cerrado (Perdido)",
};

const AdminAnalytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [contactsRes, projectsRes] = await Promise.all([
        supabase.from("contacts").select("*"),
        supabase.from("projects").select("*"),
      ]);

      const contacts = contactsRes.data || [];
      const projects = projectsRes.data || [];

      // Process leads by status
      const statusCounts: Record<string, number> = {};
      contacts.forEach((c: any) => {
        const status = c.status || "nuevo";
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });

      const leadsByStatus = Object.entries(statusCounts).map(([status, count]) => ({
        name: STATUS_LABELS[status] || status,
        value: count,
        color: COLORS[status as keyof typeof COLORS] || "#6b7280",
      }));

      // Process projects by service
      const serviceCounts: Record<string, number> = {};
      projects.forEach((p: any) => {
        const service = p.service_type;
        serviceCounts[service] = (serviceCounts[service] || 0) + 1;
      });

      const projectsByService = Object.entries(serviceCounts).map(([name, count]) => ({
        name: name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        count,
      }));

      // Leads over time (last 30 days)
      const last30Days: Record<string, number> = {};
      const today = new Date();
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const key = date.toISOString().split("T")[0];
        last30Days[key] = 0;
      }

      contacts.forEach((c: any) => {
        const date = c.created_at?.split("T")[0];
        if (date && last30Days[date] !== undefined) {
          last30Days[date]++;
        }
      });

      const leadsOverTime = Object.entries(last30Days).map(([date, leads]) => ({
        date: new Date(date).toLocaleDateString("es-ES", { day: "2-digit", month: "short" }),
        leads,
      }));

      // Calculate conversion rate
      const closedWon = contacts.filter((c: any) => c.status === "cerrado_ganado").length;
      const totalProcessed = contacts.filter((c: any) => 
        c.status === "cerrado_ganado" || c.status === "cerrado_perdido"
      ).length;
      const conversionRate = totalProcessed > 0 ? (closedWon / totalProcessed) * 100 : 0;

      setData({
        totalLeads: contacts.length,
        totalProjects: projects.length,
        activeProjects: projects.filter((p: any) => p.status !== "completado").length,
        completedProjects: projects.filter((p: any) => p.status === "completado").length,
        conversionRate,
        leadsByStatus,
        projectsByService,
        leadsOverTime,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
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

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-3xl font-bold">{data.totalLeads}</p>
              </div>
              <Users className="w-10 h-10 text-secondary opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Proyectos Activos</p>
                <p className="text-3xl font-bold">{data.activeProjects}</p>
              </div>
              <Clock className="w-10 h-10 text-ova-amber opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completados</p>
                <p className="text-3xl font-bold">{data.completedProjects}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasa Conversión</p>
                <p className="text-3xl font-bold">{data.conversionRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-secondary opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Leads Over Time */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Leads últimos 30 días</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.leadsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--secondary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Leads by Status Pie Chart */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Leads por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.leadsByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {data.leadsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects by Service */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Proyectos por Servicio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.projectsByService} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  width={150}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
