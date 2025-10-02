// src/api/apiClient.js
import { API_BASE_URL } from '../lib/constants';

// Cliente HTTP básico com tratamento de erros
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
            message: 'Erro de comunicação com o servidor' 
        }));
        throw new Error(errorData.message || `Erro ${response.status}`);
    }
    return response.json();
};

// Cliente API configurável
export const apiClient = {
    async get(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        return handleResponse(response);
    },

    async post(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async put(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async delete(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
        });
        return handleResponse(response);
    }
};