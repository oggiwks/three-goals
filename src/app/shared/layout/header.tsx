import {
  Calendar,
  CheckCircle,
  ListTodo,
  LogIn,
  LogOut,
  NotebookPenIcon,
  Settings,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { NavMenu } from "@/app/shared/layout/nav-menu";
import { getSessionFromCookie } from "@/lib/services/sessions";

export const Header = async () => {
  const { session, user } = await getSessionFromCookie();
  const isLoggedIn = !!session && !!user;

  const menuItems = isLoggedIn
    ? [
        {
          title: "Todays goals",
          href: "/goals",
          icon: <CheckCircle className="h-6 w-6" />,
        },
        {
          title: "My goals",
          href: "/history",
          icon: <Calendar className="h-6 w-6" />,
        },
        {
          title: "Settings",
          href: "/settings",
          icon: <Settings className="h-6 w-6" />,
        },
        {
          title: "Logout",
          href: "/auth/logout",
          icon: <LogOut className="h-6 w-6" />,
        },
      ]
    : [
        {
          title: "Login",
          href: "/auth/login",
          icon: <LogIn className="h-6 w-6" />,
        },
        {
          title: "Sign up",
          href: "/auth/sign-up",
          icon: <NotebookPenIcon className="h-6 w-6" />,
        },
      ];

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container flex flex-col items-center justify-between sm:flex-row sm:h-16 py-2">
        <div className="flex items-center text-2xl font-bold px-2 space-x-2">
          <ListTodo className="h-6 w-6 sm:h-8 w-8" />
          <Link href="/" className="text-2xl font-bold">
            Three Goals
          </Link>
        </div>
        <div className="mb-4 sm:ml-8" />
        <div className="flex items-center justify-center">
          <NavMenu items={menuItems} />
        </div>
      </div>
    </header>
  );
};
