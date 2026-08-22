"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useItemStore } from "@/store/useItemStore";
import {
  Bell,
  Search,
  Sparkles,
  Plus,
  ShieldCheck,
  LogOut,
  SlidersHorizontal,
  GraduationCap,
  MessageSquare,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function TopNav() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { filters, setFilter } = useItemStore();
  const { openChat } = useChatStore();

  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter("search", searchQuery);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-[var(--text-primary)]">
                  CampusLend
                </span>
                <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-[var(--text-muted)] -mt-1">
                BML Munjal University Campus Hub
              </p>
            </div>
          </Link>
        </div>

        {/* Global Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-md hidden md:flex items-center relative"
        >
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              placeholder="Search items, books, cameras, hostels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] pl-10 pr-24 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:bg-[var(--surface)] focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[var(--primary-500)]/20 focus:outline-none transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Link
                href="/search"
                className="rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors"
                title="Filters"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </form>

        {/* Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick AI Assistant Launcher */}
          <button
            onClick={() => openChat("general")}
            className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/30 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/60 transition-colors shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-spin-slow" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          {/* List Item CTA button */}
          <Link href="/list-item" className="hidden sm:inline-block">
            <Button size="sm" variant="accent" icon={Plus}>
              List Item
            </Button>
          </Link>

          {/* Theme Switcher Quick Toggle */}
          <ThemeSwitcher variant="toggle" />

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-xl p-2.5 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl z-50 animate-scale-in">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">
                    Notifications
                  </h4>
                  <Badge size="sm" variant="success">3 New</Badge>
                </div>
                <div className="divide-y divide-[var(--border)] max-h-72 overflow-y-auto">
                  <div className="py-2.5 space-y-1">
                    <p className="text-xs font-semibold text-[var(--text-primary)]">
                      🎉 Offer Accepted!
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Your offer for MacBook Pro 14" was accepted by seller.
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)]">10m ago</p>
                  </div>
                  <div className="py-2.5 space-y-1">
                    <p className="text-xs font-semibold text-[var(--text-primary)]">
                      ⏰ Return Reminder
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      Tripod + Ring Light Kit is due for return in 24 hours.
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)]">2h ago</p>
                  </div>
                  <div className="py-2.5 space-y-1">
                    <p className="text-xs font-semibold text-[var(--text-primary)]">
                      🛡️ Dispute Resolved
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      AI Damage mediator approved ₹500 compensation deposit.
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)]">1d ago</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 rounded-full p-0.5 ring-2 ring-transparent hover:ring-blue-500 transition-all"
              >
                <Avatar
                  name={user.name}
                  src={user.avatar}
                  size="sm"
                  verified={user.verified}
                />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-2xl z-50 animate-scale-in">
                  <div className="px-3 py-2.5 border-b border-[var(--border)]">
                    <p className="text-sm font-bold text-[var(--text-primary)]">
                      {user.name}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] truncate">
                      {user.email}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Badge size="sm" variant={user.verified ? "success" : "warning"}>
                        {user.verified ? "Verified Student" : "Pending ID"}
                      </Badge>
                      <span className="text-[11px] text-[var(--text-muted)]">
                        {user.college}
                      </span>
                    </div>
                  </div>

                  {/* Theme Switcher Segmented inside User Dropdown */}
                  <div className="p-2 border-b border-[var(--border)]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5 px-1">
                      Theme Mode
                    </p>
                    <ThemeSwitcher variant="segmented" className="w-full justify-between" />
                  </div>

                  <div className="py-1 text-xs">
                    <Link
                      href="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[var(--text-primary)] hover:bg-[var(--surface-hover)] font-medium"
                    >
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                      My Profile & Ratings
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[var(--text-primary)] hover:bg-[var(--surface-hover)] font-medium"
                    >
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      Rentals & Time Tracker
                    </Link>
                    <Link
                      href="/messages"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[var(--text-primary)] hover:bg-[var(--surface-hover)] font-medium"
                    >
                      <MessageSquare className="h-4 w-4 text-purple-500" />
                      Chats & Bargains
                    </Link>
                    <Link
                      href="/admin"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 font-medium"
                    >
                      <ShieldAlert className="h-4 w-4 text-amber-500" />
                      Admin Dashboard
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-[var(--border)]">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="flex w-full items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm" variant="primary">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
