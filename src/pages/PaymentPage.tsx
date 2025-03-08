
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Percent, CreditCard, Tag, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentPage = () => {
  const [referralCode, setReferralCode] = useState("");
  const [hasDiscount, setHasDiscount] = useState(false);
  const { toast } = useToast();

  const normalPrice = 79.97;
  const betaPrice = 50;
  const discountPercentage = 10;
  
  const applyDiscount = (price: number) => {
    return hasDiscount ? price * (1 - discountPercentage / 100) : price;
  };

  const finalPrice = applyDiscount(betaPrice);

  const handleApplyCode = () => {
    if (referralCode.trim() !== "") {
      setHasDiscount(true);
      toast({
        title: "Código aplicado!",
        description: `Desconto de ${discountPercentage}% aplicado com sucesso.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Código inválido",
        description: "Por favor, insira um código de indicação válido.",
        variant: "destructive",
      });
    }
  };

  const handlePayment = () => {
    // Aqui seria a integração com Mercado Pago
    window.location.href = "https://www.mercadopago.com.br/checkout"; // URL fictícia para exemplo
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF1F7] p-4">
      <Link to="/" className="absolute top-4 left-4 text-gray-600 hover:text-gray-900">
        ← Voltar
      </Link>
      
      <h1 className="text-3xl font-bold mb-8 text-[#0A1128]">Assistente de Entregas</h1>
      
      <Card className="w-full max-w-md bg-white border-0 shadow-sm rounded-lg">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold text-center mb-3 text-[#0A1128]">Assinar Plano</h2>
          <p className="text-center text-gray-600 mb-6">
            Assine o Assistente de Entregas com preços especiais da versão beta
          </p>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Preço normal
                </span>
                <span className="text-gray-500 line-through">R$ {normalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-600 font-medium flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  Preço Beta
                </span>
                <span className="text-green-600 font-medium">R$ {betaPrice.toFixed(2)}</span>
              </div>
              
              {hasDiscount && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-600 font-medium flex items-center">
                    <Percent className="h-4 w-4 mr-1" />
                    Desconto de indicação
                  </span>
                  <span className="text-blue-600 font-medium">
                    -{discountPercentage}% (R$ {(betaPrice * discountPercentage / 100).toFixed(2)})
                  </span>
                </div>
              )}
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#0A1128] font-bold flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-1 text-green-500" />
                    Total a pagar
                  </span>
                  <span className="text-[#0A1128] font-bold text-xl">
                    R$ {finalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="referralCode">Código de indicação (opcional)</Label>
              <div className="flex gap-2">
                <Input
                  id="referralCode"
                  placeholder="Insira seu código aqui"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  className="border-gray-300"
                  disabled={hasDiscount}
                />
                <Button 
                  onClick={handleApplyCode} 
                  variant="outline"
                  disabled={hasDiscount || referralCode.trim() === ""}
                >
                  Aplicar
                </Button>
              </div>
              {hasDiscount && (
                <p className="text-green-600 text-sm flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Desconto de {discountPercentage}% aplicado!
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={handlePayment} 
                className="w-full py-6 bg-[#0A1128] hover:bg-[#1A2942] text-white font-medium flex items-center justify-center"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Pagar com Mercado Pago
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Ao clicar em "Pagar", você será redirecionado para o checkout seguro do Mercado Pago.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 space-y-2 max-w-md text-center">
        <h3 className="font-semibold text-[#0A1128]">Benefícios do Assistente de Entregas:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            Rastreamento em tempo real
          </li>
          <li className="flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            Otimização de rotas de entrega
          </li>
          <li className="flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            Gestão simplificada de pedidos
          </li>
          <li className="flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
            Suporte prioritário 24/7
          </li>
        </ul>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        © 2025 Assistente de Entregas. Todos os direitos reservados.
      </p>
    </div>
  );
};

export default PaymentPage;
