import { Goal, GoalSetWithGoals } from "@/lib/db/types";
import { GoalDto, GoalSetDto } from "@/lib/data/dto/goals";

export const mapGoalToDto = (goal: Goal): GoalDto => ({
  id: goal.id,
  description: goal.description,
  achieved: goal.achieved,
  due: goal.due,
  createdAt: goal.created_at,
});

export const mapGoalSetToDto = (goalSet: GoalSetWithGoals): GoalSetDto => ({
  id: goalSet.id,
  goals: goalSet.goals.map((item) => mapGoalToDto(item)),
  createdAt: goalSet.created_at,
  userId: goalSet.user_id,
  finalized: goalSet.finalized,
});
