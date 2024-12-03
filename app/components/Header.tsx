import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="h-16 px-6 flex justify-between shadow-lg items-center">
      <div>
        <Link to={"/"}>Home</Link>
      </div>
      <div>
        <Link to={"/login"}>Login</Link>
      </div>
    </header>
  );
}
