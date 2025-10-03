// src/hooks/usePartnerData.js

import useSWR from 'swr';
import { getPartnerProfile } from '../api/partnerService'; // 🆕 Nova função de API

export function usePartnerData(partnerId) {
  const cacheKey = partnerId ? `/api/partners/${partnerId}` : null;
  
  const { data, error, isLoading, mutate } = useSWR(
    cacheKey, 
    () => getPartnerProfile(partnerId)
  );

  // O 'metadata' estará dentro do objeto 'data'
  return {
    partnerData: data,
    metadata: data?.metadata,
    isLoading,
    error,
    mutate,
  };
}