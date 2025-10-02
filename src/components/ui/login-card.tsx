import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import johnDeereLogo from "@/assets/john-deere-logo.png";

export function LoginCard() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic will be implemented here
    console.log("Login attempted with:", credentials);
    navigate("/dashboard");
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-card shadow-elevated border-0">
      <CardHeader className="text-center space-y-6 pb-8">
        <div className="flex justify-center">
          <img 
            src={johnDeereLogo} 
            alt="John Deere" 
            className="h-16 w-auto"
          />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold text-foreground">
            Gerenciamento de Acesso
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sistema Seguro de Autenticação
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Usuário
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Digite seu usuário"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="h-11 bg-background border-border focus:ring-primary"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="h-11 bg-background border-border focus:ring-primary pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          >
            <Shield className="w-4 h-4 mr-2" />
            Entrar
          </Button>
        </form>
        
        <div className="text-center">
          <Button variant="link" className="text-sm text-muted-foreground">
            Esqueceu sua senha?
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}