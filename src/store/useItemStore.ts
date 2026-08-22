// ============================================================
// CampusLend AI — Item Store (Zustand)
// ============================================================

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  MOCK_ITEMS,
  type ListingMode,
  type MockItem,
  type SaleStatus,
} from "@/lib/mockData";
import { isForRent, isForSale, isPurchasableNow, isRentableNow } from "@/lib/utils";

interface ItemFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  condition: string;
  availability: string;
  listingMode: "" | "rent" | "sale";
  sortBy: "newest" | "price-low" | "price-high" | "rating";
}

interface ItemState {
  items: MockItem[];
  filters: ItemFilters;
  savedItems: string[];
  isLoading: boolean;
  viewMode: "grid" | "list";

  // Actions
  setFilter: (key: keyof ItemFilters, value: string | number) => void;
  resetFilters: () => void;
  toggleSaved: (itemId: string) => void;
  addItem: (item: Omit<MockItem, "id" | "createdAt" | "views" | "savedCount">) => MockItem;
  setItemAvailability: (itemId: string, availability: MockItem["availability"]) => void;
  setSaleStatus: (itemId: string, status: SaleStatus) => void;
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
  maxPrice: 50000,
  condition: "",
  availability: "",
  listingMode: "",
  sortBy: "newest",
};

export const useItemStore = create<ItemState>()(persist((set, get) => ({
  items: MOCK_ITEMS,
  filters: defaultFilters,
  savedItems: ["i1", "i5", "i8"], // Some pre-saved for demo
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
    set((state) => ({
      savedItems: state.savedItems.includes(itemId)
        ? state.savedItems.filter((id) => id !== itemId)
        : [...state.savedItems, itemId],
    }));
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

  setSaleStatus: (itemId, saleStatus) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, saleStatus } : item
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

    if (filters.listingMode === "rent") {
      filtered = filtered.filter(isForRent);
    }

    if (filters.listingMode === "sale") {
      filtered = filtered.filter(isForSale);
    }

    // Price range
    filtered = filtered.filter((item) => {
      const prices: number[] = [];
      if (filters.listingMode !== "sale" && isForRent(item)) {
        prices.push(item.dailyPrice);
      }
      if (
        filters.listingMode !== "rent" &&
        isForSale(item) &&
        typeof item.salePrice === "number"
      ) {
        prices.push(item.salePrice);
      }

      return prices.some(
        (price) => price >= filters.minPrice && price <= filters.maxPrice
      );
    });

    // Condition filter
    if (filters.condition) {
      filtered = filtered.filter(
        (item) => item.condition === filters.condition
      );
    }

    // Availability filter
    if (filters.availability) {
      filtered = filtered.filter((item) => {
        if (filters.availability !== "available") {
          return item.availability === filters.availability;
        }

        if (filters.listingMode === "rent") return isRentableNow(item);
        if (filters.listingMode === "sale") return isPurchasableNow(item);
        return isRentableNow(item) || isPurchasableNow(item);
      });
    }

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) => getComparablePrice(a, filters.listingMode) - getComparablePrice(b, filters.listingMode)
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) => getComparablePrice(b, filters.listingMode) - getComparablePrice(a, filters.listingMode)
        );
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
      .items.filter((item) => isRentableNow(item) || isPurchasableNow(item))
      .sort((a, b) => b.savedCount - a.savedCount)
      .slice(0, 6);
  },

  getRecentItems: () => {
    return get()
      .items.filter((item) => isRentableNow(item) || isPurchasableNow(item))
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 8);
  },
}), {
    name: "campuslend-marketplace",
    version: 2,
    storage: createJSONStorage(() => localStorage),
    migrate: (persistedState) => {
      const persisted = persistedState as Partial<ItemState> & {
        savedItems?: unknown;
      };
      const seededItems = new Map(MOCK_ITEMS.map((item) => [item.id, item]));
      const existingItems = Array.isArray(persisted.items)
        ? persisted.items
        : MOCK_ITEMS;

      const items = existingItems.map((item) => {
        const seed = seededItems.get(item.id);
        if (!seed) return item;

        return {
          ...seed,
          ...item,
          listingMode: item.listingMode ?? seed.listingMode,
          salePrice: item.salePrice ?? seed.salePrice,
          saleStatus: item.saleStatus ?? seed.saleStatus,
        };
      });

      return {
        ...persisted,
        items,
        savedItems: Array.isArray(persisted.savedItems)
          ? persisted.savedItems
          : ["i1", "i5", "i8"],
      };
    },
    partialize: (state) => ({ items: state.items, savedItems: state.savedItems }),
  }
));

function getComparablePrice(
  item: MockItem,
  listingMode: "" | Exclude<ListingMode, "both">
): number {
  if (listingMode === "sale") return item.salePrice ?? Number.MAX_SAFE_INTEGER;
  if (listingMode === "rent") return item.dailyPrice;
  return Math.min(item.dailyPrice, item.salePrice ?? Number.MAX_SAFE_INTEGER);
}
