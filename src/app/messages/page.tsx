"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CHAT_PRIVACY_NOTICE } from "@/lib/chatSafety";
import { formatRelativeTime } from "@/lib/utils";
import {
  useMessageStore,
  type ConversationType,
} from "@/store/useMessageStore";
import {
  Bot,
  LockKeyhole,
  MessageCircle,
  Send,
  ShieldCheck,
  ShoppingBag,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MessageFilter = "all" | ConversationType;

const FILTERS: Array<{ id: MessageFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "rental", label: "Rentals" },
  { id: "purchase", label: "Purchases" },
  { id: "negotiation", label: "Offers" },
  { id: "support", label: "Support" },
];

export default function MessagesPage() {
  const {
    conversations,
    messagesByConversation,
    sendMessage,
    markRead,
  } = useMessageStore();
  const [filterType, setFilterType] = useState<MessageFilter>("all");
  const [selectedConversationId, setSelectedConversationId] = useState(
    conversations[0]?.id ?? ""
  );
  const [replyInput, setReplyInput] = useState("");
  const [safetyFeedback, setSafetyFeedback] = useState<string | null>(null);

  useEffect(() => {
    const requestedConversation = new URLSearchParams(window.location.search).get(
      "conversation"
    );
    const currentConversations = useMessageStore.getState().conversations;
    if (
      requestedConversation &&
      currentConversations.some(
        (conversation) => conversation.id === requestedConversation
      )
    ) {
      const timeoutId = window.setTimeout(
        () => setSelectedConversationId(requestedConversation),
        0
      );
      return () => window.clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    if (selectedConversationId) markRead(selectedConversationId);
  }, [markRead, selectedConversationId]);

  const filteredConversations = useMemo(
    () =>
      conversations.filter(
        (conversation) => filterType === "all" || conversation.type === filterType
      ),
    [conversations, filterType]
  );

  const selectedConversation =
    conversations.find(
      (conversation) => conversation.id === selectedConversationId
    ) ?? conversations[0];

  const chatHistory = selectedConversation
    ? messagesByConversation[selectedConversation.id] ?? []
    : [];

  const handleSendReply = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedConversation || !replyInput.trim()) return;

    const result = sendMessage(selectedConversation.id, replyInput);
    setReplyInput("");
    setSafetyFeedback(
      result.sent
        ? "Sent with your identity hidden."
        : result.message ?? "That message could not be sent safely."
    );
  };

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            <LockKeyhole className="h-3.5 w-3.5" /> Identity Shield active
          </div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">
            Safe Campus Messages
          </h1>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[var(--text-muted)]">
            Chat using generated aliases. Personal names, contact details, social
            handles, links, IDs, and private locations are stopped before sending.
          </p>
        </div>

        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] p-1 no-scrollbar">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setFilterType(filter.id)}
              className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                filterType === filter.id
                  ? "bg-[var(--surface)] text-blue-600 shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid min-h-[640px] grid-cols-1 gap-5 md:grid-cols-12">
        <div className="space-y-2 overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm md:col-span-5">
          {filteredConversations.length === 0 ? (
            <div className="flex h-full min-h-52 flex-col items-center justify-center px-6 text-center">
              <MessageCircle className="h-8 w-8 text-[var(--text-muted)]" />
              <p className="mt-3 text-sm font-bold text-[var(--text-primary)]">
                No conversations here yet
              </p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                A secure room is created after a booking, purchase, or offer.
              </p>
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const isSelected = selectedConversation?.id === conversation.id;
              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setSelectedConversationId(conversation.id)}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-all ${
                    isSelected
                      ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40"
                      : "border-transparent hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  <Avatar
                    name={conversation.alias}
                    src={conversation.avatar}
                    size="md"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="truncate text-xs font-bold text-[var(--text-primary)]">
                        {conversation.alias}
                      </h2>
                      <span className="shrink-0 text-[10px] text-[var(--text-muted)]">
                        {formatRelativeTime(conversation.timestamp)}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-[var(--text-secondary)]">
                      {conversation.lastMessage}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <Badge
                        variant={
                          conversation.type === "purchase"
                            ? "success"
                            : conversation.type === "negotiation"
                              ? "warning"
                              : conversation.type === "support"
                                ? "info"
                                : "primary"
                        }
                        size="sm"
                      >
                        {conversation.type}
                      </Badge>
                      {conversation.unread > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-black text-white">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="flex min-h-[620px] flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm md:col-span-7">
          {selectedConversation ? (
            <>
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-hover)] p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar
                    name={selectedConversation.alias}
                    src={selectedConversation.avatar}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-bold text-[var(--text-primary)]">
                      {selectedConversation.alias}
                    </h2>
                    <p className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                      <ShieldCheck className="h-3 w-3" /> Verified peer • Real identity hidden
                    </p>
                    {selectedConversation.itemTitle && (
                      <p className="mt-0.5 truncate text-[10px] text-[var(--text-muted)]">
                        {selectedConversation.itemTitle}
                      </p>
                    )}
                  </div>
                </div>

                {selectedConversation.type === "negotiation" &&
                  selectedConversation.itemId && (
                    <Link href={`/negotiate/${selectedConversation.itemId}`}>
                      <Button
                        size="sm"
                        variant="accent"
                        icon={Tag}
                        className="h-8 text-xs"
                      >
                        Offer room
                      </Button>
                    </Link>
                  )}
              </div>

              <div className="flex-1 space-y-3.5 overflow-y-auto p-4">
                {chatHistory.map((message) => {
                  if (message.sender === "system") {
                    return (
                      <div
                        key={message.id}
                        className={`mx-auto flex max-w-[92%] items-start gap-2 rounded-2xl border p-3 text-[11px] leading-relaxed ${
                          message.blockedRisk
                            ? "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200"
                            : "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-200"
                        }`}
                      >
                        {message.blockedRisk ? (
                          <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        ) : (
                          <Bot className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        )}
                        <p>{message.text}</p>
                      </div>
                    );
                  }

                  const isMe = message.sender === "me";
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[78%] rounded-2xl p-3 text-xs leading-relaxed ${
                          isMe
                            ? "rounded-tr-xs bg-blue-600 text-white"
                            : "rounded-tl-xs border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text-primary)]"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[var(--border)] bg-[var(--surface)] p-3">
                <div className="mb-2 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-[10px] font-medium text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
                  <LockKeyhole className="h-3.5 w-3.5 shrink-0" />
                  <span>{CHAT_PRIVACY_NOTICE}</span>
                </div>
                <form onSubmit={handleSendReply} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Message ${selectedConversation.alias} anonymously...`}
                    value={replyInput}
                    onChange={(event) => {
                      setReplyInput(event.target.value);
                      setSafetyFeedback(null);
                    }}
                    maxLength={500}
                    className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:border-blue-500 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    variant="primary"
                    disabled={!replyInput.trim()}
                    icon={Send}
                    aria-label="Send anonymous message"
                    className="h-10 w-10 shrink-0 rounded-xl p-0"
                  />
                </form>
                {safetyFeedback && (
                  <p className="mt-2 text-[10px] font-semibold text-[var(--text-muted)]">
                    {safetyFeedback}
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <ShoppingBag className="h-10 w-10 text-[var(--text-muted)]" />
              <h2 className="mt-4 text-sm font-bold text-[var(--text-primary)]">
                Your safe transaction chats appear here
              </h2>
              <p className="mt-1 max-w-sm text-xs text-[var(--text-muted)]">
                Buy, rent, or make an offer to start an anonymous conversation.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
