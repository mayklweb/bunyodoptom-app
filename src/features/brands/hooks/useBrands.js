import { useQuery } from "@tanstack/react-query";
import { fetchBrandsApi } from "../api/brandApi";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await fetchBrandsApi();
      return data.data; // agar backend { data: [...] } qaytarsa
    },
  });
};