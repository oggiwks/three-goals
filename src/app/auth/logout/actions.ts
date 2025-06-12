"use server";

import { redirect } from "next/navigation";
import { deleteSession, setSessionTokenCookie } from "@/lib/services/sessions";

export const userLogoutAction = async (sessionToken: string): Promise<void> => {
  await setSessionTokenCookie(sessionToken, new Date());
  await deleteSession(sessionToken);

  redirect("/auth/login");
};
