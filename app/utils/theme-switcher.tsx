"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-110 transition"
    >
      {theme === "dark" ? (
        <BsSun size={20} className="text-yellow-400" />
      ) : (
        <BsMoon size={20} className="text-gray-700" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
