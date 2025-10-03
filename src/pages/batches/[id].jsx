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
  Settings,
  Users,
  X
} from 'lucide-react';

export default function BatchDetailsPage() {
  const { id } = useParams();
  const { publicKey, userRole, partnerId } = useAuth();

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

  // 🛑 CORREÇÃO: Verificar se é batch owner DESTE LOTE - AGORA CORRETO
  const userAddress = publicKey?.toBase58();
  
  // Correção 1: Verificar pelo brand_owner_key do lote
  const isBatchOwnerByKey = userAddress === batchData?.details?.brand_owner_key;
  
  // Correção 2: Verificar também na lista de participantes
  const isBatchOwnerByParticipants = batchData?.details?.batch_participants?.some(
    p => p.partner.public_key === userAddress && p.partner.role === 'batchOwner'
  );

  // 🎯 CORREÇÃO PRINCIPAL: Usar ambas as verificações
  const isBatchOwner = isBatchOwnerByKey || isBatchOwnerByParticipants;

  const isCurrentHolder = userAddress === batchData?.details?.current_holder_key;
  const isFinalized = batchData?.details?.status === 'completed';

  console.log('🔍 PERMISSÕES CORRIGIDAS:', {
    userRole,
    isBatchOwner,
    isBatchOwnerByKey,
    isBatchOwnerByParticipants,
    isCurrentHolder,
    isFinalized,
    userAddress,
    brandOwnerKey: batchData?.details?.brand_owner_key,
    batchParticipants: batchData?.details?.batch_participants
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

  // ========== FUNÇÕES DE PERMISSÃO CORRIGIDAS ==========
  
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

  // Função para recarregar dados do lote
  const refreshBatchData = async () => {
    try {
      const data = await getBatchById(id);
      setBatchData(data);
    } catch (err) {
      console.error('❌ Erro ao recarregar dados do lote:', err);
      toast.error('Erro ao atualizar dados do lote');
    }
  };

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
        {/* 🎯 AGORA DEVE APARECER: Botão de gerenciar participantes - APENAS para batch owners */}
        {canSeeManagement && !isFinalized && (
          <Button 
            onClick={() => setAddParticipantsModalOpen(true)}
            className="bg-green-600 text-white hover:bg-green-700"
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
            
            {/* 🎯 AGORA DEVE APARECER: ÁREA DE GESTÃO - APENAS BATCH OWNER */}
            {canSeeManagement && (
              <Card className="border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">Gestão do Lote</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      👑 Batch Owner
                    </span>
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

                    {/* 🎯 AGORA DEVE APARECER: Card de Participantes - Versão Simplificada */}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-600" />
                          Participantes do Lote
                        </h3>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {batchData.details.batch_participants?.length || 0} participantes
                        </span>
                      </div>
                      
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {batchData.details.batch_participants?.map((participant) => (
                          <div 
                            key={participant.id}
                            className={`flex items-center justify-between p-3 rounded-md border ${
                              participant.partner.public_key === batchData.details.current_holder_key
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${
                                participant.partner.public_key === batchData.details.current_holder_key
                                  ? 'bg-blue-500'
                                  : 'bg-gray-400'
                              }`} />
                              <div>
                                <p className="font-medium text-sm text-gray-900">
                                  {participant.partner.name}
                                  {participant.partner.role === 'batchOwner' && (
                                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded">👑 Dono</span>
                                  )}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {participant.partner.role}
                                  {participant.partner.public_key === batchData.details.current_holder_key && (
                                    <span className="ml-2 text-blue-600 font-medium">• Detentor Atual</span>
                                  )}
                                </p>
                              </div>
                            </div>
                            
                            {participant.partner.public_key !== batchData.details.current_holder_key && participant.partner.role !== 'batchOwner' && (
                              <button
                                onClick={() => {
                                  if (window.confirm(`Remover ${participant.partner.name} do lote?`)) {
                                    // Aqui você implementaria a remoção
                                    toast.error('Funcionalidade de remoção em desenvolvimento');
                                  }
                                }}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        
                        {(!batchData.details.batch_participants || batchData.details.batch_participants.length === 0) && (
                          <div className="text-center py-4 text-gray-500">
                            <Users className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                            <p>Nenhum participante adicionado</p>
                            <Button 
                              onClick={() => setAddParticipantsModalOpen(true)}
                              size="sm"
                              className="mt-2"
                            >
                              <UserPlus className="h-3 w-3 mr-1" />
                              Adicionar Primeiro Participante
                            </Button>
                          </div>
                        )}
                      </div>
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
                    onStageAdded={refreshBatchData} 
                    partnerType={userRole}
                  />

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <TransferCustodyForm 
                      batch={batchData} 
                      currentHolderKey={userAddress}
                      onTransferSuccess={refreshBatchData} 
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
                        {isCurrentHolder ? 'Você' : (
                          batchData.details.batch_participants?.find(p => 
                            p.partner.public_key === batchData.details.current_holder_key
                          )?.partner.name || batchData.details.current_holder_key
                        )}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium text-gray-500">Participantes:</span>
                      <p className="text-gray-900">
                        {batchData.details.batch_participants?.length || 0} participantes na cadeia
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium text-gray-500">Dono do Lote:</span>
                      <p className="text-gray-900">
                        {batchData.details.batch_participants?.find(p => 
                          p.partner.role === 'batchOwner'
                        )?.partner.name || 'Não identificado'}
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

            {/* 🎯 AGORA DEVE APARECER: Card de Participantes Expandido - APENAS BATCH OWNER */}
            {canSeeParticipants && batchData.details.batch_participants && (
              <ParticipantsCard
                batchId={batchData.details.id}
                participants={batchData.details.batch_participants}
                isOwner={isBatchOwner}
                onParticipantRemoved={refreshBatchData}
                batchData={batchData}
              />
            )}

            {/* Card de Status da Cadeia - VISÍVEL PARA TODOS */}
            <Card className="border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Cadeia de Custódia</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total de Participantes:</span>
                    <span className="font-semibold text-gray-900">
                      {batchData.details.batch_participants?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Etapas Concluídas:</span>
                    <span className="font-semibold text-gray-900">
                      {batchData.stages?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      isFinalized 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {isFinalized ? 'Finalizado' : 'Ativo'}
                    </span>
                  </div>
                  
                  {/* Indicador de Próxima Etapa */}
                  {!isFinalized && batchData.details.current_holder_key && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                      <p className="text-xs text-blue-700 font-medium">
                        Próxima etapa: {batchData.details.batch_participants?.find(p => 
                          p.partner.public_key === batchData.details.current_holder_key
                        )?.partner.role || 'Em transição'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* 🎯 AGORA DEVE APARECER: Modal de Adicionar Participantes - APENAS para batch owner */}
      {canSeeParticipants && (
        <AddParticipantsModal
          isOpen={isAddParticipantsModalOpen}
          onClose={() => setAddParticipantsModalOpen(false)}
          onSuccess={refreshBatchData}
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