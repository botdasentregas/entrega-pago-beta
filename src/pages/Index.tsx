
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CreditCard, LogIn, Smartphone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF1F7] p-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold mb-4 text-[#0A1128]">Assistente de Entregas</h1>
        <p className="text-xl text-gray-600 mb-8">
          A solução completa para otimizar suas entregas e aumentar a satisfação dos seus clientes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Package className="h-5 w-5 mr-2" />
                Gestão de Entregas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Controle todas as suas entregas em um só lugar, com rastreamento em tempo real e
                otimização de rotas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Preço Especial Beta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Aproveite o desconto especial da versão beta: de R$79,97 por apenas R$50,00.
                Use código de indicação para ganhar 10% extra!
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Smartphone className="h-5 w-5 mr-2" />
                WhatsApp Integrado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Gerencie suas entregas diretamente pelo WhatsApp, com comandos simples e respostas rápidas.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#0A1128] hover:bg-[#1A2942] text-white">
            <Link to="/payment">
              <CreditCard className="h-5 w-5 mr-2" />
              Assinar Agora
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/login">
              <LogIn className="h-5 w-5 mr-2" />
              Entrar na Conta
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/connect-whatsapp">
              <Smartphone className="h-5 w-5 mr-2" />
              Conectar WhatsApp
            </Link>
          </Button>
        </div>
      </div>
      
      <p className="mt-12 text-sm text-gray-500">
        © 2025 Assistente de Entregas. Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Index;
