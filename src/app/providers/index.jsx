// app/providers/index.jsx
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Agar theme, locale yoki boshqa global config bo‘lsa, Context qo‘shish mumkin
// import { ThemeProvider } from "./ThemeProvider";

const queryClient = new QueryClient();

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider> */}
      {children}
      {/* </ThemeProvider> */}
    </QueryClientProvider>
  );
}