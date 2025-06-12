import { z } from "zod";

export const GoalDtoSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  achieved: z.date().nullable(),
  due: z.date().nullable(),
  createdAt: z.date(),
});

export type GoalDto = z.infer<typeof GoalDtoSchema>;

export const GoalSetDtoSchema = z.object({
  id: z.string().uuid(),
  goals: z.array(GoalDtoSchema),
  createdAt: z.date(),
  userId: z.string().uuid(),
  finalized: z.date().nullable(),
});

export type GoalSetDto = z.infer<typeof GoalSetDtoSchema>;

export const NewGoalsSchema = z.object({
  goal1: z
    .string()
    .min(1, { message: "Goal 1 is required" })
    .max(250, { message: "Goal 1 must be 250 characters or less" }),
  goal2: z
    .string()
    .min(1, { message: "Goal 2 is required" })
    .max(250, { message: "Goal 2 must be 250 characters or less" }),
  goal3: z
    .string()
    .min(1, { message: "Goal 3 is required" })
    .max(250, { message: "Goal 3 must be 250 characters or less" }),
});

export type NewGoals = z.infer<typeof NewGoalsSchema>;

export const UpdateGoalsSchema = z.object({
  goal1: z.object({
    id: z.string().uuid(),
    description: z
      .string()
      .min(1, { message: "Goal 1 is required" })
      .max(250, { message: "Goal 1 must be 250 characters or less" }),
    achieved: z.boolean(),
  }),
  goal2: z.object({
    id: z.string().uuid(),
    description: z
      .string()
      .min(1, { message: "Goal 2 is required" })
      .max(250, { message: "Goal 2 must be 250 characters or less" }),
    achieved: z.boolean(),
  }),
  goal3: z.object({
    id: z.string().uuid(),
    description: z
      .string()
      .min(1, { message: "Goal 3 is required" })
      .max(250, { message: "Goal 3 must be 250 characters or less" }),
    achieved: z.boolean(),
  }),
  finalized: z.boolean(),
});

export type UpdateGoals = z.infer<typeof UpdateGoalsSchema>;
