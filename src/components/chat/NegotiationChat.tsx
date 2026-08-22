"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { MockNegotiation } from "@/lib/mockData";
import {
  Send,
  Tag,
  CheckCircle2,
  XCircle,
  Sparkles,
  Shield,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function NegotiationChat({
  negotiation,
  onAcceptOffer,
  onDeclineOffer,
  onMakeOffer,
}: {
  negotiation: MockNegotiation;
  onAcceptOffer?: (msgId: string, amount: number) => void;
  onDeclineOffer?: (msgId: string) => void;
  onMakeOffer?: (amount: number, note: string) => void;
}) {
  const [messages, setMessages] = useState(negotiation.messages);
  const [inputText, setInputText] = useState("");
  const [customOfferAmount, setCustomOfferAmount] = useState<number | "">("");
  const [showOfferModal, setShowOfferModal] = useState(false);

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: "buyer" as const,
      nickname: "BluePanda42",
      content: inputText,
      timestamp: new Date().toISOString(),
      type: "text" as const,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customOfferAmount || Number(customOfferAmount) <= 0) return;

    const newMsg = {
      id: `offer-${Date.now()}`,
      sender: "buyer" as const,
      nickname: "BluePanda42",
      content: `I'd like to propose a rate of ${formatPrice(Number(customOfferAmount))}/day.`,
      timestamp: new Date().toISOString(),
      type: "offer" as const,
      amount: Number(customOfferAmount),
      status: "pending" as const,
    };

    setMessages((prev) => [...prev, newMsg]);
    setCustomOfferAmount("");
    setShowOfferModal(false);
  };

  const handleAccept = (msgId: string, amount: number) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, status: "accepted" as const } : m
      )
    );
    onAcceptOffer?.(msgId, amount);
  };

  const handleDecline = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, status: "declined" as const } : m
      )
    );
    onDeclineOffer?.(msgId);
  };

  return (
    <div className="flex flex-col h-[650px] rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-xl overflow-hidden">
      {/* Header with Anonymous identities */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="font-bold text-sm text-slate-100">
              Anonymous Bargain Room
            </h3>
            <Badge size="sm" variant="info" className="text-[10px]">
              Encrypted Identities
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Item: <span className="text-white font-semibold">{negotiation.itemTitle}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="rounded-xl bg-slate-800/80 px-2.5 py-1 text-slate-300 border border-slate-700">
            You: <span className="font-bold text-emerald-400">BluePanda42</span>
          </div>
        </div>
      </div>

      {/* AI Fair Price Suggestion banner */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/40 dark:to-teal-950/40 border-b border-emerald-200/60 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-200">
        <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p className="leading-snug">
          <span className="font-bold">CampusLend AI Price Advisor:</span> Fair market range is ₹450-₹550/day. You can negotiate up to 15% discount for rentals over 3 days.
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[var(--surface)]">
        {messages.map((msg) => {
          if (msg.type === "suggestion") {
            return (
              <div
                key={msg.id}
                className="rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 p-3 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5"
              >
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed whitespace-pre-line">{msg.content}</p>
              </div>
            );
          }

          const isMe = msg.nickname === "BluePanda42";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <span className="text-[10px] font-bold text-[var(--text-muted)] mb-1 px-1">
                {msg.nickname} {isMe && "(You)"}
              </span>

              {msg.type === "offer" ? (
                /* Interactive Offer Card */
                <div
                  className={`w-full max-w-sm rounded-3xl p-4 border-2 shadow-lg transition-all ${
                    msg.status === "accepted"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
                      : msg.status === "declined"
                      ? "border-red-300 bg-red-50 dark:bg-red-950/20 opacity-70"
                      : "border-blue-500 bg-[var(--surface-hover)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        {isMe ? "Your Price Offer" : "Counter Offer"}
                      </span>
                    </div>
                    {msg.status && (
                      <Badge
                        size="sm"
                        variant={
                          msg.status === "accepted"
                            ? "success"
                            : msg.status === "declined"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {msg.status.toUpperCase()}
                      </Badge>
                    )}
                  </div>

                  <div className="my-3 text-center">
                    <span className="text-2xl font-black text-[var(--text-primary)]">
                      {formatPrice(msg.amount || 0)}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]"> / period</span>
                  </div>

                  {msg.status === "pending" && !isMe && (
                    <div className="flex gap-2 pt-2 border-t border-[var(--border)]">
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDecline(msg.id)}
                        className="flex-1 text-xs h-8"
                      >
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        variant="accent"
                        onClick={() => handleAccept(msg.id, msg.amount || 0)}
                        className="flex-1 text-xs h-8"
                      >
                        Accept Offer
                      </Button>
                    </div>
                  )}

                  {msg.status === "accepted" && (
                    <div className="pt-2 text-center">
                      <Link href={`/items/${negotiation.itemId}/book?discountedPrice=${msg.amount}`}>
                        <Button size="sm" variant="accent" icon={ArrowRight} className="w-full text-xs h-8">
                          Proceed to Book with Deal
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                /* Normal Chat Bubble */
                <div
                  className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed ${
                    isMe
                      ? "bg-blue-600 text-white rounded-tr-xs shadow-md"
                      : "bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-xs"
                  }`}
                >
                  {msg.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="p-3 border-t border-[var(--border)] bg-[var(--surface)] space-y-2">
        {/* Quick Offer Drawer */}
        {showOfferModal && (
          <form
            onSubmit={handleSendOffer}
            className="flex items-center gap-2 p-2 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] animate-slide-up"
          >
            <span className="text-xs font-bold text-[var(--text-primary)] pl-2">₹</span>
            <input
              type="number"
              placeholder="Enter offer price (e.g. 400)"
              value={customOfferAmount}
              onChange={(e) => setCustomOfferAmount(Number(e.target.value))}
              className="flex-1 rounded-xl bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--text-primary)] border border-[var(--border)] focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <Button size="sm" variant="accent" type="submit" className="text-xs h-7 px-3">
              Send Offer
            </Button>
            <Button
              size="sm"
              variant="ghost"
              type="button"
              onClick={() => setShowOfferModal(false)}
              className="text-xs h-7 px-2"
            >
              Cancel
            </Button>
          </form>
        )}

        <form onSubmit={handleSendText} className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            icon={Tag}
            onClick={() => setShowOfferModal(!showOfferModal)}
            className="rounded-xl text-xs h-9 px-3 text-emerald-600 border-emerald-300 dark:border-emerald-800"
          >
            Make Offer
          </Button>

          <input
            type="text"
            placeholder="Type anonymous message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] px-3.5 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:bg-[var(--surface)] transition-all"
          />

          <Button
            type="submit"
            size="sm"
            variant="primary"
            disabled={!inputText.trim()}
            icon={Send}
            className="rounded-xl h-9 w-9 p-0 shrink-0"
          />
        </form>
      </div>
    </div>
  );
}
