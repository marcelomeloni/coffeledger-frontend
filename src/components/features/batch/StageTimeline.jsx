import { Leaf, Flame, Truck, Warehouse, CheckCircle2, Clock } from 'lucide-react';

// Ícones otimizados para timeline compacta
const compactStageIcons = {
  default: <CheckCircle2 className="h-3 w-3 text-white" />,
  colheita: <Leaf className="h-3 w-3 text-white" />,
  torra: <Flame className="h-3 w-3 text-white" />,
  distribuição: <Truck className="h-3 w-3 text-white" />,
  armazenamento: <Warehouse className="h-3 w-3 text-white" />,
  logística: <Truck className="h-3 w-3 text-white" />,
};

const getStageIcon = (stageName) => {
  if (!stageName) return compactStageIcons.default;
  const name = stageName.toLowerCase();
  for (const key in compactStageIcons) {
    if (name.includes(key)) {
      return compactStageIcons[key];
    }
  }
  return compactStageIcons.default;
};

export function StageTimeline({ stages }) {
  if (!stages || stages.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-8 w-8 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">Nenhuma etapa registrada</p>
      </div>
    );
  }

  const gatewayUrl = import.meta.env.VITE_PINATA_GATEWAY_URL || 'https://gateway.pinata.cloud';
  
  return (
    <ol className="relative border-l border-gray-300 ml-4 space-y-4">
      {stages.map((stage, index) => (
        <li key={stage.publicKey || index} className="ml-2">
          {/* Ponto da timeline */}
          <span className="absolute flex items-center justify-center w-6 h-6 bg-green-500 rounded-full -left-3 ring-2 ring-white border border-gray-200">
            {getStageIcon(stage.stageName)}
          </span>
          
          {/* Conteúdo compacto */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
              {stage.stageName}
            </h3>
            
            <time className="block text-xs text-gray-500 mt-1">
              {stage.timestamp ? new Date(stage.timestamp * 1000).toLocaleDateString('pt-BR') : 'Data indisponível'}
            </time>
            
            <p className="text-xs text-gray-600 mt-2">
              <span className="font-medium">Por:</span>
              <span className="font-mono ml-1 bg-gray-200 px-1 rounded">
                {stage.actor?.slice(0, 6)}...
              </span>
            </p>

            {stage.stageDataHash && (
              <a 
                href={`${gatewayUrl}/ipfs/${stage.stageDataHash}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center mt-2 text-xs font-medium text-green-600 hover:text-green-800"
              >
                Ver detalhes
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}