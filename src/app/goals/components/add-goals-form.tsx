"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { NewGoals, NewGoalsSchema } from "@/lib/data/dto/goals";
import { createGoalsAction } from "@/app/goals/actions";
import { toast } from "sonner";

type GoalsFormProps = {
  userId: string;
};

export const AddGoalsForm = ({ userId }: GoalsFormProps) => {
  const form = useForm<z.infer<typeof NewGoalsSchema>>({
    resolver: zodResolver(NewGoalsSchema),
    defaultValues: {
      goal1: "",
      goal2: "",
      goal3: "",
    },
  });

  const onSubmit = async (data: NewGoals): Promise<void> => {
    try {
      const response = await createGoalsAction(userId, data);
      if (response.success) {
        form.reset();
        toast("Goals created successfully", {
          style: {
            color: "oklch(0.985 0 0)",
            background: "oklch(0.696 0.17 162.48)",
          },
        });
      } else {
        toast(`Validation failed when creating goals: ${response.error}`, {
          style: {
            color: "oklch(0.985 0 0)",
            background: "oklch(0.704 0.191 22.216)",
          },
        });
      }
    } catch {
      toast("An error occurred while creating goals", {
        style: {
          color: "oklch(0.985 0 0)",
          background: "oklch(0.645 0.246 16.439)",
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-24">
      <Card className="bg-background text-foreground">
        <CardHeader className="text-lg font-bold">
          <CardTitle>Todays goals</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="goal1"
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
                name="goal2"
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
                name="goal3"
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
              <Button type="submit" className="w-full sm:w-auto">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
