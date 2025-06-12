"use server";

import { resetPassword } from "@/lib/services/password-reset";

export const resetPasswordAction = async (
  token: string,
  newPassword: string,
): Promise<void> => {
  await resetPassword(token, newPassword);
};
