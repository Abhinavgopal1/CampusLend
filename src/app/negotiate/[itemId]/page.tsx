"use client";

import { NegotiationChat } from "@/components/chat/NegotiationChat";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_ITEMS, MOCK_NEGOTIATION } from "@/lib/mockData";
import { useItemStore } from "@/store/useItemStore";
import { ArrowLeft, Shield, Sparkles, Tag } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function NegotiatePage() {
  const params = useParams();
  const router = useRouter();
  const itemId = params?.itemId as string;

  const { getItemById } = useItemStore();
  const item = getItemById(itemId) || MOCK_ITEMS[0];

  const handleAcceptOffer = (msgId: string, amount: number) => {
    // Navigate to booking with negotiated price
    router.push(`/items/${item.id}/book?discountedPrice=${amount}`);
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
        negotiation={{
          ...MOCK_NEGOTIATION,
          itemId: item.id,
          itemTitle: item.title,
        }}
        onAcceptOffer={handleAcceptOffer}
      />
    </main>
  );
}
