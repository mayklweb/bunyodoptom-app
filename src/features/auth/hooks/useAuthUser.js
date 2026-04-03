import { useQuery } from "@tanstack/react-query";
import { fetchProfileApi } from "../api/authApi";
import { useAuthStore } from "../model/useAuthStore";

export const useAuthUser = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["user"],
    queryFn: fetchProfileApi,
    enabled: !!token, // token bo‘lsa fetch qiladi
  });
};