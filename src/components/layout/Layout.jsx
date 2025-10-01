// src/components/layout/Layout.jsx
import { useState } from 'react'; // Importar useState
import { Sidebar } from './Sidebar';
import { Header } from './Header'; // Assumindo que o Header será atualizado

// Importar o ícone de menu (hambúrguer)
import { Menu } from 'lucide-react'; 

export function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 1. Sidebar Responsiva */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col">
        {/* 2. Header (Adicionando o Botão Hambúrguer para Mobile) */}
        <div className="md:hidden sticky top-0 z-20 bg-white border-b border-gray-200 flex items-center justify-between p-4 h-20">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 p-2">
                    <Menu className="h-6 w-6" />
                </button>
                <span className="ml-4 text-xl font-bold text-gray-800">Menu</span>
            </div>
            {/* Você pode colocar o conteúdo do seu Header aqui, como logo ou notificações */}
            <Header /> 
        </div>

        {/* Conteúdo Principal */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
