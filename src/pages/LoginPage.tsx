
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    // Implementação de autenticação seria feita aqui
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EFF1F7] p-4">
      <h1 className="text-3xl font-bold mb-8 text-[#0A1128]">Quick Login Nexus</h1>
      
      <Card className="w-full max-w-md bg-white border-0 shadow-sm rounded-lg">
        <CardContent className="p-6">
          <h2 className="text-3xl font-bold text-center mb-3 text-[#0A1128]">Entrar</h2>
          <p className="text-center text-gray-600 mb-6">
            Entre com suas credenciais para acessar sua conta
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 py-6 border-gray-300"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Senha"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 py-6 border-gray-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-6 bg-[#0A1128] hover:bg-[#1A2942] text-white font-medium"
            >
              Entrar
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-[#0A1128] font-medium hover:underline">
                Registrar-se
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-sm text-gray-500">
        © 2025 Quick Login Nexus. Todos os direitos reservados.
      </p>
    </div>
  );
};

export default LoginPage;
