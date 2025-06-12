import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";
import { GoalDto } from "@/lib/data/dto/goals";

type GoalsSummaryProps = {
  goals: GoalDto[];
};

export const GoalsSummary = ({ goals }: GoalsSummaryProps) => (
  <div className="flex flex-col gap-4 justify-center items-center py-24">
    <Card className="bg-background text-foreground">
      <CardHeader className="text-lg font-bold">
        <CardTitle>You have completed all of todays goals!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-md font-bold min-w-[300px] mb-4">
          Summary of todays goals
        </p>
        <div className="flex flex-col space-y-2 ">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="flex space-x-2 justify-between min-w-[300px]"
            >
              <p>{goal.description}</p>
              <Check />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);
