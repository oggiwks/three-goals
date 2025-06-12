"use client";

import { GoalSetDto, GoalDto } from "@/lib/data/dto/goals";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import {
  finalizeGoalSetAction,
  setGoalAchievementAction,
} from "@/app/goals/actions";
import { Button } from "@/components/ui/button";
import { GoalsSummary } from "@/app/goals/components/goals-summary";

export type TodaysGoalsProps = {
  goalSet: GoalSetDto;
  userId: string;
};

const goalsAchievedToday = (goals: GoalDto[]): number =>
  goals.filter((goal) => goal.achieved).length;

export const TodaysGoals = ({ goalSet, userId }: TodaysGoalsProps) => {
  const { goals } = goalSet;
  const goalsAchieved = goalsAchievedToday(goals);

  const GoalsAchievedSchema = z.object({
    goals: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof GoalsAchievedSchema>>({
    resolver: zodResolver(GoalsAchievedSchema),
    defaultValues: {
      goals: goals
        .map((item) => (item.achieved ? item.id : ""))
        .filter((item) => item !== ""),
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (
    data: z.infer<typeof GoalsAchievedSchema>,
  ): Promise<void> => {
    const filteredGoals = data.goals.filter((goal) => goal !== "");
    await setGoalAchievementAction(goalSet.id, filteredGoals, userId);
  };

  if (goalSet.finalized) {
    return <GoalsSummary goals={goals} />;
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-24">
      <Card className="bg-background text-foreground">
        <CardHeader className="text-lg font-bold">
          <CardTitle>Todays goals</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              ref={formRef}
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {goals.map((goal) => (
                <div key={goal.id} className="flex gap-2 mb-1">
                  <FormField
                    key={goal.id}
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                      <FormItem
                        key={goal.id}
                        className="flex space-x-2 space-y-4 justify-between min-w-[300px]"
                      >
                        <FormLabel>{goal.description}</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(goal.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, goal.id]);
                              } else {
                                field.onChange(
                                  field.value.filter((id) => id !== goal.id),
                                );
                              }
                              formRef.current?.requestSubmit();
                            }}
                            className="h-5 w-5"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="bg-background text-foreground mt-4">
        <CardHeader className="text-lg font-bold">
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={(goalsAchieved / goals.length) * 100}
            className="h-4 min-w-[300px]"
          />
          <div className="text-center space-y-2">
            {goalsAchieved} of {goals.length} goals achieved today
          </div>
          {goalsAchieved === 3 ? (
            <>
              <p className="text-lg mt-4">All goals achieved for today!</p>
              <Button
                className="w-full sm:w-auto mt-4"
                onClick={() => finalizeGoalSetAction(goalSet.id, userId)}
              >
                Click here to mark your day as complete
              </Button>
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};
