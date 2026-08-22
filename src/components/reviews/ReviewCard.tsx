"use client";

import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { formatDate } from "@/lib/utils";
import type { MockReview } from "@/lib/mockData";
import { ThumbsUp, MessageSquare } from "lucide-react";
import { useState } from "react";

export function ReviewCard({ review }: { review: MockReview }) {
  const [likes, setLikes] = useState(3);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-3.5 shadow-sm">
      {/* Reviewer Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={review.reviewerName} src={review.reviewerAvatar} size="sm" />
          <div>
            <h5 className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">
              {review.reviewerName}
            </h5>
            <p className="text-[11px] text-[var(--text-muted)]">
              Rented {review.itemTitle} • {formatDate(review.date)}
            </p>
          </div>
        </div>

        <StarRating rating={review.rating} size="sm" showNumber />
      </div>

      {/* Breakdown Scores */}
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[var(--surface-hover)] p-2.5 text-[10px] text-[var(--text-secondary)] font-medium">
        <div>
          <span>Condition: </span>
          <span className="font-bold text-amber-500">★ {review.itemCondition}</span>
        </div>
        <div>
          <span>Comm: </span>
          <span className="font-bold text-amber-500">★ {review.communication}</span>
        </div>
        <div>
          <span>Punctual: </span>
          <span className="font-bold text-amber-500">★ {review.timeliness}</span>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
        "{review.comment}"
      </p>

      {/* Helpful button */}
      <div className="flex items-center justify-end pt-2 border-t border-[var(--border)]">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
            hasLiked
              ? "text-blue-600 bg-blue-50 dark:bg-blue-950/40"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          <span>Helpful ({likes})</span>
        </button>
      </div>
    </div>
  );
}
