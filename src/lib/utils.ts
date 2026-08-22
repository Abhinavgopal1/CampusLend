// ============================================================
// CampusLend AI — Utility Functions
// ============================================================

import { clsx, type ClassValue } from "clsx";
import { PLATFORM_FEE_PERCENT } from "./constants";

/**
 * Merge class names with clsx (Tailwind-friendly)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format currency in INR
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate total rental cost
 */
export function calculateRentalCost(
  dailyRate: number,
  days: number,
  deposit: number
): {
  subtotal: number;
  platformFee: number;
  deposit: number;
  total: number;
} {
  const subtotal = dailyRate * days;
  const platformFee = Math.round(subtotal * (PLATFORM_FEE_PERCENT / 100));
  return {
    subtotal,
    platformFee,
    deposit,
    total: subtotal + platformFee + deposit,
  };
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d);
}

/**
 * Calculate time remaining until a date
 */
export function getTimeRemaining(endDate: Date | string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOverdue: boolean;
  totalSeconds: number;
} {
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  const isOverdue = diffMs < 0;
  const absDiff = Math.abs(diffMs);

  const totalSeconds = Math.floor(absDiff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isOverdue, totalSeconds };
}

/**
 * Generate star rating display
 */
export function getStarDisplay(rating: number): {
  full: number;
  half: boolean;
  empty: number;
} {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

/**
 * Generate initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Delay helper for animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Calculate late fee
 */
export function calculateLateFee(
  hourlyRate: number,
  hoursOverdue: number
): number {
  return Math.ceil(hoursOverdue) * hourlyRate;
}

/**
 * Get availability text
 */
export function getAvailabilityText(
  status: "available" | "rented" | "paused"
): string {
  switch (status) {
    case "available":
      return "Available Now";
    case "rented":
      return "Currently Rented";
    case "paused":
      return "Listing Paused";
  }
}
