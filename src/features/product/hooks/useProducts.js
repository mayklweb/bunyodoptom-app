import { useQuery } from "@tanstack/react-query";
import { fetchProductsApi, fetchProductByIdApi } from "../api/productApi";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await fetchProductsApi();
      return data.data; // agar backend { data: [...] } qaytarsa
    },
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductByIdApi(id),
    enabled: !!id, // id bo‘lmasa fetch qilmaydi
  });
};