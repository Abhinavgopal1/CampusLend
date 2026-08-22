"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState([
    {
      id: "DR-2026-0819",
      item: "Canon EOS R50 Camera Kit",
      lender: "Arjun Mehta",
      borrower: "Rahul Gupta",
      deposit: 8000,
      damage: "Minor Lens Bevel Scuff",
      aiRecommendation: "Deduct ₹500 from deposit, release ₹7,500 to borrower",
      status: "pending",
    },
    {
      id: "DR-2026-0818",
      item: "Honda Activa 6G Scooter",
      lender: "Karan Chopra",
      borrower: "Vikram Singh",
      deposit: 3000,
      damage: "Helmet strap clip missing",
      aiRecommendation: "Deduct ₹150 for replacement clip",
      status: "pending",
    },
  ]);

  const handleResolve = (id: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "resolved" } : d))
    );
  };

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button size="sm" variant="ghost" icon={ArrowLeft}>
              Back to Overview
            </Button>
          </Link>
          <h1 className="text-xl font-black text-[var(--text-primary)]">
            AI Dispute Resolution Queue
          </h1>
        </div>
        <Badge variant="warning" size="sm">
          {disputes.filter((d) => d.status === "pending").length} Pending
        </Badge>
      </div>

      <div className="space-y-4">
        {disputes.map((d) => (
          <div
            key={d.id}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs text-blue-600 font-bold">
                  #{d.id}
                </span>
                <h3 className="text-base font-bold text-[var(--text-primary)] mt-0.5">
                  {d.item}
                </h3>
              </div>
              <Badge variant={d.status === "resolved" ? "success" : "warning"} size="sm">
                {d.status.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs rounded-2xl bg-[var(--surface-hover)] p-3 border border-[var(--border)]">
              <div>
                <span className="text-[var(--text-muted)]">Lender:</span>
                <p className="font-bold text-[var(--text-primary)]">{d.lender}</p>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Borrower:</span>
                <p className="font-bold text-[var(--text-primary)]">{d.borrower}</p>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Deposit Escrow:</span>
                <p className="font-bold text-emerald-600">{formatPrice(d.deposit)}</p>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Issue:</span>
                <p className="font-bold text-amber-600">{d.damage}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-3.5 border border-emerald-300 dark:border-emerald-800 flex items-start gap-2.5 text-xs text-emerald-900 dark:text-emerald-200">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">CampusLend AI Recommendation:</p>
                <p className="mt-0.5 opacity-90">{d.aiRecommendation}</p>
              </div>
            </div>

            {d.status === "pending" && (
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="accent"
                  icon={CheckCircle2}
                  onClick={() => handleResolve(d.id)}
                  className="text-xs"
                >
                  Approve AI Payout & Close
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  Request Human Inspection
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
