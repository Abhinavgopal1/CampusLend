"use client";

import { calculateLateFee, formatPrice, getTimeRemaining } from "@/lib/utils";
import { AlertTriangle, Clock, Flame } from "lucide-react";
import { useEffect, useState } from "react";

export function CountdownTimer({
  endDate,
  hourlyLateFee = 20,
}: {
  endDate: string;
  hourlyLateFee?: number;
}) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const { days, hours, minutes, seconds, isOverdue, totalSeconds } = timeLeft;
  const hoursOverdue = isOverdue ? totalSeconds / 3600 : 0;
  const accumulatedLateFee = calculateLateFee(hourlyLateFee, hoursOverdue);

  if (isOverdue) {
    return (
      <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-3 space-y-2">
        <div className="flex items-center justify-between text-red-600 dark:text-red-400">
          <div className="flex items-center gap-1.5 font-bold text-xs">
            <AlertTriangle className="h-4 w-4 animate-bounce" />
            <span>Rental Overdue!</span>
          </div>
          <span className="text-[11px] font-mono font-bold">
            +{days}d {hours}h {minutes}m {seconds}s
          </span>
        </div>

        <div className="flex justify-between items-center text-xs pt-1 border-t border-red-200 dark:border-red-800/60">
          <span className="text-red-700 dark:text-red-300">
            Late Fee ({formatPrice(hourlyLateFee)}/hr):
          </span>
          <span className="font-extrabold text-red-600 dark:text-red-400">
            +{formatPrice(accumulatedLateFee)}
          </span>
        </div>
      </div>
    );
  }

  // Warning when less than 24 hours left
  const isUrgent = days === 0 && hours < 24;

  return (
    <div
      className={`rounded-2xl p-3 border transition-colors ${
        isUrgent
          ? "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200"
          : "bg-slate-50 dark:bg-slate-900 border-[var(--border)] text-[var(--text-primary)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Clock className={`h-3.5 w-3.5 ${isUrgent ? "text-amber-500" : "text-blue-500"}`} />
          <span className="text-xs font-semibold">
            {isUrgent ? "Due Soon" : "Time Remaining"}
          </span>
        </div>

        {/* Live Timer digits */}
        <div className="flex items-center gap-1 font-mono text-xs font-bold">
          {days > 0 && (
            <span className="rounded bg-[var(--surface)] px-1.5 py-0.5 border border-[var(--border)]">
              {days}d
            </span>
          )}
          <span className="rounded bg-[var(--surface)] px-1.5 py-0.5 border border-[var(--border)]">
            {String(hours).padStart(2, "0")}h
          </span>
          <span className="rounded bg-[var(--surface)] px-1.5 py-0.5 border border-[var(--border)]">
            {String(minutes).padStart(2, "0")}m
          </span>
          <span className="rounded bg-[var(--surface)] px-1.5 py-0.5 border border-[var(--border)] text-blue-600 dark:text-blue-400">
            {String(seconds).padStart(2, "0")}s
          </span>
        </div>
      </div>
    </div>
  );
}
