// src/api/authService.js
import { apiClient } from './apiClient';

/**
 * Serviço para autenticação e autorização
 */
export const authService = {
  /**
   * Verifica o role do usuário baseado na publicKey
   * @param {string} publicKey - Chave pública do usuário
   * @returns {Promise<{role: string}>} Objeto com o role do usuário
   */
  async checkRole(publicKey) {
    try {
      console.log('🔐 Enviando verificação de role para:', publicKey);
      
      const response = await apiClient.post('/api/auth/check-role', { 
        publicKey 
      });

      console.log('✅ Resposta da verificação de role:', response);
      
      if (!response || !response.role) {
        throw new Error('Resposta inválida da API - role não encontrado');
      }

      return response;
    } catch (error) {
      console.error('❌ Erro ao verificar role:', error);
      
      // Melhor tratamento de erro
      if (error.message.includes('Erro 4') || error.message.includes('Erro 5')) {
        throw new Error('Servidor indisponível. Tente novamente mais tarde.');
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error('Falha de conexão. Verifique sua internet.');
      } else {
        throw error; // Propaga o erro original
      }
    }
  },

  /**
   * Registra um novo parceiro no sistema
   * @param {Object} partnerData - Dados do parceiro
   * @returns {Promise} Resultado do registro
   */
  async registerPartner(partnerData) {
    try {
      const response = await apiClient.post('/api/auth/register-partner', partnerData);
      return response;
    } catch (error) {
      console.error('Erro ao registrar parceiro:', error);
      throw error;
    }
  },

  /**
   * Verifica se o usuário atual tem permissão para uma ação específica
   * @param {string} action - Ação a ser verificada
   * @param {string} publicKey - Chave pública do usuário
   * @returns {Promise<boolean>} True se tem permissão
   */
  async checkPermission(action, publicKey) {
    try {
      const response = await apiClient.post('/api/auth/check-permission', {
        action,
        publicKey
      });
      return response.hasPermission;
    } catch (error) {
      console.error('Erro ao verificar permissão:', error);
      return false;
    }
  }
};

// Exportação direta para compatibilidade com código existente
export const checkRole = authService.checkRole;