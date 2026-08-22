import {
  CHAT_PRIVACY_NOTICE,
  getAnonymousAlias,
  getAnonymousAvatar,
  scanChatMessage,
  type PrivacyRisk,
} from "@/lib/chatSafety";
import { MOCK_MESSAGES } from "@/lib/mockData";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ConversationType = "rental" | "negotiation" | "purchase" | "support";

export interface SafeConversation {
  id: string;
  peerId: string;
  alias: string;
  avatar: string;
  itemId?: string;
  itemTitle?: string;
  type: ConversationType;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export interface SafeMarketplaceMessage {
  id: string;
  sender: "me" | "peer" | "system";
  text: string;
  timestamp: string;
  blockedRisk?: PrivacyRisk;
}

interface TransactionConversationInput {
  id: string;
  peerId: string;
  itemId: string;
  itemTitle: string;
  type: "rental" | "negotiation" | "purchase";
  automatedText: string;
}

interface MessageState {
  conversations: SafeConversation[];
  messagesByConversation: Record<string, SafeMarketplaceMessage[]>;
  sendMessage: (
    conversationId: string,
    content: string
  ) => { sent: boolean; risk?: PrivacyRisk; message?: string };
  addAutomatedMessage: (conversationId: string, content: string) => void;
  ensureTransactionConversation: (input: TransactionConversationInput) => string;
  markRead: (conversationId: string) => void;
}

const SAFETY_MESSAGE = (timestamp: string): SafeMarketplaceMessage => ({
  id: `safety-${timestamp}`,
  sender: "system",
  text: CHAT_PRIVACY_NOTICE,
  timestamp,
});

const initialConversations: SafeConversation[] = MOCK_MESSAGES.map((message) => {
  const isSupport = message.type === "support";
  return {
    id: message.id,
    peerId: message.senderId,
    alias: isSupport ? "CampusLend Support" : getAnonymousAlias(message.senderId),
    avatar: getAnonymousAvatar(message.senderId),
    itemId: message.itemId,
    itemTitle: message.itemTitle,
    type: message.type,
    lastMessage: message.lastMessage,
    timestamp: message.timestamp,
    unread: message.unread,
  };
});

const initialMessages: Record<string, SafeMarketplaceMessage[]> =
  Object.fromEntries(
    initialConversations.map((conversation) => {
      const messages: SafeMarketplaceMessage[] = [
        SAFETY_MESSAGE(new Date(Date.now() - 1000 * 60 * 45).toISOString()),
      ];

      if (conversation.id === "msg1") {
        messages.push(
          {
            id: "msg1-peer-1",
            sender: "peer",
            text: "Is the public handoff point near the library okay around 5 PM?",
            timestamp: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
          },
          {
            id: "msg1-me-1",
            sender: "me",
            text: "Yes, the verified handoff point works. I will bring the item fully charged.",
            timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
          },
          {
            id: "msg1-system-1",
            sender: "system",
            text: "Handoff reminder scheduled. The one-time verification code will appear 15 minutes before the confirmed meetup.",
            timestamp: new Date(Date.now() - 1000 * 60 * 16).toISOString(),
          }
        );
      } else {
        messages.push({
          id: `${conversation.id}-peer-1`,
          sender: conversation.type === "support" ? "system" : "peer",
          text: conversation.lastMessage,
          timestamp: conversation.timestamp,
        });
      }

      return [conversation.id, messages];
    })
  );

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      conversations: initialConversations,
      messagesByConversation: initialMessages,

      sendMessage: (conversationId, content) => {
        const scan = scanChatMessage(content);
        const timestamp = new Date().toISOString();

        if (!scan.safe) {
          if (scan.automatedMessage) {
            const safetyReply: SafeMarketplaceMessage = {
              id: `blocked-${Date.now()}`,
              sender: "system",
              text: scan.automatedMessage,
              timestamp,
              blockedRisk: scan.risk,
            };

            set((state) => ({
              messagesByConversation: {
                ...state.messagesByConversation,
                [conversationId]: [
                  ...(state.messagesByConversation[conversationId] ?? []),
                  safetyReply,
                ],
              },
              conversations: state.conversations.map((conversation) =>
                conversation.id === conversationId
                  ? {
                      ...conversation,
                      lastMessage: "Safety blocked personal information",
                      timestamp,
                    }
                  : conversation
              ),
            }));
          }

          return {
            sent: false,
            risk: scan.risk,
            message: scan.automatedMessage,
          };
        }

        const message: SafeMarketplaceMessage = {
          id: `message-${Date.now()}`,
          sender: "me",
          text: content.trim(),
          timestamp,
        };

        set((state) => ({
          messagesByConversation: {
            ...state.messagesByConversation,
            [conversationId]: [
              ...(state.messagesByConversation[conversationId] ?? []),
              message,
            ],
          },
          conversations: state.conversations
            .map((conversation) =>
              conversation.id === conversationId
                ? {
                    ...conversation,
                    lastMessage: content.trim(),
                    timestamp,
                    unread: 0,
                  }
                : conversation
            )
            .sort(
              (a, b) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            ),
        }));

        return { sent: true };
      },

      addAutomatedMessage: (conversationId, content) => {
        const timestamp = new Date().toISOString();
        const message: SafeMarketplaceMessage = {
          id: `system-${Date.now()}`,
          sender: "system",
          text: content,
          timestamp,
        };

        set((state) => ({
          messagesByConversation: {
            ...state.messagesByConversation,
            [conversationId]: [
              ...(state.messagesByConversation[conversationId] ?? []),
              message,
            ],
          },
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId
              ? { ...conversation, lastMessage: content, timestamp }
              : conversation
          ),
        }));
      },

      ensureTransactionConversation: (input) => {
        if (get().conversations.some((conversation) => conversation.id === input.id)) {
          return input.id;
        }

        const timestamp = new Date().toISOString();
        const conversation: SafeConversation = {
          id: input.id,
          peerId: input.peerId,
          alias: getAnonymousAlias(input.peerId),
          avatar: getAnonymousAvatar(input.peerId),
          itemId: input.itemId,
          itemTitle: input.itemTitle,
          type: input.type,
          lastMessage: input.automatedText,
          timestamp,
          unread: 0,
        };

        set((state) => ({
          conversations: [conversation, ...state.conversations],
          messagesByConversation: {
            ...state.messagesByConversation,
            [input.id]: [
              SAFETY_MESSAGE(timestamp),
              {
                id: `transaction-${Date.now()}`,
                sender: "system",
                text: input.automatedText,
                timestamp,
              },
            ],
          },
        }));

        return input.id;
      },

      markRead: (conversationId) => {
        set((state) => ({
          conversations: state.conversations.map((conversation) =>
            conversation.id === conversationId
              ? { ...conversation, unread: 0 }
              : conversation
          ),
        }));
      },
    }),
    {
      name: "campuslend-safe-messages",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversations: state.conversations,
        messagesByConversation: state.messagesByConversation,
      }),
    }
  )
);
