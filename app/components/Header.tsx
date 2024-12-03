import { Form, Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="h-16 px-6 flex justify-between shadow-lg items-center">
      <div>
        <Link to={"/"}>Home</Link>
      </div>
      <Form method="post">
        <button type="submit" className="button-link">
          Logout
        </button>
      </Form>
    </header>
  );
}
