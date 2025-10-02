import { DashboardCard } from "@/components/ui/dashboard-card";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Shield, 
  Clock, 
  AlertTriangle, 
  Search,
  Plus,
  MoreHorizontal,
  Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { mockUsers, mockGroups } from "@/data/mockData";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - will be replaced with real data
  const dashboardStats = {
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(u => u.status === "Ativo").length,
    expiringSoon: mockUsers.filter(u => u.status === "Expirando").length,
    securityAlerts: 3
  };

  const filteredUsers = mockUsers
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 4);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge variant="default" className="bg-jd-green text-white">Ativo</Badge>;
      case "Expirando":
        return <Badge variant="destructive">Expirando</Badge>;
      case "Inativo":
        return <Badge variant="secondary">Inativo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "master":
        return <Badge variant="default" className="bg-primary text-white">Master</Badge>;
      case "admin":
        return <Badge variant="secondary" className="bg-jd-yellow text-jd-gray">Admin</Badge>;
      default:
        return <Badge variant="outline">Usuário</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        userRole="master" 
        userName="Administrador Master"
        pendingAlerts={dashboardStats.securityAlerts}
      />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral do sistema de gerenciamento de acesso
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Buscar usuários..." 
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate("/users/new")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total de Usuários"
            value={dashboardStats.totalUsers}
            description="Todos os usuários cadastrados"
            icon={Users}
            trend={{ value: 5.2, isPositive: true }}
          />
          <DashboardCard
            title="Usuários Ativos"
            value={dashboardStats.activeUsers}
            description="Usuários com acesso válido"
            icon={Shield}
            variant="success"
            trend={{ value: 2.1, isPositive: true }}
          />
          <DashboardCard
            title="Senhas Expirando"
            value={dashboardStats.expiringSoon}
            description="Próximos 7 dias"
            icon={Clock}
            variant="warning"
          />
          <DashboardCard
            title="Alertas de Segurança"
            value={dashboardStats.securityAlerts}
            description="Requer atenção imediata"
            icon={AlertTriangle}
            variant="danger"
          />
        </div>

        {/* Recent Users Table */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Usuários Recentes</CardTitle>
                <CardDescription>
                  Atividade recente dos usuários do sistema
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/users")}
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Todos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Acesso</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {user.lastAccess}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border">
                          <DropdownMenuItem onClick={() => navigate(`/users/${user.id}`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/users/${user.id}/edit`)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate("/logs")}>
                            <Clock className="w-4 h-4 mr-2" />
                            Ver Logs
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

export default Dashboard;