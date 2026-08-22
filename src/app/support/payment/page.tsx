"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import {
  CreditCard,
  Sparkles,
  Send,
  Headphones,
} from "lucide-react";
import { useState } from "react";

export default function PaymentSupportPage() {
  const [selectedTopic, setSelectedTopic] = useState<
    "refund" | "deposit" | "late_fee" | "failed"
  >("deposit");

  const [inputMsg, setInputMsg] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      sender: "ai",
      text: "Hello! I am the CampusLend Payment & Escrow AI. I monitor transactions, refund releases, and late-fee calculations. How can I assist you?",
    },
  ]);

  const [isEscalated, setIsEscalated] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setInputMsg("");

    setChatLog((prev) => [...prev, { sender: "user", text: userText }]);

    setTimeout(() => {
      let reply = "I've checked the ledger for your recent transaction. The deposit of ₹5,000 is safely locked in smart escrow and will be unlocked within 60 seconds of rental return handoff.";
      if (selectedTopic === "refund") {
        reply = "Your refund request of ₹500 has been verified against the rental cancellation terms. The refund was queued to your UPI handle. Reference: #UPI-REF-98124.";
      } else if (selectedTopic === "late_fee") {
        reply = "Late fees are billed at the item's configured rate of ₹10-₹50/hour. If the return delay was due to campus emergencies or peer unavailability, I can issue a 1-time fee waiver.";
      }

      setChatLog((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 1000);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
          <CreditCard className="h-4 w-4" />
          <span>Automated Escrow & Payments</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
          AI Payment & Refund Assistant
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Track security deposit refunds, dispute late fees, and resolve billing issues instantly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Topic Selector & Recent Escrow Records */}
        <div className="md:col-span-5 space-y-4">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 shadow-sm">
            <h3 className="font-bold text-sm text-[var(--text-primary)]">
              What do you need help with?
            </h3>

            <div className="space-y-2">
              {[
                { id: "deposit", label: "Deposit Release Status", desc: "Check when your ₹5,000 deposit returns" },
                { id: "refund", label: "Refund Request", desc: "Cancelled rentals or mistaken charges" },
                { id: "late_fee", label: "Late Fee Dispute", desc: "Request fee waiver for unforeseen delays" },
                { id: "failed", label: "Failed Payment Help", desc: "UPI or card debited without booking" },
              ].map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic.id as "deposit" | "refund" | "late_fee" | "failed")}
                  className={`w-full p-3 rounded-2xl border text-left transition-all ${
                    selectedTopic === topic.id
                      ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20"
                      : "border-[var(--border)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  <p className="text-xs font-bold text-[var(--text-primary)]">{topic.label}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{topic.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Escrow Status Summary */}
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/70 to-teal-50/70 dark:from-emerald-950/30 dark:to-teal-950/30 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                Current Escrow Balance
              </span>
              <Badge variant="success" size="sm">Protected</Badge>
            </div>
            <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
              {formatPrice(5000)}
            </p>
            <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">
              Locked for MacBook Pro 14&quot; rental. Releases upon lender hand-in confirmation.
            </p>
          </div>

          {/* Admin Escalation Button */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center space-y-2">
            <p className="text-xs text-[var(--text-muted)]">Need human admin review?</p>
            {isEscalated ? (
              <Badge variant="warning" size="md">Escalated to Campus Admin #T-491</Badge>
            ) : (
              <Button
                size="sm"
                variant="outline"
                icon={Headphones}
                onClick={() => setIsEscalated(true)}
                className="w-full text-xs font-bold"
              >
                Escalate to Campus Admin
              </Button>
            )}
          </div>
        </div>

        {/* Right Column: AI Interactive Conversation */}
        <div className="md:col-span-7 flex flex-col h-[520px] rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold">Escrow AI Agent</span>
            </div>
            <span className="text-[10px] text-slate-400">Response time: &lt; 2s</span>
          </div>

          {/* Message stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[var(--surface)]">
            {chatLog.map((c, i) => (
              <div
                key={i}
                className={`flex ${c.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                    c.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-xs"
                      : "bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-xs"
                  }`}
                >
                  {c.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input box */}
          <form onSubmit={handleSend} className="p-3 border-t border-[var(--border)] bg-[var(--surface)] flex gap-2">
            <input
              type="text"
              placeholder="Ask about payment or transaction..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
            />
            <Button type="submit" size="sm" variant="accent" icon={Send} className="h-8 w-8 p-0 shrink-0" />
          </form>
        </div>
      </div>
    </main>
  );
}
