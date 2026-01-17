import { useEffect, useState } from "react";
// import { supabase } from "@/integrations/supabase/client";  // Comentado temporalmente: Supabase desactivado

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  Search, Phone, Mail, Building2, Calendar, DollarSign, 
  Edit2, Trash2, Download, RefreshCw, ChevronRight
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string;
  message: string | null;
  status: string;
  notes: string | null;
  priority: string | null;
  estimated_value: number | null;
  last_contact_date: string | null;
  source: string | null;
  created_at: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
  nuevo: { label: "Nuevo", color: "text-green-400", bgColor: "bg-green-500/20" },
  contactado: { label: "Contactado", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  negociacion: { label: "Negociación", color: "text-amber-400", bgColor: "bg-amber-500/20" },
  propuesta: { label: "Propuesta", color: "text-purple-400", bgColor: "bg-purple-500/20" },
  cerrado_ganado: { label: "Ganado", color: "text-emerald-400", bgColor: "bg-emerald-500/20" },
  cerrado_perdido: { label: "Perdido", color: "text-red-400", bgColor: "bg-red-500/20" },
};

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  low: { label: "Baja", color: "text-gray-400" },
  medium: { label: "Media", color: "text-yellow-400" },
  high: { label: "Alta", color: "text-red-400" },
};

