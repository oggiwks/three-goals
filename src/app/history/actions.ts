"use server";

import { revalidatePath } from "next/cache";
import { deleteGoals } from "@/lib/services/goals";

export const deleteGoalsAction = async (
  goalSetId: string,
  userId: string,
): Promise<void> => {
  await deleteGoals(goalSetId, userId);

  revalidatePath("/history");
};
