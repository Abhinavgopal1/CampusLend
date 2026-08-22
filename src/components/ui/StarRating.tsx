"use client";

import { cn, getStarDisplay } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";
import { useState } from "react";

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  reviewCount?: number;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  interactive = false,
  onChange,
  size = "md",
  showNumber = false,
  reviewCount,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const currentRating = hoverRating ?? rating;
  const { full, half, empty } = getStarDisplay(currentRating);

  const starSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4.5 w-4.5",
    lg: "h-6 w-6",
  };

  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base font-semibold",
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {interactive
          ? Array.from({ length: maxRating }).map((_, i) => {
              const starVal = i + 1;
              const isFilled = starVal <= (hoverRating ?? rating);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onChange?.(starVal)}
                  onMouseEnter={() => setHoverRating(starVal)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-0.5 text-amber-400 hover:scale-125 transition-transform focus:outline-none"
                >
                  <Star
                    className={cn(
                      starSizes[size],
                      isFilled ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"
                    )}
                  />
                </button>
              );
            })
          : (
            <>
              {Array.from({ length: full }).map((_, i) => (
                <Star
                  key={`full-${i}`}
                  className={cn(starSizes[size], "fill-amber-400 text-amber-400")}
                />
              ))}
              {half && (
                <div className="relative">
                  <StarHalf className={cn(starSizes[size], "fill-amber-400 text-amber-400")} />
                </div>
              )}
              {Array.from({ length: empty }).map((_, i) => (
                <Star
                  key={`empty-${i}`}
                  className={cn(starSizes[size], "text-slate-300 dark:text-slate-700")}
                />
              ))}
            </>
          )}
      </div>

      {showNumber && (
        <span className={cn("font-bold text-[var(--text-primary)]", textSize[size])}>
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className={cn("text-[var(--text-muted)]", textSize[size])}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
