"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="cyberpunk"
      enableSystem={false}
      themes={["cyberpunk", "executive"]}
      storageKey="site-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

