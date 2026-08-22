"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/utils";
import { useItemStore } from "@/store/useItemStore";
import type { MockItem } from "@/lib/mockData";
import {
  Heart,
  MapPin,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ItemCard({ item }: { item: MockItem }) {
  const { savedItems, toggleSaved } = useItemStore();
  const isSaved = savedItems.has(item.id);
  const [imgSrc, setImgSrc] = useState(item.images[0] || "");
  const [imageError, setImageError] = useState(false);

  const availabilityBadges = {
    available: { variant: "success" as const, label: "Available" },
    rented: { variant: "warning" as const, label: "Rented" },
    paused: { variant: "secondary" as const, label: "Paused" },
  };

  const badgeInfo = availabilityBadges[item.availability];

  return (
    <div className="group relative flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <img
          src={
            imageError
              ? "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800"
              : imgSrc
          }
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <Badge
            variant={badgeInfo.variant}
            size="sm"
            dot
            className="pointer-events-auto shadow-md backdrop-blur-md"
          >
            {badgeInfo.label}
          </Badge>

          {/* Favorite Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleSaved(item.id);
            }}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 shadow-md hover:scale-110 active:scale-95 transition-all"
            aria-label="Save Item"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isSaved ? "fill-red-500 text-red-500" : "text-slate-600 dark:text-slate-300"
              }`}
            />
          </button>
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="rounded-lg bg-slate-950/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col pt-3">
        {/* Title */}
        <Link href={`/items/${item.id}`} className="group-hover:text-blue-600 transition-colors">
          <h3 className="line-clamp-1 text-sm font-bold text-[var(--text-primary)]">
            {item.title}
          </h3>
        </Link>

        {/* Location & Condition */}
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
          <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
          <span className="truncate">{item.location}</span>
          <span>•</span>
          <span className="capitalize">{item.condition}</span>
        </div>

        {/* Owner Info & Rating */}
        <div className="mt-2.5 flex items-center justify-between border-t border-[var(--border)] pt-2.5">
          <div className="flex items-center gap-1.5">
            <Avatar
              name={item.ownerName}
              src={item.ownerAvatar}
              size="xs"
              verified={item.ownerVerified}
            />
            <span className="text-xs font-medium text-[var(--text-secondary)] truncate max-w-[90px]">
              {item.ownerName}
            </span>
          </div>

          <StarRating rating={item.ownerRating} size="sm" showNumber />
        </div>

        {/* Pricing Block */}
        <div className="mt-3 flex items-end justify-between rounded-2xl bg-[var(--surface-hover)] p-2.5 border border-[var(--border)]">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-[var(--text-primary)]">
                {formatPrice(item.dailyPrice)}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-medium">/ day</span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] font-medium">
              Deposit: {formatPrice(item.deposit)}
            </p>
          </div>

          <Link href={`/items/${item.id}`}>
            <Button size="sm" variant="primary" className="h-8 px-3 text-xs rounded-xl">
              Rent
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
