import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '../../common/Button';
import { AlertTriangle, User, Lock, Loader2, KeyRound, Copy } from 'lucide-react'; // ✨ NOVO: Ícone KeyRound

export function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  
  const { login, isLoading, error, unregisteredPublicKey } = useAuth();

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess('Copiado para a área de transferência!');
      setTimeout(() => setCopySuccess(''), 2500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCopySuccess('');
    const success = await login(username, password);
    if (success) {
      onLoginSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ================================================================== */}
      {/* ✨ SEÇÃO 1: INPUTS E BOTÃO DE AÇÃO (Layout Fixo) ✨ */}
      {/* ================================================================== */}
      <div className="space-y-6">
        {/* Input de Usuário */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-700">
            Nome de Usuário
          </label>
          <div className="relative mt-2">
            <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="username" name="username" type="text" autoComplete="username" required
              value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading}
              className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 transition"
            />
          </div>
        </div>

        {/* Input de Senha */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-700">
            Senha
          </label>
          <div className="relative mt-2">
            <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="password" name="password" type="password" autoComplete="current-password" required
              value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading}
              className="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 transition"
            />
          </div>
        </div>

        {/* Botão de Ação */}
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 focus-visible:outline-green-600"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
            {isLoading ? 'Verificando...' : 'Entrar / Gerar Chave'}
          </Button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* ✨ SEÇÃO 2: ÁREA DE FEEDBACK DINÂMICO (Aparece Abaixo) ✨ */}
      {/* ================================================================== */}
      <div className="mt-6 min-h-[140px]"> {/* Altura mínima para evitar "saltos" no layout */}
        {isLoading ? (
          <div className="flex justify-center items-center pt-4">
            <p className="text-sm text-gray-500 animate-pulse">Aguarde, conectando ao sistema...</p>
          </div>
        ) : unregisteredPublicKey ? (
          // Bloco de Onboarding com cores harmoniosas
          <div className="rounded-lg bg-green-50 p-4 text-left">
            <div className="flex">
              <div className="flex-shrink-0 pt-0.5"><KeyRound className="h-5 w-5 text-green-500" /></div>
              <div className="ml-3 w-full">
                <h3 className="text-sm font-semibold text-green-800">Sua Chave de Acesso foi Gerada</h3>
                <p className="mt-1 text-sm text-green-700">Para se registrar, copie e envie o código abaixo:</p>
                <div className="mt-2 flex items-center gap-2 rounded-md bg-green-100 p-2 border border-green-200">
                  <code className="block w-full truncate font-mono text-xs text-green-900">{unregisteredPublicKey}</code>
                  <button type="button" onClick={() => handleCopyToClipboard(unregisteredPublicKey)} title="Copiar chave pública" className="flex-shrink-0 rounded p-1 text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                {copySuccess && <p className="mt-1 text-xs font-medium text-emerald-600">{copySuccess}</p>}
              </div>
            </div>
          </div>
        ) : error ? (
          // Bloco de Erro com cores harmoniosas
          <div className="rounded-lg bg-amber-50 p-4 text-left" role="alert">
            <div className="flex">
              <div className="flex-shrink-0"><AlertTriangle className="h-5 w-5 text-amber-500" /></div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-amber-800">Não foi possível entrar</h3>
                <p className="mt-1 text-sm text-amber-700">{error}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}