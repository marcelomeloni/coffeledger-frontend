import { useState, useMemo, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../../common/Button';
import { Spinner } from '../../common/Spinner';
import { usePartners } from '../../../hooks/usePartners';
import { addParticipantsToBatch } from '../../../api/batchService';
import toast from 'react-hot-toast';
import { Users, Check } from 'lucide-react';

export function AddParticipantsModal({ isOpen, onClose, onSuccess, batchId, currentParticipantIds }) {
  // 1. Busca todos os parceiros do dono da marca (o hook usa o contexto de autenticação)
  const { partners, isLoading: isLoadingPartners } = usePartners();
  
  // 2. Filtra a lista para mostrar apenas parceiros que ainda não estão no lote
  const availablePartners = useMemo(() => {
    if (!partners) return [];
    return partners.filter(p => !currentParticipantIds.includes(p.id));
  }, [partners, currentParticipantIds]);

  const [selectedIds, setSelectedIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectPartner = (partnerId) => {
    setSelectedIds(prev => 
      prev.includes(partnerId) 
        ? prev.filter(id => id !== partnerId)
        : [...prev, partnerId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      return toast.error("Selecione pelo menos um parceiro para adicionar.");
    }
    setIsSubmitting(true);
    try {
      await addParticipantsToBatch(batchId, { participantIds: selectedIds });
      toast.success("Participantes adicionados com sucesso!");
      onSuccess(); // Isso irá recarregar os dados da página de detalhes do lote
      onClose();   // Fecha o modal
    } catch (error) {
      toast.error(error.message || "Falha ao adicionar participantes.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Limpa a seleção ao fechar o modal
  const handleClose = () => {
    setSelectedIds([]);
    onClose();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-700" />
                  Adicionar Participantes ao Lote
                </Dialog.Title>
                
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="text-sm text-gray-600 mb-4">
                    Selecione os parceiros que você deseja incluir na cadeia de rastreabilidade deste lote.
                  </div>
                  
                  <div className="mt-2 space-y-2 border border-gray-200 rounded-md p-4 max-h-72 overflow-y-auto">
                    {isLoadingPartners ? (
                      <div className="flex justify-center p-4"><Spinner /></div>
                    ) : availablePartners.length > 0 ? (
                      availablePartners.map(p => (
                        <label key={p.id} htmlFor={`add-partner-${p.id}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                          <input
                            id={`add-partner-${p.id}`}
                            type="checkbox"
                            checked={selectedIds.includes(p.id)}
                            onChange={() => handleSelectPartner(p.id)}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <div>
                            <span className="font-medium text-gray-800">{p.name}</span>
                            <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800">{p.role}</span>
                          </div>
                        </label>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">Todos os seus parceiros já foram adicionados a este lote.</p>
                    )}
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-4">
                    <Button type="button" variant="secondary" onClick={handleClose} disabled={isSubmitting}>
                      Cancelar
                    </Button>
                    <Button type="submit" isLoading={isSubmitting} disabled={availablePartners.length === 0}>
                      <Check className="h-4 w-4 mr-2" />
                      Adicionar Selecionados
                    </Button>
                  </div>
                </form>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}