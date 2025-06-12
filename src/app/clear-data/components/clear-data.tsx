"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { toast } from "sonner";
import { clearData } from "@/app/clear-data/actions";
import { useRouter } from "next/navigation";
import { BackLink } from "@/app/shared/utils/back-link";

type ClearDataProps = {
  userId: string;
};

export const ClearData = ({ userId }: ClearDataProps) => {
  const router = useRouter();

  const handleClearData = async () => {
    try {
      await clearData(userId);
      toast.success("Cleared all data", {
        style: {
          color: "oklch(0.985 0 0)",
          background: "oklch(0.696 0.17 162.48)",
        },
      });
      router.push("/goals");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("An error occurred while clearing goal data", {
        style: {
          color: "oklch(0.985 0 0)",
          background: "oklch(0.645 0.246 16.439)",
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-24">
      <div>
        <BackLink />
        <Card className="bg-background text-foreground min-w-[300px]">
          <CardHeader className="space-y-4">
            <CardTitle className="text-lg font-bold">
              Clear all goal data
            </CardTitle>
            <CardDescription>
              This action will delete all your goal data permanently
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={handleClearData}
            >
              Confirm
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
