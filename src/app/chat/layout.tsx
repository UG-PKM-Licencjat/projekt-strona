"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ConversationsNav, {
  type UserWithMessage,
} from "~/components/chat/ConversationsNav/ConversationsNav";
import { useConversationsStore } from "~/stores";
import { trpc } from "../_trpc/client";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversationsStore = useConversationsStore();
  const { data: session } = useSession();
  const [sampleMessages, setSampleMessages] = useState<UserWithMessage[]>([]);
  const { data: messages, refetch: re } = trpc.getSampleMessages.useQuery(
    session?.user.id ?? "", // TODO fix it somehow session
  );
  useEffect(() => {
    const userId = session?.user.id;
    if (!userId) return;
    void re(); // TODO: not too good idea
    const conversations = conversationsStore.conversations[userId] ?? [];
    const mapped = conversations.map((message) => ({
      name: "Test name", // TODO: get user name from the server
      lastMessage: message.message,
      image: "https://picsum.photos/id/100/400/400",
    }));
    setSampleMessages(mapped);
  }, [conversationsStore.conversations, re, session?.user.id]);

  // TODO: we should fetch the messages from the server
  return (
    <div className="flex gap-10">
      <div id="contact-list w-1/4">
        <ConversationsNav
          usersWithMessages={sampleMessages}
          clickAction={(user) => {
            console.log(user);
          }}
        />
      </div>
      <main>{children}</main>
    </div>
  );
}
