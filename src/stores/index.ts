import { create } from "zustand";
import { type Message } from "~/components/chat/ConversationWindow/ConversationWindow";

interface ConversationsStore {
  conversations: Record<string, Message[]>;
  addMessage: (userId: string, message: Message) => void;
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
}));

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
