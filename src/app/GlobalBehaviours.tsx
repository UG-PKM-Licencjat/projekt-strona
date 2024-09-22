"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useConversationsStore } from "~/stores";
import { type Message } from "~/components/chat/ConversationWindow/ConversationWindow";
import { useSession } from "next-auth/react";
import { useToast } from "~/components/ui/use-toast";

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
      `wss://chat-swxn.onrender.com/connect?id=${data.user.id}&token=Bearer ${data.user.idToken}`,
    );

    socketConnection.onmessage = (event: MessageEvent<string>) => {
      const newMessage = JSON.parse(event.data) as Message; // TODO: Validate const
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
