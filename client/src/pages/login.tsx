import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      
      <Card className="w-full max-w-md border-border/50 shadow-xl relative backdrop-blur-sm bg-card/80">
        <CardHeader className="text-center space-y-4 pt-10">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <CardTitle className="text-3xl font-display font-bold">NextGen Desk</CardTitle>
          <CardDescription className="text-base">
            Inteligência artificial para o seu atendimento.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-10 px-8">
          <div className="space-y-4">
            <Button 
              className="w-full h-12 text-base font-medium shadow-lg shadow-primary/20" 
              size="lg"
              onClick={() => window.location.href = "/api/login"}
            >
              Entrar com Replit
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Acesso seguro via autenticação do Replit
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
