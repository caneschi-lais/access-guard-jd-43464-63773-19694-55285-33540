import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";
import { Clock, AlertTriangle } from "lucide-react";
import { PasswordResetConfirmDialog } from "./password-reset-confirm-dialog";

interface ExpiringPasswordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users: User[];
}

export function ExpiringPasswordsDialog({
  open,
  onOpenChange,
  users
}: ExpiringPasswordsDialogProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setShowResetDialog(true);
  };

  const handleConfirmReset = () => {
    if (selectedUser) {
      // Aqui você implementará a lógica real de reset de senha
      console.log("Resetando senha para:", selectedUser.name);
      setShowResetDialog(false);
      setSelectedUser(null);
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryBadge = (expiryDate: string) => {
    const days = getDaysUntilExpiry(expiryDate);
    
    if (days <= 0) {
      return <Badge variant="destructive">Expirada</Badge>;
    } else if (days <= 3) {
      return <Badge variant="destructive">{days} {days === 1 ? 'dia' : 'dias'}</Badge>;
    } else if (days <= 7) {
      return <Badge className="bg-jd-yellow text-jd-gray">{days} dias</Badge>;
    }
    return <Badge variant="outline">{days} dias</Badge>;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <AlertTriangle className="w-6 h-6 text-jd-yellow" />
              Senhas Expirando
            </DialogTitle>
            <DialogDescription>
              Usuários com senhas próximas de expirar (60 dias). As senhas são redefinidas automaticamente após esse período.
            </DialogDescription>
          </DialogHeader>

          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground">Nenhuma senha expirando</p>
              <p className="text-sm text-muted-foreground mt-2">
                Todas as senhas dos usuários estão dentro do período válido.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Tempo Restante</TableHead>
                  <TableHead>Data de Expiração</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.role === "master" ? "Master" : user.role === "admin" ? "Admin" : "Usuário"}
                      </Badge>
                    </TableCell>
                    <TableCell>{getExpiryBadge(user.passwordExpiry)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(user.passwordExpiry).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResetPassword(user)}
                        className="hover:bg-primary hover:text-primary-foreground"
                      >
                        Redefinir Senha
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>

      <PasswordResetConfirmDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        user={selectedUser}
        onConfirm={handleConfirmReset}
      />
    </>
  );
}
