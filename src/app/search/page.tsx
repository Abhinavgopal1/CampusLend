"use client";

import { ItemCard } from "@/components/items/ItemCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES, ITEM_CONDITIONS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import { useItemStore } from "@/store/useItemStore";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Sparkles,
  MapPin,
  X,
  Filter,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function SearchPage() {
  const {
    filters,
    setFilter,
    resetFilters,
    getFilteredItems,
    viewMode,
    setViewMode,
  } = useItemStore();

  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const items = getFilteredItems();

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
            Explore Campus Marketplace
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {items.length} {items.length === 1 ? "listing" : "listings"} found across BML Munjal University campus
          </p>
        </div>

        {/* View mode toggle & Mobile Filter button */}
        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            icon={SlidersHorizontal}
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className="md:hidden text-xs"
          >
            Filters
          </Button>

          <div className="flex items-center rounded-xl bg-[var(--surface-hover)] p-1 border border-[var(--border)]">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-lg p-1.5 transition-colors ${
                viewMode === "grid"
                  ? "bg-[var(--surface)] text-blue-600 shadow-sm font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-lg p-1.5 transition-colors ${
                viewMode === "list"
                  ? "bg-[var(--surface)] text-blue-600 shadow-sm font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar (Desktop) / Drawer */}
        <aside
          className={`w-full md:w-64 space-y-6 shrink-0 ${
            showFilterDrawer ? "block" : "hidden md:block"
          }`}
        >
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-primary)]">
                <Filter className="h-4 w-4 text-blue-600" />
                <span>Filters</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>

            {/* Keyword Search */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Search Keyword
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. camera, calculator..."
                  value={filters.search}
                  onChange={(e) => setFilter("search", e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilter("category", e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.itemCount})
                  </option>
                ))}
              </select>
            </div>

            {/* Max Daily Price Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[var(--text-secondary)] uppercase tracking-wider">
                  Max Daily Price
                </span>
                <span className="text-blue-600">{formatPrice(filters.maxPrice)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={filters.maxPrice}
                onChange={(e) => setFilter("maxPrice", Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                <span>₹0</span>
                <span>₹1,000+</span>
              </div>
            </div>

            {/* Item Condition */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Condition
              </label>
              <select
                value={filters.condition}
                onChange={(e) => setFilter("condition", e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
              >
                <option value="">Any Condition</option>
                {ITEM_CONDITIONS.map((cond) => (
                  <option key={cond.value} value={cond.value}>
                    {cond.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Availability
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setFilter("availability", filters.availability === "available" ? "" : "available")}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    filters.availability === "available"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40"
                      : "border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  Available Now
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("availability", "")}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    !filters.availability
                      ? "bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/40"
                      : "border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  Show All
                </button>
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilter("sortBy", e.target.value as any)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500 font-medium"
              >
                <option value="newest">Recently Listed</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Owner Rating</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Results Container */}
        <div className="flex-1 space-y-4">
          {/* Applied Filter Chips */}
          {(filters.search || filters.category || filters.condition || filters.availability) && (
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs text-[var(--text-muted)] font-medium">Applied:</span>
              {filters.search && (
                <Badge variant="primary" size="sm" className="gap-1">
                  "{filters.search}"
                  <button onClick={() => setFilter("search", "")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.category && (
                <Badge variant="success" size="sm" className="gap-1">
                  Category: {filters.category}
                  <button onClick={() => setFilter("category", "")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.condition && (
                <Badge variant="warning" size="sm" className="gap-1">
                  Condition: {filters.condition}
                  <button onClick={() => setFilter("condition", "")}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Listings Grid / List */}
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--border)] p-12 text-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base text-[var(--text-primary)]">
                No items match your criteria
              </h3>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
                Try widening your price range or clearing keyword filters to see more student rentals.
              </p>
              <Button size="sm" variant="outline" onClick={resetFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  : "flex flex-col gap-4"
              }
            >
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
