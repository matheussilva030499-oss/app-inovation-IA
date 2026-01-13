import { useTickets } from "@/hooks/use-tickets";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { StatusBadge, PriorityBadge } from "@/components/status-badge";
import { Plus, Search, Filter } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function TicketList() {
  const [status, setStatus] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  
  const queryParams = {
    status: status === "all" ? undefined : status,
    priority: priority === "all" ? undefined : priority,
  };

  const { data: tickets, isLoading } = useTickets(queryParams);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground">Tickets</h2>
          <p className="text-muted-foreground mt-1">Gerencie e acompanhe todos os chamados.</p>
        </div>
        <Link href="/tickets/new">
          <Button className="shadow-lg shadow-primary/20 gap-2">
            <Plus className="w-4 h-4" /> Novo Ticket
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-card border border-border/50 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar tickets..." className="pl-9 w-full" />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              <SelectItem value="open">Aberto</SelectItem>
              <SelectItem value="in_progress">Em Progresso</SelectItem>
              <SelectItem value="resolved">Resolvido</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Prioridades</SelectItem>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Média</SelectItem>
              <SelectItem value="low">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                  Carregando tickets...
                </TableCell>
              </TableRow>
            ) : tickets?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                  Nenhum ticket encontrado.
                </TableCell>
              </TableRow>
            ) : (
              tickets?.map((ticket) => (
                <TableRow key={ticket.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono text-xs text-muted-foreground">#{ticket.id}</TableCell>
                  <TableCell className="font-medium">
                    <Link href={`/tickets/${ticket.id}`} className="hover:underline hover:text-primary">
                      {ticket.title}
                    </Link>
                  </TableCell>
                  <TableCell><StatusBadge status={ticket.status} /></TableCell>
                  <TableCell><PriorityBadge priority={ticket.priority} /></TableCell>
                  <TableCell>
                    {/* Placeholder for customer name if not joined yet */}
                    {/* {ticket.customer?.username || "N/A"} */}
                    Cliente #{ticket.customerId}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(ticket.createdAt!), "dd MMM, HH:mm", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/tickets/${ticket.id}`}>
                      <Button variant="ghost" size="sm">Ver</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
