import { NavLink } from 'react-router-dom';
import { useAuth, USER_ROLES } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Users,
  ClipboardList,
  History,
  Settings,
  X // Importar o ícone de fechar (X)
} from 'lucide-react';

// ... (navLinksConfig permanece o mesmo) ...
const navLinksConfig = {
    [USER_ROLES.BATCH_OWNER]: [
      { type: 'heading', label: 'Gerenciamento' },
      { name: 'Dashboard', href: '/', icon: LayoutDashboard },
      { name: 'Lotes', href: '/batches', icon: Package },
      { name: 'Parceiros', href: '/partners', icon: Users },
      { type: 'heading', label: 'Ações' },
      { name: 'Criar Novo Lote', href: '/batches/new', icon: PlusCircle },
    ],
    [USER_ROLES.STAGE_PARTNER]: [
      { type: 'heading', label: 'Minhas Tarefas' },
      { name: 'Estação de Trabalho', href: '/', icon: ClipboardList },
      { name: 'Meu Histórico', href: '/history', icon: History },
      { type: 'heading', label: 'Conta' },
      { name: 'Meu Perfil', href: '/profile', icon: Settings },
    ]
  };


// Recebe as props isOpen e onClose
export function Sidebar({ isOpen, onClose }) {
  const { userRole } = useAuth();
  const currentNavLinks = navLinksConfig[userRole] || [];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      onClick={onClose} // Fecha a sidebar ao clicar em um link
      className={({ isActive }) =>
        `flex items-center px-3 py-2.5 mx-3 my-1 text-sm font-medium rounded-lg transition-colors duration-150 ${
          isActive
            ? 'bg-green-600 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      <item.icon className={`h-5 w-5 mr-3 flex-shrink-0`} />
      <span>{item.name}</span>
    </NavLink>
  );

  const NavHeading = ({ item }) => (
    <h3 className="px-5 mt-4 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {item.label}
    </h3>
  );

  return (
    <>
      {/* Overlay Escuro (Mobile) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 md:hidden" 
          onClick={onClose} 
        />
      )}

      {/* Sidebar Principal */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex-col 
          transform transition-transform duration-300 ease-in-out
          md:relative md:flex md:translate-x-0 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-20 flex items-center px-6 border-b border-gray-200 justify-between">
          <div className="flex items-center">
            <img src="/src/assets/logo.svg" alt="CoffeLedger Logo" className="h-8 w-auto" />
            <span className="ml-3 text-lg font-bold text-gray-800">CoffeLedger</span>
          </div>
          {/* Botão de fechar (apenas no mobile) */}
          <button 
            className="md:hidden p-2 text-gray-500 hover:text-gray-700" 
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {currentNavLinks.map((item, index) =>
            item.type === 'heading'
              ? <NavHeading key={index} item={item} />
              : <NavItem key={item.href} item={item} />
          )}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <p className="text-center text-xs text-gray-500">
            Papel: {userRole === USER_ROLES.BATCH_OWNER ? 'Dono de Marca' : 'Parceiro'}
          </p>
        </div>
      </aside>
    </>
  );
}
