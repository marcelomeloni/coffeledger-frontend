import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../../common/Button';
import { createPartner } from '../../../api/batchService';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';

const roles = [
    { value: 'producer', label: 'Produtor' },
    { value: 'logistics', label: 'Logística' },
    { value: 'warehouse', label: 'Armazém' },
    { value: 'grader', label: 'Classificador' },
    { value: 'roaster', label: 'Torrefador' },
    { value: 'packager', label: 'Embalador' },
    { value: 'distributor', label: 'Distribuidor' },
    { value: 'beneficiamento', label: 'Beneficiamento' },
    { value: 'end_consumer', label: 'Consumidor Final / Barista' },
    { value: 'sustainability', label: 'Sustentabilidade' }
];

export function AddPartnerModal({ isOpen, onClose, onPartnerAdded }) {
  const { publicKey } = useAuth();
  const [formData, setFormData] = useState({ name: '', publicKey: '', role: '', contactEmail: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // LOG: Mostra quando o modal é aberto ou fechado
  console.log(`AddPartnerModal is renderizando. isOpen: ${isOpen}`);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
        const newData = { ...prevData, [name]: value };
        // LOG: Mostra o estado do formulário a cada mudança
        console.log('Form data changed:', newData);
        return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit foi chamado.");

    if (!publicKey) {
      toast.error("Você não está conectado. Conecte sua carteira.");
      console.error("Tentativa de submissão sem publicKey (usuário não conectado).");
      return;
    }

    // --- FIX 1: Validação no Frontend ---
    // Verifica se os campos obrigatórios estão preenchidos antes de enviar.
    // O método .trim() remove espaços em branco do início e do fim.
    if (!formData.name.trim() || !formData.publicKey.trim() || !formData.role) {
        const errorMessage = "Por favor, preencha todos os campos obrigatórios: Nome, Chave Pública e Papel.";
        toast.error(errorMessage);
        console.warn("Validação falhou no frontend:", { 
            name: formData.name, 
            publicKey: formData.publicKey, 
            role: formData.role 
        });
        return; // Impede o envio da requisição
    }
    
    setIsSubmitting(true);

    // --- FIX 2: Construção correta do payload ---
    // Criamos um único objeto com todos os dados necessários, incluindo a brandOwnerKey.
    const partnerData = {
        brandOwnerKey: publicKey.toBase58(),
        name: formData.name.trim(),
        publicKey: formData.publicKey.trim(),
        role: formData.role,
        contactEmail: formData.contactEmail.trim()
    };

    // LOG: Este é o log mais importante! Mostra exatamente o que está sendo enviado para a API.
    console.log("SUBMITTING PAYLOAD TO API:", JSON.stringify(partnerData, null, 2));

    try {
      // A função createPartner agora é chamada com um único argumento.
      await createPartner(partnerData);
      
      toast.success("Parceiro adicionado com sucesso!");
      console.log("Parceiro criado com sucesso na API.");

      onPartnerAdded(); // Atualiza a lista na tela anterior
      onClose(); // Fecha o modal
    } catch (error) {
      // LOG: Mostra o erro exato que veio da API no console.
      console.error("Falha ao criar o parceiro - Erro retornado pela API:", error);
      toast.error(error.message || "Falha ao adicionar parceiro. Verifique o console para mais detalhes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Adicionar Novo Parceiro
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                  </div>
                  <div>
                    <label htmlFor="publicKey" className="block text-sm font-medium text-gray-700">Chave Pública (Carteira)</label>
                    <input type="text" name="publicKey" id="publicKey" value={formData.publicKey} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm font-mono" required />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Papel do Parceiro</label>
                    <select name="role" id="role" value={formData.role} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required>
                      <option value="">Selecione um papel</option>
                      {roles.map(roleInfo => (
                        <option key={roleInfo.value} value={roleInfo.value}>
                          {roleInfo.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">E-mail de Contato (Opcional)</label>
                    <input type="email" name="contactEmail" id="contactEmail" value={formData.contactEmail} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                  </div>
                  <div className="mt-6 flex justify-end gap-4">
                    <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>Cancelar</Button>
                    <Button type="submit" isLoading={isSubmitting}>Adicionar Parceiro</Button>
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