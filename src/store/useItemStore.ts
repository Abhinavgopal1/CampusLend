// ============================================================
// CampusLend AI — Item Store (Zustand)
// ============================================================

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MOCK_ITEMS, type MockItem } from "@/lib/mockData";

interface ItemFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  condition: string;
  availability: string;
  sortBy: "newest" | "price-low" | "price-high" | "rating";
}

interface ItemState {
  items: MockItem[];
  filters: ItemFilters;
  savedItems: Set<string>;
  isLoading: boolean;
  viewMode: "grid" | "list";

  // Actions
  setFilter: (key: keyof ItemFilters, value: string | number) => void;
  resetFilters: () => void;
  toggleSaved: (itemId: string) => void;
  addItem: (item: Omit<MockItem, "id" | "createdAt" | "views" | "savedCount">) => MockItem;
  setItemAvailability: (itemId: string, availability: MockItem["availability"]) => void;
  setViewMode: (mode: "grid" | "list") => void;
  getFilteredItems: () => MockItem[];
  getItemById: (id: string) => MockItem | undefined;
  getItemsByCategory: (category: string) => MockItem[];
  getFeaturedItems: () => MockItem[];
  getRecentItems: () => MockItem[];
}

const defaultFilters: ItemFilters = {
  search: "",
  category: "",
  minPrice: 0,
  maxPrice: 10000,
  condition: "",
  availability: "",
  sortBy: "newest",
};

export const useItemStore = create<ItemState>()(persist((set, get) => ({
  items: MOCK_ITEMS,
  filters: defaultFilters,
  savedItems: new Set(["i1", "i5", "i8"]), // Some pre-saved for demo
  isLoading: false,
  viewMode: "grid",

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },

  toggleSaved: (itemId) => {
    set((state) => {
      const newSaved = new Set(state.savedItems);
      if (newSaved.has(itemId)) {
        newSaved.delete(itemId);
      } else {
        newSaved.add(itemId);
      }
      return { savedItems: newSaved };
    });
  },

  addItem: (item) => {
    const newItem: MockItem = {
      ...item,
      id: `item-${Date.now()}`,
      createdAt: new Date().toISOString(),
      views: 0,
      savedCount: 0,
    };
    set((state) => ({ items: [newItem, ...state.items] }));
    return newItem;
  },

  setItemAvailability: (itemId, availability) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, availability } : item
      ),
    }));
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
  },

  getFilteredItems: () => {
    const { items, filters } = get();
    let filtered = [...items];

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    // Price range
    filtered = filtered.filter(
      (item) =>
        item.dailyPrice >= filters.minPrice &&
        item.dailyPrice <= filters.maxPrice
    );

    // Condition filter
    if (filters.condition) {
      filtered = filtered.filter(
        (item) => item.condition === filters.condition
      );
    }

    // Availability filter
    if (filters.availability) {
      filtered = filtered.filter(
        (item) => item.availability === filters.availability
      );
    }

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.dailyPrice - b.dailyPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.dailyPrice - a.dailyPrice);
        break;
      case "rating":
        filtered.sort((a, b) => b.ownerRating - a.ownerRating);
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return filtered;
  },

  getItemById: (id) => {
    return get().items.find((item) => item.id === id);
  },

  getItemsByCategory: (category) => {
    return get().items.filter((item) => item.category === category);
  },

  getFeaturedItems: () => {
    return get()
      .items.filter((i) => i.availability === "available")
      .sort((a, b) => b.savedCount - a.savedCount)
      .slice(0, 6);
  },

  getRecentItems: () => {
    return get()
      .items.filter((i) => i.availability === "available")
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 8);
  },
}), {
    name: "campuslend-marketplace",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ items: state.items }),
  }
));
