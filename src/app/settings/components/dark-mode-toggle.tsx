"use client";

import { useTheme } from "next-themes";

export const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-900 dark:text-gray-100"
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
};
