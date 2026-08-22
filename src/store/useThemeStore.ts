"use client";

import { create } from "zustand";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyThemeToDOM = (resolvedTheme: "light" | "dark") => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  // Add smooth transition class for theme change
  root.classList.add("theme-transitioning");

  if (resolvedTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // Remove transition class after animation finishes to prevent layout lag
  setTimeout(() => {
    root.classList.remove("theme-transitioning");
  }, 400);
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "system",
  resolvedTheme: "light",

  setTheme: (theme: ThemeMode) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("campuslend-theme", theme);
      } catch {
        // LocalStorage fallback
      }
    }

    const resolved = theme === "system" ? getSystemTheme() : theme;
    applyThemeToDOM(resolved);
    set({ theme, resolvedTheme: resolved });
  },

  toggleTheme: () => {
    const current = get().resolvedTheme;
    const next = current === "dark" ? "light" : "dark";
    get().setTheme(next);
  },
}));

// Initialize theme listeners on client
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("campuslend-theme") as ThemeMode | null;
  const initialTheme: ThemeMode = saved || "system";
  const resolved = initialTheme === "system" ? getSystemTheme() : initialTheme;

  applyThemeToDOM(resolved);
  useThemeStore.setState({ theme: initialTheme, resolvedTheme: resolved });

  // Listen to OS system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const currentTheme = useThemeStore.getState().theme;
    if (currentTheme === "system") {
      const newResolved = e.matches ? "dark" : "light";
      applyThemeToDOM(newResolved);
      useThemeStore.setState({ resolvedTheme: newResolved });
    }
  });
}
