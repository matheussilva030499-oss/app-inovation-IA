import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertMessage } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useMessages(ticketId: number) {
  return useQuery({
    queryKey: [api.messages.list.path, ticketId],
    queryFn: async () => {
      const url = buildUrl(api.messages.list.path, { ticketId });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Falha ao carregar mensagens");
      return api.messages.list.responses[200].parse(await res.json());
    },
    enabled: !!ticketId,
    refetchInterval: 5000, // Simple polling for new messages
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ ticketId, ...data }: { ticketId: number } & Omit<InsertMessage, "ticketId" | "senderId">) => {
      const url = buildUrl(api.messages.create.path, { ticketId });
      const res = await fetch(url, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Falha ao enviar mensagem");
      return api.messages.create.responses[201].parse(await res.json());
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [api.messages.list.path, variables.ticketId] });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem.",
        variant: "destructive",
      });
    },
  });
}
