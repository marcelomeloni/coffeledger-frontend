import React, { createContext, useState, useContext, useMemo, useCallback, useEffect } from 'react';
import { getKeypairFromCredentials } from '../lib/authUtils';
import { checkRole } from '../api/authService';

export const USER_ROLES = {
    BATCH_OWNER: 'batchOwner',
    STAGE_PARTNER: 'stagePartner',
    NO_AUTH: 'noAuth',
};

const AuthContext = createContext(null);
const LOCAL_STORAGE_KEY = 'coffee-trace-credentials';

export function AuthProvider({ children }) {
    const [keypair, setKeypair] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // ✨ NOVO ESTADO: Guarda a chave pública de um usuário não registrado para o onboarding.
    const [unregisteredPublicKey, setUnregisteredPublicKey] = useState(null);

    const login = useCallback(async (username, password) => {
        setIsLoading(true);
        setError(null);
        setUnregisteredPublicKey(null); // Limpa a chave anterior a cada tentativa

        try {
            const generatedKeypair = await getKeypairFromCredentials(username, password);
            const publicKeyStr = generatedKeypair.publicKey.toBase58();
            const { role } = await checkRole(publicKeyStr);

            if (role === USER_ROLES.NO_AUTH) {
                const authError = "Usuário não autorizado. Sua carteira não está registrada no sistema.";
                setError(authError);
                setUnregisteredPublicKey(publicKeyStr); // Define a chave para ser exibida na UI
                localStorage.removeItem(LOCAL_STORAGE_KEY); // ✨ CORREÇÃO CRÍTICA: Limpa a sessão inválida
                return false;
            }

            setKeypair(generatedKeypair);
            setUserRole(role);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ username, password }));
            return true;

        } catch (err) {
            console.error("Falha na autenticação/autorização:", err);
            const errorMessage = err.message || "Credenciais inválidas ou falha de comunicação.";
            setError(errorMessage);
            setKeypair(null);
            setUserRole(null);
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setKeypair(null);
        setUserRole(null);
        setError(null);
        setUnregisteredPublicKey(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }, []);

    // ✨ EFEITO MELHORADO: Roda apenas uma vez na montagem
    useEffect(() => {
        const restoreSession = async () => {
            const savedCredentials = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedCredentials) {
                const { username, password } = JSON.parse(savedCredentials);
                await login(username, password);
            } else {
                setIsLoading(false); // Só para de carregar se não houver credenciais
            }
        };
        restoreSession();
    }, []); // Array vazio garante que rode apenas uma vez

    const value = useMemo(() => ({
        keypair,
        publicKey: keypair?.publicKey,
        isAuthenticated: !!keypair && !!userRole && userRole !== USER_ROLES.NO_AUTH,
        userRole,
        isLoading,
        error,
        unregisteredPublicKey, // ✨ NOVO: Expõe a chave do usuário não registrado
        login,
        logout,
    }), [keypair, userRole, isLoading, error, unregisteredPublicKey, login, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};