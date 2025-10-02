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
    passwordExpiry: "2025-10-05",
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
  },
  {
    id: "7",
    name: "Fernando Almeida",
    email: "fernando.almeida@johndeere.com",
    role: "user",
    status: "Expirando",
    lastAccess: "Hoje, 07:20",
    groups: ["florestal"],
    passwordExpiry: "2025-10-04",
    createdAt: "2024-05-15",
    updatedAt: "2024-10-01"
  },
  {
    id: "8",
    name: "Juliana Ferreira",
    email: "juliana.ferreira@johndeere.com",
    role: "admin",
    status: "Expirando",
    lastAccess: "Hoje, 13:45",
    groups: ["desenvolvedores", "analistas"],
    passwordExpiry: "2025-10-06",
    createdAt: "2024-03-20",
    updatedAt: "2024-09-30"
  },
  {
    id: "9",
    name: "Ricardo Martins",
    email: "ricardo.martins@johndeere.com",
    role: "user",
    status: "Ativo",
    lastAccess: "Ontem, 18:30",
    groups: ["consultores"],
    passwordExpiry: "2025-11-10",
    createdAt: "2024-06-01",
    updatedAt: "2024-09-25"
  },
  {
    id: "10",
    name: "Camila Rocha",
    email: "camila.rocha@johndeere.com",
    role: "user",
    status: "Expirando",
    lastAccess: "Hoje, 10:15",
    groups: ["florestal", "analistas"],
    passwordExpiry: "2025-10-03",
    createdAt: "2024-04-18",
    updatedAt: "2024-10-02"
  },
  {
    id: "11",
    name: "Eduardo Barbosa",
    email: "eduardo.barbosa@johndeere.com",
    role: "user",
    status: "Ativo",
    lastAccess: "Hoje, 15:00",
    groups: ["desenvolvedores"],
    passwordExpiry: "2025-12-20",
    createdAt: "2024-07-10",
    updatedAt: "2024-10-01"
  },
  {
    id: "12",
    name: "Beatriz Mendes",
    email: "beatriz.mendes@johndeere.com",
    role: "admin",
    status: "Ativo",
    lastAccess: "Hoje, 12:30",
    groups: ["desenvolvedores", "consultores"],
    passwordExpiry: "2025-01-25",
    createdAt: "2024-02-28",
    updatedAt: "2024-10-02"
  },
  {
    id: "13",
    name: "Gabriel Cardoso",
    email: "gabriel.cardoso@johndeere.com",
    role: "user",
    status: "Expirando",
    lastAccess: "Hoje, 09:45",
    groups: ["florestal"],
    passwordExpiry: "2025-10-07",
    createdAt: "2024-05-22",
    updatedAt: "2024-09-28"
  },
  {
    id: "14",
    name: "Amanda Pereira",
    email: "amanda.pereira@johndeere.com",
    role: "user",
    status: "Ativo",
    lastAccess: "Ontem, 14:20",
    groups: ["analistas"],
    passwordExpiry: "2025-02-15",
    createdAt: "2024-06-15",
    updatedAt: "2024-09-30"
  },
  {
    id: "15",
    name: "Lucas Ribeiro",
    email: "lucas.ribeiro@johndeere.com",
    role: "user",
    status: "Inativo",
    lastAccess: "20 dias atrás",
    groups: ["consultores"],
    passwordExpiry: "2024-09-01",
    createdAt: "2023-11-10",
    updatedAt: "2024-09-01"
  },
  {
    id: "16",
    name: "Isabela Dias",
    email: "isabela.dias@johndeere.com",
    role: "admin",
    status: "Expirando",
    lastAccess: "Hoje, 11:00",
    groups: ["desenvolvedores", "florestal"],
    passwordExpiry: "2025-10-08",
    createdAt: "2024-04-05",
    updatedAt: "2024-10-01"
  },
  {
    id: "17",
    name: "Thiago Gomes",
    email: "thiago.gomes@johndeere.com",
    role: "user",
    status: "Ativo",
    lastAccess: "Hoje, 16:30",
    groups: ["analistas"],
    passwordExpiry: "2025-03-10",
    createdAt: "2024-07-20",
    updatedAt: "2024-10-02"
  },
  {
    id: "18",
    name: "Larissa Teixeira",
    email: "larissa.teixeira@johndeere.com",
    role: "user",
    status: "Ativo",
    lastAccess: "Hoje, 08:15",
    groups: ["florestal"],
    passwordExpiry: "2024-11-15",
    createdAt: "2024-03-12",
    updatedAt: "2024-09-27"
  },
  {
    id: "19",
    name: "Rafael Nunes",
    email: "rafael.nunes@johndeere.com",
    role: "user",
    status: "Expirando",
    lastAccess: "Hoje, 14:00",
    groups: ["consultores"],
    passwordExpiry: "2025-10-09",
    createdAt: "2024-05-30",
    updatedAt: "2024-09-29"
  },
  {
    id: "20",
    name: "Vanessa Castro",
    email: "vanessa.castro@johndeere.com",
    role: "admin",
    status: "Ativo",
    lastAccess: "Hoje, 10:45",
    groups: ["desenvolvedores", "analistas"],
    passwordExpiry: "2025-01-05",
    createdAt: "2024-02-15",
    updatedAt: "2024-10-01"
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