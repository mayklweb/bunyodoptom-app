// features/product/hooks/useShuffledProducts.ts
import { useMemo } from "react";

function shuffleArray(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function useShuffledProducts(
  data,
  limit
) {
  return useMemo(() => {
    if (!data || data.length === 0) return [];

    const shuffled = shuffleArray(data);
    return limit ? shuffled.slice(0, limit) : shuffled;
  }, [data, limit]);
}