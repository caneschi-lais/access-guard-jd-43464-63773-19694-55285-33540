import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";
import { useColorBlind } from "@/components/color-blind-provider";
import { Moon, Sun, Monitor, Eye, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { colorBlindMode, setColorBlindMode } = useColorBlind();

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole="master" userName="Admin" />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e configurações de acessibilidade
          </p>
        </div>

        <div className="grid gap-6 max-w-3xl">
          {/* Accessibility Card */}
          <Card>
            <CardHeader>
              <CardTitle>Acessibilidade</CardTitle>
              <CardDescription>
                Ajuste as configurações de acessibilidade para melhorar sua experiência
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dark Mode Toggle */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dark-mode" className="text-base font-semibold">
                    Modo de Aparência
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Escolha entre modo claro, escuro ou seguir as preferências do sistema
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="h-auto flex-col gap-2 py-4"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-5 w-5" />
                    <span className="text-sm">Claro</span>
                  </Button>
                  
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="h-auto flex-col gap-2 py-4"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-5 w-5" />
                    <span className="text-sm">Escuro</span>
                  </Button>
                  
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="h-auto flex-col gap-2 py-4"
                    onClick={() => setTheme("system")}
                  >
                    <Monitor className="h-5 w-5" />
                    <span className="text-sm">Sistema</span>
                  </Button>
                </div>
              </div>

              {/* Quick Toggle */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label htmlFor="quick-toggle" className="text-base">
                    Alternar Modo Escuro
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Ative ou desative rapidamente o modo escuro
                  </p>
                </div>
                <Switch
                  id="quick-toggle"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Color Blind Mode Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Modo para Daltonismo
              </CardTitle>
              <CardDescription>
                Ajuste as cores do sistema para diferentes tipos de daltonismo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="colorblind-mode" className="text-base font-semibold">
                  Tipo de Daltonismo
                </Label>
                <p className="text-sm text-muted-foreground">
                  Selecione o tipo de daltonismo para otimizar as cores do sistema
                </p>
              </div>
              
              <Select value={colorBlindMode} onValueChange={setColorBlindMode}>
                <SelectTrigger id="colorblind-mode" className="w-full">
                  <SelectValue placeholder="Selecione o modo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <span>Normal (Sem Daltonismo)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="deuteranopia">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      <span>Deuteranopia (Vermelho-Verde)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="protanopia">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      <span>Protanopia (Vermelho-Verde)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="tritanopia">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-primary" />
                      <span>Tritanopia (Azul-Amarelo)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {colorBlindMode !== "normal" && (
                <div className="mt-4 p-4 rounded-lg bg-muted/50 border">
                  <p className="text-sm text-muted-foreground">
                    {colorBlindMode === "deuteranopia" && (
                      <>
                        <strong className="text-foreground">Deuteranopia:</strong> As cores verde e vermelho 
                        foram substituídas por azul e laranja para melhor distinção.
                      </>
                    )}
                    {colorBlindMode === "protanopia" && (
                      <>
                        <strong className="text-foreground">Protanopia:</strong> As cores foram ajustadas 
                        para cyan e amarelo dourado, facilitando a diferenciação visual.
                      </>
                    )}
                    {colorBlindMode === "tritanopia" && (
                      <>
                        <strong className="text-foreground">Tritanopia:</strong> Azul e amarelo foram 
                        substituídos por rosa/magenta e cyan para melhor contraste.
                      </>
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sun className="h-5 w-5 text-primary" />
                Sobre Acessibilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                O modo escuro foi projetado seguindo padrões de acessibilidade WCAG, 
                mantendo contraste adequado e preservando as cores da marca John Deere 
                (verde e amarelo) para garantir uma experiência visual consistente e 
                confortável em qualquer ambiente.
              </p>
              <p className="text-sm text-muted-foreground">
                O modo para daltonismo oferece ajustes de cores específicos para cada tipo 
                de deficiência de visão de cores, garantindo que todos os usuários possam 
                distinguir claramente os elementos da interface.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
