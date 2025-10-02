// src/components/features/dashboard/DashboardChart.jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useMemo } from 'react';

export function DashboardChart({ batches }) {
  const statusData = useMemo(() => {
    // Esta parte já estava segura, pois já continha a verificação !batches
    if (!batches || batches.length === 0) return [];

    const statusCount = batches.reduce((acc, batch) => {
      // CORREÇÃO DE STATUS: Usando 'inProgress' para consistência
      const status = batch.status === 'completed' ? 'completed' : 'inProgress';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCount).map(([status, count]) => ({
      name: status === 'completed' ? 'Finalizados' : 'Em Andamento',
      value: count,
      color: status === 'completed' ? '#10B981' : '#F59E0B' // Verde para finalizado, Ambar para em andamento
    }));
  }, [batches]);

  // CORREÇÃO AQUI: Adicionada a verificação "!batches" para evitar o erro.
  if (!batches || batches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-lg font-medium">Sem dados suficientes</p>
        <p className="text-sm">Crie lotes para ver análises</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} lotes`, 'Quantidade']}
            contentStyle={{ 
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => (
              <span style={{ color: '#6B7280', fontSize: '12px' }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}