// src/contexts/AuthContext.jsx (VERSÃO CORRIGIDA)
import React, { createContext, useState, useContext, useMemo, useCallback, useEffect } from 'react';
import { getKeypairFromCredentials } from '../lib/authUtils';
import { checkRole } from '../api/authService';

export const USER_ROLES = {
  BATCH_OWNER: 'batchOwner',
  NO_AUTH: 'noAuth',
  PRODUCER: 'producer',
  LOGISTICS: 'logistics',
  WAREHOUSE: 'warehouse',
  GRADER: 'grader',
  ROASTER: 'roaster',
  PACKAGER: 'packager',
  DISTRIBUTOR: 'distributor',
  BENEFICIAMENTO: 'beneficiamento',
  END_CONSUMER: 'end_consumer',
  SUSTAINABILITY: 'sustainability',
};

const AuthContext = createContext(null);
const LOCAL_STORAGE_KEY = 'coffee-trace-credentials';

export function AuthProvider({ children }) {
    const [keypair, setKeypair] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unregisteredPublicKey, setUnregisteredPublicKey] = useState(null);
    
    // Flag para controlar sessão restaurada
    const [sessionRestored, setSessionRestored] = useState(false);

    const login = useCallback(async (username, password) => {
        setIsLoading(true);
        setError(null);
        setUnregisteredPublicKey(null);

        try {
            console.log('🔐 Iniciando processo de login...');
            const generatedKeypair = await getKeypairFromCredentials(username, password);
            const publicKeyStr = generatedKeypair.publicKey.toBase58();
            console.log('✅ Keypair gerado, publicKey:', publicKeyStr);
            
            const roleResponse = await checkRole(publicKeyStr);
            console.log('📋 Resposta da API:', roleResponse);

            if (!roleResponse || !roleResponse.role) {
                throw new Error('Resposta inválida da API - role não encontrado');
            }

            const { role } = roleResponse;

            if (role === USER_ROLES.NO_AUTH) {
                const authError = "Usuário não autorizado. Sua carteira não está registrada no sistema.";
                console.warn('❌ Usuário não autorizado:', publicKeyStr);
                setError(authError);
                setUnregisteredPublicKey(publicKeyStr);
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                setIsLoading(false);
                return false;
            }

            console.log('💾 Armazenando dados de autenticação...');
            setKeypair(generatedKeypair);
            setUserRole(role);
            
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ username, password }));
            
            console.log('🎉 Login realizado com sucesso! Role:', role);
            setIsLoading(false);
            return true;

        } catch (err) {
            console.error("💥 Falha na autenticação/autorização:", err);
            const errorMessage = err.message || "Credenciais inválidas ou falha de comunicação.";
            setError(errorMessage);
            setKeypair(null);
            setUserRole(null);
            setUnregisteredPublicKey(null);
            
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            setIsLoading(false);
            return false;
        }
    }, []);

    const logout = useCallback(() => {
        console.log('🚪 Realizando logout...');
        setKeypair(null);
        setUserRole(null);
        setError(null);
        setUnregisteredPublicKey(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        console.log('✅ Logout concluído');
    }, []);

    // CORREÇÃO: useEffect simplificado e sem loops
    useEffect(() => {
        const restoreSession = async () => {
            // Evitar execução múltipla
            if (sessionRestored) {
                setIsLoading(false);
                return;
            }

            console.log('🔄 Tentando restaurar sessão...');
            const savedCredentials = localStorage.getItem(LOCAL_STORAGE_KEY);

            if (!savedCredentials) {
                console.log('🔍 Nenhuma sessão anterior encontrada');
                setIsLoading(false);
                setSessionRestored(true);
                return;
            }

            try {
                console.log('📦 Credenciais encontradas no localStorage');
                const { username, password } = JSON.parse(savedCredentials);
                
                // Gerar keypair para validar as credenciais
                const generatedKeypair = await getKeypairFromCredentials(username, password);
                const publicKeyStr = generatedKeypair.publicKey.toBase58();
                
                // Verificar role atual
                const roleResponse = await checkRole(publicKeyStr);
                
                if (roleResponse.role !== USER_ROLES.NO_AUTH) {
                    setKeypair(generatedKeypair);
                    setUserRole(roleResponse.role);
                    console.log('✅ Sessão restaurada com sucesso:', roleResponse.role);
                } else {
                    console.warn('⚠️ Role não autorizado, forçando logout');
                    logout();
                }
            } catch (err) {
                console.error('❌ Erro ao restaurar sessão:', err);
                logout();
            } finally {
                setIsLoading(false);
                setSessionRestored(true);
            }
        };
        
        restoreSession();
    }, [sessionRestored, logout]);

    const value = useMemo(() => ({
        keypair,
        publicKey: keypair?.publicKey,
        userRole,
        isLoading,
        error,
        unregisteredPublicKey,
        isAuthenticated: !!keypair && !!userRole && userRole !== USER_ROLES.NO_AUTH,
        isBatchOwner: userRole === USER_ROLES.BATCH_OWNER,
        login,
        logout,
        USER_ROLES,
    }), [
        keypair, 
        userRole, 
        isLoading, 
        error, 
        unregisteredPublicKey, 
        login, 
        logout
    ]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};