import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (product) =>
        set((state) => {
          const exists = state.favorites.some((p) => p.id === product.id);
          if (exists) return state;

          return {
            favorites: [...state.favorites, product],
          };
        }),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== id),
        })),

      toggleFavorite: (product) =>
        set((state) => {
          const exists = state.favorites.some((p) => p.id === product.id);

          return {
            favorites: exists
              ? state.favorites.filter((p) => p.id !== product.id)
              : [...state.favorites, product],
          };
        }),

      isFavorite: (id) => get().favorites.some((p) => p.id === id),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);