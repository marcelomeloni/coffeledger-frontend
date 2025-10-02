// src/components/features/dashboard/QuickActions.jsx
import { Card } from '../../common/Card';
import { Button } from '../../common/Button';
import { Plus, Users, BarChart3, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickActions({  batchCount }) {
  const actions = [
    {
      icon: Plus,
      label: 'Novo Lote',
      description: 'Iniciar novo lote de café',
      to: '/batches/new',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Users,
      label: 'Gerenciar Parceiros',
      description: 'Adicionar ou remover parceiros',
      to: '/partners',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: BarChart3,
      label: 'Relatórios',
      description: 'Ver relatórios detalhados',
      to: '/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: Download,
      label: 'Exportar Dados',
      description: 'Exportar dados dos lotes',
      onClick: () => console.log('Export data'),
      color: 'bg-amber-500 hover:bg-amber-600'
    }
  ];

  return (
    <Card>
      <Card.Header>
        <Card.Title>Ações Rápidas</Card.Title>
        <Card.Description>
          {batchCount > 0 
            ? `${batchCount} lote${batchCount !== 1 ? 's' : ''} gerenciado${batchCount !== 1 ? 's' : ''}`
            : 'Comece criando seu primeiro lote'
          }
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const content = (
              <button
                onClick={action.onClick}
                className={`w-full p-4 rounded-xl text-white ${action.color} transition-all duration-200 hover:shadow-lg transform hover:scale-105 text-left`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{action.label}</div>
                    <div className="text-white/80 text-xs">{action.description}</div>
                  </div>
                </div>
              </button>
            );

            return action.to ? (
              <Link key={index} to={action.to}>
                {content}
              </Link>
            ) : (
              <div key={index}>
                {content}
              </div>
            );
          })}
        </div>
      </Card.Content>
    </Card>
  );
}