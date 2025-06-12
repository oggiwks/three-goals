import { db } from "../db/db";
import { DateTime } from "luxon";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import {
  GoalSetDto,
  NewGoals,
  NewGoalsSchema,
  UpdateGoals,
  UpdateGoalsSchema,
} from "../data/dto/goals";
import { mapGoalSetToDto } from "../data/mappers/goals";
import { v4 as uuidv4 } from "uuid";

export const getUsersGoalsForToday = async (
  userId: string,
): Promise<GoalSetDto | undefined> => {
  const startOfDay = DateTime.local().startOf("day");
  const endOfDay = DateTime.local().endOf("day");

  const result = await db
    .selectFrom("goals.goal_sets")
    .selectAll()
    .select((eb) =>
      jsonArrayFrom(
        eb
          .selectFrom("goals.goals")
          .select([
            "achieved",
            "created_at",
            "due",
            "description",
            "deleted_at",
            "goal_set_id",
            "finalized",
            "id",
            "title",
            "updated_at",
          ])
          .whereRef("goals.goals.goal_set_id", "=", "goals.goal_sets.id")
          .orderBy("goals.goals.created_at", "asc"),
      ).as("goals"),
    )
    .where("user_id", "=", userId)
    .where("created_at", ">=", startOfDay.toJSDate())
    .where("created_at", "<=", endOfDay.toJSDate())
    .where("deleted_at", "is", null)
    .executeTakeFirst();

  return result ? mapGoalSetToDto(result) : undefined;
};

export const getAllUserGoalSets = async (
  userId: string,
): Promise<GoalSetDto[]> => {
  const result = await db
    .selectFrom("goals.goal_sets")
    .selectAll()
    .select((eb) =>
      jsonArrayFrom(
        eb
          .selectFrom("goals.goals")
          .select([
            "achieved",
            "created_at",
            "due",
            "description",
            "deleted_at",
            "goal_set_id",
            "id",
            "title",
            "updated_at",
            "finalized",
          ])
          .whereRef("goals.goals.goal_set_id", "=", "goals.goal_sets.id")
          .orderBy("goals.goals.created_at", "asc"),
      ).as("goals"),
    )
    .where("user_id", "=", userId)
    .where("deleted_at", "is", null)
    .execute();

  return result.map((item) => mapGoalSetToDto(item));
};

export const getGoalSetById = async (
  goalSetId: string,
  userId: string,
): Promise<GoalSetDto | undefined> => {
  const result = await db
    .selectFrom("goals.goal_sets")
    .selectAll()
    .select((eb) =>
      jsonArrayFrom(
        eb
          .selectFrom("goals.goals")
          .select([
            "achieved",
            "created_at",
            "due",
            "description",
            "deleted_at",
            "goal_set_id",
            "id",
            "title",
            "updated_at",
            "finalized",
          ])
          .whereRef("goals.goals.goal_set_id", "=", "goals.goal_sets.id")
          .orderBy("goals.goals.created_at", "asc"),
      ).as("goals"),
    )
    .where("id", "=", goalSetId)
    .where("user_id", "=", userId)
    .where("deleted_at", "is", null)
    .executeTakeFirst();

  return result ? mapGoalSetToDto(result) : undefined;
};

export const createGoals = async (
  userId: string,
  data: NewGoals,
): Promise<void> => {
  const parsedGoals = NewGoalsSchema.parse(data);

  const goalSet = await db
    .insertInto("goals.goal_sets")
    .values({
      id: uuidv4(),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      user_id: userId,
    })
    .returning("id")
    .executeTakeFirst();

  if (!goalSet) {
    throw new Error("Failed to create goal set");
  }

  const goals = Object.entries(parsedGoals).map(async ([key, value]) => {
    await db
      .insertInto("goals.goals")
      .values({
        id: uuidv4(),
        title: key,
        description: value,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        goal_set_id: goalSet.id,
      })
      .execute();
  });

  await Promise.allSettled(goals);
};

export const setGoalAchievement = async (
  goalSetId: string,
  goalIds: string[],
  userId: string,
): Promise<void> => {
  await db
    .updateTable("goals.goal_sets")
    .set({
      updated_at: new Date(),
    })
    .where("id", "=", goalSetId)
    .where("user_id", "=", userId)
    .executeTakeFirst();

  const goals = await db
    .selectFrom("goals.goals")
    .select(["id"])
    .where("goal_set_id", "=", goalSetId)
    .execute();

  const achieved = goals.map(async (goal) => {
    await db
      .updateTable("goals.goals")
      .set({
        achieved: goalIds.includes(goal.id) ? new Date() : null,
        updated_at: new Date(),
      })
      .where("id", "=", goal.id)
      .where("goal_set_id", "=", goalSetId)
      .execute();
  });

  await Promise.allSettled(achieved);
};

export const finalizeGoalSet = async (
  goalSetId: string,
  userId: string,
): Promise<void> => {
  await db
    .updateTable("goals.goal_sets")
    .set({
      finalized: new Date(),
      updated_at: new Date(),
    })
    .where("id", "=", goalSetId)
    .where("user_id", "=", userId)
    .execute();
};

export const updateGoals = async (
  goalSetId: string,
  userId: string,
  data: UpdateGoals,
): Promise<void> => {
  const parsedGoals = UpdateGoalsSchema.parse(data);

  const updateGoalSet = await db
    .updateTable("goals.goal_sets")
    .set({
      updated_at: new Date(),
      finalized: parsedGoals.finalized ? new Date() : null,
    })
    .where("id", "=", goalSetId)
    .where("user_id", "=", userId)
    .executeTakeFirst();

  if (!updateGoalSet) {
    throw new Error("Failed to find and update goal set");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { finalized, ...goalsToUpdate } = parsedGoals;

  const goals = Object.values(goalsToUpdate).map(async (value, index) => {
    await db
      .updateTable("goals.goals")
      .set({
        title: `goal${index + 1}`,
        description: value.description,
        achieved: value.achieved ? new Date() : null,
        updated_at: new Date(),
      })
      .where("goal_set_id", "=", goalSetId)
      .where("goals.goals.id", "=", value.id)
      .execute();
  });

  await Promise.allSettled(goals);
};

export const deleteGoals = async (
  goalSetId: string,
  userId: string,
): Promise<void> => {
  await db
    .updateTable("goals.goal_sets")
    .set({
      deleted_at: new Date(),
    })
    .where("id", "=", goalSetId)
    .where("user_id", "=", userId)
    .execute();

  await db
    .updateTable("goals.goals")
    .set({
      deleted_at: new Date(),
    })
    .where("goal_set_id", "=", goalSetId)
    .execute();
};

export const deleteAllGoals = async (userId: string): Promise<void> => {
  await db
    .updateTable("goals.goals")
    .set({
      deleted_at: new Date(),
    })
    .from("goals.goal_sets")
    .whereRef("goals.goal_sets.id", "=", "goals.goals.goal_set_id")
    .execute();

  await db
    .updateTable("goals.goal_sets")
    .set({
      deleted_at: new Date(),
    })
    .where("user_id", "=", userId)
    .execute();
};
