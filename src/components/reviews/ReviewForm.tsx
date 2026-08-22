"use client";

import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { RATING_CATEGORIES } from "@/lib/constants";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function ReviewForm({
  itemTitle,
  onSubmit,
}: {
  itemTitle: string;
  onSubmit?: () => void;
}) {
  const [ratings, setRatings] = useState({
    communication: 5,
    itemCondition: 5,
    timeliness: 5,
    overall: 5,
  });

  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    onSubmit?.();
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-6 text-center space-y-3">
        <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
          Review Submitted Successfully!
        </h4>
        <p className="text-xs text-emerald-700 dark:text-emerald-300">
          Thank you for strengthening campus trust! Your feedback helps verified students rent safely.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-5 shadow-sm"
    >
      <div>
        <h4 className="font-bold text-base text-[var(--text-primary)]">
          Rate & Review Rental
        </h4>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">
          Share your experience renting &ldquo;{itemTitle}&rdquo;
        </p>
      </div>

      {/* Multi-category Rating */}
      <div className="space-y-3 rounded-2xl bg-[var(--surface-hover)] p-4 border border-[var(--border)]">
        {RATING_CATEGORIES.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-primary)]">
              {cat.label}
            </span>
            <StarRating
              rating={ratings[cat.id as keyof typeof ratings]}
              interactive
              onChange={(val) => handleRatingChange(cat.id, val)}
              size="md"
            />
          </div>
        ))}
      </div>

      {/* Written Review */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          Written Review
        </label>
        <textarea
          rows={3}
          required
          placeholder="How was the item condition, communication, and handoff experience?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isSubmitting}
        icon={Send}
        className="w-full"
      >
        Submit Campus Review
      </Button>
    </form>
  );
}
