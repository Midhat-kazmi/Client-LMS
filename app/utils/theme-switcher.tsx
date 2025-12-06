"use client";

import { useTheme } from "next-themes";
import { FC } from "react";

export const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      onClick={toggleTheme}
      className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition-colors"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
};
