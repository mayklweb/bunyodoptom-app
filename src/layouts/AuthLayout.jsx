import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="w-full h-full">
      <Outlet />
    </main>
  );
}
