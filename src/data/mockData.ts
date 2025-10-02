import { User, Group, UserLog } from "@/types/user";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@johndeere.com",
    role: "admin",
    status: "Ativo",
    lastAccess: "Hoje, 14:30",
    groups: ["florestal", "desenvolvedores"],
    passwordExpiry: "2024-12-15",
    createdAt: "2024-01-15",
    updatedAt: "2024-09-28"
  },
  {
    id: "2",
    name: "Carlos Santos",
    email: "carlos.santos@johndeere.com",
    role: "user",
    status: "Expirando",
    lastAccess: "Ontem, 16:45",
    groups: ["florestal"],
    passwordExpiry: "2024-10-05",
    createdAt: "2024-02-10",
    updatedAt: "2024-09-20"
  },
  {
    id: "3",
    name: "Maria Costa",
    email: "maria.costa@johndeere.com",
    role: "user",
    status: "Ativo",
    lastAccess: "Hoje, 09:15",
    groups: ["analistas"],
    passwordExpiry: "2024-11-20",
    createdAt: "2024-03-05",
    updatedAt: "2024-09-28"
  },
  {
    id: "4",
    name: "João Oliveira",
    email: "joao.oliveira@johndeere.com",
    role: "admin",
    status: "Ativo",
    lastAccess: "Hoje, 11:20",
    groups: ["desenvolvedores", "consultores"],
    passwordExpiry: "2024-12-01",
    createdAt: "2024-01-20",
    updatedAt: "2024-09-25"
  },
  {
    id: "5",
    name: "Patricia Souza",
    email: "patricia.souza@johndeere.com",
    role: "user",
    status: "Ativo",
    lastAccess: "Hoje, 08:45",
    groups: ["florestal"],
    passwordExpiry: "2025-01-15",
    createdAt: "2024-04-12",
    updatedAt: "2024-09-28"
  },
  {
    id: "6",
    name: "Roberto Lima",
    email: "roberto.lima@johndeere.com",
    role: "user",
    status: "Inativo",
    lastAccess: "15 dias atrás",
    groups: ["consultores"],
    passwordExpiry: "2024-09-10",
    createdAt: "2023-12-08",
    updatedAt: "2024-09-10"
  }
];

export const mockGroups: Group[] = [
  {
    id: "florestal",
    name: "Florestal",
    description: "Equipe de manejo florestal e sustentabilidade",
    userCount: 3,
    createdAt: "2024-01-10"
  },
  {
    id: "desenvolvedores",
    name: "Desenvolvedores",
    description: "Equipe de desenvolvimento de software",
    adminId: "1",
    userCount: 2,
    createdAt: "2024-01-15"
  },
  {
    id: "analistas",
    name: "Analistas",
    description: "Equipe de análise de dados e business intelligence",
    userCount: 1,
    createdAt: "2024-02-01"
  },
  {
    id: "consultores",
    name: "Consultores",
    description: "Consultores técnicos e especialistas",
    userCount: 2,
    createdAt: "2024-01-25"
  }
];

export const mockLogs: UserLog[] = [
  {
    id: "1",
    userId: "1",
    userName: "Ana Silva",
    action: "login",
    description: "Login realizado com sucesso",
    timestamp: "2024-09-28 14:30:15",
    ipAddress: "192.168.1.100"
  },
  {
    id: "2",
    userId: "3",
    userName: "Maria Costa",
    action: "login",
    description: "Login realizado com sucesso",
    timestamp: "2024-09-28 09:15:22",
    ipAddress: "192.168.1.105"
  },
  {
    id: "3",
    userId: "4",
    userName: "João Oliveira",
    action: "user_created",
    description: "Novo usuário criado: Patricia Souza",
    timestamp: "2024-09-28 11:20:45",
    ipAddress: "192.168.1.102"
  },
  {
    id: "4",
    userId: "2",
    userName: "Carlos Santos",
    action: "password_change",
    description: "Senha alterada pelo usuário",
    timestamp: "2024-09-27 16:45:30",
    ipAddress: "192.168.1.108"
  },
  {
    id: "5",
    userId: "1",
    userName: "Ana Silva",
    action: "group_change",
    description: "Usuário Carlos Santos adicionado ao grupo Florestal",
    timestamp: "2024-09-27 14:15:10",
    ipAddress: "192.168.1.100"
  }
];