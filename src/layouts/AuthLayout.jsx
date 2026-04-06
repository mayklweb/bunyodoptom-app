import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="min-h-svh flex items-center justify-center">
      <Outlet />
    </main>
  );
}