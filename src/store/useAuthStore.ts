// ============================================================
// CampusLend AI — Auth Store (Zustand)
// ============================================================

import { create } from "zustand";
import { CURRENT_USER, type MockUser } from "@/lib/mockData";

interface AuthState {
  user: MockUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: Partial<MockUser>) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<MockUser>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: CURRENT_USER, // Start logged in for demo
  isAuthenticated: true,
  isLoading: false,

  login: async () => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ user: CURRENT_USER, isAuthenticated: true, isLoading: false });
  },

  register: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set({ user: CURRENT_USER, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
}));
