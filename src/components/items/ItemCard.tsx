"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import type { MockItem } from "@/lib/mockData";
import {
  formatPrice,
  getListingMode,
  getPublicHandoffSpot,
  isForRent,
  isForSale,
} from "@/lib/utils";
import { useItemStore } from "@/store/useItemStore";
import { Heart, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ItemCard({ item }: { item: MockItem }) {
  const { savedItems, toggleSaved } = useItemStore();
  const isSaved = savedItems.includes(item.id);
  const [imageError, setImageError] = useState(false);
  const listingMode = getListingMode(item);
  const canRent = isForRent(item);
  const canBuy = isForSale(item) && typeof item.salePrice === "number";

  const availabilityBadge = (() => {
    if (item.availability === "paused") {
      return { variant: "secondary" as const, label: "Paused" };
    }
    if (canBuy && item.saleStatus === "sold" && !canRent) {
      return { variant: "secondary" as const, label: "Sold" };
    }
    if (canBuy && item.saleStatus === "reserved" && !canRent) {
      return { variant: "warning" as const, label: "Reserved" };
    }
    if (item.availability === "rented") {
      return {
        variant: "warning" as const,
        label: canRent ? "Rented" : "Unavailable",
      };
    }
    return { variant: "success" as const, label: "Available" };
  })();

  const modeLabel =
    listingMode === "both"
      ? "Rent or buy"
      : listingMode === "sale"
        ? "For sale"
        : "For rent";

  return (
    <article className="group relative flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <img
          src={
            imageError
              ? "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800"
              : item.images[0]
          }
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />

        <div className="pointer-events-none absolute inset-x-2.5 top-2.5 flex items-center justify-between">
          <Badge
            variant={availabilityBadge.variant}
            size="sm"
            dot
            className="pointer-events-auto shadow-md backdrop-blur-md"
          >
            {availabilityBadge.label}
          </Badge>

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              toggleSaved(item.id);
            }}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-slate-700 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95 dark:bg-slate-900/85 dark:text-slate-200"
            aria-label={isSaved ? "Remove saved item" : "Save item"}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isSaved
                  ? "fill-red-500 text-red-500"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            />
          </button>
        </div>

        <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2">
          <span className="rounded-lg bg-slate-950/75 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
            {item.category}
          </span>
          <span className="rounded-lg bg-blue-600/90 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm backdrop-blur-md">
            {modeLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <Link
          href={`/items/${item.id}`}
          className="transition-colors group-hover:text-blue-600"
        >
          <h2 className="line-clamp-1 text-sm font-bold text-[var(--text-primary)]">
            {item.title}
          </h2>
        </Link>

        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
          <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
          <span className="truncate">{getPublicHandoffSpot(item.location)}</span>
          <span>•</span>
          <span className="capitalize">{item.condition}</span>
        </div>

        <div className="mt-2.5 flex items-center justify-between border-t border-[var(--border)] pt-2.5">
          <div className="flex items-center gap-1.5">
            <Avatar
              name={item.ownerName}
              src={item.ownerAvatar}
              size="xs"
              verified={item.ownerVerified}
            />
            <span className="max-w-[90px] truncate text-xs font-medium text-[var(--text-secondary)]">
              {item.ownerName}
            </span>
          </div>
          <StarRating rating={item.ownerRating} size="sm" showNumber />
        </div>

        <div className="mt-3 flex items-end justify-between gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] p-2.5">
          <div className="min-w-0">
            {canBuy && (
              <div className="flex items-baseline gap-1">
                <span className="text-base font-extrabold text-[var(--text-primary)]">
                  {formatPrice(item.salePrice ?? 0)}
                </span>
                <span className="text-[10px] font-medium text-[var(--text-muted)]">
                  to buy
                </span>
              </div>
            )}
            {canRent && (
              <p className={`${canBuy ? "text-[10px]" : "text-base font-extrabold"} text-[var(--text-primary)]`}>
                {formatPrice(item.dailyPrice)}
                <span className="ml-1 text-[10px] font-medium text-[var(--text-muted)]">
                  / day
                </span>
              </p>
            )}
          </div>

          <Link href={`/items/${item.id}`}>
            <Button size="sm" variant={canBuy ? "accent" : "primary"} className="h-8 rounded-xl px-3 text-xs">
              {listingMode === "sale" ? "Buy" : listingMode === "both" ? "View" : "Rent"}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
