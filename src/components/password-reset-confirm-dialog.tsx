import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@/types/user";
import { Shield, AlertTriangle } from "lucide-react";

interface PasswordResetConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onConfirm: () => void;
}

export function PasswordResetConfirmDialog({
  open,
  onOpenChange,
  user,
  onConfirm
}: PasswordResetConfirmDialogProps) {
  if (!user) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Confirmar Redefinição de Senha
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <div className="flex items-start gap-2 p-4 bg-muted rounded-lg">
              <AlertTriangle className="w-5 h-5 text-jd-yellow mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  Você está prestes a redefinir a senha do usuário:
                </p>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Nome:</span> {user.name}</p>
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                  <p><span className="font-medium">Perfil:</span> {user.role === "master" ? "Master" : user.role === "admin" ? "Admin" : "Usuário"}</p>
                </div>
              </div>
            </div>
            
            <div className="text-sm space-y-2">
              <p className="font-medium text-foreground">O que acontecerá:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Uma nova senha temporária será gerada</li>
                <li>O usuário receberá um email com a nova senha</li>
                <li>O usuário deverá alterar a senha no primeiro acesso</li>
                <li>A senha expirará em 60 dias</li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-primary hover:bg-primary/90"
          >
            Confirmar Redefinição
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
