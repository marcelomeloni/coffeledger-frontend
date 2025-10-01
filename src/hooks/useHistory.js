import useSWR from 'swr';
import { getMyHistory } from '../api/batchService';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook para buscar o histórico de todas as etapas que o utilizador atual registou.
 */
export function useHistory() {
  const { publicKey } = useAuth();
  const userKey = publicKey?.toBase58();

  // A chave de cache para o histórico do utilizador.
  const cacheKey = userKey ? `/api/stages/history?user=${userKey}` : null;
  
  const { data, error, isLoading, mutate } = useSWR(
    cacheKey, 
    () => getMyHistory(userKey)
  );

  return {
    history: data, // Renomeamos 'data' para 'history'
    isLoading,
    error,
    mutate,
  };
}
