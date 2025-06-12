import { CreateUserDto, UserDto } from "@/lib/data/dto/users";
import { hashPassword } from "../utils/auth/password";
import { db } from "@/lib/db/db";
import { mapUserToDto } from "@/lib/data/mappers/users";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (data: CreateUserDto): Promise<void> => {
  if (data.password !== data.passwordConfirmation) {
    throw new Error("Passwords do not match");
  }

  const passwordHash = await hashPassword(data.password);

  await db
    .insertInto("goals.users")
    .values({
      id: uuidv4(),
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: passwordHash,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .execute();
};

export const getUserByEmail = async (
  email: string,
): Promise<UserDto | null> => {
  const user = await db
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
    .where("email", "=", email)
    .executeTakeFirst();

  if (!user) {
    return null;
  }

  return mapUserToDto(user);
};

export const getPasswordHashForUser = async (
  userId: string,
): Promise<string | null> => {
  const user = await db
    .selectFrom("goals.users")
    .select(["password"])
    .where("id", "=", userId)
    .executeTakeFirst();

  if (!user) {
    return null;
  }

  return user.password;
};
