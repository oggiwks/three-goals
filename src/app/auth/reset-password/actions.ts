"use server";

import { createPasswordResetToken } from "@/lib/services/password-reset";
import { redirect } from "next/navigation";

export const createPasswordResetAction = async (
  email: string,
): Promise<void> => {
  const token = await createPasswordResetToken(email);
  redirect(`/auth/reset-password/${token}`);
};
