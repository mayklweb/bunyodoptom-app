import { create } from "zustand";

export const useUIStore = create((set) => ({
  isModalOpen: false,
  isLoading: false,
  toast: null, // { type: "success" | "error", message: string }
  selectedProduct: null,


  openModal: (product) => set({ selectedProduct: product }),
  closeModal: () => set({ selectedProduct: null }),

  setLoading: (value) => set({ isLoading: value }),

  showToast: (toast) => set({ toast }),
  clearToast: () => set({ toast: null }),

}));