import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create()(
  persist(
    (set, get) => ({
      favorites: [],

      // ➕ Add
      addFavorite: (product) => {
        if (!product || !product.id) return;

        const exists = get().favorites.some((p) => p?.id === product.id);
        if (exists) return; // duplicate oldini oladi

        set((state) => ({
          favorites: [...state.favorites, product],
        }));
      },

      // ❌ Remove
      removeFavorite: (id) => {
        if (!id) return;

        set((state) => ({
          favorites: state.favorites.filter((p) => p?.id !== id),
        }));
      },

      // 🔄 Toggle
      toggleFavorite: (product) => {
        if (!product || !product.id) return;

        const exists = get().favorites.some((p) => p?.id === product.id);

        if (exists) {
          get().removeFavorite(product.id);
        } else {
          get().addFavorite(product);
        }
      },

      // ❤️ Check
      isFavorite: (id) => {
        if (!id) return false;
        return get().favorites.some((p) => p?.id === id);
      },

      // 🧹 Clear
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",

      // 🔥 localStorage’dan kelgan eski null/bug data’ni tozalaydi
      onRehydrateStorage: () => (state) => {
        if (state?.favorites) {
          state.favorites = state.favorites.filter(
            (p) => p && typeof p === "object" && p.id
          );
        }
      },
    }
  )
);