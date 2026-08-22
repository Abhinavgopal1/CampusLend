"use client";

import { cn } from "@/lib/utils";
import { type HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "outline" | "interactive";
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hoverable = false, children, ...props }, ref) => {
    const variants = {
      default: "bg-[var(--surface)] border border-[var(--border)] shadow-sm",
      glass: "glass-card",
      gradient:
        "bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-blue-950/90 border border-slate-700/50 text-white shadow-xl backdrop-blur-md",
      outline: "bg-transparent border-2 border-dashed border-[var(--border)]",
      interactive:
        "bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--primary-400)]/60 hover:shadow-md cursor-pointer transition-all duration-200",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-5 transition-all duration-200",
          variants[variant],
          hoverable && "hover-lift cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
