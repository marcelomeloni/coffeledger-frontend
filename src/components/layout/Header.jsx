// src/components/layout/Header.jsx
import { useState, Fragment } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { ChevronDown, LogOut, UserCircle, Copy, Check, Menu } from 'lucide-react';
import toast from 'react-hot-toast';

export function Header({ onMenuClick }) { 
  const { publicKey, logout, isAuthenticated } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!publicKey) return;
    try {
      await navigator.clipboard.writeText(publicKey.toBase58());
      toast.success("Endereço copiado!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Falha ao copiar o endereço.");
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200 flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
      
      {/* Botão Hambúrguer e Logo no Mobile */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Botão Hambúrguer (visível apenas no mobile) */}
        <button 
          onClick={onMenuClick}
          className="md:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo no Header (apenas mobile) */}
        <div className="md:hidden flex items-center">
          <img src="/src/assets/logo.png" alt="CoffeLedger Logo" className="h-24 w-auto" />
          
        </div>
      </div>

      {/* Menu de Usuário */}
      <div className="flex items-center">
        {isAuthenticated && publicKey ? (
          <HeadlessMenu as="div" className="relative">
            <div>
              <HeadlessMenu.Button className="flex items-center gap-2 rounded-lg p-2 text-sm text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
                <UserCircle className="h-5 w-5 md:h-6 md:w-6" />
                <span className="hidden xs:inline font-mono bg-gray-100 px-2 py-1 rounded text-xs md:text-sm">
                  {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
                </span>
                <ChevronDown className="h-4 w-4 hidden xs:block" />
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
              <HeadlessMenu.Items className="absolute right-0 mt-2 w-72 xs:w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                
                {/* Seção para exibir e copiar o endereço completo */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Seu Endereço</p>
                  <p className="text-xs font-mono text-gray-900 break-all leading-relaxed">
                    {publicKey.toBase58()}
                  </p>
                </div>

                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleCopy}
                      className={`${active ? 'bg-gray-50' : ''} group flex w-full items-center px-4 py-3 text-sm text-gray-700 transition-colors`}
                    >
                      {copied 
                        ? <Check className="mr-3 h-4 w-4 text-green-500 flex-shrink-0" />
                        : <Copy className="mr-3 h-4 w-4 text-gray-500 flex-shrink-0" />
                      }
                      {copied ? 'Copiado!' : 'Copiar Endereço'}
                    </button>
                  )}
                </HeadlessMenu.Item>
                
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`${active ? 'bg-gray-50' : ''} group flex w-full items-center px-4 py-3 text-sm text-gray-700 border-t border-gray-100 transition-colors`}
                    >
                      <LogOut className="mr-3 h-4 w-4 text-gray-500 flex-shrink-0" />
                      Sair da Conta
                    </button>
                  )}
                </HeadlessMenu.Item>

              </HeadlessMenu.Items>
            </Transition>
          </HeadlessMenu>
        ) : (
          <div className="text-sm text-gray-500 px-3 py-1 bg-gray-100 rounded-lg">
            Não autenticado
          </div>
        )}
      </div>
    </header>
  );
}