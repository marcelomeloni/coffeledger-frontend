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
  X,
  // 1. Ícones para os novos links de registro
  Tractor,
  Flame,
  Warehouse,
  Leaf,
  GraduationCap,
  Truck,
  Box,
  Hand,
  Store
} from 'lucide-react';

// 2. Links BASE para os tipos de usuário
const baseNavLinks = {
  [USER_ROLES.BATCH_OWNER]: [
    { type: 'heading', label: 'Gerenciamento' },
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Lotes', href: '/batches', icon: Package },
    { name: 'Parceiros', href: '/partners', icon: Users },
    { type: 'heading', label: 'Ações' },
    { name: 'Criar Novo Lote', href: '/batches/new', icon: PlusCircle },
  ],
  // Links comuns a TODOS os parceiros
  PARTNER_BASE: [
    { type: 'heading', label: 'Minhas Tarefas' },
    { name: 'Estação de Trabalho', href: '/', icon: ClipboardList },
    { name: 'Meu Histórico', href: '/history', icon: History },
  ]
};

// 3. Mapa para os links de REGISTRO específicos de cada papel
const registryLinksConfig = {
  [USER_ROLES.PRODUCER]: { name: 'Minha Fazenda', href: '/registry', icon: Tractor },
  [USER_ROLES.ROASTER]: { name: 'Minha Torrefação', href: '/registry', icon: Flame },
  [USER_ROLES.WAREHOUSE]: { name: 'Meu Armazém', href: '/registry', icon: Warehouse },
  [USER_ROLES.GRADER]: { name: 'Meu Perfil Classificador', href: '/registry', icon: GraduationCap },
  [USER_ROLES.LOGISTICS]: { name: 'Minha Empresa', href: '/registry', icon: Truck },
  [USER_ROLES.PACKAGER]: { name: 'Minha Embaladora', href: '/registry', icon: Box },
  [USER_ROLES.DISTRIBUTOR]: { name: 'Meu Centro', href: '/registry', icon: Store },
  [USER_ROLES.BENEFICIAMENTO]: { name: 'Meu Beneficiamento', href: '/registry', icon: Leaf },
  [USER_ROLES.END_CONSUMER]: { name: 'Minha Cafeteria', href: '/registry', icon: Hand },
};

// Mapa de tradução dos papéis para exibição no rodapé
const roleDisplayNames = {
    [USER_ROLES.BATCH_OWNER]: 'Dono de Marca',
    [USER_ROLES.PRODUCER]: 'Produtor',
    [USER_ROLES.ROASTER]: 'Torrefador',
    [USER_ROLES.WAREHOUSE]: 'Armazém',
    [USER_ROLES.LOGISTICS]: 'Logística',
    [USER_ROLES.GRADER]: 'Classificador',
    [USER_ROLES.PACKAGER]: 'Embalador',
    [USER_ROLES.DISTRIBUTOR]: 'Distribuidor',
    [USER_ROLES.BENEFICIAMENTO]: 'Beneficiamento',
    [USER_ROLES.END_CONSUMER]: 'Cafeteria / Barista',
    [USER_ROLES.SUSTAINABILITY]: 'Analista de Sustentabilidade',
};


export function Sidebar({ isOpen, onClose }) {
  const { userRole } = useAuth();

  // 4. Lógica principal para montar o menu dinamicamente
  const currentNavLinks = (() => {
    // Se for Dono da Marca, retorna o menu dele e para.
    if (userRole === USER_ROLES.BATCH_OWNER) {
      return baseNavLinks[USER_ROLES.BATCH_OWNER];
    }

    // Para qualquer outro papel, começamos com a base de parceiro.
    let finalLinks = [...baseNavLinks.PARTNER_BASE];
    const specialRegistryLink = registryLinksConfig[userRole];

    // Se existir um link de registro para este papel...
    if (specialRegistryLink) {
      // Adicionamos o cabeçalho e o link especial.
      finalLinks.push({ type: 'heading', label: 'Registro' });
      finalLinks.push(specialRegistryLink);
    }
    
    // Adicionamos os links de conta no final.
    finalLinks.push({ type: 'heading', label: 'Conta' });
    finalLinks.push({ name: 'Meu Perfil', href: '/profile', icon: Settings });

    return finalLinks;
  })();

  const displayRole = roleDisplayNames[userRole] || 'Parceiro';

  const NavItem = ({ item }) => (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center px-3 py-2.5 mx-2 my-1 text-sm font-medium rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-green-600 text-white shadow-sm'
            : 'text-gray-700 hover:bg-gray-100'
        }`
      }
    >
      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
      <span className="truncate">{item.name}</span>
    </NavLink>
  );

  const NavHeading = ({ item }) => (
    <h3 className="px-4 mt-4 mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
      {item.label}
    </h3>
  );

  return (
    <>
      <div 
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-50 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex-col flex
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="h-20 flex items-center px-4 md:px-6 border-b border-gray-200 justify-between flex-shrink-0">
          <div className="flex items-center">
            <img 
              src="/src/assets/logo.png" 
              alt="CoffeLedger Logo" 
              className="h-36 w-auto" // Corrigido para um tamanho que cabe no header
            />
          </div>
          
          <button 
            className="md:hidden p-2 text-gray-500 hover:text-gray-700" 
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="space-y-0.5">
            {currentNavLinks.map((item, index) =>
              item.type === 'heading'
                ? <NavHeading key={`heading-${index}`} item={item} />
                : <NavItem key={item.href} item={item} />
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <p className="text-center text-xs text-gray-500 px-2">
            Papel: <span className="font-medium text-gray-700">{displayRole}</span>
          </p>
        </div>
      </aside>
    </>
  );
}