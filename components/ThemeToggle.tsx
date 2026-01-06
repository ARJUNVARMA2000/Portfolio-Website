"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="p-2.5 rounded-xl bg-surface border border-border hover:border-accent/50 transition-all duration-200"
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
    >
      {isLight ? (
        <FaMoon className="w-4 h-4 text-accent-tertiary" />
      ) : (
        <FaSun className="w-4 h-4 text-accent" />
      )}
    </button>
  );
}
