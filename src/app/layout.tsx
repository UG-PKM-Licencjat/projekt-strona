"use client";
import "~/styles/globals.css";

import { Inter } from "next/font/google";

import SvgSymbols from "~/components/ui/SvgSymbols/SvgSymbols";
import { trpc } from "~/utils/trpc";
import Provider from "./_trpc/Provider";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useConversationsStore } from "~/stores";
import { Message } from "~/components/chat/ConversationWindow/ConversationWindow";

const inter = Inter({
  subsets: ["latin"],
});

function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const path = usePathname();
  const log = trpc.clientLog.useMutation();
  const conversations = useConversationsStore();

  useEffect(() => {
    const user = session && session.user ? session.user.id : "anonymous";

    log.mutate({
      message: `User ${user} visited ${path}`,
      additionalInfo: "",
      tags: ["ROUTER", "CLICKSTREAM"],
    });
  }, [path, session]);

  useEffect(() => {
    if (!session) return;

    const socketConnection = new WebSocket(
      `wss://chat-swxn.onrender.com/connect?id=${session?.user.id}`,
    );

    socketConnection.onmessage = (event: MessageEvent<string>) => {
      const newMessage = JSON.parse(event.data) as Message; // TODO: Validate const
      conversations.addMessage(session?.user.id, newMessage);
    };
  }, [session]);

  return (
    <html lang="pl">
      <body className={inter.className}>
        {SvgSymbols}
        <SessionProvider session={session}>
          <Provider>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
