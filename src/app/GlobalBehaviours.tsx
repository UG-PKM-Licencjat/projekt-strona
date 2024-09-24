"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const pathName = usePathname();
  const ws = useRef<WebSocket>();

  useEffect(() => {
    if (!data) return;
    void store.fetchSampleMessages(data);
    console.log(pathName)
  }, []);
  
  useEffect(() => {
    if (!data) return;
    ws.current = new WebSocket(
      `wss://${env.NEXT_PUBLIC_CHAT_BASE_URL}/connect?id=${data.user.id}&token=Bearer ${data.user.idToken}`,
    )
  }, [data, data?.user.id]);

  useEffect(() => {
    if (!data || !ws.current) return;

    ws.current.onmessage = (event: MessageEvent<string>) => {
      const newMessage = JSON.parse(event.data) as Message;

      if (pathName === `/chat/${newMessage.from}`) {
        newMessage.read = true;
        void store.markAsRead(newMessage.from, data);
      } else {
        toast({
          title: "Chat",
          description: "Otrzymałeś nową wiadomość!",
          variant: "default",
        });
      }
      conversations.addMessage(newMessage.from, newMessage);
      
    };
  }, [data, data?.user.id, pathName]);
  return <>{children}</>;
}
