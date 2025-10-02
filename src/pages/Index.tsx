import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import johnDeereLogo from "@/assets/john-deere-logo.png";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Autenticação robusta com políticas de senha configuráveis e auditoria completa"
    },
    {
      icon: Users,
      title: "Gestão Hierárquica",
      description: "Controle de acesso por níveis: Master, Admin Local e Usuário Comum"
    },
    {
      icon: Clock,
      title: "Expiração Inteligente",
      description: "Alertas automáticos e renovação obrigatória de senhas por período configurável"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-jd-gray-light via-background to-jd-green/5">
      {/* Header */}
      <header className="container mx-auto px-4 pt-8 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={johnDeereLogo} 
              alt="John Deere" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Gerenciamento de Acesso
              </h1>
              <p className="text-sm text-muted-foreground">
                Sistema Empresarial John Deere
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Sistema de
              <span className="text-primary block">
                Gerenciamento de Acesso
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Solução completa para controle seguro de senhas e acessos, 
              desenvolvida especialmente para os padrões de segurança da John Deere.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Shield className="w-5 h-5 mr-2" />
                Entrar no Sistema
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
              FAQ
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card shadow-card border-0 hover:shadow-elevated transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="bg-gradient-jd text-white border-0 shadow-elevated max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Pronto para começar?
              </CardTitle>
              <CardDescription className="text-white/90">
                Acesse o sistema de gerenciamento de senhas mais seguro e confiável.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/login">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Shield className="w-5 h-5 mr-2" />
                  Acessar Agora
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
