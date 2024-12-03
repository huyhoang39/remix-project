import { createCookieSessionStorage } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { adminAuth, getSessionToken, signOutFirebase } from "./db.server";

const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: true,
    secrets: ["s3cret1"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  },
});

async function createUserSession(idToken: string, redirectTo: string) {
  const token = await getSessionToken(idToken);
  const session = await storage.getSession();
  session.set("token", token);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

async function getUserSession(request: Request) {
  const cookieSession = await storage.getSession(request.headers.get("Cookie"));
  const token = cookieSession.get("token");
  if (!token) return null;

  try {
    const tokenUser = await adminAuth.verifySessionCookie(token, true);
    return tokenUser;
  } catch (error) {
    return null;
  }
}

async function destroySession(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const newCookie = await storage.destroySession(session);

  return redirect("/login", { headers: { "Set-Cookie": newCookie } });
}

async function signOut(request: Request) {
  await signOutFirebase();
  return await destroySession(request);
}

export { createUserSession, signOut, getUserSession };
