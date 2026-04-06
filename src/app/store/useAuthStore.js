// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   token: localStorage.getItem("token") || null,
//   isAuthenticated: !!localStorage.getItem("token"),

//   login: (token) =>
//     set({ token, isAuthenticated: true }, () =>
//       localStorage.setItem("token", token)
//     ),

//   logout: () =>
//     set({ token: null, isAuthenticated: false }, () =>
//       localStorage.removeItem("token")
//     ),
// }));

// src/features/auth/model/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),

      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);