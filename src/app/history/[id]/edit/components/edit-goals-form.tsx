"use client";

import {
  GoalSetDto,
  UpdateGoals,
  UpdateGoalsSchema,
} from "@/lib/data/dto/goals";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateGoalsAction } from "@/app/history/[id]/edit/actions";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/shared/utils/spinner";
import { BackLink } from "@/app/shared/utils/back-link";

type EditGoalsProps = {
  goalSet: GoalSetDto;
  userId: string;
};

export const EditGoalsForm = ({ goalSet, userId }: EditGoalsProps) => {
  const router = useRouter();
  const { goals } = goalSet;

  const form = useForm<z.infer<typeof UpdateGoalsSchema>>({
    resolver: zodResolver(UpdateGoalsSchema),
    defaultValues: {
      goal1: {
        id: goals[0].id,
        description: goals[0].description ?? "",
        achieved: !!goals[0].achieved,
      },
      goal2: {
        id: goals[1].id,
        description: goals[1].description ?? "",
        achieved: !!goals[1].achieved,
      },
      goal3: {
        id: goals[2].id,
        description: goals[2].description ?? "",
        achieved: !!goals[2].achieved,
      },
      finalized: false,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { finalized, ...formValues } = form.watch();

  const canBeFinalised = (): boolean =>
    Object.values(formValues).every((value) => value.achieved);

  const onSubmit = async (data: UpdateGoals): Promise<void> => {
    try {
      await updateGoalsAction(goalSet.id, userId, data);
      toast("Goals updated successfully", {
        style: {
          color: "oklch(0.985 0 0)",
          background: "oklch(0.696 0.17 162.48)",
        },
      });
      router.push(`/history/${goalSet.id}`);
    } catch {
      toast("An error occurred while updating goals", {
        style: {
          color: "oklch(0.985 0 0)",
          background: "oklch(0.645 0.246 16.439)",
        },
      });
    }
  };

  if (goalSet.finalized) {
    toast(
      "These goals have already been marked as complete and cannot be edited",
      {
        style: {
          color: "oklch(0.985 0 0)",
          background: "oklch(0.645 0.246 16.439)",
        },
      },
    );
    router.push(`/history/${goalSet.id}`);
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-24">
      <div>
        <BackLink />
        <Card className="bg-background text-foreground">
          <CardHeader className="text-lg font-bold">
            <CardTitle>
              Edit goals for {goalSet.createdAt.toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="goal1.id"
                  render={({ field }) => <input hidden {...field} />}
                />
                <FormField
                  control={form.control}
                  name="goal1.description"
                  render={({ field }) => (
                    <FormItem className="min-w-[300px]">
                      <FormLabel>Goal 1</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex space-x-2 space-y-4 justify-between min-w-[300px]">
                      <FormLabel>Achieved</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          className="h-5 w-5"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  name="goal1.achieved"
                />
                <FormField
                  control={form.control}
                  name="goal2.id"
                  render={({ field }) => <input hidden {...field} />}
                />
                <FormField
                  control={form.control}
                  name="goal2.description"
                  render={({ field }) => (
                    <FormItem className="min-w-[300px]">
                      <FormLabel>Goal 2</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex space-x-2 space-y-4 justify-between min-w-[300px]">
                      <FormLabel>Achieved</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          className="h-5 w-5"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  name="goal2.achieved"
                />
                <FormField
                  control={form.control}
                  name="goal3.id"
                  render={({ field }) => <input hidden {...field} />}
                />
                <FormField
                  control={form.control}
                  name="goal3.description"
                  render={({ field }) => (
                    <FormItem className="min-w-[300px]">
                      <FormLabel>Goal 3</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex space-x-2 space-y-4 justify-between min-w-[300px]">
                      <FormLabel>Achieved</FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          className="h-5 w-5"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                  name="goal3.achieved"
                />
                {canBeFinalised() ? (
                  <FormField
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex space-x-2 space-y-4 justify-between min-w-[300px]">
                        <FormLabel>Mark goals as completed</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(checked)
                            }
                            className="h-5 w-5"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                    name="finalized"
                  />
                ) : null}
                <Button type="submit" className="w-full sm:w-auto">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
