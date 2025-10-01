import { API_BASE_URL } from '../lib/constants';

// Função auxiliar para obter um token de autenticação, se houver.
// No futuro, você pode implementar um sistema de JWT aqui.
const getAuthToken = () => {
    return localStorage.getItem('authToken');
}

// Função auxiliar para tratar as respostas da API de forma padronizada.
const handleResponse = async (response) => {
    // First, check if the response is OK (status 200-299)
    if (response.ok) {
      if (response.status === 204) return; // No Content
      return response.json();
    } else {
      // If it's not OK, try to parse the error message from the response body
      const errorText = await response.text();
      let errorMessage;
      try {
        // Try to parse it as JSON in case the server sent a structured error
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorData.message || errorText;
      } catch (e) {
        // If it's not JSON, use the raw text
        errorMessage = errorText || `Erro ${response.status}: ${response.statusText}`;
      }
      // Log the detailed error for debugging
      console.error("API Error Detail:", errorMessage);
      // Now throw an error with the detailed message
      throw new Error(errorMessage);
    }
  };

// =============================================
// ==           FUNÇÕES DE PARCEIROS          ==
// =============================================
/**
 * Remove um participante de um lote existente.
 * @param {string} batchId - O ID (ou endereço) do lote.
 *- O ID do parceiro a ser removido.
 * @param {string} brandOwnerKey - A chave do Dono da Marca para autorização.
 */
 export const removeParticipantFromBatch = async (batchId, partnerId, brandOwnerKey) => {
    const response = await fetch(`${API_BASE_URL}/api/batches/${batchId}/participants/${partnerId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
        },
        // O corpo da requisição é usado para enviar a chave de autorização
        body: JSON.stringify({ brandOwnerKey }),
    });
    return handleResponse(response);
};
/**
 * Cria um novo parceiro no banco de dados.
 * @param {object} partnerData - { publicKey, name, role, contactEmail }
 * @param {string} brandOwnerKey - A chave do Dono da Marca que está criando o parceiro.
 */
/**
 * Cria um novo parceiro no banco de dados.
 * @param {object} partnerData - Objeto completo com os dados do parceiro, incluindo brandOwnerKey.
 */
export const createPartner = async (partnerData) => {
    const response = await fetch(`${API_BASE_URL}/api/partners`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
        },
        // CORREÇÃO: Envia o objeto partnerData diretamente, pois ele já está completo.
        body: JSON.stringify(partnerData), 
    });
    return handleResponse(response);
};

/**
 * Busca a lista de parceiros de um Dono de Marca específico.
 * @param {string} brandOwnerKey - A chave do Dono da Marca.
 */
export const getMyPartners = async (brandOwnerKey) => {
    if (!brandOwnerKey) return [];
    const response = await fetch(`${API_BASE_URL}/api/partners?owner=${brandOwnerKey}`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
};


// =============================================
// ==             FUNÇÕES DE LOTES            ==
// =============================================

/**
 * Cria um novo lote de café. O ID final será gerado pelo backend.
 * @param {object} batchData - { producerName, brandOwnerKey, initialHolderKey, participants }
 */
export const createBatch = async (batchData) => {
    // O 'id' não é mais enviado no corpo da requisição.
    const response = await fetch(`${API_BASE_URL}/api/batches`, {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchData),
    });
    return handleResponse(response);
};

/**
 * Busca a lista de lotes relevantes para um usuário (Dono da Marca ou responsável atual).
 * @param {string} userKey - A chave pública do usuário logado.
 */
export const getMyBatches = async (userKey) => {
    if (!userKey) return [];
    const response = await fetch(`${API_BASE_URL}/api/batches?user=${userKey}`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
};

/**
 * Busca os detalhes completos de um lote específico (dados do DB + etapas on-chain).
 * @param {string} batchId - A PublicKey do lote.
 */
export const getBatchById = async (batchId) => {
    const response = await fetch(`${API_BASE_URL}/api/batches/${batchId}`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
};

/**
 * Adiciona uma nova etapa a um lote existente.
 * @param {string} batchId - A PublicKey do lote.
 * @param {FormData} formData - Os dados da nova etapa (incluindo possíveis arquivos).
 * @param {string} userKey - A chave do usuário que está adicionando a etapa.
 */
export const addStageToBatch = async (batchId, formData) => { // <-- Remova o parâmetro 'userKey'
   
    const response = await fetch(`${API_BASE_URL}/api/batches/${batchId}/stages`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getAuthToken()}` },
        body: formData,
    });
    return handleResponse(response);
};
/**
 * Adiciona uma lista de novos participantes a um lote existente.
 * @param {string} batchId - O ID (ou endereço) do lote.
 * @param {object} data - { participantIds: ['id1', 'id2', ...] }
 */
export const addParticipantsToBatch = async (batchId, data) => {
    const response = await fetch(`${API_BASE_URL}/api/batches/${batchId}/participants`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  };
/**
 * Transfere a posse de um lote para um novo parceiro.
 * @param {string} batchId - A PublicKey do lote.
 * @param {object} transferData - { currentHolderKey, newHolderPartnerId }
 */
export const transferCustody = async (batchId, transferData) => {
    const response = await fetch(`${API_BASE_URL}/api/batches/${batchId}/transfer`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transferData),
    });
    return handleResponse(response);
};

/**
 * Finaliza um lote, selando seu histórico.
 * @param {string} batchId - A PublicKey do lote.
 * @param {object} ownerData - { brandOwnerKey }
 */
export const finalizeBatch = async (batchId, ownerData) => {
    const response = await fetch(`${API_BASE_URL}/api/batches/${batchId}/finalize`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ownerData),
    });
    return handleResponse(response);
};

/**
 * Busca a lista de lotes que estão na "estação de trabalho" do usuário logado.
 * @param {string} userKey - A chave pública do usuário logado.
 */
export const getMyWorkstation = async (userKey) => {
    if (!userKey) return [];
    const response = await fetch(`${API_BASE_URL}/api/batches/workstation?user=${userKey}`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
};

/**
 * Busca o histórico de todas as etapas registradas por um usuário específico.
 * @param {string} userKey - A chave pública do usuário logado.
 */
export const getMyHistory = async (userKey) => {
    if (!userKey) return [];
    const response = await fetch(`${API_BASE_URL}/api/stages/history?user=${userKey}`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
};