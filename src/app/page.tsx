"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { ItemCard } from "@/components/items/ItemCard";
import { CategoryCard } from "@/components/items/CategoryCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/lib/constants";
import { useItemStore } from "@/store/useItemStore";
import { useChatStore } from "@/store/useChatStore";
import {
  Sparkles,
  ShieldCheck,
  Search,
  Zap,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Award,
  Users,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { getFeaturedItems, getRecentItems, setFilter } = useItemStore();
  const { openChat } = useChatStore();
  const [searchInput, setSearchInput] = useState("");

  const featuredItems = getFeaturedItems();
  const recentItems = getRecentItems();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setFilter("search", searchInput);
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 space-y-10 min-w-0">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-3xl gradient-hero text-white p-6 sm:p-10 shadow-2xl">
            {/* Background Glows */}
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-emerald-300 border border-white/15">
                <Sparkles className="h-3.5 w-3.5 animate-spin-slow text-amber-300" />
                <span>Hyperlocal Campus Marketplace • BML Munjal University</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Borrow Anything on Campus in <span className="text-emerald-400">Minutes</span>.
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Rent cameras, laptops, sports gear, books, and hostel gear from verified students with AI dispute recovery and secure deposit escrow.
              </p>

              {/* Quick Search on Mobile / Hero */}
              <form onSubmit={handleHeroSearch} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search for MacBook, suit, books..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full rounded-2xl bg-white/95 text-slate-900 placeholder:text-slate-500 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 font-medium"
                  />
                </div>
                <Button type="submit" variant="accent" size="lg" className="rounded-2xl shrink-0">
                  Find Gear
                </Button>
              </form>

              {/* Trust Micro-Badges */}
              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>College ID Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-emerald-400" />
                  <span>Deposit Protected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span>AI Damage Mediation</span>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Horizontal Carousel */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[var(--text-primary)]">
                  Browse by Category
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Everything you need for studies, hobbies, and hostel living
                </p>
              </div>
              <Link href="/search" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {CATEGORIES.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </section>

          {/* AI Banner Quick Link */}
          <section className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-blue-500/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 shrink-0">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Meet CampusLend AI: Your 24/7 Rental Guardian
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Anonymous bargaining advisor, instant damage assessments, and late-fee calculations.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <Button
                size="sm"
                variant="accent"
                onClick={() => openChat("damage")}
                className="text-xs"
              >
                Damage Recovery
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => openChat("payment")}
                className="text-xs"
              >
                Payment Help
              </Button>
            </div>
          </section>

          {/* Featured / Popular Listings */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-[var(--text-primary)]">
                    Featured Campus Rentals
                  </h2>
                  <Badge variant="warning" size="sm">Trending</Badge>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  High demand items available right now
                </p>
              </div>
              <Link href="/search?sort=rating" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                See More <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {featuredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Near You / Hostel Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-[var(--text-primary)]">
                    Freshly Listed Near You
                  </h2>
                  <Badge variant="success" size="sm" dot>Active Now</Badge>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Available in Hostel Blocks A, B, C & Academic Lockers
                </p>
              </div>
              <Link href="/search?sort=newest" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                Explore All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {recentItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* How It Works 3-Step Section */}
          <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface-hover)] p-6 sm:p-8 space-y-6">
            <div className="text-center max-w-lg mx-auto space-y-1">
              <h3 className="text-xl font-black text-[var(--text-primary)]">
                How CampusLend AI Works
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Simple, safe peer-to-peer micro rentals in 3 steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-2xl bg-[var(--surface)] p-5 border border-[var(--border)] space-y-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 font-black text-sm flex items-center justify-center">
                  1
                </div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  Search or Negotiate
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Browse campus listings or make an anonymous counter-offer with AI fair price guidance.
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--surface)] p-5 border border-[var(--border)] space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 font-black text-sm flex items-center justify-center">
                  2
                </div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  Secure Deposit Escrow
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Pay the rental rate + refundable deposit. Meet at campus pickup spots like libraries or hostels.
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--surface)] p-5 border border-[var(--border)] space-y-3">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 font-black text-sm flex items-center justify-center">
                  3
                </div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  Return & Auto-Refund
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Hand back the item on time. Deposit is released automatically, and rate your peer's trust score.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
