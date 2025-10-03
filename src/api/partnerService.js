// src/api/partnerService.js

import { API_BASE_URL } from '../lib/constants';

const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

const handleResponse = async (response) => {
    if (response.ok) {
        if (response.status === 204) return;
        return response.json();
    } else {
        const errorText = await response.text();
        let errorMessage;
        try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.error || errorData.message || errorText;
        } catch (e) {
            errorMessage = errorText || `Erro ${response.status}: ${response.statusText}`;
        }
        console.error("API Error Detail:", errorMessage);
        throw new Error(errorMessage);
    }
};

/**
 * Busca o perfil de um parceiro pelo seu ID (ou chave pública).
 * @param {string} partnerId - O ID do parceiro (uuid).
 */
export const getPartnerProfile = async (partnerId) => {
  const response = await fetch(`${API_BASE_URL}/api/partners/${partnerId}`, {
    headers: { 'Authorization': `Bearer ${getAuthToken()}` }
  });
  return handleResponse(response);
};

/**
 * Atualiza os dados de 'metadata' de um parceiro existente.
 * @param {string} partnerId - O ID do parceiro (uuid).
 * @param {object} metadata - O objeto JSON a ser salvo na coluna 'metadata'.
 */
export const updatePartnerMetadata = async (partnerId, metadata) => {
  const response = await fetch(`${API_BASE_URL}/api/partners/${partnerId}/metadata`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ metadata }),
  });
  return handleResponse(response);
};

// ... Mantenha as funções existentes como createPartner e getMyPartners aqui