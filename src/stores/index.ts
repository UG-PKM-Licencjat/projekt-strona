import { create } from "zustand";
import { type Message } from "~/components/chat/ConversationWindow/ConversationWindow";

interface ConversationsStore {
  conversations: Record<string, Message[]>;
  addMessage: (userId: string, message: Message) => void;
  addBulkMessages: (userId: string, messages: Message[]) => void;
}

const useConversationsStore = create<ConversationsStore>((set) => ({
  conversations: {},
  addMessage: (userId: string, message: Message) =>
    set((state) => ({
      conversations: {
        ...state.conversations,
        [userId]: [...(state.conversations[userId] ?? []), message],
      },
    })),
  addBulkMessages: (userId: string, messages: Message[]) =>
    set((state) => {
      const currentMessages: Message[] = state.conversations[userId] ?? [];
      const filteredMessages = messages.filter(
        (message) =>
          !currentMessages.some((currentMessage) =>
            compareMessages(currentMessage, message),
          ),
      );
      const newMessages = [...currentMessages, ...filteredMessages].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );
      return {
        conversations: {
          ...state.conversations,
          [userId]: [...(state.conversations[userId] ?? []), ...newMessages],
        },
      };
    }),
}));

function compareMessages(a: Message, b: Message): boolean {
  return (
    a.timestamp === b.timestamp &&
    a.from === b.from &&
    a.to === b.to &&
    a.message === b.message
  );
}

/* example component
function Counter() {
  const { count, inc } = useStore()
  return (
    <div>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  )
}
  */

export { useConversationsStore };
