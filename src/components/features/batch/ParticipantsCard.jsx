import { useState } from 'react';
import { Card } from '../../common/Card'; 
import { Button } from '../../common/Button';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../../contexts/AuthContext';
import { removeParticipantFromBatch } from '../../../api/batchService';
import { ConfirmationModal } from '../../common/ConfirmationModal';

export function ParticipantsCard({ batchId, participants, isOwner, onParticipantRemoved, batchData }) {
    const { publicKey } = useAuth();
    const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
    const [participantToRemove, setParticipantToRemove] = useState(null);
    const userAddress = publicKey?.toBase58();

    const handleOpenRemoveModal = (participant) => {
        setParticipantToRemove(participant);
        setRemoveModalOpen(true);
    };

    const handleRemoveParticipant = async () => {
        if (!participantToRemove || !publicKey) return;

        try {
            await removeParticipantFromBatch(batchId, participantToRemove.partner.id, userAddress);
            toast.success("Participante removido com sucesso!");
            onParticipantRemoved(); // Call the callback to refresh data
        } catch (error) {
            toast.error(error.message || "Falha ao remover o participante.");
        } finally {
            setRemoveModalOpen(false);
            setParticipantToRemove(null);
        }
    };

    return (
        <Card className="bg-white shadow-lg border border-gray-200">
            <Card.Header className="bg-gray-50 border-b border-gray-200">
                <Card.Title>
                    Participantes do Lote
                </Card.Title>
            </Card.Header>
            <Card.Content className="p-4">
                <ul className="divide-y divide-gray-200">
                    {participants.map((p) => (
                        <li key={p.id} className="flex items-center justify-between py-3">
                            <div>
                                <p className="text-sm font-semibold text-gray-800">{p.partner.name}</p>
                                <p className="text-xs text-gray-500">{p.partner.role}</p>
                            </div>
                            {isOwner && p.partner.public_key !== batchData.details.current_holder_key && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleOpenRemoveModal(p)}
                                    className="text-red-500 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            </Card.Content>

            <ConfirmationModal
                isOpen={isRemoveModalOpen}
                onClose={() => setRemoveModalOpen(false)}
                onConfirm={handleRemoveParticipant}
                title="Remover Participante"
                message={`Tem certeza que deseja remover "${participantToRemove?.partner.name}"? Esta ação não pode ser desfeita.`}
            />
        </Card>
    );
}