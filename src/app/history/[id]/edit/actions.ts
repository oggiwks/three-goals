"use server";

import { updateGoals } from "@/lib/services/goals";
import { revalidatePath } from "next/cache";
import { UpdateGoals } from "@/lib/data/dto/goals";

export const updateGoalsAction = async (
  goalSetId: string,
  userId: string,
  goals: UpdateGoals,
): Promise<void> => {
  await updateGoals(goalSetId, userId, goals);

  revalidatePath("/history/*");
};
