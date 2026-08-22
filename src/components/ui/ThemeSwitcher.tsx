"use client";

import { useThemeStore, type ThemeMode } from "@/store/useThemeStore";
import { cn } from "@/lib/utils";
import { Sun, Moon, Laptop } from "lucide-react";
import { useSyncExternalStore } from "react";

export interface ThemeSwitcherProps {
  variant?: "toggle" | "segmented" | "dropdown";
  className?: string;
}

export function ThemeSwitcher({
  variant = "toggle",
  className,
}: ThemeSwitcherProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useThemeStore();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  if (!mounted) {
    // Avoid hydration mismatch placeholder
    return (
      <div className={cn("h-9 w-9 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] animate-pulse", className)} />
    );
  }

  // 1. Quick Toggle Button (Navbar / Header)
  if (variant === "toggle") {
    const isDark = resolvedTheme === "dark";

    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "group relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] shadow-sm hover:border-[var(--primary-400)]/60 hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-all duration-300 active:scale-95",
          className
        )}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        title={`Current: ${theme.toUpperCase()} (${resolvedTheme} active). Click to toggle.`}
      >
        <div className="relative h-4.5 w-4.5">
          {/* Sun icon */}
          <Sun
            className={cn(
              "absolute inset-0 h-full w-full text-amber-500 transition-all duration-500 transform",
              isDark
                ? "-rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            )}
          />
          {/* Moon icon */}
          <Moon
            className={cn(
              "absolute inset-0 h-full w-full text-blue-400 transition-all duration-500 transform",
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0"
            )}
          />
        </div>

        {/* Ambient Hover Glow */}
        <span
          className={cn(
            "absolute inset-0 -z-10 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100",
            isDark ? "bg-blue-500/20" : "bg-amber-400/25"
          )}
        />
      </button>
    );
  }

  // 2. Segmented Pill Switcher [ Light | Dark | System ] (Settings / Profile / Extended UI)
  const options: { id: ThemeMode; label: string; icon: typeof Sun }[] = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "Auto", icon: Laptop },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] p-1 shadow-inner backdrop-blur-md",
        className
      )}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = theme === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setTheme(opt.id)}
            className={cn(
              "relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-200",
              isSelected
                ? "bg-[var(--surface)] text-[var(--text-primary)] shadow-sm shadow-slate-900/5 ring-1 ring-[var(--border)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]/50"
            )}
          >
            <Icon
              className={cn(
                "h-3.5 w-3.5 transition-colors",
                isSelected
                  ? opt.id === "light"
                    ? "text-amber-500"
                    : opt.id === "dark"
                    ? "text-blue-400"
                    : "text-emerald-500"
                  : "text-slate-400"
              )}
            />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
