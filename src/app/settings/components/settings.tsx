"use client";

import React from "react";
import { DarkModeToggle } from "@/app/settings/components/dark-mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { createPasswordResetAction } from "@/app/auth/reset-password/actions";
import { UserDto } from "@/lib/data/dto/users";

type SettingsProps = {
  user: UserDto;
};

export const Settings = ({ user }: SettingsProps) => {
  const handleResetPassword = async () => {
    await createPasswordResetAction(user.email);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-24">
      <Card className="bg-background text-foreground min-w-[300px]">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Settings</CardTitle>
          <CardDescription>Manage your application settings</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <DarkModeToggle />
          <Link
            href="#"
            className="hover:text-gray-500"
            onClick={handleResetPassword}
          >
            Reset password
          </Link>
          <Link href="/clear-data" className="hover:text-gray-500">
            Clear all data
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
