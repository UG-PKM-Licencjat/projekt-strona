"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useConversationsStore } from "~/stores";
import { type Message } from "~/components/chat/ConversationWindow/ConversationWindow";
import { useSession } from "next-auth/react";
import { useToast } from "~/components/ui/use-toast";
import { env } from "~/env";

export default function GlobalBehaviours({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = useConversationsStore();
  const { data } = useSession();
  const store = useConversationsStore();
  const { toast } = useToast();

  useEffect(() => {
    if (!data) return;
    void store.fetchSampleMessages(data);
  }, []);

  useEffect(() => {
    if (!data) return;
    const socketConnection = new WebSocket(
      `wss://${env.NEXT_PUBLIC_CHAT_BASE_URL}/connect?id=${data.user.id}&token=Bearer ${data.user.idToken}`,
    );

    // TODO maybe request also here but timedout
    socketConnection.onmessage = (event: MessageEvent<string>) => {
      const newMessage = JSON.parse(event.data) as Message;
      conversations.addMessage(newMessage.from, newMessage);
      toast({
        title: "Chat",
        description: "Otrzymałeś nową wiadomość!",
        variant: "default",
      });
    };
  }, [data, data?.user.id]);
  return <>{children}</>;
}
