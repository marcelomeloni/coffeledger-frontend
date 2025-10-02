/**
 * Transforma uma string com underscores em uma string capitalizada com espaços.
 * Exemplo: 'grain_pro' se torna 'Grain Pro'
 * @param {string} str - A string de entrada.
 * @returns {string} A string formatada.
 */
export const formatLabel = (str) => {
    if (!str || typeof str !== 'string') return '';
    
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  /**
   * Capitaliza apenas a primeira letra de uma string.
   * Exemplo: 'mechanical' se torna 'Mechanical'
   * @param {string} str - A string de entrada.
   * @returns {string} A string formatada.
   */
  export const capitalizeFirstLetter = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Formata uma data para o padrão local (ex: 10/01/2025).
   * @param {string | Date} dateString - A data a ser formatada.
   * @returns {string} A data formatada ou uma string vazia.
   */
  export const formatDate = (dateString) => {
      if (!dateString) return '';
      try {
          return new Date(dateString).toLocaleDateString('en-US', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric' 
          });
      } catch (error) {
          console.error("Invalid date for formatting:", dateString);
          return '';
      }
  };
  
  // Você pode adicionar outras funções úteis aqui no futuro.