import { create } from "zustand";

export const useUIStore = create((set) => ({
  isModalOpen: false,
  isLoading: false,
  toast: null, // { type: "success" | "error", message: string }

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  setLoading: (value) => set({ isLoading: value }),

  showToast: (toast) => set({ toast }),
  clearToast: () => set({ toast: null }),
}));