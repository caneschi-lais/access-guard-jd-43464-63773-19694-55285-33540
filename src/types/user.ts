export interface User {
  id: string;
  name: string;
  email: string;
  role: "master" | "admin" | "user";
  status: "Ativo" | "Expirando" | "Inativo";
  lastAccess: string;
  groups: string[];
  passwordExpiry: string;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  adminId?: string; // For admin local groups
  userCount: number;
  createdAt: string;
}

export interface UserLog {
  id: string;
  userId: string;
  userName: string;
  action: "login" | "logout" | "password_change" | "group_change" | "user_created" | "user_updated";
  description: string;
  timestamp: string;
  ipAddress: string;
}