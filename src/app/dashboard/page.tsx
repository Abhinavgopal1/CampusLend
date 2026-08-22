"use client";

import { RentalCard } from "@/components/rentals/RentalCard";
import { PurchaseOrderCard } from "@/components/purchases/PurchaseOrderCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, getListingMode, isForSale } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useItemStore } from "@/store/useItemStore";
import { useRentalStore } from "@/store/useRentalStore";
import {
  usePurchaseStore,
  type PurchaseStatus,
} from "@/store/usePurchaseStore";
import { useMessageStore } from "@/store/useMessageStore";
import {
  Clock,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Package,
  Sparkles,
  Plus,
  Edit,
  Pause,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { openChat } = useChatStore();
  const { items, setItemAvailability, setSaleStatus } = useItemStore();
  const { rentals } = useRentalStore();
  const { orders, updateOrderStatus } = usePurchaseStore();
  const { addAutomatedMessage } = useMessageStore();

  const [activeTab, setActiveTab] = useState<
    "active" | "overdue" | "upcoming" | "completed" | "orders" | "my-listings"
  >("active");

  const myListings = items.filter((item) => item.ownerId === user?.id);

  const activeRentals = rentals.filter((r) => r.status === "active");
  const pendingRentals = rentals.filter((r) => r.status === "pending");
  const overdueRentals = rentals.filter((r) => r.status === "overdue");
  const completedRentals = rentals.filter((r) => r.status === "completed");
  const purchaseOrders = orders.filter((order) => order.buyerId === user?.id);
  const saleOrders = orders.filter((order) => order.sellerId === user?.id);
  const purchaseTotal = purchaseOrders.reduce((total, order) => total + order.total, 0);

  useEffect(() => {
    const requestedTab = new URLSearchParams(window.location.search).get("tab");
    if (requestedTab !== "orders") return;
    const timeoutId = window.setTimeout(() => setActiveTab("orders"), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleTogglePause = (id: string) => {
    const item = items.find((listing) => listing.id === id);
    if (item) {
      setItemAvailability(id, item.availability === "available" ? "paused" : "available");
    }
  };

  const handleOrderUpdate = (id: string, status: PurchaseStatus) => {
    const order = orders.find((candidate) => candidate.id === id);
    if (!order) return;

    updateOrderStatus(id, status);
    if (status === "completed") setSaleStatus(order.itemId, "sold");

    addAutomatedMessage(
      `purchase-${id}`,
      status === "ready-for-handoff"
        ? "Seller marked the item ready. Meet only at the verified public handoff point and match the in-app pickup code."
        : "Buyer confirmed receipt. The protected payment has been released and this sale is complete."
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Earnings Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              Marketplace Dashboard
            </h1>
            <Badge variant="success" size="sm" pulse>Live Sync</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Track rentals, purchases, sales, handoffs, and protected payments in one place
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="accent"
            icon={Sparkles}
            onClick={() => openChat("damage")}
            className="text-xs"
          >
            AI Damage Help
          </Button>
          <Link href="/list-item">
            <Button size="sm" variant="primary" icon={Plus} className="text-xs">
              Sell or Rent Item
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Earnings Card */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs">
            <span className="font-semibold">Lending Earnings</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-[var(--text-primary)]">
            {formatPrice(user?.totalEarnings || 12450)}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">
            +18% from last month
          </span>
        </div>

        {/* Spent Card */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs">
            <span className="font-semibold">Marketplace Spending</span>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-[var(--text-primary)]">
            {formatPrice((user?.totalSpent || 8200) + purchaseTotal)}
          </p>
          <span className="text-[10px] text-[var(--text-muted)] font-medium">
            {purchaseOrders.length} purchases • 5 rentals
          </span>
        </div>

        {/* Active Rentals */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs">
            <span className="font-semibold">Active Rentals</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-[var(--text-primary)]">
            {activeRentals.length}
          </p>
          <span className="text-[10px] text-amber-600 font-bold">
            {overdueRentals.length > 0 ? `${overdueRentals.length} Overdue` : "All on schedule"}
          </span>
        </div>

        {/* Active Listings */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-[var(--text-muted)] text-xs">
            <span className="font-semibold">My Campus Listings</span>
            <Package className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-[var(--text-primary)]">
            {myListings.length}
          </p>
          <span className="text-[10px] text-purple-600 font-bold">
            {myListings.filter((item) => item.availability === "available").length} Active
          </span>
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1 border-b border-[var(--border)] no-scrollbar">
        {[
          { id: "active", label: "Active Rentals", count: activeRentals.length },
          { id: "upcoming", label: "Awaiting Handoff", count: pendingRentals.length },
          { id: "overdue", label: "Overdue Items", count: overdueRentals.length, alert: overdueRentals.length > 0 },
          { id: "orders", label: "Purchases & Sales", count: purchaseOrders.length + saleOrders.length },
          { id: "completed", label: "History & Completed", count: completedRentals.length },
          { id: "my-listings", label: "My Listings Management", count: myListings.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : tab.alert
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-slate-100 dark:bg-slate-800 text-[var(--text-muted)]"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content Areas */}
      {activeTab === "active" && (
        <div className="space-y-4">
          {activeRentals.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--border)] p-10 text-center space-y-2">
              <p className="text-sm font-bold text-[var(--text-primary)]">No active rentals right now</p>
              <p className="text-xs text-[var(--text-muted)]">Find gear to rent on the campus marketplace.</p>
              <Link href="/search">
                <Button size="sm" variant="primary" className="mt-2">Browse Marketplace</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeRentals.map((r) => (
                <RentalCard key={r.id} rental={r} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "overdue" && (
        <div className="space-y-4">
          {overdueRentals.length === 0 ? (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 p-8 text-center space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">No Overdue Items!</h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">All your rentals are returned or on schedule.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {overdueRentals.map((r) => (
                <RentalCard key={r.id} rental={r} />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "upcoming" && (
        <div className="space-y-4">
          {pendingRentals.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--border)] p-10 text-center space-y-2">
              <ShieldCheck className="h-8 w-8 text-blue-600 mx-auto" />
              <p className="text-sm font-bold text-[var(--text-primary)]">No handoffs waiting</p>
              <p className="text-xs text-[var(--text-muted)]">New bookings appear here until both students verify the exchange.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pendingRentals.map((r) => <RentalCard key={r.id} rental={r} />)}
            </div>
          )}
        </div>
      )}

      {activeTab === "orders" && (
        <div className="space-y-8">
          {purchaseOrders.length === 0 && saleOrders.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--border)] p-10 text-center">
              <ShoppingBag className="mx-auto h-9 w-9 text-[var(--text-muted)]" />
              <h3 className="mt-3 text-sm font-bold text-[var(--text-primary)]">
                No purchases or sales yet
              </h3>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Buy from a verified student or list something for sale to start.
              </p>
              <Link href="/search?mode=sale">
                <Button size="sm" variant="accent" className="mt-4">
                  Browse items for sale
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {purchaseOrders.length > 0 && (
                <section className="space-y-3">
                  <div>
                    <h2 className="text-base font-black text-[var(--text-primary)]">
                      My purchases
                    </h2>
                    <p className="text-xs text-[var(--text-muted)]">
                      Protected payments stay on hold until pickup is confirmed.
                    </p>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    {purchaseOrders.map((order) => (
                      <PurchaseOrderCard
                        key={order.id}
                        order={order}
                        role="buyer"
                        onUpdateStatus={handleOrderUpdate}
                      />
                    ))}
                  </div>
                </section>
              )}

              {saleOrders.length > 0 && (
                <section className="space-y-3">
                  <div>
                    <h2 className="text-base font-black text-[var(--text-primary)]">
                      My sales
                    </h2>
                    <p className="text-xs text-[var(--text-muted)]">
                      Mark an item ready only when you can complete the public handoff.
                    </p>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    {saleOrders.map((order) => (
                      <PurchaseOrderCard
                        key={order.id}
                        order={order}
                        role="seller"
                        onUpdateStatus={handleOrderUpdate}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === "completed" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {completedRentals.map((r) => (
              <RentalCard key={r.id} rental={r} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "my-listings" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {myListings.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-3.5 shadow-sm"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
                  <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-2 top-2 flex items-center justify-between">
                    <Badge variant="info" size="sm">
                      {getListingMode(item) === "both" ? "RENT + SALE" : getListingMode(item).toUpperCase()}
                    </Badge>
                    <Badge
                      variant={
                        item.availability === "paused" || item.saleStatus === "sold"
                          ? "secondary"
                          : item.saleStatus === "reserved" || item.availability === "rented"
                            ? "warning"
                            : "success"
                      }
                      size="sm"
                    >
                      {item.availability === "paused"
                        ? "PAUSED"
                        : item.saleStatus === "sold"
                          ? "SOLD"
                          : item.saleStatus === "reserved"
                            ? "RESERVED"
                            : item.availability.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)] line-clamp-1">{item.title}</h4>
                  <div className="mt-1 space-y-0.5 text-xs font-bold">
                    {getListingMode(item) !== "sale" && (
                      <p className="text-blue-600">
                        {formatPrice(item.dailyPrice)}/day • {formatPrice(item.deposit)} deposit
                      </p>
                    )}
                    {isForSale(item) && item.salePrice && (
                      <p className="text-emerald-600">
                        {formatPrice(item.salePrice)} sale price
                      </p>
                    )}
                  </div>
                </div>

                {/* Owner controls */}
                <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                  <Button
                    size="sm"
                    variant="outline"
                    icon={Pause}
                    onClick={() => handleTogglePause(item.id)}
                    disabled={item.saleStatus === "sold" || item.availability === "rented"}
                    className="text-xs h-8"
                  >
                    {item.availability === "available" ? "Pause" : "Resume"}
                  </Button>
                  <Link href={`/items/${item.id}`}>
                    <Button size="sm" variant="ghost" icon={Edit} className="text-xs h-8">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
