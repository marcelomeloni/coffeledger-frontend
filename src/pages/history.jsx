import { useHistory } from '../hooks/useHistory';
import { PageHeader } from '../components/common/PageHeader';
import { Spinner } from '../components/common/Spinner';
import { Card } from '../components/common/Card';
import { History, AlertCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HistoryPage() {
  const { history, isLoading, error } = useHistory();
  const gatewayUrl = import.meta.env.VITE_PINATA_GATEWAY_URL || 'https://gateway.pinata.cloud';

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Buscando seu histórico na blockchain...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="h-12 w-12 text-red-400" />
          <h3 className="mt-4 text-lg font-medium text-red-800">Erro ao Carregar</h3>
          <p className="mt-2 text-sm text-red-700">Não foi possível buscar seu histórico. Por favor, tente recarregar a página.</p>
        </div>
      );
    }

    if (!history || history.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-gray-50 rounded-lg border">
          <History className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-800">Nenhuma Atividade Registrada</h3>
          <p className="mt-2 text-sm text-gray-600">Você ainda não registrou nenhuma etapa na blockchain.</p>
        </div>
      );
    }

    return (
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Etapa</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lote</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Registro</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detalhes</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.map((stage) => (
                <tr key={stage.publicKey} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{stage.stageName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* ✨ CORREÇÃO: 'stage.batch' já é uma string vinda da API. A chamada .toBase58() foi removida. */}
                    <Link to={`/batches/${stage.batch}`} className="text-sm text-green-600 hover:text-green-800 hover:underline">
                        <div className="font-medium">{stage.batchOnchainId}</div>
                        <div className="text-xs text-gray-500">{stage.batchProducerName}</div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(stage.timestamp * 1000).toLocaleString('pt-BR')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    <a 
                      href={`${gatewayUrl}/ipfs/${stage.stageDataHash}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 hover:underline"
                    >
                      Ver no IPFS <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  };

  return (
    <div>
      <PageHeader
        title="Meu Histórico de Atividades"
        subtitle="Todas as etapas que você registrou na blockchain."
      />
      <div className="mt-8">
        {renderContent()}
      </div>
    </div>
  );
}

