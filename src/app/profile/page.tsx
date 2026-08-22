"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { StarRating } from "@/components/ui/StarRating";
import { ItemCard } from "@/components/items/ItemCard";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { formatPrice } from "@/lib/utils";
import { MOCK_ITEMS, MOCK_REVIEWS, MOCK_RENTALS } from "@/lib/mockData";
import { useAuthStore } from "@/store/useAuthStore";
import {
  GraduationCap,
  ShieldCheck,
  Award,
  Clock,
  DollarSign,
  TrendingUp,
  Settings,
  Edit,
  Mail,
  Building,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [profileTab, setProfileTab] = useState<"listings" | "borrowed" | "reviews">("listings");

  if (!user) return null;

  const myListings = MOCK_ITEMS.filter((i) => i.ownerId === "u1" || i.ownerId === "u2");

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Banner */}
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              name={user.name}
              src={user.avatar}
              size="xl"
              verified={user.verified}
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-[var(--text-primary)]">
                  {user.name}
                </h1>
                <Badge variant={user.verified ? "success" : "warning"} size="sm">
                  {user.verified ? "Verified Student" : "Pending ID"}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
                  {user.college} • {user.department}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-start">
            <ThemeSwitcher variant="segmented" />
            <Link href="/profile/edit">
              <Button size="sm" variant="outline" icon={Edit} className="text-xs">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[var(--border)]">
          <div className="rounded-2xl bg-[var(--surface-hover)] p-3.5 border border-[var(--border)] text-center">
            <StarRating rating={user.rating} size="sm" showNumber className="justify-center" />
            <p className="text-[10px] text-[var(--text-muted)] mt-1 font-semibold uppercase tracking-wider">
              Trust Score (23 Ratings)
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--surface-hover)] p-3.5 border border-[var(--border)] text-center">
            <p className="text-lg font-black text-[var(--text-primary)]">{user.totalRentals}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-1 font-semibold uppercase tracking-wider">
              Completed Rentals
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--surface-hover)] p-3.5 border border-[var(--border)] text-center">
            <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
              {formatPrice(user.totalEarnings)}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] mt-1 font-semibold uppercase tracking-wider">
              Earned on Campus
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--surface-hover)] p-3.5 border border-[var(--border)] text-center">
            <p className="text-lg font-black text-blue-600 dark:text-blue-400">
              {formatPrice(user.totalSpent)}
            </p>
            <p className="text-[10px] text-[var(--text-muted)] mt-1 font-semibold uppercase tracking-wider">
              Spent Borrowing
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-2">
        <button
          onClick={() => setProfileTab("listings")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            profileTab === "listings"
              ? "bg-blue-600 text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          My Listed Gear ({myListings.length})
        </button>
        <button
          onClick={() => setProfileTab("reviews")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            profileTab === "reviews"
              ? "bg-blue-600 text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Student Reviews ({MOCK_REVIEWS.length})
        </button>
      </div>

      {/* Tab Panels */}
      {profileTab === "listings" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myListings.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {profileTab === "reviews" && (
        <div className="space-y-4">
          {MOCK_REVIEWS.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      )}
    </main>
  );
}
