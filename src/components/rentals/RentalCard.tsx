"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CountdownTimer } from "@/components/rentals/CountdownTimer";
import { formatDate, formatPrice } from "@/lib/utils";
import { RENTAL_STATUS_CONFIG } from "@/lib/constants";
import type { MockRental } from "@/lib/mockData";
import {
  Calendar,
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export function RentalCard({
  rental,
  onReturnItem,
  onReportIssue,
}: {
  rental: MockRental;
  onReturnItem?: (id: string) => void;
  onReportIssue?: (id: string) => void;
}) {
  const statusConfig = RENTAL_STATUS_CONFIG[rental.status];

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 shadow-sm hover:shadow-md transition-all space-y-4">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={rental.itemImage}
            alt={rental.itemTitle}
            className="h-16 w-16 rounded-2xl object-cover border border-[var(--border)]"
          />
          <div>
            <h4 className="font-bold text-sm text-[var(--text-primary)] line-clamp-1">
              {rental.itemTitle}
            </h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-[var(--text-muted)]">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {formatDate(rental.startDate)} – {formatDate(rental.endDate)}
              </span>
            </div>
          </div>
        </div>

        <Badge
          variant={
            rental.status === "active"
              ? "success"
              : rental.status === "overdue"
              ? "danger"
              : rental.status === "pending"
              ? "warning"
              : "primary"
          }
          size="sm"
          dot
        >
          {statusConfig.label}
        </Badge>
      </div>

      {/* Countdown timer for active/overdue rentals */}
      {(rental.status === "active" || rental.status === "overdue") && (
        <CountdownTimer
          endDate={rental.endDate}
          hourlyLateFee={rental.hourlyLateFee}
        />
      )}

      {/* Pricing & Deposit summary */}
      <div className="flex items-center justify-between text-xs rounded-2xl bg-[var(--surface-hover)] p-3 border border-[var(--border)]">
        <div>
          <span className="text-[var(--text-muted)]">Total Paid: </span>
          <span className="font-bold text-[var(--text-primary)]">
            {formatPrice(rental.totalCost)}
          </span>
        </div>
        <div>
          <span className="text-[var(--text-muted)]">Security Deposit: </span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {formatPrice(rental.deposit)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-end gap-2 pt-1 border-t border-[var(--border)]">
        {rental.status === "active" && (
          <>
            <Link href={`/support/damage?rentalId=${rental.id}`}>
              <Button
                size="sm"
                variant="outline"
                icon={ShieldAlert}
                className="text-xs h-8 text-amber-600 border-amber-300 dark:border-amber-700"
              >
                Report Issue
              </Button>
            </Link>
            <Button
              size="sm"
              variant="accent"
              icon={RotateCcw}
              onClick={() => onReturnItem?.(rental.id)}
              className="text-xs h-8"
            >
              Confirm Return
            </Button>
          </>
        )}

        {rental.status === "overdue" && (
          <>
            <Link href={`/support/payment?rentalId=${rental.id}`}>
              <Button
                size="sm"
                variant="outline"
                icon={AlertCircle}
                className="text-xs h-8 text-red-600 border-red-300"
              >
                Late Fee Help
              </Button>
            </Link>
            <Button
              size="sm"
              variant="danger"
              icon={RotateCcw}
              onClick={() => onReturnItem?.(rental.id)}
              className="text-xs h-8"
            >
              Return Now
            </Button>
          </>
        )}

        {rental.status === "completed" && (
          <Link href={`/items/${rental.itemId}#review`}>
            <Button size="sm" variant="outline" className="text-xs h-8">
              Leave Review
            </Button>
          </Link>
        )}

        <Link href={`/messages`}>
          <Button size="sm" variant="ghost" icon={MessageCircle} className="text-xs h-8">
            Chat
          </Button>
        </Link>
      </div>
    </div>
  );
}
