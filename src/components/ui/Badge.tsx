"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  dot?: boolean;
  pulse?: boolean;
}

export function Badge({
  children,
  variant = "primary",
  size = "md",
  className,
  dot = false,
  pulse = false,
}: BadgeProps) {
  const variants = {
    primary: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800",
    secondary: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
    danger: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800",
    info: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800",
    outline: "bg-transparent text-[var(--text-secondary)] border-[var(--border)]",
    ghost: "bg-transparent text-[var(--text-muted)] border-transparent",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
  };

  const dotColors = {
    primary: "bg-blue-500",
    secondary: "bg-slate-400",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    info: "bg-cyan-500",
    outline: "bg-slate-400",
    ghost: "bg-slate-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full border tracking-wide transition-colors",
        variants[variant],
        sizes[size],
        pulse && "animate-pulse",
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            dotColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}
