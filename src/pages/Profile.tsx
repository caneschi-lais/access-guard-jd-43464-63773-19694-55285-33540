import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { User, Shield, Mail, Calendar, Clock, Users as UsersIcon, Camera, ArrowLeft, Save } from "lucide-react";
import { mockUsers, mockGroups } from "@/data/mockData";

export default function Profile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  
  // Simular usuário logado (Master Admin para demonstração)
  const currentUser = mockUsers[0]; // Admin Master
  const currentUserRole = currentUser.role;
  
  // Se tiver userId na URL, buscar esse usuário, senão mostra o próprio
  const profileUserId = userId || currentUser.id;
  const profileUser = mockUsers.find(u => u.id === profileUserId) || currentUser;
  
  const [editedName, setEditedName] = useState(profileUser.name);
  const [editedEmail, setEditedEmail] = useState(profileUser.email);
  const [avatarUrl, setAvatarUrl] = useState("");

  // Verificar permissões de acesso
  const canEdit = () => {
    if (currentUserRole === "master") return true;
    if (currentUserRole === "admin") {
      // Admin local pode editar usuários do seu grupo
      const adminGroups = currentUser.groups;
      const userGroups = profileUser.groups;
      return userGroups.some(g => adminGroups.includes(g));
    }
    // Usuário comum só pode editar seu próprio perfil
    return currentUser.id === profileUser.id;
  };

  const canView = () => {
    if (currentUserRole === "master") return true;
    if (currentUserRole === "admin") {
      const adminGroups = currentUser.groups;
      const userGroups = profileUser.groups;
      return userGroups.some(g => adminGroups.includes(g));
    }
    return currentUser.id === profileUser.id;
  };

  if (!canView()) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar userRole={currentUserRole} userName={currentUser.name} />
        <div className="container py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-16 text-center">
              <Shield className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">Acesso Negado</h2>
              <p className="text-muted-foreground mb-6">
                Você não tem permissão para visualizar este perfil.
              </p>
              <Button onClick={() => navigate("/dashboard")}>
                Voltar ao Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "master":
        return <Badge className="bg-jd-green text-white">Admin Master</Badge>;
      case "admin":
        return <Badge className="bg-jd-yellow text-jd-gray">Admin Local</Badge>;
      default:
        return <Badge variant="outline">Usuário</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge variant="default" className="bg-green-600">Ativo</Badge>;
      case "Expirando":
        return <Badge variant="destructive">Expirando</Badge>;
      case "Inativo":
        return <Badge variant="secondary">Inativo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSave = () => {
    if (!canEdit()) {
      toast({
        title: "Acesso Negado",
        description: "Você não tem permissão para editar este perfil.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Perfil Atualizado",
      description: "As informações do perfil foram atualizadas com sucesso.",
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        toast({
          title: "Avatar Atualizado",
          description: "Sua foto de perfil foi alterada com sucesso.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getUserGroups = () => {
    return profileUser.groups
      .map(groupId => mockGroups.find(g => g.id === groupId)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        userRole={currentUserRole} 
        userName={currentUser.name} 
        pendingAlerts={3}
      />
      
      <div className="container py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Perfil do Usuário</h1>
                <p className="text-muted-foreground">
                  {profileUser.id === currentUser.id 
                    ? "Gerencie suas informações pessoais" 
                    : `Visualizando perfil de ${profileUser.name}`}
                </p>
              </div>
            </div>
            {canEdit() && (
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-jd-green hover:bg-jd-green-dark"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </>
                ) : (
                  "Editar Perfil"
                )}
              </Button>
            )}
          </div>

          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>
                Dados cadastrais e informações de acesso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatarUrl} alt={profileUser.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {profileUser.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {canEdit() && isEditing && (
                    <label 
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 cursor-pointer transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold">{profileUser.name}</h2>
                    {getRoleBadge(profileUser.role)}
                    {getStatusBadge(profileUser.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{profileUser.email}</p>
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      disabled={!isEditing}
                      className={`pl-10 ${!isEditing ? "bg-muted" : ""}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Usuário</Label>
                  <div className="flex items-center h-10 px-3 rounded-md border border-input bg-muted">
                    <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      {profileUser.role === "master" ? "Admin Master" : 
                       profileUser.role === "admin" ? "Admin Local" : "Usuário"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Grupos</Label>
                  <div className="flex items-center h-10 px-3 rounded-md border border-input bg-muted">
                    <UsersIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{getUserGroups()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Data de Criação</Label>
                  <div className="flex items-center h-10 px-3 rounded-md border border-input bg-muted">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(profileUser.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Último Acesso</Label>
                  <div className="flex items-center h-10 px-3 rounded-md border border-input bg-muted">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(profileUser.lastAccess).toLocaleDateString('pt-BR')} às{' '}
                      {new Date(profileUser.lastAccess).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança e Acesso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Status da Conta</Label>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(profileUser.status)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Expiração da Senha</Label>
                  <div className="flex items-center h-10 px-3 rounded-md border border-input bg-muted">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(profileUser.passwordExpiry).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              {canEdit() && (
                <Button variant="outline" className="w-full md:w-auto">
                  Alterar Senha
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Permission Info */}
          {currentUserRole !== "user" && (
            <Card className="border-jd-yellow/50 bg-jd-yellow-light/20">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-jd-yellow mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">
                      {currentUserRole === "master" ? "Admin Master" : "Admin Local"}
                    </p>
                    <p className="text-muted-foreground">
                      {currentUserRole === "master" 
                        ? "Você tem acesso completo para gerenciar todos os usuários e grupos do sistema."
                        : "Você pode gerenciar usuários dos seus grupos: " + currentUser.groups.map(g => mockGroups.find(gr => gr.id === g)?.name).join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}