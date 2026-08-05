"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * Wraps next-themes so the rest of the app never imports it directly.
 * Supports "light" | "dark" | "system", persisted via next-themes'
 * own localStorage handling. Uses the `class` strategy to match the
 * `.dark` selector defined in globals.css.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
}