const AdminCRM = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // fetchContacts();  // Comentado: Supabase desactivado temporalmente

    // Datos dummy para probar la UI completa
    setTimeout(() => {
      const dummyContacts: Contact[] = [
        {
          id: "contact-1",
          name: "María González",
          email: "maria@techsolutions.es",
          company: "Tech Solutions SL",
          service: "Desarrollo Web",
          message: "Interesada en rediseño de sitio e-commerce",
          status: "nuevo",
          notes: "Llamar el lunes para agendar demo",
          priority: "high",
          estimated_value: 8500,
          last_contact_date: "2026-01-15T14:30:00Z",
          source: "Formulario web",
          created_at: "2026-01-10T09:15:00Z",
        },
        {
          id: "contact-2",
          name: "Carlos Ruiz",
          email: "carlos@startupinnovate.com",
          company: "Startup Innovate",
          service: "Marketing Digital",
          message: null,
          status: "contactado",
          notes: "Enviada propuesta SEO + Ads",
          priority: "medium",
          estimated_value: 4200,
          last_contact_date: "2026-01-12T11:00:00Z",
          source: "LinkedIn",
          created_at: "2026-01-08T16:45:00Z",
        },
        {
          id: "contact-3",
          name: "Ana López",
          email: "ana@corporativo.es",
          company: null,
          service: "Branding",
          message: "Necesito logo y manual de identidad urgente",
          status: "negociacion",
          notes: "Negociando presupuesto",
          priority: "high",
          estimated_value: 12000,
          last_contact_date: "2026-01-14T10:20:00Z",
          source: "Referido",
          created_at: "2026-01-05T13:30:00Z",
        },
        {
          id: "contact-4",
          name: "Juan Pérez",
          email: "juan@freelance.net",
          company: "Freelance Personal",
          service: "Diseño UI/UX",
          message: null,
          status: "cerrado_perdido",
          notes: "Presupuesto fuera de rango",
          priority: "low",
          estimated_value: 0,
          last_contact_date: "2026-01-09T17:00:00Z",
          source: "Google Ads",
          created_at: "2025-12-20T15:10:00Z",
        },
        {
          id: "contact-5",
          name: "Laura Martínez",
          email: "laura@empresa.com",
          company: "Empresa Grande SA",
          service: "Campaña Publicidad",
          message: "Interesada en estrategia completa",
          status: "propuesta",
          notes: "Propuesta enviada ayer",
          priority: "medium",
          estimated_value: 9500,
          last_contact_date: "2026-01-16T09:45:00Z",
          source: "Evento",
          created_at: "2026-01-14T11:20:00Z",
        },
      ];

      setContacts(dummyContacts);
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm, statusFilter]);

  const filterContacts = () => {
    let filtered = [...contacts];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.company?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    setFilteredContacts(filtered);
  };

  // Funciones comentadas (Supabase desactivado)
  // const updateContactStatus = async (...) => { ... }
  // const updateContactDetails = async (...) => { ... }
  // const deleteContact = async (...) => { ... }

  const exportToCSV = () => {
    setIsExporting(true);
    try {
      const headers = ["Nombre", "Email", "Empresa", "Servicio", "Estado", "Prioridad", "Valor Estimado", "Fecha"];
      const rows = filteredContacts.map((c) => [
        c.name,
        c.email,
        c.company || "",
        c.service,
        STATUS_CONFIG[c.status]?.label || c.status,
        PRIORITY_CONFIG[c.priority || "medium"]?.label || c.priority,
        c.estimated_value || "",
        new Date(c.created_at).toLocaleDateString("es-ES"),
      ]);

      const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `leads_ovavision_${new Date().toISOString().split("T")[0]}.csv`;
      link.click();

      toast({ title: "Exportado", description: "Archivo CSV descargado correctamente" });
    } catch (error) {
      toast({ title: "Error", description: "No se pudo exportar", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const openContactDetail = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailOpen(true);
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
      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-muted/30"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-muted/30">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <SelectItem key={key} value={key}>{config.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            // fetchContacts(); // Comentado
            toast({ title: "Actualizado", description: "Datos simulados refrescados" });
          }}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
          <Button variant="outline" size="sm" onClick={exportToCSV} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Pipeline View */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {Object.entries(STATUS_CONFIG).map(([status, config]) => {
          const statusContacts = filteredContacts.filter((c) => c.status === status);
          return (
            <div key={status} className="min-w-[250px]">
              <div className={`rounded-t-lg px-4 py-2 ${config.bgColor}`}>
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${config.color}`}>{config.label}</span>
                  <Badge variant="secondary" className="text-xs">
                    {statusContacts.length}
                  </Badge>
                </div>
              </div>
              <div className="glass-card rounded-t-none border-t-0 p-2 space-y-2 min-h-[300px]">
                {statusContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => openContactDetail(contact)}
                    className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-sm truncate flex-1">{contact.name}</p>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{contact.email}</p>
                    {contact.company && (
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        <Building2 className="w-3 h-3 inline mr-1" />
                        {contact.company}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(contact.created_at).toLocaleDateString("es-ES", { day: "2-digit", month: "short" })}
                      </span>
                      {contact.estimated_value && (
                        <span className="text-xs text-secondary font-medium">
                          ${contact.estimated_value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedContact.name}</span>
                  <Badge className={STATUS_CONFIG[selectedContact.status]?.bgColor}>
                    {STATUS_CONFIG[selectedContact.status]?.label}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${selectedContact.email}`} className="text-secondary hover:underline">
                      {selectedContact.email}
                    </a>
                  </div>
                  {selectedContact.company && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      {selectedContact.company}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {new Date(selectedContact.created_at).toLocaleDateString("es-ES")}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Servicio:</span>
                    {selectedContact.service}
                  </div>
                </div>

                {/* Message */}
                {selectedContact.message && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Mensaje original</label>
                    <p className="mt-1 p-3 bg-muted/30 rounded-lg text-sm">{selectedContact.message}</p>
                  </div>
                )}

                {/* Status Change - Desactivado temporalmente */}
                <div className="grid grid-cols-2 gap-4 opacity-50 pointer-events-none">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Cambiar estado</label>
                    <Select value={selectedContact.status} disabled>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Prioridad</label>
                    <Select value={selectedContact.priority || "medium"} disabled>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                    </Select>
                  </div>
                </div>

                {/* Estimated Value */}
                <div className="opacity-50 pointer-events-none">
                  <label className="text-sm font-medium text-muted-foreground">Valor estimado ($)</label>
                  <Input
                    type="number"
                    value={selectedContact.estimated_value || ""}
                    disabled
                    placeholder="Ej: 5000"
                    className="mt-1"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notas internas</label>
                  <Textarea
                    value={selectedContact.notes || ""}
                    onChange={() => {}} // Desactivado
                    placeholder="Notas no editables mientras Supabase está desactivado"
                    className="mt-1"
                    rows={4}
                    disabled
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-4 border-t">
                  <Button variant="destructive" size="sm" disabled>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCRM;