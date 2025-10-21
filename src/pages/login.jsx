import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/features/auth/LoginForm';
import { Spinner } from '../components/common/Spinner'; // Usando um Spinner para o loading inicial

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  // Redireciona se o usuário já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = () => {
    navigate('/');
  };
  
  // Tela de loading inicial para verificar a sessão
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-base font-medium text-gray-600">Verificando sessão...</p>
        </div>
      </div>
    );
  }

  return (
    // ✨ NOVO LAYOUT: Fundo com gradiente sutil e conteúdo centralizado
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-stone-50 to-green-100 p-4">
      
      {/* Card de Login */}
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        
        {/* Cabeçalho */}
        <div className="text-center">
          <img src="../assets/logo.png" alt="CoffeLedger Logo" className="mx-auto h-44 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Acesse sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Rastreabilidade de café na velocidade da Solana.
          </p>
        </div>
        
        {/* Formulário */}
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>

      {/* Rodapé (opcional) */}
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} CoffeLedger. Todos os direitos reservados.</p>
      </footer>
    </div>
  );

}
