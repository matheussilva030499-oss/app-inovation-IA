import { useTickets } from "@/hooks/use-tickets";
import { Link } from "wouter";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  BarChart, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { StatusBadge, PriorityBadge } from "@/components/status-badge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ResponsiveContainer, 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip,
  Cell
} from 'recharts';

export default function Dashboard() {
  const { data: tickets, isLoading } = useTickets();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const openTickets = tickets?.filter(t => t.status === 'open') || [];
  const progressTickets = tickets?.filter(t => t.status === 'in_progress') || [];
  const resolvedTickets = tickets?.filter(t => t.status === 'resolved') || [];

  const stats = [
    { label: "Total Tickets", value: tickets?.length || 0, icon: Activity, color: "text-blue-500" },
    { label: "Em Aberto", value: openTickets.length, icon: AlertCircle, color: "text-amber-500" },
    { label: "Resolvidos", value: resolvedTickets.length, icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Tempo Médio", value: "2.4h", icon: Clock, color: "text-purple-500" },
  ];

  const chartData = [
    { name: 'Aberto', value: openTickets.length, color: '#3b82f6' },
    { name: 'Progresso', value: progressTickets.length, color: '#f59e0b' },
    { name: 'Resolvido', value: resolvedTickets.length, color: '#10b981' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Visão geral do atendimento.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50 shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold mt-2 font-display">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kanban Board Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-display">Tickets Recentes</h3>
            <Link href="/tickets" className="text-sm text-primary hover:underline font-medium">Ver todos</Link>
          </div>

          <div className="grid gap-4">
            {tickets?.slice(0, 5).map((ticket) => (
              <Link key={ticket.id} href={`/tickets/${ticket.id}`}>
                <div className="group bg-card p-4 rounded-xl border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground font-mono">#{ticket.id}</span>
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                    <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {ticket.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(ticket.createdAt!), { addSuffix: true, locale: ptBR })}
                    </p>
                  </div>
                  <div className="ml-4">
                    <StatusBadge status={ticket.status} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Analytics Card */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-display">Distribuição</h3>
          <Card className="h-[300px] border-border/50 shadow-sm">
            <CardContent className="p-6 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </ReBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-4">
          <Skeleton className="h-8 w-32" />
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </div>
  );
}
