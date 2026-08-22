import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type PurchaseStatus =
  | "confirmed"
  | "ready-for-handoff"
  | "completed"
  | "cancelled";

export interface PurchaseOrder {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  buyerId: string;
  sellerId: string;
  itemPrice: number;
  protectionFee: number;
  total: number;
  status: PurchaseStatus;
  paymentMethod: "upi" | "card";
  handoffSpot: string;
  pickupCode: string;
  createdAt: string;
}

type PurchaseDetails = Omit<
  PurchaseOrder,
  "id" | "status" | "pickupCode" | "createdAt"
>;

interface PurchaseState {
  orders: PurchaseOrder[];
  isLoading: boolean;
  confirmPurchase: (details: PurchaseDetails) => Promise<PurchaseOrder>;
  updateOrderStatus: (id: string, status: PurchaseStatus) => void;
  getOrderById: (id: string) => PurchaseOrder | undefined;
}

function createPickupCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export const usePurchaseStore = create<PurchaseState>()(
  persist(
    (set, get) => ({
      orders: [],
      isLoading: false,

      confirmPurchase: async (details) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 800));

        const order: PurchaseOrder = {
          ...details,
          id: `order-${Date.now()}`,
          status: "confirmed",
          pickupCode: createPickupCode(),
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [order, ...state.orders],
          isLoading: false,
        }));

        return order;
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        }));
      },

      getOrderById: (id) => get().orders.find((order) => order.id === id),
    }),
    {
      name: "campuslend-purchases",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);
