import { API_BASE_URL } from '../lib/constants'; // Supondo que você tenha isso

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro de comunicação' }));
        throw new Error(errorData.message || `Erro ${response.status}`);
    }
    return response.json();
};

/**
 * Envia uma chave pública para o backend para verificar o papel do usuário.
 * @param {string} publicKey - A chave pública (Base58) do usuário.
 * @returns {Promise<{role: string}>} O papel do usuário (ex: 'batchOwner').
 */
export const checkRole = async (publicKey) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/check-role`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicKey }),
    });
    return handleResponse(response);
};