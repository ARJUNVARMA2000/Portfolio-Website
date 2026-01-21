"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { ToastProvider } from "./ToastContext";
import ToastContainer from "./Toast";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      themes={["dark", "light"]}
      storageKey="portfolio-theme"
    >
      <ToastProvider>
        {children}
        <ToastContainer />
      </ToastProvider>
    </NextThemesProvider>
  );
}
