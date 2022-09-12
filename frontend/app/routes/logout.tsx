import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { verifyAuthenticityToken } from "remix-utils";

import { getSession, logout } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request);
  await verifyAuthenticityToken(request, session);
  
  return logout(request);
};

export const loader: LoaderFunction = async () => {
  return redirect("/");
};
