import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  MessageSquarePlus,
  Trash,
  ToggleLeft,
  Power,
  Settings
} from "lucide-react";

const AssistantDashboard = () => {
  console.log("AssistantDashboard component rendered");
  
  const [assistantActive, setAssistantActive] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1, name: "João Silva", active: true },
    { id: 2, name: "Maria Oliveira", active: false },
    { id: 3, name: "Carlos Pereira", active: true }
  ]);
  const [customResponses, setCustomResponses] = useState([
    { id: 1, trigger: "Olá", response: "Olá! Como posso ajudar com sua entrega hoje?" },
    { id: 2, trigger: "Horário", response: "Nosso horário de funcionamento é de segunda a sexta, das 8h às 18h." }
  ]);
  const [newResponse, setNewResponse] = useState({ trigger: "", response: "" });
  const { toast } = useToast();

  const toggleAssistant = () => {
    setAssistantActive(!assistantActive);
    toast({
      title: !assistantActive ? "Assistente ativado" : "Assistente desativado",
      description: !assistantActive 
        ? "O assistente de entregas agora está respondendo automaticamente." 
        : "O assistente de entregas foi desativado.",
      variant: "default",
    });
  };

  const toggleConversation = (id) => {
    setConversations(conversations.map(conv => 
      conv.id === id ? { ...conv, active: !conv.active } : conv
    ));
    
    const conversation = conversations.find(c => c.id === id);
    toast({
      title: conversation.active ? "Conversa desativada" : "Conversa ativada",
      description: `Conversa com ${conversation.name} ${conversation.active ? "não" : "agora"} será respondida pelo assistente.`,
      variant: "default",
    });
  };

  const addCustomResponse = () => {
    if (!newResponse.trigger || !newResponse.response) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha o gatilho e a resposta personalizada.",
        variant: "destructive",
      });
      return;
    }
    
    const id = customResponses.length > 0 
      ? Math.max(...customResponses.map(r => r.id)) + 1 
      : 1;
    
    setCustomResponses([...customResponses, { ...newResponse, id }]);
    setNewResponse({ trigger: "", response: "" });
    
    toast({
      title: "Resposta adicionada",
      description: `Nova resposta personalizada para "${newResponse.trigger}" foi adicionada.`,
      variant: "default",
    });
  };

  const deleteCustomResponse = (id) => {
    const response = customResponses.find(r => r.id === id);
    setCustomResponses(customResponses.filter(r => r.id !== id));
    
    toast({
      title: "Resposta removida",
      description: `A resposta personalizada para "${response.trigger}" foi removida.`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-[#EFF1F7] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#0A1128]">Assistente de Entregas</h1>
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            ← Voltar para o início
          </Link>
        </div>

        {/* Status e Controle Principal */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Status do Assistente</CardTitle>
            <CardDescription>Ative ou desative o assistente de entregas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {assistantActive ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <span className="text-lg font-medium text-green-600">Assistente Ativo</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-6 w-6 text-amber-500" />
                    <span className="text-lg font-medium text-amber-600">Assistente Inativo</span>
                  </>
                )}
              </div>
              <Button 
                onClick={toggleAssistant}
                className={`px-4 py-2 rounded-full ${
                  assistantActive 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-[#0A1128] hover:bg-[#1A2942]"
                }`}
              >
                <Power className="h-5 w-5 mr-2" />
                {assistantActive ? "Desativar Assistente" : "Ativar Assistente"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gerenciamento de Conversas */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Conversas</CardTitle>
              <CardDescription>Gerencie quais conversas o assistente pode responder</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversations.map(conversation => (
                  <div key={conversation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">{conversation.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">
                        {conversation.active ? "Ativado" : "Desativado"}
                      </span>
                      <Switch
                        checked={conversation.active}
                        onCheckedChange={() => toggleConversation(conversation.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-5 w-5 mr-2" />
                Ver Todas as Conversas
              </Button>
            </CardFooter>
          </Card>

          {/* Respostas Personalizadas */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Respostas Personalizadas</CardTitle>
              <CardDescription>Crie respostas automáticas para perguntas frequentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                {customResponses.map(response => (
                  <div key={response.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MessageSquarePlus className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Quando alguém envia:</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteCustomResponse(response.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="ml-7 mb-2">
                      <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-md inline-block">
                        {response.trigger}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-1 ml-7">
                      <span className="font-medium">Responder com:</span>
                    </div>
                    <div className="ml-7">
                      <div className="bg-green-50 text-green-800 px-3 py-2 rounded-md">
                        {response.response}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="trigger">Quando alguém envia:</Label>
                  <Input 
                    id="trigger" 
                    placeholder="Ex: Onde está meu pedido?"
                    value={newResponse.trigger}
                    onChange={(e) => setNewResponse({...newResponse, trigger: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="response">Responder com:</Label>
                  <Input 
                    id="response" 
                    placeholder="Ex: Você pode verificar o status do seu pedido em..."
                    value={newResponse.response}
                    onChange={(e) => setNewResponse({...newResponse, response: e.target.value})}
                  />
                </div>
                <Button 
                  onClick={addCustomResponse} 
                  className="w-full bg-[#0A1128] hover:bg-[#1A2942]"
                >
                  <MessageSquarePlus className="h-5 w-5 mr-2" />
                  Adicionar Resposta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" className="mr-2">
            <Settings className="h-5 w-5 mr-2" />
            Configurações Avançadas
          </Button>
          <Button variant="secondary">
            Estatísticas de Uso
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssistantDashboard;
