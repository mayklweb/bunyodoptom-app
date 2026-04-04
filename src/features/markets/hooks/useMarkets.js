import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createMarketApi, deleteMarketApi, fetchMarketsApi, updateMarketApi } from "../api/marketApi";

export const marketKeys = {
  all: ["markets"],
  one: (id) => ["markets", id],
};

export function useMarkets() {
  return useQuery({
    queryKey: marketKeys.all,
    queryFn: fetchMarketsApi,
  });
}

export function useAddMarket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMarketApi,
    onSuccess: (newMarket) => {
      queryClient.setQueryData(marketKeys.all, (old = []) => [
        ...old,
        newMarket,
      ]);
    },
  });
}

export function useEditMarket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) =>
      updateMarketApi(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(marketKeys.all, (old = []) =>
        old.map((m) => (m.id === updated.id ? updated : m)),
      );
    },
  });
}

export function useDeleteMarket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteMarketApi(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: marketKeys.all });
      const previous = queryClient.getQueryData(marketKeys.all);
      queryClient.setQueryData(marketKeys.all, (old = []) =>
        old.filter((m) => m.id !== id),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous)
        queryClient.setQueryData(marketKeys.all, context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: marketKeys.all });
    },
  });
}

// export function useSetDefaultAddress() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id) => addressApi.setDefault(id),
//     onMutate: async (id) => {
//       await queryClient.cancelQueries({ queryKey: addressKeys.all });
//       const previous = queryClient.getQueryData(addressKeys.all);
//       queryClient.setQueryData(addressKeys.all, (old = []) =>
//         old.map((a) => ({ ...a, is_default: a.id === id })),
//       );
//       return { previous };
//     },
//     onError: (_err, _vars, context) => {
//       if (context?.previous)
//         queryClient.setQueryData(addressKeys.all, context.previous);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: addressKeys.all });
//     },
//   });
// }
