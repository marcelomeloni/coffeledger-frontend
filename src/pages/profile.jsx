import { useState } from 'react';
import { useAuth, USER_ROLES } from '../contexts/AuthContext';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import toast from 'react-hot-toast';
import { Copy, Check, ShieldCheck, LogOut } from 'lucide-react';

export default function ProfilePage() {
    const { publicKey, userRole, logout } = useAuth();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!publicKey) return;
        navigator.clipboard.writeText(publicKey.toBase58()).then(() => {
            toast.success("Chave pública copiada!");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            toast.error("Falha ao copiar.");
        });
    };

    const roleLabel = userRole === USER_ROLES.BATCH_OWNER ? 'Dono de Marca' : 'Parceiro de Etapa';
    const publicKeyStr = publicKey ? publicKey.toBase58() : '';

    return (
        <div>
            <PageHeader
                title="Meu Perfil"
                subtitle="Gerencie suas informações de conta e segurança."
            />

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Coluna Principal */}
                <div className="md:col-span-2 space-y-8">
                    {/* Card de Informações da Conta */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Informações da Conta</Card.Title>
                            <Card.Description>Seus detalhes de identificação no sistema.</Card.Description>
                        </Card.Header>
                        <Card.Content className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Seu Papel</label>
                                <p className="mt-1 text-base font-semibold text-green-700">{roleLabel}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Sua Chave Pública (Endereço)</label>
                                <div className="mt-1 flex items-center gap-2 rounded-md bg-gray-100 p-2 border">
                                    <code className="block w-full truncate font-mono text-sm text-gray-800">
                                        {publicKeyStr}
                                    </code>
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className="flex-shrink-0 rounded p-1.5 text-gray-500 hover:bg-gray-200"
                                        title="Copiar chave pública"
                                    >
                                        {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>

                    {/* Card de Segurança */}
                    <Card>
                        <Card.Header>
                            <Card.Title>Segurança</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <ShieldCheck className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-blue-800">Mantenha suas credenciais seguras</h4>
                                    <p className="mt-1 text-sm text-blue-700">
                                        Sua chave pública é derivada deterministicamente do seu nome de usuário e senha. Nunca compartilhe sua senha com ninguém.
                                    </p>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>
                </div>

                {/* Coluna Lateral */}
                <div className="space-y-6">
                     {/* Card de Ações */}
                     <Card>
                        <Card.Header>
                            <Card.Title>Ações</Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Button
                                variant="danger" // Supondo que você tenha uma variante de perigo
                                onClick={logout}
                                className="w-full flex items-center justify-center gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Sair do Sistema (Logout)
                            </Button>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </div>
    );
}





