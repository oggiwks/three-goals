"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalSetDto } from "@/lib/data/dto/goals";
import { Check, Pencil, X } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BackLink } from "@/app/shared/utils/back-link";

type ViewGoalsSummaryProps = {
  goalSet: GoalSetDto;
  userId: string;
};

export const ViewGoalsSummary = ({ goalSet }: ViewGoalsSummaryProps) => {
  const router = useRouter();

  const handleEdit = (): void => {
    router.push(`/history/${goalSet.id}/edit`);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-24">
      <div>
        <BackLink />
        <Card className="bg-background text-foreground">
          <CardHeader className="flex text-lg font-bold justify-between">
            <CardTitle>
              Summary of goals for {goalSet.createdAt.toLocaleDateString()}
            </CardTitle>
            {!goalSet.finalized ? (
              <Button size="icon" variant="outline" onClick={handleEdit}>
                <Pencil />
              </Button>
            ) : null}
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {goalSet.goals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex justify-between min-w-[300px] space-x-4"
                >
                  <p>{goal.description}</p>
                  {goal.achieved ? <Check /> : <X />}
                </div>
              ))}
            </div>
            <div className="flex justify-between min-w-[300px] mt-8">
              <p className="text-md font-bold">Completed:</p>
              {goalSet.finalized ? <Check /> : <X />}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
