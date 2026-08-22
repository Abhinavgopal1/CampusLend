"use client";

import { NegotiationChat } from "@/components/chat/NegotiationChat";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { MockNegotiation } from "@/lib/mockData";
import { useItemStore } from "@/store/useItemStore";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function NegotiatePage() {
  const params = useParams<{ itemId: string }>();
  const router = useRouter();
  const itemId = params.itemId;

  const { getItemById } = useItemStore();
  const item = getItemById(itemId);

  const handleAcceptOffer = (_msgId: string, amount: number) => {
    if (!item) return;
    // Navigate to booking with negotiated price
    router.push(`/items/${item.id}/book?discountedPrice=${amount}`);
  };

  if (!item) {
    return (
      <main className="mx-auto max-w-lg space-y-4 px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-[var(--text-muted)]" />
        <h1 className="text-2xl font-black text-[var(--text-primary)]">
          Listing not found
        </h1>
        <Link href="/search">
          <Button variant="primary">Browse marketplace</Button>
        </Link>
      </main>
    );
  }

  const fairLow = Math.max(1, Math.round(item.dailyPrice * 0.85));
  const fairHigh = Math.max(fairLow, Math.round(item.dailyPrice * 0.95));
  const negotiation: MockNegotiation = {
    id: `negotiation-${item.id}`,
    itemId: item.id,
    itemTitle: item.title,
    messages: [
      {
        id: `welcome-${item.id}`,
        sender: "ai",
        nickname: "CampusLend AI",
        content: `Welcome to anonymous negotiation. A fair rental range for this listing is ${fairLow}-${fairHigh} per day; the listed rate is ${item.dailyPrice} per day. Personal information is blocked automatically.`,
        timestamp: "2026-01-01T10:00:00.000Z",
        type: "suggestion",
      },
      {
        id: `seller-${item.id}`,
        sender: "seller",
        nickname: "GoldFalcon17",
        content: "I can offer a small discount for a multi-day rental. Here is my current counter-offer.",
        timestamp: "2026-01-01T10:03:00.000Z",
        type: "text",
      },
      {
        id: `counter-${item.id}`,
        sender: "seller",
        nickname: "GoldFalcon17",
        content: "Anonymous counter-offer",
        timestamp: "2026-01-01T10:04:00.000Z",
        type: "offer",
        amount: fairHigh,
        status: "pending",
      },
      {
        id: `advice-${item.id}`,
        sender: "ai",
        nickname: "CampusLend AI",
        content: `This counter-offer is below the listed daily rate. If you accept, checkout will use ${fairHigh} per day and keep both identities hidden.`,
        timestamp: "2026-01-01T10:05:00.000Z",
        type: "suggestion",
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-6 space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <Link href={`/items/${item.id}`}>
            <Button size="sm" variant="ghost" icon={ArrowLeft} className="rounded-xl">
              Back to Item
            </Button>
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-[var(--text-primary)]">
              Anonymous Bargain Room
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              Negotiate fair prices safely with encrypted campus nicknames
            </p>
          </div>
        </div>

        <Badge variant="success" size="sm">
          AI Moderated
        </Badge>
      </div>

      {/* Negotiation Room Component */}
      <NegotiationChat
        negotiation={negotiation}
        listedDailyPrice={item.dailyPrice}
        onAcceptOffer={handleAcceptOffer}
      />
    </main>
  );
}
