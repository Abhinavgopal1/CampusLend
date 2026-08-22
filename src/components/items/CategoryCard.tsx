"use client";

import type { Category } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CategoryCard({
  category,
  isSelected = false,
  onClick,
}: {
  category: Category;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  const Icon = category.icon;

  const content = (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center rounded-2xl p-4 transition-all duration-300 text-center cursor-pointer border",
        isSelected
          ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-md scale-105"
          : "border-[var(--border)] bg-[var(--surface)] hover:border-blue-500/40 hover:shadow-lg hover:-translate-y-1"
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr text-white shadow-md transition-transform group-hover:scale-110",
          category.gradient
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h4 className="mt-2.5 text-xs font-bold text-[var(--text-primary)]">
        {category.name}
      </h4>

      <p className="mt-0.5 text-[10px] text-[var(--text-muted)] font-medium">
        {category.itemCount} items
      </p>
    </div>
  );

  if (onClick) {
    return <button type="button" onClick={onClick} className="w-full">{content}</button>;
  }

  return <Link href={`/search?category=${category.id}`}>{content}</Link>;
}
