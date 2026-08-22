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
  ArrowRight,
  Camera,
  CheckCircle2,
  Fingerprint,
  ScanLine,
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
          <section className="relative overflow-hidden rounded-[2rem] bg-[#07111f] text-white shadow-2xl shadow-slate-950/20">
            <div className="trust-grid absolute inset-0" />
            <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-blue-600/25 blur-3xl" />

            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
              <div className="flex flex-col justify-center">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.13em] text-emerald-300">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified BMU students only
                </div>

                <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Your campus has everything you need.
                  <span className="mt-2 block bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">Borrow it or buy it, safely.</span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                  Rent for a few days or buy it outright from another student, then exchange it through a protected public-campus handoff.
                </p>

                <form onSubmit={handleHeroSearch} className="mt-7 flex max-w-xl flex-col gap-2 rounded-3xl border border-white/10 bg-white/7 p-2 backdrop-blur sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="What do you need today?" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="w-full rounded-2xl bg-white px-10 py-3 text-sm font-semibold text-slate-950 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                  <Button type="submit" variant="accent" size="lg" className="rounded-2xl shrink-0">Search campus</Button>
                </form>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> No listing fee</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Condition proof</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Campus-only meetups</span>
                </div>
              </div>

              <div className="relative hidden min-h-[430px] lg:block">
                <div className="absolute left-6 top-1/2 w-[88%] -translate-y-1/2 rotate-2 rounded-[2rem] border border-white/15 bg-white/8 p-5 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">CampusTrust handoff</p>
                      <p className="mt-1 text-sm font-bold">MacBook Pro 14&quot; M3</p>
                    </div>
                    <Badge variant="success" size="sm">Live</Badge>
                  </div>
                  <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900" alt="MacBook available through the campus marketplace" className="mt-4 aspect-[16/9] w-full rounded-3xl object-cover" />
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[{ icon: Camera, label: "Photo proof", done: true }, { icon: Fingerprint, label: "Code match", done: true }, { icon: ScanLine, label: "Ready", done: false }].map(({ icon: Icon, label, done }) => (
                      <div key={label} className={`rounded-2xl border p-3 ${done ? "border-emerald-300/20 bg-emerald-300/10" : "border-blue-300/20 bg-blue-300/10"}`}>
                        <Icon className={`h-4 w-4 ${done ? "text-emerald-300" : "text-blue-300"}`} />
                        <p className="mt-2 text-[10px] font-bold text-slate-200">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                    <div><p className="text-[10px] text-slate-400">Deposit protected</p><p className="text-sm font-black">₹5,000</p></div>
                    <div className="flex -space-x-2"><div className="h-9 w-9 rounded-full border-2 border-slate-900 bg-blue-500" /><div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-900 bg-emerald-500 text-[10px] font-black">AI</div></div>
                  </div>
                </div>
                <div className="absolute right-0 top-6 rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 shadow-xl backdrop-blur animate-float">
                  <p className="text-[10px] text-slate-400">Average response</p><p className="mt-1 text-sm font-black text-emerald-300">12 minutes</p>
                </div>
                <div className="absolute bottom-4 left-0 rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 shadow-xl backdrop-blur">
                  <p className="text-[10px] text-slate-400">Students protected</p><p className="mt-1 text-sm font-black">1,240+</p>
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
                  Meet CampusLend AI: Your 24/7 Marketplace Guardian
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Anonymous bargaining, personal-info blocking, protected purchases, and rental support.
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
                    Featured Campus Marketplace
                  </h2>
                  <Badge variant="warning" size="sm">Trending</Badge>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  Popular rentals and student-owned items for sale
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
                  Exchange safely at verified public handoff points around campus
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
                One protected flow for rentals and student-to-student purchases
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-2xl bg-[var(--surface)] p-5 border border-[var(--border)] space-y-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 font-black text-sm flex items-center justify-center">
                  1
                </div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  Search, Buy or Negotiate
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Filter by rent or sale, then make a protected purchase or an anonymous rental offer.
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--surface)] p-5 border border-[var(--border)] space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 font-black text-sm flex items-center justify-center">
                  2
                </div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  Protected Checkout
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Rental deposits and purchase payments stay protected until both students verify the public handoff.
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--surface)] p-5 border border-[var(--border)] space-y-3">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-600 font-black text-sm flex items-center justify-center">
                  3
                </div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">
                  Return or Keep
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Return rentals for an automatic deposit release, or keep purchased items after confirming receipt.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
