"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useConversationsStore } from "~/stores";
import { type Message } from "~/components/chat/ConversationWindow/ConversationWindow";
import { trpc } from "~/trpc/react";
import { useSession } from "next-auth/react";

export default function GlobalBehaviours({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const log = trpc.clientLog.useMutation();
  const conversations = useConversationsStore();
  const { data } = useSession();

  useEffect(() => {
    const user = data && data.user ? data.user.id : "anonymous";

    log.mutate({
      message: `User ${user} visited ${path}`,
      additionalInfo: "",
      tags: ["ROUTER", "CLICKSTREAM"],
    });
  }, [path, data]);

  useEffect(() => {
    if (!data) return;
    const socketConnection = new WebSocket(
      `wss://chat-swxn.onrender.com/connect?id=${data.user.id}&token=Bearer ${data.user.providerAccountId}`,
    );

    socketConnection.onmessage = (event: MessageEvent<string>) => {
      const newMessage = JSON.parse(event.data) as Message; // TODO: Validate const
      conversations.addMessage(data.user.id, newMessage);
    };
  }, [data?.user?.id]);
  return <>{children}</>;
}
