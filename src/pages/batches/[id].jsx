// src/pages/BatchDetailsPage.jsx (VERSÃO CORRIGIDA)
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBatchById, finalizeBatch } from '../../api/batchService';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Spinner } from '../../components/common/Spinner';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StageTimeline } from '../../components/features/batch/StageTimeline';
import { DynamicStageForm } from '../../components/features/batch/DynamicStageForm'; 
import { TransferCustodyForm } from '../../components/features/batch/TransferCustodyForm';
import { AddParticipantsModal } from '../../components/features/batch/AddParticipantsModal';
import { ParticipantsCard } from '../../components/features/batch/ParticipantsCard';
import toast from 'react-hot-toast';
import { 
  CheckCircle, 
  UserPlus, 
  History,
  Shield,
  MapPin,
  Settings
} from 'lucide-react';

export default function BatchDetailsPage() {
  const { id } = useParams();
  const { publicKey, userRole } = useAuth();

  // Estados
  const [batchData, setBatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddParticipantsModalOpen, setAddParticipantsModalOpen] = useState(false);

  // Buscar dados do lote
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔄 Buscando dados do lote:', id);
        const data = await getBatchById(id);
        console.log('✅ Dados recebidos:', data);
        setBatchData(data);
      } catch (err) {
        console.error('❌ Erro ao buscar lote:', err);
        setError('Lote não encontrado ou falha ao carregar.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Verificar se é batch owner DESTE LOTE
  const userAddress = publicKey?.toBase58();
  const isBatchOwner = batchData?.details?.batch_participants?.some(
    p => p.partner.public_key === userAddress && p.partner.role === 'batchOwner'
  );

  const isCurrentHolder = userAddress === batchData?.details?.current_holder_key;
  const isFinalized = batchData?.details?.status === 'completed';

  console.log('🔍 PERMISSÕES:', {
    userRole,
    isBatchOwner,
    isCurrentHolder,
    isFinalized,
    userAddress,
    batchOwner: batchData?.details?.batch_participants?.find(p => p.partner.role === 'batchOwner')?.partner.public_key
  });

  // Finalizar lote - APENAS para batch owners
  const handleFinalize = async () => {
    if (!publicKey) {
      toast.error("Você precisa estar conectado.");
      return;
    }
    
    if (!isBatchOwner) {
      toast.error("Apenas donos de marca podem finalizar lotes.");
      return;
    }

    if (!window.confirm("Tem certeza que deseja finalizar este lote? Esta ação é irreversível.")) {
      return;
    }

    try {
      await finalizeBatch(id, { brandOwnerKey: publicKey.toBase58() });
      toast.success("Lote finalizado com sucesso!");
      // Recarregar dados
      const data = await getBatchById(id);
      setBatchData(data);
    } catch (error) {
      toast.error(error.message || "Falha ao finalizar o lote.");
    }
  };

  // ========== NOVAS FUNÇÕES DE PERMISSÃO ==========
  
  // Usuário pode ver informações de gestão (apenas batchOwner)
  const canSeeManagement = isBatchOwner;
  
  // Usuário pode ver área de trabalho (current holder + não finalizado + não batchOwner)
  const canSeeWorkArea = isCurrentHolder && !isFinalized && !isBatchOwner;
  
  // Usuário pode ver timeline (todos os usuários)
  const canSeeTimeline = true;
  
  // Usuário pode ver participantes (apenas batchOwner)
  const canSeeParticipants = isBatchOwner;
  
  // Usuário pode ver informações básicas do lote (todos os usuários)
  const canSeeBatchInfo = true;

  // Loading e erro
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Carregando lote...</p>
        </div>
      </div>
    );
  }

  if (error || !batchData?.details) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error || 'Nenhum dado encontrado'}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Tentar Novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PageHeader
        title={
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {batchData.details.onchain_id || 'Lote Sem ID'}
              </div>
              <div className="text-lg text-gray-600 flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4" />
                {batchData.details.producer_name || 'Produtor não informado'}
              </div>
            </div>
          </div>
        }
      >
        {/* Botão de gerenciar participantes - APENAS para batch owners */}
        {canSeeManagement && !isFinalized && (
          <Button 
            onClick={() => setAddParticipantsModalOpen(true)}
            className="bg-white border border-gray-300 hover:bg-gray-50"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Gerenciar Participantes
          </Button>
        )}
      </PageHeader>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ÁREA DE GESTÃO - APENAS BATCH OWNER */}
            {canSeeManagement && (
              <Card className="border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">Gestão do Lote</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {!isFinalized && (
                      <Button
                        onClick={handleFinalize}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Finalizar Lote
                      </Button>
                    )}
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-gray-700">Status:</span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        isFinalized ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {isFinalized ? 'Finalizado' : 'Ativo'}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* ÁREA DE TRABALHO - APENAS CURRENT HOLDER (NÃO BATCH OWNER) */}
            {canSeeWorkArea && (
              <Card className="border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{getFormIcon(userRole)}</div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Sua Etapa de Trabalho</h2>
                      <p className="text-gray-600">Registre sua contribuição para este lote</p>
                    </div>
                  </div>

                  <DynamicStageForm 
                    batchId={id} 
                    onStageAdded={async () => {
                      const data = await getBatchById(id);
                      setBatchData(data);
                    }} 
                    partnerType={userRole}
                  />

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <TransferCustodyForm 
                      batch={batchData} 
                      currentHolderKey={userAddress}
                      onTransferSuccess={async () => {
                        const data = await getBatchById(id);
                        setBatchData(data);
                      }} 
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* MENSAGEM PARA USUÁRIOS SEM PERMISSÃO DE TRABALHO */}
            {!canSeeWorkArea && !canSeeManagement && (
              <Card className="border border-gray-200">
                <div className="p-8 text-center">
                  <History className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    {isFinalized ? 'Lote Finalizado' : 'Aguardando Sua Etapa'}
                  </h3>
                  <p className="text-gray-500">
                    {isFinalized 
                      ? 'Este lote foi finalizado e não aceita novas etapas.'
                      : `Aguarde até que o lote chegue à sua etapa de trabalho como ${userRole}.`
                    }
                  </p>
                </div>
              </Card>
            )}

            {/* INFORMAÇÕES DO LOTE - VISÍVEL PARA TODOS */}
            {canSeeBatchInfo && (
              <Card className="border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Informações do Lote</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">ID:</span>
                      <p className="text-gray-900">{batchData.details.onchain_id}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Produtor:</span>
                      <p className="text-gray-900">{batchData.details.producer_name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Status:</span>
                      <p className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        isFinalized ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {isFinalized ? 'Finalizado' : 'Em Andamento'}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">Detentor Atual:</span>
                      <p className="text-gray-900">
                        {isCurrentHolder ? 'Você' : batchData.details.current_holder_key}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline - VISÍVEL PARA TODOS */}
            {canSeeTimeline && (
              <Card className="border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <History className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">Timeline do Lote</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="max-h-96 overflow-y-auto">
                    <StageTimeline stages={batchData.stages || []} />
                  </div>
                </div>
              </Card>
            )}

            {/* Participantes - APENAS BATCH OWNER */}
            {canSeeParticipants && batchData.details.batch_participants && (
              <ParticipantsCard
                batchId={batchData.details.id}
                participants={batchData.details.batch_participants}
                isOwner={isBatchOwner}
                onParticipantRemoved={async () => {
                  const data = await getBatchById(id);
                  setBatchData(data);
                }}
                batchData={batchData}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal de Participantes - APENAS para batch owner */}
      {canSeeParticipants && (
        <AddParticipantsModal
          isOpen={isAddParticipantsModalOpen}
          onClose={() => setAddParticipantsModalOpen(false)}
          onSuccess={async () => {
            const data = await getBatchById(id);
            setBatchData(data);
            setAddParticipantsModalOpen(false);
          }}
          batchId={id}
          currentParticipantIds={batchData.details.batch_participants?.map(p => p.partner.id) || []}
        />
      )}
    </div>
  );
}

// Função auxiliar para ícones
function getFormIcon(partnerType) {
  const icons = {
    batchOwner: '👑',
    producer: '🌱',
    logistics: '🚚', 
    warehouse: '🏭',
    grader: '🔍',
    roaster: '🔥',
    packager: '📦',
    distributor: '🚛',
    beneficiamento: '⚙️'
  };
  return icons[partnerType] || '📝';
}