"use client";

import { calculateRentalCost, formatPrice } from "@/lib/utils";
import { PLATFORM_FEE_PERCENT } from "@/lib/constants";
import { Info, ShieldCheck, HelpCircle } from "lucide-react";

export function PricingBreakdown({
  dailyPrice,
  deposit,
  days,
  onDaysChange,
}: {
  dailyPrice: number;
  deposit: number;
  days: number;
  onDaysChange?: (days: number) => void;
}) {
  const { subtotal, platformFee, total } = calculateRentalCost(
    dailyPrice,
    days,
    deposit
  );

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-hover)] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-[var(--text-primary)]">
          Price Calculation
        </h4>
        {onDaysChange && (
          <div className="flex items-center gap-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-2.5 py-1">
            <button
              onClick={() => onDaysChange(Math.max(1, days - 1))}
              className="h-5 w-5 rounded text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
            >
              -
            </button>
            <span className="text-xs font-bold text-[var(--text-primary)] px-2">
              {days} {days === 1 ? "day" : "days"}
            </span>
            <button
              onClick={() => onDaysChange(Math.min(30, days + 1))}
              className="h-5 w-5 rounded text-xs font-bold text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
            >
              +
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2.5 text-xs text-[var(--text-secondary)]">
        {/* Rental Rate */}
        <div className="flex justify-between">
          <span>
            {formatPrice(dailyPrice)} × {days} {days === 1 ? "day" : "days"}
          </span>
          <span className="font-medium text-[var(--text-primary)]">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Platform Fee */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span>CampusLend Safety Fee ({PLATFORM_FEE_PERCENT}%)</span>
            <span
              title="Covers 24/7 AI dispute mediation & damage insurance"
              className="cursor-help"
            >
              <Info className="h-3 w-3 text-slate-400" />
            </span>
          </div>
          <span className="font-medium text-[var(--text-primary)]">
            {formatPrice(platformFee)}
          </span>
        </div>

        {/* Security Deposit */}
        <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400">
          <div className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="font-semibold">Refundable Security Deposit</span>
          </div>
          <span className="font-bold">{formatPrice(deposit)}</span>
        </div>

        <div className="border-t border-[var(--border)] pt-2.5 flex justify-between items-baseline">
          <div>
            <p className="font-bold text-sm text-[var(--text-primary)]">
              Total Payable
            </p>
            <p className="text-[10px] text-[var(--text-muted)]">
              Deposit of {formatPrice(deposit)} is returned upon return
            </p>
          </div>
          <span className="text-lg font-black text-blue-600 dark:text-blue-400">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
