import { useRef, useEffect, useState } from "react";

function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function useShuffledProducts(data, limit) {
  const [shuffled, setShuffled] = useState([]);
  const prevDataRef = useRef(null);

  useEffect(() => {
    // faqat data haqiqatan o‘zgarganda
    if (data && data !== prevDataRef.current) {
      const result = shuffleArray(data);
      setShuffled(limit ? result.slice(0, limit) : result);
      prevDataRef.current = data;
    }
  }, [data, limit]);

  return shuffled;
}