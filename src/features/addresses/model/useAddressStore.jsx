import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAddressStore = create()(
  persist(
    (set, get) => ({
      selectedId: null,
      selectedAddress: null,

      setSelected: (address) =>
        set({ selectedId: address.id, selectedAddress: address }),

      clearSelected: () => set({ selectedId: null, selectedAddress: null }),

      initFromAddresses: (addresses) => {
        const { selectedId } = get();

        // if persisted id still exists in the list, keep it
        if (selectedId && addresses.find((a) => a.id === selectedId)) return;

        // otherwise auto-select the first address
        if (addresses[0]) {
          set({ selectedId: addresses[0].id, selectedAddress: addresses[0] });
        }
      },
    }),
    {
      name: "address-store", // localStorage key
      partialize: (state) => ({
        selectedId: state.selectedId,
        selectedAddress: state.selectedAddress,
      }),
    },
  ),
);
