// src/pages/index.jsx

import { Link } from 'react-router-dom';

import { useBatches } from '../hooks/useBatches';

import { Button } from '../components/common/Button';

import { Card } from '../components/common/Card';

import { DashboardChart } from '../components/features/dashboard/DashboardChart';
import { Plus, Package, Layers, Users } from 'lucide-react';

// Função para obter a saudação baseada na hora local
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde'; // Considerando o horário de SP às 17:27
    return 'Boa noite';
};

// Componente para o estado vazio
const EmptyState = () => (
    <div className="text-center py-16 px-6 bg-white rounded-lg border-2 border-dashed border-gray-300">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Nenhum lote de café encontrado</h3>
        <p className="mt-1 text-sm text-gray-500">Comece a rastrear sua produção agora mesmo.</p>
        <div className="mt-6">
            <Link to="/batches/new">
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Lote
                </Button>
            </Link>
        </div>
    </div>
);


import { DashboardOverview } from '../components/features/dashboard/DashboardOverview';
import { QuickActions } from '../components/features/dashboard/QuickActions';
import { RecentActivity } from '../components/features/dashboard/RecentActivity';


export default function Dashboard() {
  const { batches, loading } = useBatches();
  
  return (
    <div className="space-y-6">
      {/* Overview em Grid */}
      <DashboardOverview batches={batches} loading={loading} />
      
      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1: Ações Rápidas */}
        <div className="lg:col-span-2">
          <QuickActions 
            onAddBatch={() => {/* função para adicionar lote */}}
            batchCount={batches?.length || 0}
          />
        </div>
        
        {/* Coluna 2: Gráfico */}
        <div className="lg:col-span-1">
          <Card>
            <Card.Header>
              <Card.Title>Status dos Lotes</Card.Title>
              <Card.Description>Distribuição por status</Card.Description>
            </Card.Header>
            <Card.Content>
              <DashboardChart batches={batches} />
            </Card.Content>
          </Card>
        </div>
      </div>
      
      {/* Atividade Recente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity batches={batches} />
        
        {/* Espaço para outro componente futuro */}
        <Card>
          <Card.Header>
            <Card.Title>Próximos Passos</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="text-center py-8 text-gray-400">
              <p>Mais insights em breve...</p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}