"use server";

import { revalidatePath } from "next/cache";
import { LoginUserDto } from "@/lib/data/dto/users";
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from "@/lib/services/sessions";
import { getPasswordHashForUser, getUserByEmail } from "@/lib/services/users";
import { verifyPasswordHash } from "@/lib/utils/auth/password";

type LoginUserResponse = {
  success: boolean;
  error?: string;
};

const INVALID_MESSAGE = "Those credentials do not match our records.";

export const loginUserAction = async (
  data: LoginUserDto,
): Promise<LoginUserResponse> => {
  try {
    const user = await getUserByEmail(data.email);
    if (!user) {
      return {
        success: false,
        error: INVALID_MESSAGE,
      };
    }

    const passwordHash = await getPasswordHashForUser(user.id);
    if (!passwordHash) {
      return {
        success: false,
        error: INVALID_MESSAGE,
      };
    }

    const isPasswordValid = await verifyPasswordHash(
      passwordHash,
      data.password,
    );
    if (!isPasswordValid) {
      return {
        success: false,
        error: INVALID_MESSAGE,
      };
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(user.id, sessionToken);

    await setSessionTokenCookie(sessionToken, session.expiresAt);

    return {
      success: true,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      error: "An error occurred whilst logging in",
    };
  } finally {
    revalidatePath("/auth/sign-up");
  }
};
