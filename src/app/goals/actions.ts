"use server";

import { NewGoals } from "@/lib/data/dto/goals";
import {
  createGoals,
  finalizeGoalSet,
  setGoalAchievement,
} from "@/lib/services/goals";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export type CreateGoalsResponse = {
  success: boolean;
  error?: string;
};

export const createGoalsAction = async (
  userId: string,
  data: NewGoals,
): Promise<CreateGoalsResponse> => {
  try {
    await createGoals(userId, data);
    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }
    throw new Error("Internal server error");
  } finally {
    revalidatePath("/goals");
  }
};

export const setGoalAchievementAction = async (
  goalSetId: string,
  goalIds: string[],
  userId: string,
): Promise<void> => {
  await setGoalAchievement(goalSetId, goalIds, userId);
  revalidatePath("/goals");
};

export const finalizeGoalSetAction = async (
  goalSetId: string,
  userId: string,
): Promise<void> => {
  await finalizeGoalSet(goalSetId, userId);
  revalidatePath("/goals");
};
