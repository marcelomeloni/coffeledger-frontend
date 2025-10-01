import { useWorkstation } from '../hooks/useWorkstation';
import { useAuth } from '../contexts/AuthContext';
import { PageHeader } from '../components/common/PageHeader';
import { Spinner } from '../components/common/Spinner';
import { BatchCard } from '../components/features/batch/BatchCard';
import { ClipboardList, AlertCircle } from 'lucide-react';

export default function WorkstationPage() {
  const { batches, isLoading, error } = useWorkstation();
  const { publicKey } = useAuth();
  const currentUserPublicKey = publicKey?.toBase58();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Buscando seus lotes ativos...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="h-12 w-12 text-red-400" />
          <h3 className="mt-4 text-lg font-medium text-red-800">Erro ao Carregar</h3>
          <p className="mt-2 text-sm text-red-700">Não foi possível buscar os seus lotes. Por favor, tente recarregar a página.</p>
        </div>
      );
    }

    if (!batches || batches.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-gray-50 rounded-lg border">
          <ClipboardList className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-800">Nenhum Lote Ativo</h3>
          <p className="mt-2 text-sm text-gray-600">No momento, não há lotes sob sua responsabilidade.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {batches.map((batch) => (
          <BatchCard 
            key={batch.id} 
            batch={batch} 
            currentUserPublicKey={currentUserPublicKey} 
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <PageHeader
        title="Estação de Trabalho"
        subtitle="Lotes que estão atualmente sob sua responsabilidade e aguardam uma ação."
      />
      <div className="mt-8">
        {renderContent()}
      </div>
    </div>
  );
}

