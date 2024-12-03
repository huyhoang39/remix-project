import { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "~/components/Header";
import { db } from "~/lib/db.server";
import { signOut } from "~/lib/session.server";

export type Food = {
  id: string;
  name: string;
  price: number;
};

export const loader = async () => {
  const querySnapshot = await db.collection("food").get();

  const food: Food[] = [];
  querySnapshot.forEach((doc) => {
    food.push({ ...(doc.data() as { name: string; price: number }), id: doc.id });
  });

  return food;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return signOut(request);
};

export default function Index() {
  const food = useLoaderData<typeof loader>();

  return (
    <>
      <Header />
      <main className="container mt-8 mx-auto">
        <h1 className="text-3xl capitalize">Menu</h1>
        <ul className="space-y-2 mt-8 list-disc">
          {food.map((itm) => (
            <li key={itm.id}>
              <span className="font-bold">{itm.name}</span>: {itm.price}₫
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
