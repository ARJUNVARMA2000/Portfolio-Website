"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { FaBolt, FaRegSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isExecutive = useMemo(() => theme === "executive", [theme]);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => setTheme(isExecutive ? "cyberpunk" : "executive")}
      className="inline-flex items-center gap-2 rounded-lg border border-t-border bg-t-surface/60 px-3 py-2 text-xs font-medium text-t-text hover:border-t-accent/60 hover:bg-t-surface transition-colors"
      aria-label={`Switch to ${isExecutive ? "cyberpunk" : "executive"} theme`}
      title={`Switch to ${isExecutive ? "Cyberpunk" : "Executive"} theme`}
    >
      {isExecutive ? (
        <>
          <FaBolt className="text-t-accent" />
          <span>Cyberpunk</span>
        </>
      ) : (
        <>
          <FaRegSun className="text-t-accent" />
          <span>Executive</span>
        </>
      )}
    </button>
  );
}

