"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, formatPrice } from "@/lib/utils";
import type {
  PurchaseOrder,
  PurchaseStatus,
} from "@/store/usePurchaseStore";
import { CheckCircle2, MapPin, MessageCircle, PackageCheck } from "lucide-react";
import Link from "next/link";

export function PurchaseOrderCard({
  order,
  role,
  onUpdateStatus,
}: {
  order: PurchaseOrder;
  role: "buyer" | "seller";
  onUpdateStatus: (id: string, status: PurchaseStatus) => void;
}) {
  const statusConfig = {
    confirmed: { label: "Confirmed", variant: "primary" as const },
    "ready-for-handoff": { label: "Ready for handoff", variant: "warning" as const },
    completed: { label: "Completed", variant: "success" as const },
    cancelled: { label: "Cancelled", variant: "danger" as const },
  }[order.status];

  return (
    <article className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
      <div className="flex gap-3">
        <img
          src={order.itemImage}
          alt={order.itemTitle}
          className="h-20 w-24 shrink-0 rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                {role === "buyer" ? "Purchase" : "Sale"} • {formatDate(order.createdAt)}
              </p>
              <h3 className="mt-1 line-clamp-2 text-sm font-black text-[var(--text-primary)]">
                {order.itemTitle}
              </h3>
            </div>
            <Badge variant={statusConfig.variant} size="sm">
              {statusConfig.label}
            </Badge>
          </div>
          <p className="mt-2 text-base font-black text-emerald-600">
            {formatPrice(order.total)}
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl bg-[var(--surface-hover)] p-3">
          <p className="flex items-start gap-1.5 text-[10px] font-semibold text-[var(--text-secondary)]">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-600" />
            {order.handoffSpot}
          </p>
        </div>
        <div className="rounded-2xl bg-blue-50 p-3 dark:bg-blue-950/30">
          <p className="text-[9px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-300">
            Pickup code
          </p>
          <p className="mt-0.5 font-mono text-lg font-black tracking-[0.18em] text-blue-900 dark:text-blue-100">
            {order.pickupCode}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-3">
        <Link href={`/messages?conversation=purchase-${order.id}`}>
          <Button size="sm" variant="outline" icon={MessageCircle} className="h-8 text-xs">
            Safe chat
          </Button>
        </Link>

        {role === "seller" && order.status === "confirmed" && (
          <Button
            size="sm"
            variant="primary"
            icon={PackageCheck}
            className="h-8 text-xs"
            onClick={() => onUpdateStatus(order.id, "ready-for-handoff")}
          >
            Mark ready
          </Button>
        )}

        {role === "buyer" && order.status === "ready-for-handoff" && (
          <Button
            size="sm"
            variant="accent"
            icon={CheckCircle2}
            className="h-8 text-xs"
            onClick={() => onUpdateStatus(order.id, "completed")}
          >
            Confirm received
          </Button>
        )}

        {order.status === "completed" && (
          <span className="ml-auto flex items-center gap-1 text-[10px] font-bold text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" /> Payment released
          </span>
        )}
      </div>
    </article>
  );
}
