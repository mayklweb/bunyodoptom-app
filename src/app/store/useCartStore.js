import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useCartStore = create()(
  persist(
    (set, get) => ({
      cart: [],
      selectedIds: [],

      getQuantity: (id) => {
        const item = get().cart.find((p) => p.id === id);
        return item ? item.count : 0;
      },

      addToCart: (item) => {
        const existing = get().cart.find((p) => p.id === item.id);
        if (existing) {
          if (existing.count < item.stock_qty) {
            set((state) => ({
              cart: state.cart.map((p) =>
                p.id === item.id ? { ...p, count: p.count + 1 } : p,
              ),
            }));
          }
        } else {
          set((state) => ({
            cart: [
              ...state.cart,
              { ...item, count: 1, price: Number(item.price) },
            ],
            selectedIds: [...state.selectedIds, item.id], // 👈 auto select
          }));
        }
      },

      inc: (id) => {
        const item = get().cart.find((p) => p.id === id);
        if (item && item.count < item.stock_qty) {
          set((state) => ({
            cart: state.cart.map((p) =>
              p.id === id ? { ...p, count: p.count + 1 } : p,
            ),
          }));
        }
      },

      dec: (id) => {
        set((state) => ({
          cart: state.cart.map((p) =>
            p.id === id && p.count > 1 ? { ...p, count: p.count - 1 } : p,
          ),
        }));
      },

      remove: (id) => {
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== id),
          selectedIds: state.selectedIds.filter((i) => i !== id), // clean selection too
        }));
      },

      clearCart: () => set({ cart: [], selectedIds: [] }),

      changeQty: (id, delta) => {
        if (delta > 0) get().inc(id);
        else get().dec(id);
      },

      // ─── Selection ───────────────────────────────────────────

      allSelected: () => {
        const { cart, selectedIds } = get();
        return cart.length > 0 && cart.every((i) => selectedIds.includes(i.id));
      },

      toggleAll: () => {
        const { cart, allSelected } = get();
        set({ selectedIds: allSelected() ? [] : cart.map((i) => i.id) });
      },

      toggleItem: (id) => {
        set((state) => ({
          selectedIds: state.selectedIds.includes(id)
            ? state.selectedIds.filter((i) => i !== id)
            : [...state.selectedIds, id],
        }));
      },

      selectedItems: () => {
        const { cart, selectedIds } = get();
        return cart.filter((i) => selectedIds.includes(i.id));
      },

      total: () =>
        get()
          .selectedItems()
          .reduce((sum, i) => sum + Number(i.price) * i.qty, 0),

      totalCount: () =>
        get()
          .selectedItems()
          .reduce((sum, i) => sum + i.count, 0),
    }),
    {
      name: "cart",
    },
  ),
);
