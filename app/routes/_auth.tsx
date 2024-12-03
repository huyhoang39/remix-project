import { Outlet } from "@remix-run/react";

export default function AuthPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4">
      <Outlet />
    </div>
  );
}
