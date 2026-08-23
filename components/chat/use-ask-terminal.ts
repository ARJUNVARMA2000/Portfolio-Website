"use client";

import { useEffect, useState } from "react";

/** ⌘K / Ctrl+K toggles, "/" opens, and any component can dispatch `open-ask` (the nav button does). */
export function useAskTerminal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.chatReady = "true";
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      const tag = document.activeElement?.tagName;
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(tag || "")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-ask", onOpen);
    return () => {
      delete document.documentElement.dataset.chatReady;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-ask", onOpen);
    };
  }, []);

  return [open, setOpen] as const;
}
