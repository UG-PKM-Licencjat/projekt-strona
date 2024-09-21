import { type Session } from "next-auth";
import { create } from "zustand";
import { type Message } from "~/components/chat/ConversationWindow/ConversationWindow";

interface ConversationsStore {
  conversations: Record<string, Message[]>;
  sendMessage: (
    message: string,
    session: Session,
    otherUserId: string,
    otherUserProviderId: string,
  ) => Promise<void>;
  fetchMessagesForUser: (
    session: Session,
    otherUserId: string,
  ) => Promise<void>;
  fetchSampleMessages: (session: Session) => Promise<void>;
  addMessage: (userId: string, message: Message) => void;
}

const useConversationsStore = create<ConversationsStore>((set) => ({
  conversations: {},
  sendMessage: async (
    message: string,
    session: Session,
    otherUserId: string,
    otherUserProviderId: string,
  ) => {
    const newMessage = await sendMessageRest(
      message,
      session,
      otherUserId,
      otherUserProviderId,
    );

    if (!newMessage) return;

    set((state) => {
      if ((state.conversations[otherUserId] ?? []).includes(newMessage))
        return { conversations: state.conversations };

      return {
        conversations: {
          ...state.conversations,
          [otherUserId]: [
            ...(state.conversations[otherUserId] ?? []),
            newMessage,
          ],
        },
      };
    });
  },
  // TODO sort if needed
  fetchMessagesForUser: async (session: Session, otherUserId: string) => {
    const messages = await fetchMessagesRest(session, otherUserId);

    set((state) => {
      const filtered = messages.filter(
        (msg) => !state.conversations[otherUserId]?.includes(msg),
      );

      return {
        conversations: {
          ...state.conversations,
          [otherUserId]: [
            ...(state.conversations[otherUserId] ?? []),
            ...filtered,
          ],
        },
      };
    });
  },
  // TODO do it only once
  fetchSampleMessages: async (session: Session) => {
    const messages = await fetchSampleMessagesRest(session);

    set((state) => {
      console.log(state.conversations);
      const convs = { ...(state.conversations ?? []) };
      if (!messages) return { conversations: convs };

      messages.forEach((msg) => {
        const otherUserId = session.user.id === msg.from ? msg.to : msg.from;
        if (convs[otherUserId]) return;
        convs[otherUserId] = [msg];
      });
      console.log(state.conversations);
      return {
        conversations: convs,
      };
    });
  },
  // TODO rethink about sorting here and rethink if needed
  addMessage: (userId: string, message: Message) =>
    set((state) => {
      if ((state.conversations[userId] ?? []).includes(message))
        return { conversations: state.conversations };

      return {
        conversations: {
          ...state.conversations,
          [userId]: [...(state.conversations[userId] ?? []), message],
        },
      };
    }),
}));

async function fetchSampleMessagesRest(session: Session) {
  const messages: Array<Message> = (await (
    await fetch(
      `https://chat-swxn.onrender.com/messages/sample?user=${session.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.idToken}`,
        },
      },
    )
  ).json()) as Array<Message>;

  // TODO what if error?
  return messages;
}

async function fetchMessagesRest(session: Session, otherUserId: string) {
  const response = await fetch(
    `https://chat-swxn.onrender.com/messages?userA=${session.user.id}&userB=${otherUserId}`,
    {
      headers: {
        Authorization: `Bearer ${session.user.idToken}`,
      },
    },
  ); // TODO what if error

  const messages = (await response.json()) as Array<Message>;

  return messages;
}

async function sendMessageRest(
  message: string,
  session: Session,
  otherUserId: string,
  otherUserProviderId: string,
) {
  const response = await fetch("https://chat-swxn.onrender.com/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.idToken}`,
    },
    body: JSON.stringify({
      message: message,
      from: session.user.id,
      to: otherUserId,
      fromSub: session.user.providerAccountId,
      toSub: otherUserProviderId,
    }),
  });

  if (response.status >= 400) {
    return;
  }

  const newMessage = (await response.json()) as Message;

  return newMessage;
}

function compareMessages(a: Message, b: Message): boolean {
  return (
    a.timestamp === b.timestamp &&
    a.from === b.from &&
    a.to === b.to &&
    a.message === b.message
  );
}

export { useConversationsStore };
