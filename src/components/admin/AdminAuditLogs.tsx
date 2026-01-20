import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabase";  // Comentado: Supabase desactivado temporalmente

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, User, Edit, Trash2, Plus, RefreshCw, FileText, MessageSquare, FolderOpen } from "lucide-react";

interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  table_name: string;
  record_id: string | null;
  old_data: any;
  new_data: any;
  created_at: string;
}

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
}

const ACTION_CONFIG: Record<string, { label: string; color: string; icon: typeof Edit }> = {
  INSERT: { label: "Creado", color: "bg-green-500/20 text-green-400", icon: Plus },
  UPDATE: { label: "Actualizado", color: "bg-blue-500/20 text-blue-400", icon: Edit },
  DELETE: { label: "Eliminado", color: "bg-red-500/20 text-red-400", icon: Trash2 },
};

const TABLE_CONFIG: Record<string, { label: string; icon: typeof FileText }> = {
  contacts: { label: "Contactos", icon: User },
  projects: { label: "Proyectos", icon: FolderOpen },
  messages: { label: "Mensajes", icon: MessageSquare },
  blog_posts: { label: "Blog", icon: FileText },
};

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tableFilter, setTableFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");

  useEffect(() => {
    // fetchData();  // Comentado: Supabase desactivado

    // Datos dummy para probar la UI
    setTimeout(() => {
      const dummyLogs: AuditLog[] = [
        {
          id: "1",
          user_id: "user-1",
          action: "INSERT",
          table_name: "projects",
          record_id: "proj-123",
          old_data: null,
          new_data: { name: "Proyecto Web Nueva" },
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          user_id: "user-2",
          action: "UPDATE",
          table_name: "contacts",
          record_id: "lead-456",
          old_data: { status: "nuevo" },
          new_data: { status: "contactado" },
          created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
        },
        {
          id: "3",
          user_id: null,
          action: "DELETE",
          table_name: "messages",
          record_id: "msg-789",
          old_data: null,
          new_data: null,
          created_at: new Date(Date.now() - 7200000).toISOString(),
        },
      ];

      const dummyProfiles: Record<string, Profile> = {
        "user-1": { id: "user-1", full_name: "Ana López", email: "ana@ovavision.com" },
        "user-2": { id: "user-2", full_name: "Carlos Ruiz", email: "carlos@ovavision.com" },
      };

      setLogs(dummyLogs);
      setProfiles(dummyProfiles);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      !searchTerm ||
      log.table_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profiles[log.user_id || ""]?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profiles[log.user_id || ""]?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTable = tableFilter === "all" || log.table_name === tableFilter;
    const matchesAction = actionFilter === "all" || log.action === actionFilter;

    return matchesSearch && matchesTable && matchesAction;
  });

  const getChangeSummary = (log: AuditLog): string => {
    if (log.action === "INSERT" && log.new_data) {
      if (log.table_name === "contacts") return `Nuevo lead: ${log.new_data.name || "Sin nombre"}`;
      if (log.table_name === "projects") return `Nuevo proyecto: ${log.new_data.name || "Sin nombre"}`;
      return "Nuevo registro creado";
    }

    if (log.action === "UPDATE" && log.old_data && log.new_data) {
      const changes: string[] = [];
      Object.keys(log.new_data).forEach((key) => {
        if (log.old_data![key] !== log.new_data![key] && key !== "updated_at") {
          changes.push(key);
        }
      });
      return changes.length > 0 ? `Campos actualizados: ${changes.slice(0, 3).join(", ")}${changes.length > 3 ? "..." : ""}` : "Sin cambios detectados";
    }

    if (log.action === "DELETE") return "Registro eliminado";

    return "Acción registrada";
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
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar en logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-muted/30"
          />
        </div>
        <Select value={tableFilter} onValueChange={setTableFilter}>
          <SelectTrigger className="w-40 bg-muted/30">
            <SelectValue placeholder="Tabla" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las tablas</SelectItem>
            {Object.entries(TABLE_CONFIG).map(([key, config]) => (
              <SelectItem key={key} value={key}>{config.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-40 bg-muted/30">
            <SelectValue placeholder="Acción" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las acciones</SelectItem>
            {Object.entries(ACTION_CONFIG).map(([key, config]) => (
              <SelectItem key={key} value={key}>{config.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Logs List */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Registro de Auditoría</span>
            <Badge variant="secondary">{filteredLogs.length} registros</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No hay logs de auditoría (datos simulados)</p>
            ) : (
              filteredLogs.map((log) => {
                const actionConfig = ACTION_CONFIG[log.action] || { label: log.action, color: "bg-gray-500/20 text-gray-400", icon: RefreshCw };
                const tableConfig = TABLE_CONFIG[log.table_name] || { label: log.table_name, icon: FileText };
                const ActionIcon = actionConfig.icon;
                const TableIcon = tableConfig.icon;
                const user = log.user_id ? profiles[log.user_id] : null;

                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${actionConfig.color}`}>
                      <ActionIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          <TableIcon className="w-3 h-3 mr-1" />
                          {tableConfig.label}
                        </Badge>
                        <span className={`text-xs font-medium ${actionConfig.color.split(" ")[1]}`}>
                          {actionConfig.label}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{getChangeSummary(log)}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {user?.full_name || user?.email || "Sistema"}
                        </span>
                        <span>
                          {new Date(log.created_at).toLocaleString("es-ES", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuditLogs;