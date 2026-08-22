"use client";

import { cn, getInitials } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface AvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  verified?: boolean;
  online?: boolean;
  className?: string;
}

export function Avatar({
  src,
  name,
  size = "md",
  verified = false,
  online = false,
  className,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-xl font-bold",
  };

  const badgeSizes = {
    xs: "h-2 w-2 ring-1",
    sm: "h-2.5 w-2.5 ring-1.5",
    md: "h-3.5 w-3.5 ring-2",
    lg: "h-4 w-4 ring-2",
    xl: "h-5 w-5 ring-2",
  };

  const checkSizes = {
    xs: "h-2.5 w-2.5 -right-0.5 -bottom-0.5",
    sm: "h-3.5 w-3.5 -right-0.5 -bottom-0.5",
    md: "h-4 w-4 -right-1 -bottom-1",
    lg: "h-5 w-5 -right-1 -bottom-1",
    xl: "h-6 w-6 -right-1.5 -bottom-1.5",
  };

  return (
    <div className={cn("relative inline-block shrink-0", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-full font-semibold flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-sm ring-2 ring-[var(--surface)]",
          sizes[size]
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={name}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {online && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-emerald-500 ring-[var(--surface)]",
            badgeSizes[size]
          )}
          title="Online"
        />
      )}

      {verified && (
        <div
          className={cn(
            "absolute bg-white dark:bg-slate-900 rounded-full text-blue-500 shadow-sm flex items-center justify-center",
            checkSizes[size]
          )}
          title="Verified Student"
        >
          <CheckCircle2 className="h-full w-full fill-blue-500 text-white" />
        </div>
      )}
    </div>
  );
}
