import { db } from "@/lib/db/db";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "@/lib/utils/auth/password";

export const createPasswordResetToken = async (
  email: string,
): Promise<string> => {
  const user = await db
    .selectFrom("goals.users")
    .select(["id"])
    .where("email", "=", email)
    .executeTakeFirst();

  if (!user) {
    throw new Error("User not found");
  }

  const result = await db
    .insertInto("goals.password_reset")
    .values({
      id: uuidv4(),
      user_id: user.id,
      token: crypto.randomUUID(),
      expires_at: new Date(Date.now() + 3600 * 1000), // 1 hour expiration
    })
    .returning(["token"])
    .executeTakeFirst();

  if (!result) {
    throw new Error("Failed to create password reset token");
  }

  return result.token;
};

export const resetPassword = async (
  token: string,
  newPassword: string,
): Promise<void> => {
  const passwordReset = await db
    .selectFrom("goals.password_reset")
    .selectAll()
    .where("token", "=", token)
    .where("expires_at", ">", new Date())
    .executeTakeFirst();

  if (!passwordReset) {
    throw new Error("Invalid or expired password reset token");
  }

  const passwordHash = await hashPassword(newPassword);

  await db
    .updateTable("goals.users")
    .set({
      password: passwordHash,
      updated_at: new Date(),
    })
    .where("id", "=", passwordReset.user_id)
    .execute();

  await db
    .updateTable("goals.password_reset")
    .set({
      expires_at: new Date(), // Mark as used by setting expiration to now
    })
    .where("id", "=", passwordReset.id)
    .execute();
};
