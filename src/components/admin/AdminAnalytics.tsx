"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { Users, Clock, CheckCircle2, TrendingUp } from "lucide-react";

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

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#8b5cf6", "#10b981", "#ef4444"];

const AdminAnalytics = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData({
        totalLeads: 142,
        totalProjects: 38,
        activeProjects: 15,
        completedProjects: 23,
        conversionRate: 62.5,
        leadsByStatus: [
          { name: "Nuevo", value: 45, color: COLORS[0] },
          { name: "Contactado", value: 30, color: COLORS[1] },
          { name: "Negociación", value: 25, color: COLORS[2] },
          { name: "Propuesta", value: 18, color: COLORS[3] },
          { name: "Ganado", value: 15, color: COLORS[4] },
          { name: "Perdido", value: 9, color: COLORS[5] },
        ],
        projectsByService: [
          { name: "Desarrollo Web", count: 14 },
          { name: "Diseño UI/UX", count: 9 },
          { name: "Marketing Digital", count: 8 },
          { name: "Branding", count: 7 },
        ],
        leadsOverTime: Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return { date: date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }), leads: Math.floor(Math.random() * 8 + 1) };
        }),
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-t-transparent rounded-full border-secondary" /></div>;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total Leads</p><p className="text-3xl font-bold">{data.totalLeads}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Proyectos Activos</p><p className="text-3xl font-bold">{data.activeProjects}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Completados</p><p className="text-3xl font-bold">{data.completedProjects}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Conversión</p><p className="text-3xl font-bold">{data.conversionRate.toFixed(1)}%</p></CardContent></Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Leads últimos 30 días</CardTitle></CardHeader>
          <CardContent><div className="h-64">
            <ResponsiveContainer><LineChart data={data.leadsOverTime}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Line type="monotone" dataKey="leads" stroke="#8884d8" /></LineChart></ResponsiveContainer>
          </div></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Leads por Estado</CardTitle></CardHeader>
          <CardContent><div className="h-64">
            <ResponsiveContainer><PieChart>
              <Pie
                data={data.leadsByStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={(props: any) => {
                  const { name, percent, payload } = props;
                  const displayName = name ?? payload?.name ?? 'Desconocido';
                  const percentage = percent !== undefined ? (percent * 100).toFixed(0) : '0';
                  return `${displayName} (${percentage}%)`;
                }}
                labelLine={false}
              >
                {data.leadsByStatus.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart></ResponsiveContainer>
          </div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Proyectos por Servicio</CardTitle></CardHeader>
        <CardContent><div className="h-64">
          <ResponsiveContainer><BarChart data={data.projectsByService} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart></ResponsiveContainer>
        </div></CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;