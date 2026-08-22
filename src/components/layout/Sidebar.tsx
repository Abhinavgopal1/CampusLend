"use client";

import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useItemStore } from "@/store/useItemStore";
import {
  Clock,
  ShieldCheck,
  Award,
  Flame,
  MessageSquare,
  FileCheck2,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { filters, setFilter } = useItemStore();

  const mainLinks = [
    { label: "Trending on Campus", href: "/search?sort=rating", icon: Flame, badge: "Hot" },
    { label: "Buy from Students", href: "/search?mode=sale", icon: ShoppingBag, badge: "New" },
    { label: "Orders & Rentals", href: "/dashboard", icon: Clock },
    { label: "Price Negotiations", href: "/messages", icon: MessageSquare, badge: "Live" },
    { label: "Damage Recovery AI", href: "/support/damage", icon: ShieldCheck },
    { label: "Payment Assistant", href: "/support/payment", icon: FileCheck2 },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col gap-6 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-4 no-scrollbar">
      {/* Quick Navigation Box */}
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Quick Access
        </p>
        <div className="mt-2 space-y-1">
          {mainLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-[var(--text-muted)] group-hover:text-blue-600 transition-colors" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Categories Widget */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Explore Categories
          </p>
          <Link
            href="/search"
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            All
          </Link>
        </div>

        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = filters.category === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  const nextCategory = isSelected ? "" : cat.id;
                  setFilter("category", nextCategory);
                  router.push(
                    nextCategory
                      ? `/search?category=${encodeURIComponent(nextCategory)}`
                      : "/search"
                  );
                }}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left",
                  isSelected
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                  <span>{cat.name}</span>
                </div>
                <span className="text-[11px] text-[var(--text-muted)]">
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trust & Campus Banner */}
      <div className="rounded-2xl border border-blue-200/60 dark:border-blue-900/40 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 space-y-2">
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-xs">
          <Award className="h-4 w-4" />
          <span>Campus Verified Only</span>
        </div>
        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
          All listings are verified with university email & hostel location. Security deposits held safely.
        </p>
      </div>
    </aside>
  );
}
