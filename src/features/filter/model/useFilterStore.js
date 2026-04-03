import { create } from "zustand";

export const useFilterStore = create((set) => ({
  category: null,
  priceRange: [0, 1000],

  setCategory: (category) => set({ category }),
  setPriceRange: (range) => set({ priceRange: range }),
  clearFilters: () => set({ category: null, priceRange: [0, 1000] }),
}));