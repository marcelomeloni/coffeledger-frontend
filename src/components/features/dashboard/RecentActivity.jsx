// src/components/features/dashboard/RecentActivity.jsx
import { Card } from '../../common/Card';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';
import { useMemo } from 'react'; 
export function RecentActivity({ batches }) {
  const recentActivities = useMemo(() => {
    if (!batches) return [];

    const activities = batches.flatMap(batch => {
      const batchActivities = [];
      
      // Atividade de criação do lote
      if (batch.onchain_created_at) {
        batchActivities.push({
          id: `${batch.id}-created`,
          type: 'created',
          batchName: batch.onchain_id || batch.id,
          description: 'Lote criado',
          timestamp: new Date(batch.onchain_created_at),
          icon: Package,
          color: 'text-blue-500'
        });
      }

      // Atividade baseada no status
      if (batch.status === 'completed') {
        batchActivities.push({
          id: `${batch.id}-completed`,
          type: 'completed',
          batchName: batch.onchain_id || batch.id,
          description: 'Lote finalizado',
          timestamp: new Date(batch.updated_at || batch.onchain_created_at),
          icon: CheckCircle,
          color: 'text-green-500'
        });
      }

      return batchActivities;
    });

    return activities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5);
  }, [batches]);

  if (recentActivities.length === 0) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Atividade Recente</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-8 text-gray-400">
            <Clock className="h-12 w-12 mx-auto mb-4" />
            <p>Nenhuma atividade recente</p>
          </div>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <Card.Title>Atividade Recente</Card.Title>
        <Card.Description>Últimas atualizações dos lotes</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.batchName}
                </p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDistanceToNow(activity.timestamp, { 
                    addSuffix: true,
                    locale: ptBR 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}