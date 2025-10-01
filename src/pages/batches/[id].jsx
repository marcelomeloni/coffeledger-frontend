import { useEffect, useState, useCallback, useMemo } from 'react';
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
import { ParticipantsCard } from '../../components/features/batch/ParticipantsCard'; // <-- NOVO IMPORT
import toast from 'react-hot-toast';
import { CheckCircle, UserPlus, History } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BatchDetailsPage() {
  const { id } = useParams();
  const { publicKey } = useAuth();

  // --- Seção de Hooks ---
  const [batchData, setBatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddParticipantsModalOpen, setAddParticipantsModalOpen] = useState(false);

  const fetchBatchDetails = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBatchById(id);
      setBatchData(data);
      setError(null);
    } catch (err) {
      setError('Lote não encontrado ou falha ao carregar.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBatchDetails();
  }, [fetchBatchDetails]);

  const currentParticipantIds = useMemo(() =>
    batchData?.details?.batch_participants.map(p => p.partner.id) || [],
    [batchData]
  );

  const userAddress = publicKey?.toBase58();

  const currentUserRole = useMemo(() => {
    if (!userAddress || !batchData?.details?.batch_participants) return null;
    const participant = batchData.details.batch_participants.find(p => p.partner.public_key === userAddress);
    return participant?.partner?.role;
  }, [userAddress, batchData]);
  // --- Fim da seção de Hooks ---

  const handleFinalize = async () => {
    if (!publicKey) return toast.error("Você precisa estar conectado.");
    
    const confirmed = await new Promise((resolve) => {
        if (window.confirm("Tem certeza que deseja finalizar este lote? Esta ação é irreversível.")) {
            resolve(true);
        } else {
            resolve(false);
        }
    });

    if (!confirmed) return;

    try {
      await finalizeBatch(id, { brandOwnerKey: publicKey.toBase58() });
      toast.success("Lote finalizado com sucesso!");
      fetchBatchDetails();
    } catch (error) {
      toast.error(error.message || "Falha ao finalizar o lote.");
    }
  };

  if (loading) return <Spinner fullPage />;
  if (error) return <p className="text-red-500 text-center p-8">{error}</p>;
  if (!batchData) return null;

  const isOwner = userAddress === batchData.details.brand_owner_key;
  const isCurrentHolder = userAddress === batchData.details.current_holder_key;
  const isFinalized = batchData.details.status === 'completed';

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={`Lote: ${batchData.details.onchain_id || batchData.details.id}`}
        subtitle={`Produtor: ${batchData.details.producer_name}`}
      >
        {isOwner && !isFinalized && (
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" onClick={() => setAddParticipantsModalOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Participantes
            </Button>
            <Button onClick={handleFinalize}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Finalizar Lote
            </Button>
          </div>
        )}
      </PageHeader>
      
      {isFinalized && (
        <div className="p-4 mb-6 text-center bg-green-100 text-green-800 rounded-lg shadow-sm mx-6">
          <div className="flex flex-col items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
            <p className="text-lg font-bold">Lote Finalizado</p>
            <p className="text-sm text-green-700 mt-1">Este lote foi finalizado e seu histórico é imutável.</p>
            <div className="mt-4 border-t border-green-200 pt-4 w-full space-y-2">
              <p className="font-semibold text-green-800">
                ID do Lote: <span className="font-normal">{batchData.details.onchain_id}</span>
              </p>
              <p className="font-semibold text-xs text-green-800 break-all">
                Endereço On-chain: {" "}
                <a
                  href={`https://explorer.solana.com/address/${batchData.details.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-800 hover:text-green-600 underline font-normal"
                >
                  {batchData.details.id}
                </a>
              </p>
              
              {/* Adicione um link para a nova página personalizada aqui */}
              <div className="pt-4">
                <Link
                  to={`/batch/${batchData.details.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-green-700 bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-green-600"
                >
                  <History className="h-4 w-4" />
                  Ver Página de Proveniência Pública
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 🎯 LAYOUT MELHORADO: Formulário em destaque, timeline compacta */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 px-6 pb-6">
        {/* 🔥 ÁREA PRINCIPAL: Formulário em destaque */}
        <div className="xl:col-span-3 space-y-6">
          {isCurrentHolder && !isFinalized ? (
            <>
              {currentUserRole ? (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        {getFormIcon(currentUserRole)}
                      </div>
                      Registrar Nova Etapa
                    </h2>
                    <p className="text-green-100 mt-2">
                      Preencha os dados da etapa atual do processo
                    </p>
                  </div>
                  <div className="p-6">
                    <DynamicStageForm 
                      batchId={id} 
                      onStageAdded={fetchBatchDetails} 
                      partnerType={currentUserRole}
                    />
                  </div>
                </div>
              ) : (
                <Card>
                  <Card.Content>
                    <p className="text-center text-sm text-gray-500">Carregando formulário...</p>
                  </Card.Content>
                </Card>
              )}
              
              <TransferCustodyForm 
                batch={batchData} 
                currentHolderKey={userAddress}
                onTransferSuccess={fetchBatchDetails} 
              />
            </>
          ) : (
            <Card>
              <Card.Content>
                <div className="text-center py-12">
                  <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    {isFinalized ? 'Lote Finalizado' : 'Aguardando Ação'}
                  </h3>
                  <p className="text-gray-500">
                    {isFinalized 
                      ? 'Este lote foi finalizado e não aceita novas etapas.'
                      : 'No momento, não há ações disponíveis para você neste lote.'
                    }
                  </p>
                </div>
              </Card.Content>
            </Card>
          )}
        </div>

        {/* 📱 TIMELINE & PARTICIPANTS COMPACTA: Lateral menor */}
        <div className="xl:col-span-1 space-y-6"> {/* <-- Adicionado `space-y-6` para espaçamento */}
          <div className="sticky top-6">
            <Card className="bg-white shadow-lg border border-gray-200">
              <Card.Header className="bg-gray-50 border-b border-gray-200">
                <Card.Title className="flex items-center gap-2 text-gray-800">
                  <History className="h-5 w-5 text-green-500" />
                  Linha do Tempo
                </Card.Title>
              </Card.Header>
              <Card.Content className="p-4">
                <div className="max-h-[600px] overflow-y-auto">
                  <StageTimeline stages={batchData.stages} />
                </div>
              </Card.Content>
            </Card>
          </div>
          
          {isOwner && (
            <ParticipantsCard
                batchId={batchData.details.id}
                participants={batchData.details.batch_participants}
                isOwner={isOwner}
                onParticipantRemoved={fetchBatchDetails}
                batchData={batchData}
            />
          )}

        </div>
      </div>

      <AddParticipantsModal
        isOpen={isAddParticipantsModalOpen}
        onClose={() => setAddParticipantsModalOpen(false)}
        onSuccess={fetchBatchDetails}
        batchId={id}
        currentParticipantIds={currentParticipantIds}
      />
    </div>
  );
}

// 🎨 Função auxiliar para ícones dos formulários
function getFormIcon(partnerType) {
  const icons = {
    producer: '🌱',
    logistics: '🚚', 
    warehouse: '🏭',
    grader: '🔍',
    roaster: '🔥',
    packager: '📦',
    distributor: '🚛'
  };
  return icons[partnerType] || '📝';
}