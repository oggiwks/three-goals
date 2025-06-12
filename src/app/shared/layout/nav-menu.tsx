"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type MenuItem = {
  href: string;
  icon?: React.ReactNode;
  title: string;
};

export type MenuProps = {
  items: MenuItem[];
};

export const NavMenu = ({ items }: MenuProps) => {
  const path = usePathname();

  const isCurrentLink = (href: string): boolean => {
    if (href === path) {
      return true;
    }

    // Check if the href is a prefix of the current path
    const regex = new RegExp(`^${href}(/|$)`);
    return regex.test(path);
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-2 px-4 text-sm font-medium text-foreground bg-background hover:bg-gray-100 hover:text-gray-900 rounded-md",
                isCurrentLink(item.href)
                  ? "bg-gray-200 text-gray-900 font-semibold"
                  : null,
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
