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
import { Tag } from "~/server/log";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
  useEffect(() => {
    const user = session && session.user ? session.user.id : "anonymous";

    log.mutate({
      message: `User ${user} visited ${path}`,
      additionalInfo: "",
      tags: ["ROUTER", "CLICKSTREAM"],
    });
  }, [path, session]);

  return (
    <html lang="pl">
      <body className={`font-sans ${inter.variable}`}>
        {SvgSymbols}
        <SessionProvider session={session}>
          <Provider>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
