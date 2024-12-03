import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";

export default function Index() {
  return (
    <>
      <Header />
      <main className="container mt-8 mx-auto">
        <Outlet />
      </main>
    </>
  );
}
