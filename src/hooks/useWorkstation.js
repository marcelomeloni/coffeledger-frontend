import useSWR from 'swr';
import { getMyWorkstation } from '../api/batchService';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook para buscar os lotes que estão na estação de trabalho do utilizador atual.
 * A "estação de trabalho" consiste nos lotes em que o utilizador é o 'current_holder'.
 */
export function useWorkstation() {
  const { publicKey } = useAuth();
  const userKey = publicKey?.toBase58();

  // A chave de cache é única para este utilizador e este endpoint.
  // Se não houver 'userKey', a chave é nula e o SWR não fará a requisição.
  const cacheKey = userKey ? `/api/batches/workstation?user=${userKey}` : null;
  
  const { data, error, isLoading, mutate } = useSWR(
    cacheKey, 
    () => getMyWorkstation(userKey) // A função que realmente busca os dados
  );

  return {
    batches: data, // Renomeamos 'data' para 'batches' para maior clareza no componente
    isLoading,
    error,
    mutate, // 'mutate' pode ser usado para revalidar os dados manualmente (ex: após uma ação)
  };
}
