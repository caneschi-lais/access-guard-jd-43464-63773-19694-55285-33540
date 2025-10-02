import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockGroups } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  role: z.enum(["master", "admin", "user"]),
  groups: z.array(z.string()).min(1, "Selecione pelo menos um grupo"),
  passwordExpiry: z.string().min(1, "Data de expiração é obrigatória"),
  sendWelcomeEmail: z.boolean().default(true),
});

const NewUser = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      groups: [],
      passwordExpiry: "",
      sendWelcomeEmail: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("New user data:", values);
    
    toast({
      title: "Usuário criado com sucesso!",
      description: `${values.name} foi adicionado ao sistema.`,
    });
    
    setIsSubmitting(false);
    navigate("/users");
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
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/users")}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Novo Usuário</h1>
            <p className="text-muted-foreground">
              Adicione um novo usuário ao sistema
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="bg-gradient-card shadow-card border-0 max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserPlus className="w-5 h-5" />
              <span>Informações do Usuário</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="usuario@johndeere.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Role Selection */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Perfil de Acesso</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="user" id="user" />
                            <Label htmlFor="user" className="font-normal">
                              <div>
                                <span className="font-medium">Usuário</span>
                                <p className="text-sm text-muted-foreground">
                                  Acesso limitado às próprias informações
                                </p>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="admin" id="admin" />
                            <Label htmlFor="admin" className="font-normal">
                              <div>
                                <span className="font-medium">Admin Local</span>
                                <p className="text-sm text-muted-foreground">
                                  Administra grupos específicos
                                </p>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="master" id="master" />
                            <Label htmlFor="master" className="font-normal">
                              <div>
                                <span className="font-medium">Master</span>
                                <p className="text-sm text-muted-foreground">
                                  Acesso completo ao sistema
                                </p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Groups Selection */}
                <FormField
                  control={form.control}
                  name="groups"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Grupos</FormLabel>
                        <FormDescription>
                          Selecione os grupos aos quais o usuário pertencerá
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockGroups.map((group) => (
                          <FormField
                            key={group.id}
                            control={form.control}
                            name="groups"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={group.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(group.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, group.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== group.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="font-medium">
                                      {group.name}
                                    </FormLabel>
                                    <p className="text-sm text-muted-foreground">
                                      {group.description}
                                    </p>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Expiry */}
                <FormField
                  control={form.control}
                  name="passwordExpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Expiração da Senha</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        A senha do usuário expirará nesta data
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Options */}
                <FormField
                  control={form.control}
                  name="sendWelcomeEmail"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Enviar email de boas-vindas
                        </FormLabel>
                        <FormDescription>
                          O usuário receberá um email com instruções de acesso
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/users")}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      "Criando..."
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Criar Usuário
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewUser;