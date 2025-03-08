
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  Power, 
  Trash, 
  RefreshCw,
  Smartphone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WhatsAppConnectionPage = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const startSession = () => {
    setLoading(true);
    // Simulando tempo de carregamento do QR code
    setTimeout(() => {
      setQrCodeVisible(true);
      setLoading(false);
      toast({
        title: "QR Code gerado",
        description: "Escaneie o QR Code com seu WhatsApp para conectar.",
        variant: "default",
      });
    }, 2000);
  };

  const deleteSession = () => {
    setSessionActive(false);
    setQrCodeVisible(false);
    toast({
      title: "Sessão encerrada",
      description: "A sessão do WhatsApp foi desconectada com sucesso.",
      variant: "default",
    });
  };

  // Simulando conexão de WhatsApp após escanear QR code
  useEffect(() => {
    if (qrCodeVisible) {
      const timer = setTimeout(() => {
        setSessionActive(true);
        setQrCodeVisible(false);
        toast({
          title: "WhatsApp conectado!",
          description: "Seu assistente de entregas está pronto para uso.",
          variant: "default",
        });
        
        // Adicionar redirecionamento para o dashboard do assistente após 1.5 segundos
        setTimeout(() => {
          console.log("Navigating to dashboard...");
          navigate('/assistant-dashboard');
        }, 1500);
      }, 10000); // Simula 10 segundos para escanear o QR

      return () => clearTimeout(timer);
    }
  }, [qrCodeVisible, toast, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF1F7] p-4">
      <Link to="/" className="absolute top-4 left-4 text-gray-600 hover:text-gray-900">
        ← Voltar para o início
      </Link>
      
      <h1 className="text-3xl font-bold mb-8 text-[#0A1128]">Assistente de Entregas</h1>
      
      <Card className="w-full max-w-md bg-white border-0 shadow-sm rounded-lg">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold text-center mb-3 text-[#0A1128]">
            Conectar WhatsApp
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Conecte seu WhatsApp para começar a utilizar o Assistente de Entregas
          </p>
          
          <div className="space-y-6">
            {/* Status da sessão */}
            <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-gray-100 w-fit mx-auto">
              {sessionActive ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">Sessão Ativa</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <span className="text-amber-600 font-medium">Sessão Inativa</span>
                </>
              )}
            </div>
            
            {/* QR Code area */}
            <div className="border rounded-lg p-4 flex flex-col items-center justify-center h-64">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <RefreshCw className="h-12 w-12 text-gray-400 animate-spin" />
                  <p className="text-gray-500">Gerando QR Code...</p>
                </div>
              ) : qrCodeVisible ? (
                <div className="flex flex-col items-center gap-4">
                  <QrCode className="h-32 w-32 text-[#0A1128]" />
                  <p className="text-gray-600 text-center">
                    Escaneie este QR Code com seu WhatsApp
                    <br />
                    <span className="text-sm text-gray-500">
                      Abra o WhatsApp &gt; Menu &gt; WhatsApp Web
                    </span>
                  </p>
                </div>
              ) : sessionActive ? (
                <div className="flex flex-col items-center gap-4">
                  <Smartphone className="h-20 w-20 text-green-500" />
                  <p className="text-green-600 font-medium text-center">
                    WhatsApp conectado!
                    <br />
                    <span className="text-sm text-gray-600">
                      Seu assistente está pronto para receber comandos
                    </span>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Smartphone className="h-16 w-16 text-gray-300" />
                  <p className="text-gray-500 text-center">
                    Clique em "Iniciar Sessão" para gerar o QR Code
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 justify-center">
              {!sessionActive && (
                <Button
                  onClick={startSession}
                  disabled={loading || qrCodeVisible}
                  className="bg-[#0A1128] hover:bg-[#1A2942] text-white font-medium"
                >
                  <Power className="h-5 w-5 mr-2" />
                  {loading ? "Gerando QR Code..." : "Iniciar Sessão"}
                </Button>
              )}
              
              {sessionActive && (
                <Button
                  onClick={deleteSession}
                  variant="destructive"
                  className="font-medium"
                >
                  <Trash className="h-5 w-5 mr-2" />
                  Apagar Sessão
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 space-y-2 max-w-md text-center">
        <h3 className="font-semibold text-[#0A1128]">Como usar o Assistente de Entregas:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            Envie endereços para criar entregas
          </li>
          <li className="flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            Peça status de pedidos a qualquer momento
          </li>
          <li className="flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            Receba atualizações em tempo real
          </li>
          <li className="flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            Digite "ajuda" para ver todos os comandos
          </li>
        </ul>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        © 2025 Assistente de Entregas. Todos os direitos reservados.
      </p>
    </div>
  );
};

export default WhatsAppConnectionPage;
