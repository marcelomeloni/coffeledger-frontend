// src/components/features/dashboard/StatCard.jsx
import { Card } from '../../common/Card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function StatCard({ 
  icon, 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue,
  loading = false 
}) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-500';
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 animate-pulse">
        <Card.Content className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          </div>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:shadow-lg transition-all duration-200">
      <Card.Content className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {trend && (
                <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
                  {getTrendIcon()}
                  <span>{trendValue}</span>
                </div>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
          </div>
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white">
            {icon}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}