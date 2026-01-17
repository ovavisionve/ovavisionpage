import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm, statusFilter]);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast({ title: "Error", description: "No se pudieron cargar los contactos", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

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

  const updateContactStatus = async (id: string, newStatus: string) => {
    try {
      const validStatus = newStatus as "nuevo" | "contactado" | "negociacion" | "propuesta" | "cerrado_ganado" | "cerrado_perdido";
      const { error } = await supabase
        .from("contacts")
        .update({ 
          status: validStatus, 
          last_contact_date: new Date().toISOString() 
        })
        .eq("id", id);

      if (error) throw error;

      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus, last_contact_date: new Date().toISOString() } : c))
      );

      toast({ title: "Estado actualizado", description: `Lead movido a ${STATUS_CONFIG[newStatus]?.label}` });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({ title: "Error", description: "No se pudo actualizar el estado", variant: "destructive" });
    }
  };

  const updateContactDetails = async (id: string, updates: Partial<Contact>) => {
    try {
      const dbUpdates: any = { ...updates };
      if (updates.status) {
        dbUpdates.status = updates.status as "nuevo" | "contactado" | "negociacion" | "propuesta" | "cerrado_ganado" | "cerrado_perdido";
      }
      
      const { error } = await supabase
        .from("contacts")
        .update(dbUpdates)
        .eq("id", id);

      if (error) throw error;

      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
      );

      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, ...updates });
      }

      toast({ title: "Actualizado", description: "Información del lead actualizada" });
    } catch (error) {
      console.error("Error updating contact:", error);
      toast({ title: "Error", description: "No se pudo actualizar", variant: "destructive" });
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este lead?")) return;

    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (error) throw error;

      setContacts((prev) => prev.filter((c) => c.id !== id));
      setIsDetailOpen(false);
      toast({ title: "Eliminado", description: "Lead eliminado correctamente" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast({ title: "Error", description: "No se pudo eliminar el lead", variant: "destructive" });
    }
  };

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
          <Button variant="outline" size="sm" onClick={fetchContacts}>
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

                {/* Status Change */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Cambiar estado</label>
                    <Select
                      value={selectedContact.status}
                      onValueChange={(value) => updateContactStatus(selectedContact.id, value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                          <SelectItem key={key} value={key}>{config.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Prioridad</label>
                    <Select
                      value={selectedContact.priority || "medium"}
                      onValueChange={(value) => updateContactDetails(selectedContact.id, { priority: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(PRIORITY_CONFIG).map(([key, config]) => (
                          <SelectItem key={key} value={key}>{config.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Estimated Value */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Valor estimado ($)</label>
                  <Input
                    type="number"
                    value={selectedContact.estimated_value || ""}
                    onChange={(e) => updateContactDetails(selectedContact.id, { 
                      estimated_value: e.target.value ? parseFloat(e.target.value) : null 
                    })}
                    placeholder="Ej: 5000"
                    className="mt-1"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notas internas</label>
                  <Textarea
                    value={selectedContact.notes || ""}
                    onChange={(e) => updateContactDetails(selectedContact.id, { notes: e.target.value })}
                    placeholder="Agregar notas sobre este lead..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-4 border-t">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteContact(selectedContact.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://wa.me/?text=Hola ${selectedContact.name}`, "_blank")}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`mailto:${selectedContact.email}`, "_blank")}
                    >
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
