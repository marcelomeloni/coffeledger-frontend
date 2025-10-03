import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { BusinessPreview } from '../components/features/partners/BusinessPreview';
import { BusinessForm } from '../components/features/partners/BusinessForm';
import { useAuth } from '../contexts/AuthContext';
import { usePartnerData } from '../hooks/usePartnerData';
import { updatePartnerMetadata } from '../api/partnerService';
import toast from 'react-hot-toast';

export default function PartnerProfile() {
    // ✅ CORREÇÃO: Use userRole em vez de partnerRole
    const { partnerId, userRole, isLoading: isAuthLoading } = useAuth();
    const { metadata, isLoading: isPartnerDataLoading, error, mutate } = usePartnerData(partnerId);
    const [isEditing, setIsEditing] = useState(false);

    // ✨ CORREÇÃO PRINCIPAL: Espera o AuthContext carregar
    if (isAuthLoading) {
        console.log('PartnerProfile: Autenticação ainda carregando...');
        return <Card className="p-6 text-center">Verificando autenticação...</Card>;
    }

    // Agora, e somente agora, os dados de autenticação devem estar disponíveis
    console.log('PartnerProfile: AuthContext carregado. partnerId:', partnerId, 'userRole:', userRole);
    
    // ✅ CORREÇÃO: Use userRole em vez de partnerRole
    if (!partnerId || !userRole) {
        console.error('PartnerProfile: partnerId ou userRole ausentes após o carregamento da autenticação.');
        return (
            <Card className="p-6 text-center">
                <div className="text-red-500 font-semibold">
                    Erro: Dados do parceiro não disponíveis. Por favor, faça login novamente.
                </div>
            </Card>
        );
    }
    
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = async (updatedData) => {
        try {
            await updatePartnerMetadata(partnerId, updatedData);
            mutate();
            setIsEditing(false);
            toast.success('Perfil atualizado com sucesso!');
        } catch (err) {
            toast.error(err.message || 'Falha ao atualizar o perfil.');
        }
    };

    if (isPartnerDataLoading) {
        console.log('PartnerProfile: Dados do parceiro ainda carregando...');
        return <Card className="p-6 text-center">Carregando dados do perfil...</Card>;
    }

    if (error) {
        console.error('PartnerProfile: Erro ao carregar os dados do parceiro:', error);
        return <Card className="p-6 text-center text-red-500">Erro ao carregar os dados: {error.message}</Card>;
    }

    const hasProfileData = metadata && Object.keys(metadata).length > 0;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Meu Perfil de Negócio 💼
            </h1>
            
            {!hasProfileData && !isEditing ? (
                <Card className="p-6 text-center">
                    <p className="text-lg text-gray-600 mb-4">
                        Parece que você ainda não tem seus dados de negócio cadastrados.
                    </p>
                    <Button onClick={handleEdit}>
                        Começar a Cadastrar
                    </Button>
                </Card>
            ) : isEditing ? (
                // ✅ CORREÇÃO: Passe userRole em vez de partnerRole
                <BusinessForm
                    partnerRole={userRole}
                    initialData={metadata}
                    onSubmit={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <>
                    <div className="flex justify-end mb-4">
                        <Button onClick={handleEdit}>
                            Editar Perfil
                        </Button>
                    </div>
                    {/* ✅ CORREÇÃO: Passe userRole em vez de partnerRole */}
                    <BusinessPreview partnerRole={userRole} metadata={metadata} />
                </>
            )}
        </div>
    );
}