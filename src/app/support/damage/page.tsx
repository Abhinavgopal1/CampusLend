"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Camera,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function DamageRecoveryPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [damageType, setDamageType] = useState<"cosmetic" | "functional" | "missing">("cosmetic");
  const [description, setDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [photos] = useState<string[]>([
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800",
  ]);

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setStep(2);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-bold">
          <ShieldAlert className="h-4 w-4" />
          <span>AI Dispute Mediation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
          AI Damage Recovery Assistant
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Fair, objective damage assessment and automated security deposit compensation for campus rentals
        </p>
      </div>

      {/* Main Flow Container */}
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                1. Select Issue Type & Upload Proof
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Provide clear photos and describe what happened during the rental
              </p>
            </div>

            {/* Issue Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "cosmetic", title: "Minor Scratch / Cosmetic", desc: "Surface scratches or scuffs, item still works" },
                { id: "functional", title: "Broken / Non-functional", desc: "Key functionality impaired or broken parts" },
                { id: "missing", title: "Missing Accessories", desc: "Cables, chargers, caps or carrying cases lost" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setDamageType(t.id as "cosmetic" | "functional" | "missing")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    damageType === t.id
                      ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 ring-2 ring-amber-500/20"
                      : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  <p className="text-xs font-bold text-[var(--text-primary)]">{t.title}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-1">{t.desc}</p>
                </button>
              ))}
            </div>

            {/* Photos */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Damage Evidence Photos
              </label>
              <div className="flex gap-3">
                {photos.map((p, idx) => (
                  <div key={idx} className="relative h-24 w-28 rounded-2xl overflow-hidden border border-[var(--border)]">
                    <img src={p} alt="Evidence" className="h-full w-full object-cover" />
                  </div>
                ))}
                <div className="h-24 w-28 rounded-2xl border-2 border-dashed border-[var(--border)] flex flex-col items-center justify-center p-2 text-center text-slate-400 hover:bg-[var(--surface-hover)] cursor-pointer">
                  <Camera className="h-5 w-5 mb-1" />
                  <span className="text-[10px] font-bold">Add Photo</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Issue Description
              </label>
              <textarea
                rows={3}
                placeholder="Explain when and how the damage occurred or what parts are missing..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <Button
              type="button"
              variant="accent"
              size="lg"
              isLoading={isAnalyzing}
              onClick={handleStartAnalysis}
              icon={Sparkles}
              className="w-full text-sm font-bold shadow-lg shadow-emerald-500/20"
            >
              Analyze with CampusLend AI Vision
            </Button>
          </div>
        )}

        {/* Step 2: AI Report Card */}
        {step === 2 && (
          <div className="space-y-6 animate-scale-in">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    AI Damage Assessment Report #DR-2026-0819
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    Generated via Computer Vision & Peer Market Price Matrix
                  </p>
                </div>
              </div>
              <Badge variant="warning" size="md">Mediated</Badge>
            </div>

            {/* Analysis Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-[var(--surface-hover)] p-4 border border-[var(--border)]">
                <span className="text-[11px] text-[var(--text-muted)] font-semibold">Damage Severity</span>
                <p className="text-base font-black text-amber-600 mt-1">Moderate (Level 2/5)</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Surface scuffing on chassis</p>
              </div>

              <div className="rounded-2xl bg-[var(--surface-hover)] p-4 border border-[var(--border)]">
                <span className="text-[11px] text-[var(--text-muted)] font-semibold">Repair / Deprec. Cost</span>
                <p className="text-base font-black text-[var(--text-primary)] mt-1">₹450 – ₹600</p>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Based on local campus repair benchmarks</p>
              </div>

              <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-4 border border-emerald-300 dark:border-emerald-800">
                <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">Recommended Payout</span>
                <p className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-1">₹500 Deposit Deduction</p>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300 mt-0.5">Remaining ₹4,500 refunded to borrower</p>
              </div>
            </div>

            {/* Detailed AI Reasoning */}
            <div className="rounded-2xl bg-[var(--surface-hover)] p-4 border border-[var(--border)] space-y-2 text-xs text-[var(--text-secondary)]">
              <h4 className="font-bold text-[var(--text-primary)]">AI Mediation Rationale:</h4>
              <p className="leading-relaxed">
                1. Photo analysis confirms cosmetic scratches on the corner bevel that do not impede hardware operation.
              </p>
              <p className="leading-relaxed">
                2. Market value depreciation is calculated at 4.2% of original item listing value.
              </p>
              <p className="leading-relaxed">
                3. We recommend releasing <span className="font-bold text-emerald-600">₹4,500</span> from escrow back to the borrower and paying <span className="font-bold text-emerald-600">₹500</span> to the owner for touch-up restoration.
              </p>
            </div>

            {/* Resolution buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                variant="accent"
                icon={CheckCircle2}
                onClick={() => setStep(3)}
                className="flex-1 text-xs font-bold"
              >
                Accept Resolution & Release Funds
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setStep(1)}
                className="text-xs font-bold"
              >
                Submit More Photos / Contest
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <div className="text-center py-8 space-y-4 animate-scale-in">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-black text-[var(--text-primary)]">
              Dispute Mediated Successfully!
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
              ₹500 compensation has been credited to the lender, and ₹4,500 security deposit balance has been refunded to the borrower.
            </p>
            <div className="pt-2">
              <Link href="/dashboard">
                <Button size="md" variant="primary" className="text-xs font-bold">
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
