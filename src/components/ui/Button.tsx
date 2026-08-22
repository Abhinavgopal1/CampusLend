"use client";

import { cn } from "@/lib/utils";
import { Loader2, type LucideIcon } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon: Icon,
      iconPosition = "left",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none press-scale";

    const variants = {
      primary:
        "bg-[var(--primary-800)] text-white hover:bg-[var(--primary-700)] focus-visible:ring-[var(--primary-500)] shadow-md hover:shadow-lg",
      secondary:
        "bg-[var(--surface-hover)] text-[var(--text-primary)] hover:bg-[var(--border)] focus-visible:ring-[var(--border)]",
      outline:
        "border-2 border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] focus-visible:ring-[var(--border)]",
      ghost:
        "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] focus-visible:ring-[var(--border)]",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-md",
      accent:
        "gradient-accent text-white hover:opacity-90 focus-visible:ring-[var(--accent-500)] shadow-md hover:shadow-lg",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-5 text-sm",
      lg: "h-12 px-7 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isLoading && Icon && iconPosition === "left" && (
          <Icon className="h-4 w-4" />
        )}
        {children}
        {!isLoading && Icon && iconPosition === "right" && (
          <Icon className="h-4 w-4" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
