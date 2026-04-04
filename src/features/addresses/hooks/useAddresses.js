import { createAddressApi, deleteAddressApi, fetchAddressesApi, updateAddressApi } from "../api/addressApi";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const addressKeys = {
  all: ["addresses"],
  one: (id) => ["addresses", id],
};

export function useAddresses() {
  return useQuery({
    queryKey: addressKeys.all,
    queryFn: fetchAddressesApi,
  });
}

export function useAddAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAddressApi,
    onSuccess: (newAddress) => {
      queryClient.setQueryData(addressKeys.all, (old = []) => [
        ...old,
        newAddress,
      ]);
    },
  });
}

export function useEditAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) =>
      updateAddressApi(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(addressKeys.all, (old = []) =>
        old.map((a) => (a.id === updated.id ? updated : a)),
      );
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteAddressApi(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: addressKeys.all });
      const previous = queryClient.getQueryData(addressKeys.all);
      queryClient.setQueryData(addressKeys.all, (old = []) =>
        old.filter((a) => a.id !== id),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous)
        queryClient.setQueryData(addressKeys.all, context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.all });
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
