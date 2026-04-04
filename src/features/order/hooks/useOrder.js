import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchOrdersApi,
  fetchOrderByIdApi,
  cancelOrderApi,
} from "../api/orderApi";

export const orderKeys = {
  all: ["orders"],
  one: (id) => ["orders", id],
};

// 🔹 list
export function useOrders() {
  return useQuery({
    queryKey: orderKeys.all,
    queryFn: fetchOrdersApi,
  });
}

// 🔹 single
export function useOrder(id) {
  return useQuery({
    queryKey: orderKeys.one(id),
    queryFn: () => fetchOrderByIdApi(id),
    enabled: !!id,
  });
}

// 🔹 cancel
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrderApi,

    onSuccess: (_, id) => {
      queryClient.setQueryData(orderKeys.all, (old) =>
        old?.map((order) =>
          order.id === id ? { ...order, status: "cancelled" } : order
        ) ?? []
      );
    },
  });
}