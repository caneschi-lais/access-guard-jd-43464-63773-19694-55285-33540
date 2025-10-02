import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search,
  Download,
  Filter,
  Calendar,
  Shield,
  User,
  Key,
  UserPlus,
  Edit,
  LogIn,
  LogOut,
  X
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { mockLogs } from "@/data/mockData";
import { UserLog } from "@/types/user";

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [logs] = useState<UserLog[]>(mockLogs);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = selectedAction === "all" || log.action === selectedAction;
    
    // Filter by date if a date is selected
    const matchesDate = selectedDate 
      ? new Date(log.timestamp).toDateString() === selectedDate.toDateString()
      : true;
    
    return matchesSearch && matchesAction && matchesDate;
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case "login":
        return (
          <Badge variant="default" className="bg-jd-green text-white">
            <LogIn className="w-3 h-3 mr-1" />
            Login
          </Badge>
        );
      case "logout":
        return (
          <Badge variant="secondary">
            <LogOut className="w-3 h-3 mr-1" />
            Logout
          </Badge>
        );
      case "password_change":
        return (
          <Badge variant="outline" className="border-jd-yellow text-jd-yellow">
            <Key className="w-3 h-3 mr-1" />
            Senha
          </Badge>
        );
      case "user_created":
        return (
          <Badge variant="default" className="bg-primary text-white">
            <UserPlus className="w-3 h-3 mr-1" />
            Criação
          </Badge>
        );
      case "user_updated":
        return (
          <Badge variant="outline">
            <Edit className="w-3 h-3 mr-1" />
            Atualização
          </Badge>
        );
      case "group_change":
        return (
          <Badge variant="secondary" className="bg-jd-yellow text-jd-gray">
            <Shield className="w-3 h-3 mr-1" />
            Grupo
          </Badge>
        );
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "login":
        return <LogIn className="w-4 h-4 text-jd-green" />;
      case "logout":
        return <LogOut className="w-4 h-4 text-muted-foreground" />;
      case "password_change":
        return <Key className="w-4 h-4 text-jd-yellow" />;
      case "user_created":
        return <UserPlus className="w-4 h-4 text-primary" />;
      case "user_updated":
        return <Edit className="w-4 h-4 text-muted-foreground" />;
      case "group_change":
        return <Shield className="w-4 h-4 text-jd-yellow" />;
      default:
        return <User className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const exportLogs = () => {
    // Simulate export functionality
    console.log("Exporting logs...", filteredLogs);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        userRole="master" 
        userName="Administrador Master"
        pendingAlerts={3}
      />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Logs do Sistema</h1>
            <p className="text-muted-foreground">
              Histórico completo de atividades dos usuários
            </p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={exportLogs}
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Logs
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Buscar por usuário ou descrição..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Filtrar por data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                
                {selectedDate && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDate(undefined)}
                    className="h-9"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <select 
                className="px-3 py-2 border rounded-md bg-background text-foreground h-10"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
              >
                <option value="all">Todas as ações</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="password_change">Alteração de Senha</option>
                <option value="user_created">Criação de Usuário</option>
                <option value="user_updated">Atualização de Usuário</option>
                <option value="group_change">Alteração de Grupo</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Atividades Recentes ({filteredLogs.length})</CardTitle>
                <CardDescription>
                  Registro detalhado de todas as ações do sistema
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ação</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/50">
                    <TableCell>
                      {getActionBadge(log.action)}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {new Date(log.timestamp).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium text-primary">
                            {log.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium">{log.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {log.description}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm font-mono">
                      {log.ipAddress}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Logs;