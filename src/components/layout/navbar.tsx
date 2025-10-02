import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, LogOut, User, Shield, Users, FileText } from "lucide-react";
import johnDeereLogo from "@/assets/john-deere-logo.png";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  userRole?: "master" | "admin" | "user";
  userName?: string;
  pendingAlerts?: number;
}

export function Navbar({ 
  userRole = "user", 
  userName = "Usuário", 
  pendingAlerts = 0 
}: NavbarProps) {
  const navigate = useNavigate();
  
  const getRoleBadge = () => {
    switch (userRole) {
      case "master":
        return <Badge variant="default" className="bg-jd-green text-white">Master</Badge>;
      case "admin":
        return <Badge variant="secondary" className="bg-jd-yellow text-jd-gray">Admin</Badge>;
      default:
        return <Badge variant="outline">Usuário</Badge>;
    }
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img 
            src={johnDeereLogo} 
            alt="John Deere" 
            className="h-8 w-auto"
          />
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-foreground">
              Gerenciamento de Acesso
            </h1>
            <p className="text-sm text-muted-foreground">
              Sistema Seguro de Autenticação
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative gap-1.5 h-9">
            <Bell className="h-4 w-4" />
            <span className="text-sm">Notificações</span>
            {pendingAlerts > 0 && (
              <span className="absolute top-1.5 left-6 h-2 w-2 rounded-full bg-destructive" />
            )}
          </Button>

          {/* Navigation Buttons */}
          <Button variant="ghost" size="sm" className="gap-1.5 h-9" onClick={() => navigate("/users")}>
            <Users className="h-4 w-4" />
            <span className="text-sm">Gerenciamento de Usuários</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="gap-1.5 h-9" onClick={() => navigate("/logs")}>
            <FileText className="h-4 w-4" />
            <span className="text-sm">Logs</span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="gap-1.5 h-9" onClick={() => navigate("/settings")}>
            <Settings className="h-4 w-4" />
            <span className="text-sm">Configurações</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt={userName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-3 w-3" />
                    {getRoleBadge()}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}