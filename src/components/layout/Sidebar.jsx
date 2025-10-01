import { NavLink } from 'react-router-dom';
import { useAuth, USER_ROLES } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  Users, 
  ClipboardList, 
  History,
  Settings
} from 'lucide-react';

// Objeto de configuração para os links de navegação baseados no papel do usuário
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
    { name: 'Meu Perfil', href: '/profile', icon: Settings }, // ✨ Link para a nova página
  ]
};

export function Sidebar() {
  const { userRole } = useAuth();
  const currentNavLinks = navLinksConfig[userRole] || [];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      className={({ isActive }) =>
        `flex items-center px-3 py-2.5 mx-3 my-1 text-sm font-medium rounded-lg transition-colors duration-150 ${
          isActive
            ? 'bg-green-600 text-white shadow-sm' // Estilo do item ativo
            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900' // Estilo do item inativo
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
    // ✨ DESIGN ATUALIZADO: Fundo branco, bordas e textos claros
    <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex">
      <div className="h-20 flex items-center px-6 border-b border-gray-200">
        <img src="/src/assets/logo.svg" alt="CoffeLedger Logo" className="h-8 w-auto" />
        <span className="ml-3 text-lg font-bold text-gray-800">CoffeLedger</span>
      </div>
      <nav className="flex-1 py-4">
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
  );
}
