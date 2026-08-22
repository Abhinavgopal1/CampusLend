"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isTextarea?: false;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  isTextarea: true;
}

type CombinedProps = InputProps | TextareaProps;

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedProps>(
  (props, ref) => {
    const {
      className,
      label,
      error,
      hint,
      icon: Icon,
      iconPosition = "left",
      disabled,
      isTextarea,
      ...rest
    } = props;

    const baseInputStyles =
      "w-full rounded-xl border bg-[var(--surface)] text-[var(--text-primary)] placeholder-[var(--text-muted)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)]/30 focus:border-[var(--primary-600)] disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed";

    const stateStyles = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-[var(--border)] hover:border-[var(--border-hover)]";

    const paddingStyles = isTextarea
      ? "p-3 min-h-[100px]"
      : Icon
      ? iconPosition === "left"
        ? "pl-10 pr-4 py-2.5 text-sm"
        : "pl-4 pr-10 py-2.5 text-sm"
      : "px-4 py-2.5 text-sm";

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && !isTextarea && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none transition-colors",
                iconPosition === "left" ? "left-3.5" : "right-3.5"
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
          )}

          {isTextarea ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={cn(baseInputStyles, stateStyles, paddingStyles, className)}
              disabled={disabled}
              {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={cn(baseInputStyles, stateStyles, paddingStyles, className)}
              disabled={disabled}
              {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
        </div>

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--text-muted)]">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
