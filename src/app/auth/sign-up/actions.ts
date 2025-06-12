"use server";

import { CreateUserDto } from "@/lib/data/dto/users";
import { createUser } from "@/lib/services/users";
import { revalidatePath } from "next/cache";

type CreateUserResponse = {
  success: boolean;
  error?: string;
};

export const createUserAction = async (
  data: CreateUserDto,
): Promise<CreateUserResponse> => {
  try {
    await createUser(data);
    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      error: "An error occurred whilst creating the user",
    };
  } finally {
    revalidatePath("/auth/sign-up");
  }
};
