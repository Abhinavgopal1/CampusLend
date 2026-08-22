// ============================================================
// CampusLend AI — Chat Store (Zustand)
// ============================================================

import { create } from "zustand";
import { scanChatMessage } from "@/lib/chatSafety";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  content: string;
  timestamp: string;
  type: "text" | "image" | "offer" | "system";
}

interface ChatState {
  // AI Chatbot
  isChatOpen: boolean;
  chatMessages: ChatMessage[];
  chatContext: "damage" | "payment" | "general";

  // Actions
  toggleChat: () => void;
  openChat: (context?: "damage" | "payment" | "general") => void;
  closeChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

const AI_RESPONSES: Record<string, string[]> = {
  damage: [
    "I understand you're reporting damage to a rented item. Let me help you document this properly. Could you please upload photos of the damage?",
    "Thank you for the photos. Based on my analysis, this appears to be moderate wear damage. The estimated repair/replacement cost is ₹500-800. Would you like me to generate a formal damage report?",
    "I've generated the damage report. Here's a summary:\n\n📋 **Damage Report #DR-2026-0142**\n- Type: Surface scratching\n- Severity: Moderate\n- Estimated Cost: ₹650\n- Recommendation: Partial deposit deduction\n\nWould you like to proceed with the resolution, or do you have additional damage to report?",
    "I've submitted the damage report to both parties. The lender has 48 hours to review and respond. If there's a dispute, I can help mediate. Is there anything else I can help with?",
  ],
  payment: [
    "I can help you with payment issues. What seems to be the problem?\n\n1️⃣ Failed payment\n2️⃣ Refund request\n3️⃣ Deposit return\n4️⃣ Late fee dispute\n5️⃣ Transaction history",
    "I can see your recent transactions. Your last payment of ₹2,625 was processed successfully on Aug 16. Your security deposit of ₹5,000 is being held and will be released upon item return.\n\nWould you like me to help with a specific transaction?",
    "I've initiated the refund process for ₹500. It will be credited to your original payment method within 3-5 business days.\n\n🔔 A private confirmation was added to your in-app notifications.\n\nIs there anything else I can help with?",
  ],
  general: [
    "Hi! I'm your CampusLend AI assistant. I can help you with:\n\n🔧 Damage reports & disputes\n💳 Payment issues & refunds\n📦 Rental questions\n🤝 Negotiation tips\n\nWhat can I help you with today?",
    "That's a great question! Here are some tips:\n\n1. Always check item photos carefully before renting\n2. Meet at public campus locations for pickup\n3. Document the item condition at pickup with photos\n4. Return items on time to maintain your rating\n\nWould you like more specific advice?",
    "I'm glad I could help! Remember, you can always reach out to me for any rental-related questions. Have a great day! 🎓",
  ],
};

let responseIndex: Record<string, number> = {
  damage: 0,
  payment: 0,
  general: 0,
};

export const useChatStore = create<ChatState>((set, get) => ({
  isChatOpen: false,
  chatMessages: [],
  chatContext: "general",

  toggleChat: () => {
    set((state) => ({ isChatOpen: !state.isChatOpen }));
  },

  openChat: (context = "general") => {
    const greeting: ChatMessage = {
      id: "welcome",
      sender: "ai",
      content: AI_RESPONSES[context][0],
      timestamp: new Date().toISOString(),
      type: "text",
    };
    responseIndex = { damage: 0, payment: 0, general: 0 };
    set({
      isChatOpen: true,
      chatContext: context,
      chatMessages: [greeting],
    });
  },

  closeChat: () => {
    set({ isChatOpen: false });
  },

  sendMessage: async (content) => {
    const scan = scanChatMessage(content);
    if (!scan.safe) {
      const blockedMessage: ChatMessage = {
        id: `blocked-${Date.now()}`,
        sender: "system",
        content:
          scan.automatedMessage ??
          "That message was blocked to protect your personal information.",
        timestamp: new Date().toISOString(),
        type: "system",
      };
      set((state) => ({
        chatMessages: [...state.chatMessages, blockedMessage],
      }));
      return;
    }

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      content,
      timestamp: new Date().toISOString(),
      type: "text",
    };

    set((state) => ({
      chatMessages: [...state.chatMessages, userMsg],
    }));

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const ctx = get().chatContext;
    const idx = responseIndex[ctx];
    const responses = AI_RESPONSES[ctx];
    const nextIdx = Math.min(idx + 1, responses.length - 1);
    responseIndex[ctx] = nextIdx;

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: "ai",
      content: responses[nextIdx],
      timestamp: new Date().toISOString(),
      type: "text",
    };

    set((state) => ({
      chatMessages: [...state.chatMessages, aiMsg],
    }));
  },

  clearChat: () => {
    responseIndex = { damage: 0, payment: 0, general: 0 };
    set({ chatMessages: [] });
  },
}));
