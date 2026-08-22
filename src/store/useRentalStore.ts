// ============================================================
// CampusLend AI — Rental Store (Zustand)
// ============================================================

import { create } from "zustand";
import { MOCK_RENTALS, type MockRental } from "@/lib/mockData";

interface RentalState {
  rentals: MockRental[];
  isLoading: boolean;

  // Booking flow state
  bookingItemId: string | null;
  bookingStartDate: string | null;
  bookingEndDate: string | null;
  bookingStep: number;

  // Actions
  getActiveRentals: () => MockRental[];
  getUpcomingReturns: () => MockRental[];
  getCompletedRentals: () => MockRental[];
  getPendingRequests: () => MockRental[];
  getOverdueRentals: () => MockRental[];
  getRentalById: (id: string) => MockRental | undefined;

  // Booking actions
  startBooking: (itemId: string) => void;
  setBookingDates: (start: string, end: string) => void;
  setBookingStep: (step: number) => void;
  confirmBooking: () => Promise<void>;
  cancelBooking: () => void;
}

export const useRentalStore = create<RentalState>((set, get) => ({
  rentals: MOCK_RENTALS,
  isLoading: false,
  bookingItemId: null,
  bookingStartDate: null,
  bookingEndDate: null,
  bookingStep: 0,

  getActiveRentals: () =>
    get().rentals.filter((r) => r.status === "active"),

  getUpcomingReturns: () => {
    const now = new Date();
    const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return get().rentals.filter(
      (r) =>
        r.status === "active" &&
        new Date(r.endDate) <= threeDays &&
        new Date(r.endDate) > now
    );
  },

  getCompletedRentals: () =>
    get().rentals.filter((r) => r.status === "completed"),

  getPendingRequests: () =>
    get().rentals.filter((r) => r.status === "pending"),

  getOverdueRentals: () =>
    get().rentals.filter((r) => r.status === "overdue"),

  getRentalById: (id) =>
    get().rentals.find((r) => r.id === id),

  startBooking: (itemId) => {
    set({
      bookingItemId: itemId,
      bookingStep: 0,
      bookingStartDate: null,
      bookingEndDate: null,
    });
  },

  setBookingDates: (start, end) => {
    set({ bookingStartDate: start, bookingEndDate: end });
  },

  setBookingStep: (step) => {
    set({ bookingStep: step });
  },

  confirmBooking: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // In production, this would create a real rental
    set({ isLoading: false, bookingStep: 3 });
  },

  cancelBooking: () => {
    set({
      bookingItemId: null,
      bookingStartDate: null,
      bookingEndDate: null,
      bookingStep: 0,
    });
  },
}));
