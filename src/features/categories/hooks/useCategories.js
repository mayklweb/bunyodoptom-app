import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesApi } from "../api/categoryApi";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],   // ✅ key
    queryFn: async () => {
      const { data } = await fetchCategoriesApi();
      return data.data; // agar backend { data: [...] } qaytarsa
    },
  });
};