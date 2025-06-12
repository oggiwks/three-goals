import { db } from "../db/db";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { v4 as uuidv4 } from "uuid";
import { sha256 } from "@oslojs/crypto/sha2";
import { jsonObjectFrom } from "kysely/helpers/postgres";
import { mapSessionToDto } from "@/lib/data/mappers/sessions";
import { mapUserToDto } from "@/lib/data/mappers/users";
import { SessionDto, UserSession } from "@/lib/data/dto/sessions";
import { cookies } from "next/headers";

export const createSession = async (
  userId: string,
  sessionToken: string,
): Promise<SessionDto> => {
  const encodedToken = encodeHexLowerCase(
    sha256(new TextEncoder().encode(sessionToken)),
  );

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days from now

  return db
    .insertInto("goals.sessions")
    .values({
      id: uuidv4(),
      user_id: userId,
      session_token: encodedToken,
      expires_at: expiresAt,
      created_at: new Date(),
    })
    .returning(["id", "user_id", "session_token", "expires_at", "created_at"])
    .executeTakeFirst()
    .then((result) => {
      if (!result) {
        throw new Error("Failed to create session");
      }
      return mapSessionToDto(result);
    });
};

export const validateSession = async (token: string): Promise<UserSession> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const sessionWithUser = await db
    .selectFrom("goals.sessions")
    .selectAll()
    .select((eb) =>
      jsonObjectFrom(
        eb
          .selectFrom("goals.users")
          .select([
            "id",
            "email",
            "first_name",
            "last_name",
            "created_at",
            "updated_at",
            "deleted_at",
          ])
          .whereRef("goals.sessions.user_id", "=", "goals.users.id"),
      ).as("user"),
    )
    .where("session_token", "=", sessionId)
    .executeTakeFirst();

  if (!sessionWithUser || !sessionWithUser.user) {
    return {
      session: null,
      user: null,
    };
  }

  const { user, ...session } = sessionWithUser;

  if (session.expires_at < new Date()) {
    await db
      .deleteFrom("goals.sessions")
      .where("session_token", "=", sessionId)
      .execute();
    return {
      session: null,
      user: null,
    };
  }

  if (session.expires_at >= new Date(Date.now() + 1000 * 60 * 60 * 15)) {
    await db
      .updateTable("goals.sessions")
      .set({
        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      })
      .where("session_token", "=", sessionId)
      .execute();
  }

  return {
    session: mapSessionToDto(session),
    user: mapUserToDto(user),
  };
};

export const deleteSession = async (token: string): Promise<void> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  await db
    .deleteFrom("goals.sessions")
    .where("session_token", "=", sessionId)
    .execute();
};

export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
};

export const setSessionTokenCookie = async (
  token: string,
  expiresAt?: Date,
): Promise<void> => {
  const nextCookies = await cookies();
  nextCookies.set("session", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  });
};

export const getSessionFromCookie = async (): Promise<UserSession> => {
  const nextCookies = await cookies();
  const sessionToken = nextCookies.get("session");
  return sessionToken
    ? validateSession(sessionToken.value)
    : {
        session: null,
        user: null,
      };
};
