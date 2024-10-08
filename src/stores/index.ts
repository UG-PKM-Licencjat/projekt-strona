import { type Session } from "next-auth";
import { create } from "zustand";
import { type Message } from "~/components/chat/Message/Message";
import { env } from "~/env";

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
    skip: number,
    limit: number,
  ) => Promise<void>;
  fetchSampleMessages: (session: Session) => Promise<void>;
  addMessage: (userId: string, message: Message) => void;
  markAsRead: (otherUserId: string, session: Session) => void;
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
      if (
        (state.conversations[otherUserId] ?? []).find(
          (msg) => msg.timestamp === newMessage.timestamp,
        )
      )
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
  fetchMessagesForUser: async (
    session: Session,
    otherUserId: string,
    skip: number,
    limit: number,
  ) => {
    const messages = await fetchMessagesRest(session, otherUserId, skip, limit);

    set((state) => {
      const filtered = messages.filter((msg) => {
        const a = state.conversations[otherUserId];
        if (a?.find((val) => val.timestamp === msg.timestamp)) {
          return false;
        }
        return true;
      });

      return {
        conversations: {
          ...state.conversations,
          [otherUserId]: [
            ...filtered,
            ...(state.conversations[otherUserId] ?? []),
          ],
        },
      };
    });
  },
  fetchSampleMessages: async (session: Session) => {
    const messages = await fetchSampleMessagesRest(session);

    set((state) => {
      const convs = { ...(state.conversations ?? []) };
      if (!messages) return { conversations: convs };

      messages.forEach((msg) => {
        const otherUserId = session.user.id === msg.from ? msg.to : msg.from;
        if (convs[otherUserId]) return;
        convs[otherUserId] = [msg];
      });

      return {
        conversations: convs,
      };
    });
  },
  // TODO rethink about sorting here and rethink if needed
  addMessage: (userId: string, message: Message) =>
    set((state) => {
      if (
        (state.conversations[userId] ?? []).find(
          (msg) => msg.timestamp === message.timestamp,
        )
      )
        return { conversations: state.conversations };

      return {
        conversations: {
          ...state.conversations,
          [userId]: [...(state.conversations[userId] ?? []), message],
        },
      };
    }),
  markAsRead: (otherUserId: string, session: Session) => {
    void markAsReadRest(session, otherUserId);

    set((state) => {
      const userConvs = state.conversations[otherUserId];

      if (!userConvs)
        throw new Error("There is no such user in messages store.");

      return {
        conversations: {
          ...state.conversations,
          [otherUserId]: userConvs.map(
            (message) =>
              ({
                ...message,
                read: true,
              }) satisfies Message,
          ),
        },
      };
    });
  },
}));

async function markAsReadRest(session: Session, otherUserId: string) {
  const response = await fetch(
    `https://${env.NEXT_PUBLIC_CHAT_BASE_URL}/message/readConversation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.idToken}`,
      },
      body: JSON.stringify({
        userFrom: otherUserId,
        userTo: session.user.id,
      }),
    },
  );

  if (response.status >= 400) {
    return;
  }
}

async function fetchSampleMessagesRest(session: Session) {
  const result = await fetch(
    `https://${env.NEXT_PUBLIC_CHAT_BASE_URL}/messages/sample?user=${session.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.user.idToken}`,
      },
    },
  );

  if (result.status >= 400) {
    throw new Error("IdToken you're sending doesn't work.");
  }

  const messages: Array<Message> = (await result.json()) as Array<Message>;

  return messages;
}

async function fetchMessagesRest(
  session: Session,
  otherUserId: string,
  skip: number,
  limit: number,
) {
  const response = await fetch(
    `https://${env.NEXT_PUBLIC_CHAT_BASE_URL}/messages?userA=${session.user.id}&userB=${otherUserId}&skip=${skip}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${session.user.idToken}`,
      },
    },
  );

  const messages = (await response.json()) as Array<Message>;
  return messages;
}

async function sendMessageRest(
  message: string,
  session: Session,
  otherUserId: string,
  otherUserProviderId: string,
) {
  const response = await fetch(
    `https://${env.NEXT_PUBLIC_CHAT_BASE_URL}/messages`,
    {
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
    },
  );

  if (response.status >= 400) {
    return;
  }

  const newMessage = (await response.json()) as Message;

  return newMessage;
}

export { useConversationsStore };
