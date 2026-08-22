"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { useChatStore } from "@/store/useChatStore";
import {
  Bot,
  Send,
  X,
  Sparkles,
  ShieldAlert,
  CreditCard,
  HelpCircle,
  Minimize2,
  Maximize2,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function AIChatbot() {
  const {
    isChatOpen,
    chatMessages,
    chatContext,
    toggleChat,
    closeChat,
    openChat,
    sendMessage,
    clearChat,
  } = useChatStore();

  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  if (!isChatOpen) {
    return (
      <button
        onClick={() => openChat("general")}
        className="fixed bottom-20 lg:bottom-8 right-5 z-40 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-white shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-200 group"
        aria-label="Open AI Assistant"
      >
        <div className="relative flex items-center justify-center">
          <Bot className="h-6 w-6" />
          <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-amber-300 animate-spin-slow" />
        </div>
        <span className="text-xs font-bold tracking-wide pr-1">CampusLend AI</span>
      </button>
    );
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const msg = inputMessage;
    setInputMessage("");
    setIsSending(true);
    await sendMessage(msg);
    setIsSending(false);
  };

  const contextTitles = {
    general: "CampusLend AI Assistant",
    damage: "Damage Recovery Assistant",
    payment: "Payment & Refund Assistant",
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 flex flex-col ${
        isExpanded
          ? "inset-4 sm:inset-10 max-w-4xl mx-auto rounded-3xl"
          : "bottom-20 lg:bottom-6 right-4 sm:right-6 w-[92vw] sm:w-96 h-[560px] rounded-3xl"
      } bg-[var(--surface)] border border-[var(--border)] shadow-2xl overflow-hidden animate-scale-in`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-xs sm:text-sm tracking-tight text-slate-100">
                {contextTitles[chatContext]}
              </h3>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-400">24/7 AI Campus Mediator</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 hover:text-white rounded-lg transition-colors hidden sm:block"
            title={isExpanded ? "Minimize" : "Maximize"}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={clearChat}
            className="p-1.5 hover:text-white rounded-lg transition-colors"
            title="Clear Chat"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            onClick={closeChat}
            className="p-1.5 hover:text-white rounded-lg transition-colors"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Quick context switchers */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[var(--surface-hover)] border-b border-[var(--border)] overflow-x-auto no-scrollbar">
        <button
          onClick={() => openChat("general")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
            chatContext === "general"
              ? "bg-blue-600 text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--border)]"
          }`}
        >
          <HelpCircle className="h-3 w-3" />
          General Help
        </button>
        <button
          onClick={() => openChat("damage")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
            chatContext === "damage"
              ? "bg-amber-600 text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--border)]"
          }`}
        >
          <ShieldAlert className="h-3 w-3" />
          Damage Report
        </button>
        <button
          onClick={() => openChat("payment")}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
            chatContext === "payment"
              ? "bg-emerald-600 text-white"
              : "text-[var(--text-secondary)] hover:bg-[var(--border)]"
          }`}
        >
          <CreditCard className="h-3 w-3" />
          Payment/Refund
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[var(--surface)]">
        {chatMessages.length === 0 && (
          <div className="text-center py-8 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)]">How can I assist your rental today?</p>
              <p className="text-[11px] text-[var(--text-muted)] mt-1">
                Ask about pricing fair-rate suggestions, dispute rules, or deposit refunds.
              </p>
            </div>
          </div>
        )}

        {chatMessages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {!isUser ? (
                <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                  AI
                </div>
              ) : null}

              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
                  isUser
                    ? "bg-blue-600 text-white rounded-tr-xs"
                    : "bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] rounded-tl-xs whitespace-pre-line"
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs">
            <div className="h-7 w-7 rounded-lg bg-emerald-500/20 text-emerald-600 flex items-center justify-center animate-pulse">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-[var(--border)] bg-[var(--surface)] flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask a question or describe an issue..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] px-3.5 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 focus:bg-[var(--surface)] transition-all"
        />
        <Button
          type="submit"
          size="sm"
          variant="primary"
          disabled={!inputMessage.trim() || isSending}
          icon={Send}
          className="rounded-xl shrink-0"
        />
      </form>
    </div>
  );
}
