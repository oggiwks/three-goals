"use client";

import { useEffect } from "react";
import { userLogoutAction } from "@/app/auth/logout/actions";
import { Spinner } from "@/app/shared/utils/spinner";

type LogoutProps = {
  sessionToken: string;
};

export const Logout = ({ sessionToken }: LogoutProps) => {
  useEffect(() => {
    const logout = async () => {
      await userLogoutAction(sessionToken);
    };
    logout();
  }, [sessionToken]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Logging out...</h1>
      <p className="mt-4">You are being logged out. Please wait.</p>
      <Spinner />
    </div>
  );
};
