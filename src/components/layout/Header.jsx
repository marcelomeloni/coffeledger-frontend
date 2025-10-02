// src/components/layout/Header.jsx
import { useState, Fragment } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'; // Renomeado para evitar conflito
import { ChevronDown, LogOut, UserCircle, Copy, Check, Menu } from 'lucide-react'; // Importa o ícone de Menu
import toast from 'react-hot-toast';

// Recebe a função para abrir/fechar a sidebar como uma prop
export function Header({ onMenuClick }) { 
  const { publicKey, logout, isAuthenticated } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!publicKey) return;
    try {
      await navigator.clipboard.writeText(publicKey.toBase58());
      toast.success("Endereço copiado!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reseta o ícone após 2 segundos
    } catch (err) {
      toast.error("Falha ao copiar o endereço.");
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    // A classe justify-between vai alinhar o botão à esquerda e o menu de usuário à direita
    <header className="flex-shrink-0 bg-white border-b border-gray-200 flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
      
      {/* Botão Hambúrguer (visível apenas no mobile) */}
      <div className="md:hidden">
        <button 
          onClick={onMenuClick} // Usa a prop recebida
          className="text-gray-500 hover:text-gray-700 p-2"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Espaçador para garantir que o menu de usuário fique à direita em telas maiores */}
      <div className="hidden md:block"></div>

      {/* Menu de Usuário (alinhado à direita) */}
      <div className="flex items-center">
        {isAuthenticated && publicKey ? (
          <HeadlessMenu as="div" className="relative">
            <div>
              <HeadlessMenu.Button className="flex items-center gap-2 rounded-full p-2 text-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                <UserCircle className="h-6 w-6" />
                <span className="hidden sm:inline font-mono bg-gray-100 px-2 py-1 rounded">
                  {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
                </span>
                <ChevronDown className="h-4 w-4" />
              </HeadlessMenu.Button>
            </div>
            
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <HeadlessMenu.Items className="absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
                
                {/* Seção para exibir e copiar o endereço completo */}
                <div className="px-4 py-3">
                  <p className="text-xs text-gray-500">Seu Endereço</p>
                  <p className="text-sm font-mono text-gray-900 break-all">
                    {publicKey.toBase58()}
                  </p>
                </div>

                <div className="border-t border-gray-100" />

                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleCopy}
                      className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}
                    >
                      {copied 
                        ? <Check className="mr-2 h-5 w-5 text-green-500" />
                        : <Copy className="mr-2 h-5 w-5 text-gray-500" />
                      }
                      {copied ? 'Copiado!' : 'Copiar Endereço'}
                    </button>
                  )}
                </HeadlessMenu.Item>
                
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`${active ? 'bg-gray-100' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700`}
                    >
                      <LogOut className="mr-2 h-5 w-5 text-gray-500" />
                      Sair (Logout)
                    </button>
                  )}
                </HeadlessMenu.Item>

              </HeadlessMenu.Items>
            </Transition>
          </HeadlessMenu>
        ) : (
          <div className="text-sm text-gray-500">
            Não autenticado
          </div>
        )}
      </div>
    </header>
  );
}
