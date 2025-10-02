// src/components/features/dashboard/DashboardOverview.jsx
import { Card } from '../../common/Card';
import { Package, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useMemo } from 'react'; 
export function DashboardOverview({ batches, loading }) {
  const stats = useMemo(() => {
    if (!batches) return null;

    const total = batches.length;
    const completed = batches.filter(b => b.status === 'completed').length;
    const active = batches.filter(b => b.status === 'active').length;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      completed,
      active,
      completionRate: Math.round(completionRate)
    };
  }, [batches]);

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-32"></div>
        ))}
      </div>
    );
  }

  const overviewItems = [
    {
      icon: Package,
      label: 'Total de Lotes',
      value: stats.total,
      description: 'Lotes criados',
      trend: stats.total > 0 ? 'up' : null,
    
    },
    {
      icon: CheckCircle,
      label: 'Finalizados',
      value: stats.completed,
      description: 'Lotes concluídos',
      trend: stats.completed > 0 ? 'up' : null,
     
    },
    {
      icon: Clock,
      label: 'Em Andamento',
      value: stats.active,
      description: 'Lotes ativos',
      trend: null,
     
    },
    {
      icon: TrendingUp,
      label: 'Taxa de Conclusão',
      value: `${stats.completionRate}%`,
      description: 'Eficiência geral',
      trend: stats.completionRate > 50 ? 'up' : stats.completionRate > 0 ? 'down' : null,
    
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewItems.map((item, index) => (
        <div key={index} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{item.value}</p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white">
              <item.icon className="h-6 w-6" />
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
}