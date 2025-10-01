// src/components/wizards/CreateBatchWizard.jsx

import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createBatch } from '../../../api/batchService';
import { Button } from '../../common/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { usePartners } from '../../../hooks/usePartners';
import { Spinner } from '../../common/Spinner';
import { Check, Package, Users, Search } from 'lucide-react';

const steps = [
  { id: 1, name: 'Dados do Lote', icon: Package },
  { id: 2, name: 'Participantes', icon: Users },
  { id: 3, name: 'Revisão', icon: Check },
];

// ✨ MELHORIA: A geração do ID é apenas uma pré-visualização. O sequencial 'XXX' indica que será gerado pelo sistema.
const generateBatchIdPreview = (producerName) => {
  if (!producerName) return '';
  const year = new Date().getFullYear();
  const initials = producerName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
  return `${initials}-${year}-XXX`;
};

export function CreateBatchWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    producerName: '',
    initialHolderKey: '',
    participants: [],
  });
  // ✨ MELHORIA: Estado para o termo de busca de participantes
  const [participantSearch, setParticipantSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { publicKey } = useAuth();
  const { partners, isLoading: isLoadingPartners } = usePartners();

  const holder = useMemo(() => partners?.find(p => p.public_key === formData.initialHolderKey), [partners, formData.initialHolderKey]);
  const participantDetails = useMemo(() => formData.participants.map(id => partners?.find(p => p.id === id)).filter(Boolean), [partners, formData.participants]);

  // ✨ MELHORIA: Lógica inteligente para adicionar automaticamente o responsável inicial à lista de participantes.
  useEffect(() => {
    if (holder) {
      // Se o responsável inicial for selecionado e não estiver na lista de participantes, adicione-o.
      if (!formData.participants.includes(holder.id)) {
        setFormData(prev => ({
          ...prev,
          participants: [...prev.participants, holder.id],
        }));
      }
    }
  }, [holder, formData.participants]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleParticipantsChange = (partnerId) => {
    // ✨ MELHORIA: Impede a remoção do responsável inicial da lista de participantes.
    if (holder && holder.id === partnerId) {
      toast.error('O Primeiro Responsável não pode ser removido da lista de participantes.');
      return;
    }

    setFormData(prev => {
      const newParticipants = prev.participants.includes(partnerId)
        ? prev.participants.filter(id => id !== partnerId)
        : [...prev.participants, partnerId];
      return { ...prev, participants: newParticipants };
    });
  };
  
  // ✨ MELHORIA: Validação em cada etapa antes de permitir o avanço.
  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.producerName.trim()) {
        toast.error('O nome do produtor é obrigatório.');
        return false;
      }
    }
    if (currentStep === 2) {
      if (!formData.initialHolderKey) {
        toast.error('Selecione o primeiro responsável pelo lote.');
        return false;
      }
      if (formData.participants.length === 0) {
        toast.error('Selecione pelo menos um participante.');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  // ✨ MELHORIA: Navegação direta para uma etapa anterior a partir da tela de revisão.
  const goToStep = (step) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!publicKey) return toast.error("Você precisa estar conectado.");
    
    setIsSubmitting(true);
    
    // ✨ MUDANÇA CENTRAL: Não enviamos mais o 'id' do frontend. O backend será responsável por criá-lo.
    const batchData = {
      producerName: formData.producerName,
      brandOwnerKey: publicKey.toBase58(),
      initialHolderKey: formData.initialHolderKey,
      participants: formData.participants,
    };

    try {
      const result = await createBatch(batchData);
      // O 'result' da API deve conter o ID final gerado (ex: result.batchId)
      toast.success(`Lote "${result.batchId}" criado com sucesso!`);
      navigate(`/batches/${result.batchAddress}`);
    } catch (error) {
      toast.error(error.message || 'Ocorreu um erro ao criar o lote.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✨ MELHORIA: Filtragem de parceiros com base na busca do usuário para uma UX melhor em listas longas.
  const filteredPartners = useMemo(() => {
    if (!partners) return [];
    return partners.filter(p =>
      p.name.toLowerCase().includes(participantSearch.toLowerCase()) ||
      p.role.toLowerCase().includes(participantSearch.toLowerCase())
    );
  }, [partners, participantSearch]);


  const renderStepContent = () => {
    if (isLoadingPartners) return <div className="flex justify-center p-8"><Spinner /></div>;

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="producerName" className="block text-sm font-medium text-gray-700">Nome do Produtor/Fazenda Associada</label>
              <input type="text" name="producerName" value={formData.producerName} onChange={handleInputChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" placeholder="Ex: Fazenda Sol Nascente" required />
            </div>
            <div>
              <label htmlFor="id_preview" className="block text-sm font-medium text-gray-700">Pré-visualização do ID do Lote</label>
              <input type="text" name="id_preview" value={generateBatchIdPreview(formData.producerName)} className="mt-1 w-full border-gray-300 rounded-md shadow-sm bg-gray-100 font-mono" disabled />
              <p className="mt-2 text-xs text-gray-500">O ID final será gerado automaticamente pelo sistema para garantir a unicidade.</p>
            </div>
          </div>
        );
      case 2:
        return (
            <div className="space-y-8">
                <div>
                    <label htmlFor="initialHolderKey" className="block text-sm font-medium text-gray-700">Primeiro Responsável (Produtor)</label>
                    <p className="text-xs text-gray-500">Selecione o parceiro que iniciará o processo de rastreabilidade.</p>
                    <select name="initialHolderKey" value={formData.initialHolderKey} onChange={handleInputChange} className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" required>
                        <option value="">Selecione um produtor...</option>
                        {partners?.filter(p => p.role === 'producer').map(p => <option key={p.id} value={p.public_key}>{p.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Elenco de Participantes do Lote</label>
                    <p className="text-xs text-gray-500 mb-2">Selecione todos os parceiros que poderão interagir com este lote.</p>
                    {/* ✨ MELHORIA: Campo de busca para filtrar participantes. */}
                    <div className="relative mb-4">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nome ou função..."
                            value={participantSearch}
                            onChange={(e) => setParticipantSearch(e.target.value)}
                            className="block w-full rounded-md border-gray-300 pl-10 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="space-y-2 border border-gray-200 rounded-md p-4 max-h-60 overflow-y-auto">
                        {filteredPartners.length > 0 ? filteredPartners.map(p => {
                            const isInitialHolder = holder?.id === p.id;
                            return (
                                <label key={p.id} htmlFor={`partner-${p.id}`} className={`flex items-center gap-3 p-2 rounded-md transition-colors ${isInitialHolder ? 'bg-green-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}>
                                    <input
                                        id={`partner-${p.id}`}
                                        type="checkbox"
                                        checked={formData.participants.includes(p.id)}
                                        onChange={() => handleParticipantsChange(p.id)}
                                        // ✨ MELHORIA: Desabilita a checkbox do responsável inicial para evitar remoção.
                                        disabled={isInitialHolder}
                                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 disabled:opacity-50"
                                    />
                                    <div>
                                        <span className="font-medium text-gray-800">{p.name}</span>
                                        <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">{p.role}</span>
                                    </div>
                                </label>
                            )
                        }) : <p className="text-sm text-gray-500 text-center py-4">Nenhum parceiro encontrado.</p>}
                    </div>
                </div>
            </div>
        );
      case 3:
        return (
           <div>
             <h4 className="font-semibold text-gray-900 mb-4">Por favor, revise os dados antes de criar o lote.</h4>
             <dl className="space-y-4 text-sm divide-y divide-gray-200">
                {/* ✨ MELHORIA: Revisão interativa com links para editar os dados rapidamente. */}
                <div className="pt-4 flex justify-between items-start">
                    <div>
                        <dt className="font-medium text-gray-600">Produtor / ID</dt>
                        <dd className="text-gray-800">{formData.producerName}</dd>
                        <dd className="text-gray-500 font-mono text-xs">{generateBatchIdPreview(formData.producerName)}</dd>
                    </div>
                    <button onClick={() => goToStep(1)} className="text-sm font-medium text-green-600 hover:text-green-800">Editar</button>
                </div>
                <div className="pt-4 flex justify-between items-start">
                    <div>
                        <dt className="font-medium text-gray-600">Primeiro Responsável</dt>
                        <dd className="text-gray-800">{holder?.name || "Não selecionado"}</dd>
                    </div>
                     <button onClick={() => goToStep(2)} className="text-sm font-medium text-green-600 hover:text-green-800">Editar</button>
                </div>
                <div className="pt-4 flex justify-between items-start">
                    <div>
                        <dt className="font-medium text-gray-600">Elenco de Participantes ({participantDetails.length})</dt>
                        <dd className="text-gray-800 mt-1 max-w-md">{participantDetails.map(p => p.name).join(', ') || "Nenhum"}</dd>
                    </div>
                    <button onClick={() => goToStep(2)} className="text-sm font-medium text-green-600 hover:text-green-800">Editar</button>
                </div>
             </dl>
            </div>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={`flex-1 relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
              { currentStep > step.id ? (
                <>
                  <div className="flex items-center text-sm font-semibold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                    <span className="ml-2 hidden sm:inline text-gray-800">{step.name}</span>
                  </div>
                  {stepIdx < steps.length -1 && <div className="absolute top-4 left-4 -z-10 h-0.5 w-full bg-green-600" />}
                </>
              ) : currentStep === step.id ? (
                <>
                  <div className="flex items-center text-sm font-semibold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 ring-4 ring-green-200">
                      <step.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                    <span className="ml-2 hidden sm:inline text-green-700">{step.name}</span>
                  </div>
                  {stepIdx < steps.length -1 && <div className="absolute top-4 left-4 -z-10 h-0.5 w-full bg-gray-200" />}
                </>
              ) : (
                <>
                  <div className="flex items-center text-sm font-semibold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                      <step.icon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                    </span>
                    <span className="ml-2 hidden sm:inline text-gray-500">{step.name}</span>
                  </div>
                  {stepIdx < steps.length -1 && <div className="absolute top-4 left-4 -z-10 h-0.5 w-full bg-gray-200" />}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 border-t border-gray-200 pt-8">
        {renderStepContent()}
      </div>

      <div className="mt-10 pt-5 border-t border-gray-200">
        <div className="flex justify-between">
          <Button variant="secondary" onClick={prevStep} disabled={currentStep === 1 || isSubmitting}>
            Voltar
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={nextStep}>Avançar</Button>
          ) : (
            <Button onClick={handleSubmit} isLoading={isSubmitting}>
              {isSubmitting ? 'Criando Lote...' : 'Confirmar e Criar Lote'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}