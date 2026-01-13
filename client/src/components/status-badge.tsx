import { cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; className: string }> = {
  open: { label: "Aberto", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  in_progress: { label: "Em Progresso", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  resolved: { label: "Resolvido", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  closed: { label: "Fechado", className: "bg-slate-500/10 text-slate-500 border-slate-500/20" },
};

const priorityConfig: Record<string, { label: string; className: string }> = {
  low: { label: "Baixa", className: "bg-slate-500/10 text-slate-500" },
  medium: { label: "Média", className: "bg-blue-500/10 text-blue-500" },
  high: { label: "Alta", className: "bg-orange-500/10 text-orange-500" },
  critical: { label: "Crítica", className: "bg-red-500/10 text-red-500 font-bold" },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.open;
  
  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-medium border",
      config.className
    )}>
      {config.label}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  const config = priorityConfig[priority] || priorityConfig.medium;
  
  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-md text-xs font-medium",
      config.className
    )}>
      {config.label}
    </span>
  );
}
