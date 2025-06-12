"use server";

import { revalidatePath } from "next/cache";
import { deleteAllGoals } from "@/lib/services/goals";

export const clearData = async (userId: string): Promise<void> => {
  await deleteAllGoals(userId);
  revalidatePath("/goals");
};
