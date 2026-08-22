"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  calculatePurchaseCost,
  formatPrice,
  getPublicHandoffSpot,
  isForSale,
  isPurchasableNow,
} from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useItemStore } from "@/store/useItemStore";
import { useMessageStore } from "@/store/useMessageStore";
import {
  usePurchaseStore,
  type PurchaseOrder,
} from "@/store/usePurchaseStore";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function BuyItemPage() {
  const params = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const { getItemById, setSaleStatus } = useItemStore();
  const { confirmPurchase, isLoading } = usePurchaseStore();
  const { ensureTransactionConversation } = useMessageStore();
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [order, setOrder] = useState<PurchaseOrder | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const item = getItemById(params.id);

  if (!item || !isForSale(item) || typeof item.salePrice !== "number") {
    return (
      <main className="mx-auto max-w-lg space-y-5 px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
        <h1 className="text-2xl font-black text-[var(--text-primary)]">
          This item is not listed for sale
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          It may be rental-only, unavailable, or no longer listed.
        </p>
        <Link href="/search?mode=sale">
          <Button variant="primary">Browse items for sale</Button>
        </Link>
      </main>
    );
  }

  const costs = calculatePurchaseCost(item.salePrice);
  const handoffSpot = getPublicHandoffSpot(item.location);
  const isOwnListing = user?.id === item.ownerId;
  const isAvailable = isPurchasableNow(item);

  const handlePurchase = async () => {
    setError(null);

    if (!user) {
      setError("Sign in with your verified campus account before buying.");
      return;
    }
    if (isOwnListing) {
      setError("This is your own listing, so it cannot be purchased from this account.");
      return;
    }
    if (!isAvailable) {
      setError("This item has already been reserved, sold, or paused.");
      return;
    }
    if (!acceptedTerms) {
      setError("Accept the CampusProtect handoff terms to continue.");
      return;
    }

    const createdOrder = await confirmPurchase({
      itemId: item.id,
      itemTitle: item.title,
      itemImage: item.images[0] ?? "",
      buyerId: user.id,
      sellerId: item.ownerId,
      itemPrice: costs.itemPrice,
      protectionFee: costs.protectionFee,
      total: costs.total,
      paymentMethod,
      handoffSpot,
    });

    setSaleStatus(item.id, "reserved");
    const safeConversationId = ensureTransactionConversation({
      id: `purchase-${createdOrder.id}`,
      peerId: item.ownerId,
      itemId: item.id,
      itemTitle: item.title,
      type: "purchase",
      automatedText: `Purchase ${createdOrder.id} is confirmed. Meet only at ${handoffSpot}. CampusLend will use the six-digit pickup code to verify the exchange; keep personal contact details out of chat.`,
    });
    setConversationId(safeConversationId);
    setOrder(createdOrder);
  };

  if (order) {
    return (
      <main className="mx-auto max-w-2xl space-y-6 px-4 py-12 sm:px-6">
        <div className="rounded-[2rem] border border-emerald-200 bg-[var(--surface)] p-6 text-center shadow-xl dark:border-emerald-900 sm:p-9">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
            <CheckCircle2 className="h-11 w-11" />
          </div>
          <Badge variant="success" size="md" className="mt-5">
            Purchase confirmed
          </Badge>
          <h1 className="mt-3 text-3xl font-black text-[var(--text-primary)]">
            {item.title} is reserved for you
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
            Payment is protected until the campus handoff is verified. Both
            identities remain hidden in chat.
          </p>

          <div className="mx-auto mt-6 grid max-w-lg gap-3 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] p-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                Public handoff point
              </p>
              <p className="mt-1 flex items-start gap-1.5 text-xs font-bold text-[var(--text-primary)]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
                {order.handoffSpot}
              </p>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
              <p className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-300">
                Pickup verification code
              </p>
              <p className="mt-1 font-mono text-2xl font-black tracking-[0.24em] text-blue-900 dark:text-blue-100">
                {order.pickupCode}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            {conversationId && (
              <Link href={`/messages?conversation=${conversationId}`}>
                <Button variant="accent" icon={MessageCircle}>
                  Open safe chat
                </Button>
              </Link>
            )}
            <Link href="/dashboard?tab=orders">
              <Button variant="outline">Track purchase</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <Link
          href={`/items/${item.id}`}
          className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-secondary)] hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to listing
        </Link>
        <Badge variant="success" size="sm">
          CampusProtect checkout
        </Badge>
      </div>

      <div className="grid gap-7 lg:grid-cols-[1fr_0.8fr]">
        <section className="space-y-5 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-[var(--text-primary)]">
              Complete your purchase
            </h1>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Demo checkout — no real payment is charged.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/25">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <h2 className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                  Buyer protection included
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-emerald-800 dark:text-emerald-200">
                  The seller is paid only after the pickup code is matched and the
                  item condition is confirmed at a public campus point.
                </p>
              </div>
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-xs font-black uppercase tracking-wider text-[var(--text-secondary)]">
              Demo payment method
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  paymentMethod === "upi"
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/15 dark:bg-blue-950/30"
                    : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                <Smartphone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">Campus UPI</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Instant demo payment</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                  paymentMethod === "card"
                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/15 dark:bg-blue-950/30"
                    : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                <CreditCard className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">Campus card</p>
                  <p className="text-[10px] text-[var(--text-muted)]">Protected demo checkout</p>
                </div>
              </button>
            </div>
          </fieldset>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] p-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">
              Handoff plan
            </p>
            <p className="mt-2 flex items-start gap-2 text-xs font-bold text-[var(--text-primary)]">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" /> {handoffSpot}
            </p>
            <p className="mt-2 flex items-start gap-2 text-[11px] leading-relaxed text-[var(--text-secondary)]">
              <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
              Names and contact details stay blocked in chat. Use the in-app code
              for the exchange.
            </p>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--border)] p-4">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-blue-600"
            />
            <span className="text-xs leading-relaxed text-[var(--text-secondary)]">
              I will meet only at the verified public point and confirm the item
              before sharing the pickup code.
            </span>
          </label>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </p>
          )}

          <Button
            size="lg"
            variant="accent"
            icon={ShoppingBag}
            isLoading={isLoading}
            disabled={!acceptedTerms || !isAvailable || isOwnListing}
            onClick={handlePurchase}
            className="w-full"
          >
            Confirm purchase • {formatPrice(costs.total)}
          </Button>
        </section>

        <aside className="h-fit space-y-4 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xl lg:sticky lg:top-24">
          <div className="flex gap-4">
            <img
              src={item.images[0]}
              alt={item.title}
              className="h-24 w-28 rounded-2xl object-cover"
            />
            <div className="min-w-0">
              <Badge variant="warning" size="sm">For sale</Badge>
              <h2 className="mt-2 line-clamp-2 text-sm font-black text-[var(--text-primary)]">
                {item.title}
              </h2>
              <p className="mt-1 text-xs capitalize text-[var(--text-muted)]">
                {item.condition} condition
              </p>
            </div>
          </div>

          <div className="space-y-2 border-t border-[var(--border)] pt-4 text-xs">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Item price</span>
              <span className="font-bold text-[var(--text-primary)]">
                {formatPrice(costs.itemPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Buyer protection (2%)</span>
              <span className="font-bold text-[var(--text-primary)]">
                {formatPrice(costs.protectionFee)}
              </span>
            </div>
            <div className="flex justify-between border-t border-[var(--border)] pt-3 text-base">
              <span className="font-black text-[var(--text-primary)]">Total</span>
              <span className="font-black text-emerald-600">
                {formatPrice(costs.total)}
              </span>
            </div>
          </div>

          {!isAvailable && (
            <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
              This listing is currently reserved, sold, or paused.
            </p>
          )}
          {isOwnListing && (
            <p className="rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
              This is your listing. Manage it from the dashboard.
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}
