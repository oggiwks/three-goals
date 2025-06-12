"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const BackLink = () => {
  const router = useRouter();

  return (
    <div className="flex items-center">
      <ArrowLeft className="h-4 w-4" />
      <Button
        onClick={() => {
          router.back();
        }}
        variant="link"
      >
        Back
      </Button>
    </div>
  );
};
