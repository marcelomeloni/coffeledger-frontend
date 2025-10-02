// src/components/layout/Layout.jsx
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header'; // O Header agora é autossuficiente

export function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col">
        {/* 1. O Header agora é um componente único e sempre visível */}
        <Header onMenuClick={toggleSidebar} />

        {/* 2. Conteúdo Principal */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}