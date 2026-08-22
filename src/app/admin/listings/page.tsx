"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { MOCK_ITEMS } from "@/lib/mockData";
import { ArrowLeft, Ban, Eye, Flame, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminListingsPage() {
  const [items, setItems] = useState(MOCK_ITEMS);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button size="sm" variant="ghost" icon={ArrowLeft}>
              Back to Overview
            </Button>
          </Link>
          <h1 className="text-xl font-black text-[var(--text-primary)]">
            Campus Listings Moderation ({items.length})
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-3.5 shadow-sm"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
              <img src={item.images[0]} alt={item.title} className="h-full w-full object-cover" />
              <div className="absolute top-2 right-2">
                <Badge variant={item.availability === "available" ? "success" : "warning"} size="sm">
                  {item.availability}
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-[var(--text-primary)] line-clamp-1">
                {item.title}
              </h4>
              <p className="text-xs font-bold text-blue-600 mt-1">
                {formatPrice(item.dailyPrice)}/day • Deposit: {formatPrice(item.deposit)}
              </p>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                Owner: {item.ownerName} • {item.location}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
              <Link href={`/items/${item.id}`}>
                <Button size="sm" variant="outline" icon={Eye} className="text-xs h-8">
                  Preview
                </Button>
              </Link>
              <Button
                size="sm"
                variant="danger"
                icon={Trash2}
                onClick={() => handleRemove(item.id)}
                className="text-xs h-8"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
