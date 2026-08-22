"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { MOCK_USERS, MOCK_ITEMS, MOCK_RENTALS } from "@/lib/mockData";
import {
  ShieldAlert,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminOverviewPage() {
  const [activeSubTab, setActiveSubTab] = useState<"disputes" | "users" | "listings">("disputes");

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              Campus Admin Control Center
            </h1>
            <Badge variant="danger" size="sm">SuperAdmin</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            BML Munjal University Campus Ecosystem • Escrow, User Verifications, and Dispute Resolutions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/disputes">
            <Button size="sm" variant="danger" className="text-xs">
              Resolve Disputes (2)
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button size="sm" variant="outline" className="text-xs">
              Verify IDs (4)
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="font-semibold">Platform Volume</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-[var(--text-primary)]">
            {formatPrice(482000)}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">
            +32% this semester
          </span>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="font-semibold">Verified Students</span>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-[var(--text-primary)]">
            1,420
          </p>
          <span className="text-[10px] text-blue-600 font-bold">
            BML Munjal University (98.4% verified)
          </span>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="font-semibold">Active Gear Listed</span>
            <Package className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-[var(--text-primary)]">
            380 Items
          </p>
          <span className="text-[10px] text-purple-600 font-bold">
            78 active rentals today
          </span>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="font-semibold">AI Dispute Resolution Rate</span>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">
            94.8%
          </p>
          <span className="text-[10px] text-amber-600 font-bold">
            Resolved in &lt; 5 mins
          </span>
        </div>
      </div>

      {/* Sub navigation bar */}
      <div className="flex gap-2 border-b border-[var(--border)] pb-2">
        <button
          onClick={() => setActiveSubTab("disputes")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeSubTab === "disputes"
              ? "bg-blue-600 text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Live AI Dispute Reports (2 Pending)
        </button>
        <button
          onClick={() => setActiveSubTab("users")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeSubTab === "users"
              ? "bg-blue-600 text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Student Verifications & Roster
        </button>
        <button
          onClick={() => setActiveSubTab("listings")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
            activeSubTab === "listings"
              ? "bg-blue-600 text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
          }`}
        >
          Campus Item Moderation
        </button>
      </div>

      {/* Sub-tab 1: AI Disputes */}
      {activeSubTab === "disputes" && (
        <div className="space-y-4">
          <div className="rounded-3xl border border-amber-200 dark:border-amber-900 bg-[var(--surface)] p-6 space-y-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="warning" size="sm">Case #DR-2026-0819</Badge>
                  <span className="text-xs text-[var(--text-muted)]">Reported 20m ago</span>
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mt-1">
                  Canon EOS R50 Camera Kit — Minor Lens Scratch
                </h3>
              </div>
              <Badge variant="danger" size="sm">Action Required</Badge>
            </div>

            <div className="rounded-2xl bg-[var(--surface-hover)] p-4 border border-[var(--border)] space-y-2 text-xs text-[var(--text-secondary)]">
              <p>
                <span className="font-bold text-[var(--text-primary)]">Lender:</span> Arjun Mehta • <span className="font-bold text-[var(--text-primary)]">Borrower:</span> Rahul Gupta
              </p>
              <p>
                <span className="font-bold text-[var(--text-primary)]">AI Recommendation:</span> Deduct ₹500 from ₹8,000 security deposit for lens cap replacement. Release balance ₹7,500 to borrower.
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="accent" className="text-xs">
                Approve AI Settlement
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                Review Full Evidence Photos
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Users */}
      {activeSubTab === "users" && (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm">
          <div className="p-4 border-b border-[var(--border)] font-bold text-sm text-[var(--text-primary)]">
            Verified Student Registry ({MOCK_USERS.length})
          </div>
          <div className="divide-y divide-[var(--border)]">
            {MOCK_USERS.map((u) => (
              <div key={u.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar name={u.name} src={u.avatar} size="sm" verified={u.verified} />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">{u.name}</h4>
                    <p className="text-[11px] text-[var(--text-muted)]">{u.email} • {u.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={u.verified ? "success" : "warning"} size="sm">
                    {u.verified ? "Verified" : "Pending"}
                  </Badge>
                  <Button size="sm" variant="ghost" className="text-xs h-7">Inspect</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 3: Listings */}
      {activeSubTab === "listings" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_ITEMS.slice(0, 6).map((item) => (
            <div key={item.id} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-3 shadow-sm">
              <img src={item.images[0]} alt={item.title} className="h-36 w-full rounded-2xl object-cover" />
              <div>
                <h4 className="font-bold text-sm text-[var(--text-primary)] line-clamp-1">{item.title}</h4>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.location}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                <Badge variant={item.availability === "available" ? "success" : "warning"} size="sm">
                  {item.availability}
                </Badge>
                <Button size="sm" variant="danger" className="text-xs h-7">Flag Content</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
