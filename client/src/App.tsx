import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import { useUser } from "@/hooks/use-user";
import { Loader2 } from "lucide-react";

import Dashboard from "@/pages/dashboard";
import TicketList from "@/pages/ticket-list";
import NewTicket from "@/pages/new-ticket";
import TicketDetail from "@/pages/ticket-detail";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

function Router() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/tickets" component={TicketList} />
        <Route path="/tickets/new" component={NewTicket} />
        <Route path="/tickets/:id" component={TicketDetail} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
