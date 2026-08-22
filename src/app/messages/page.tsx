"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatRelativeTime } from "@/lib/utils";
import { MOCK_MESSAGES, type MockMessage } from "@/lib/mockData";
import {
  MessageCircle,
  Search,
  Tag,
  Clock,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MessagesPage() {
  const [filterType, setFilterType] = useState<"all" | "rental" | "negotiation" | "support">("all");
  const [selectedConv, setSelectedConv] = useState<MockMessage>(MOCK_MESSAGES[0]);
  const [chatHistory, setChatHistory] = useState([
    { id: "1", sender: "other", text: "Hey Arjun! Is the pickup still good for 5 PM at Hostel Block A?" },
    { id: "2", sender: "me", text: "Yes! I'm in Room 214. I've charged the laptop to 100% and packed the sleeve." },
    { id: "3", sender: "other", text: "Awesome, I'll bring the security deposit QR code ready on my phone." },
  ]);
  const [replyInput, setReplyInput] = useState("");

  const filteredMessages = MOCK_MESSAGES.filter(
    (m) => filterType === "all" || m.type === filterType
  );

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: "me",
      text: replyInput,
    };

    setChatHistory([...chatHistory, newMsg]);
    setReplyInput("");
  };

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">
            Campus Messages & Negotiations
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Coordinate handoffs, bargain rates, and get AI support
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[var(--surface-hover)] p-1 rounded-2xl border border-[var(--border)]">
          {(["all", "rental", "negotiation", "support"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-colors ${
                filterType === t
                  ? "bg-[var(--surface)] text-blue-600 shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
        {/* Left List of Conversations */}
        <div className="md:col-span-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-3 overflow-y-auto space-y-2 shadow-sm">
          {filteredMessages.map((msg) => {
            const isSelected = selectedConv.id === msg.id;
            return (
              <button
                key={msg.id}
                type="button"
                onClick={() => setSelectedConv(msg)}
                className={`w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all ${
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800"
                    : "hover:bg-[var(--surface-hover)] border border-transparent"
                }`}
              >
                <Avatar name={msg.senderName} src={msg.senderAvatar} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-[var(--text-primary)] truncate">
                      {msg.senderName}
                    </h4>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {formatRelativeTime(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] truncate mt-0.5">
                    {msg.lastMessage}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Badge
                      variant={
                        msg.type === "negotiation"
                          ? "warning"
                          : msg.type === "support"
                          ? "info"
                          : "primary"
                      }
                      size="sm"
                    >
                      {msg.type}
                    </Badge>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Active Conversation View */}
        <div className="md:col-span-7 flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm overflow-hidden">
          {/* Active Chat Header */}
          <div className="p-4 border-b border-[var(--border)] bg-[var(--surface-hover)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                name={selectedConv.senderName}
                src={selectedConv.senderAvatar}
                size="sm"
              />
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                  {selectedConv.senderName}
                </h3>
                <p className="text-[10px] text-emerald-600 font-medium">
                  Verified Campus Peer • Active Now
                </p>
              </div>
            </div>

            {selectedConv.type === "negotiation" && (
              <Link href="/negotiate/i1">
                <Button size="sm" variant="accent" icon={Tag} className="text-xs h-7">
                  Anonymous Bargain Room
                </Button>
              </Link>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[var(--surface)]">
            {chatHistory.map((m) => {
              const isMe = m.sender === "me";
              return (
                <div
                  key={m.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed ${
                      isMe
                        ? "bg-blue-600 text-white rounded-tr-xs"
                        : "bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-xs"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply Form */}
          <form
            onSubmit={handleSendReply}
            className="p-3 border-t border-[var(--border)] bg-[var(--surface)] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Message ${selectedConv.senderName}...`}
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] px-3.5 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
            />
            <Button
              type="submit"
              size="sm"
              variant="primary"
              disabled={!replyInput.trim()}
              icon={Send}
              className="rounded-xl h-9 w-9 p-0 shrink-0"
            />
          </form>
        </div>
      </div>
    </main>
  );
}
