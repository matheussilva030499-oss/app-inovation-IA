import { useTicket, useUpdateTicket, useAnalyzeTicket } from "@/hooks/use-tickets";
import { useMessages, useCreateMessage } from "@/hooks/use-messages";
import { useUser } from "@/hooks/use-user";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Sparkles, 
  Clock, 
  User as UserIcon, 
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { StatusBadge, PriorityBadge } from "@/components/status-badge";
import { useState, useRef, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const ticketId = parseInt(id);
  const { data: ticket, isLoading } = useTicket(ticketId);
  const { data: user } = useUser();
  const { data: messages } = useMessages(ticketId);
  
  const updateTicket = useUpdateTicket();
  const analyzeTicket = useAnalyzeTicket();
  const createMessage = useCreateMessage();
  
  const [messageInput, setMessageInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoading || !ticket) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !user) return;

    createMessage.mutate({
      ticketId,
      content: messageInput,
      senderId: user.id,
      isInternal: false,
    });
    setMessageInput("");
  };

  const handleStatusChange = (status: string) => {
    updateTicket.mutate({ id: ticketId, status });
  };

  const handlePriorityChange = (priority: string) => {
    updateTicket.mutate({ id: ticketId, priority });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4 shrink-0">
        <Link href="/tickets">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold font-display">{ticket.title}</h2>
            <StatusBadge status={ticket.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            Ticket #{ticket.id} • Criado {formatDistanceToNow(new Date(ticket.createdAt!), { addSuffix: true, locale: ptBR })}
          </p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Left: Chat & Description */}
        <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
          <Card className="flex-1 flex flex-col border-border/50 shadow-sm overflow-hidden">
            <ScrollArea className="flex-1 p-4">
              {/* Initial Description */}
              <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm">Descrição Inicial</span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{ticket.description}</p>
              </div>

              <Separator className="my-4" />

              {/* Messages */}
              <div className="space-y-4">
                {messages?.map((msg) => {
                  const isMe = msg.senderId === user?.id;
                  return (
                    <div 
                      key={msg.id} 
                      className={cn(
                        "flex gap-3 max-w-[80%]",
                        isMe ? "ml-auto flex-row-reverse" : ""
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                        isMe ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        {/* Initials placeholder */}
                        {isMe ? "EU" : "OP"}
                      </div>
                      <div className={cn(
                        "p-3 rounded-2xl text-sm",
                        isMe 
                          ? "bg-primary text-primary-foreground rounded-tr-sm" 
                          : "bg-muted text-foreground rounded-tl-sm"
                      )}>
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-border/50">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Digite uma resposta..."
                  className="min-h-[2.5rem] max-h-32 resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <Button type="submit" size="icon" className="h-10 w-10 shrink-0" disabled={!messageInput.trim() || createMessage.isPending}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Right: Sidebar Metadata */}
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* AI Analysis Card */}
          <Card className="border-indigo-500/20 bg-indigo-50/10 dark:bg-indigo-900/10 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-4 h-4" />
                NextGen AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ticket.aiSummary ? (
                <>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Resumo</p>
                    <p className="text-sm">{ticket.aiSummary}</p>
                  </div>
                  <Separator className="bg-indigo-200/20" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Sugestão</p>
                    <p className="text-sm italic">{ticket.aiSuggestedSolution}</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Nenhuma análise disponível ainda.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-950"
                    onClick={() => analyzeTicket.mutate(ticketId)}
                    disabled={analyzeTicket.isPending}
                  >
                    {analyzeTicket.isPending ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <Sparkles className="w-3 h-3 mr-2" />}
                    Gerar Análise
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Detalhes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <Select value={ticket.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Aberto</SelectItem>
                    <SelectItem value="in_progress">Em Progresso</SelectItem>
                    <SelectItem value="resolved">Resolvido</SelectItem>
                    <SelectItem value="closed">Fechado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Prioridade</label>
                <Select value={ticket.priority} onValueChange={handlePriorityChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="critical">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center gap-3 text-sm">
                <UserIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Cliente:</span>
                <span className="font-medium">#{ticket.customerId}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Criado:</span>
                <span className="font-medium">
                  {formatDistanceToNow(new Date(ticket.createdAt!), { locale: ptBR })}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
