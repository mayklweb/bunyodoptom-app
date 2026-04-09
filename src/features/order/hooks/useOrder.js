import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/orderApi";


export const orderKeys = {
  all: ["orders"],
  one: (id) => ["orders", id],
};

// 🔹 list
export function useOrders() {
  return useQuery({
    queryKey: orderKeys.all,
    queryFn: ordersApi.fetchAll,
  });
}

// 🔹 single
export function useOrder(id) {
  return useQuery({
    queryKey: orderKeys.one(id),
    queryFn: () => ordersApi.fetchById(id),
    enabled: !!id,
  });
}

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => ordersApi.checkout(data),

    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};

// 🔹 cancel
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => ordersApi.cancel(id),

    onSuccess: (_, id) => {
      queryClient.setQueryData(orderKeys.all, (old) =>
        old?.map((order) =>
          order.id === id ? { ...order, status: "cancelled" } : order
        ) ?? []
      );
    },
  });
}