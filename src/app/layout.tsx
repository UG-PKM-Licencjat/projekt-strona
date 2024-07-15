"use client";
import "~/styles/globals.css";

import { Inter } from "next/font/google";

import SvgSymbols from "~/components/ui/SvgSymbols/SvgSymbols";
import { trpc } from "~/utils/trpc";
import Provider from "./_trpc/Provider";
import { SessionProvider, useSession } from "next-auth/react";
import { type Session } from "next-auth";
import GlobalBehaviours from "./GlobalBehaviours";

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
  return (
    <html lang="pl">
      <body className={inter.className}>
        {SvgSymbols}
        <SessionProvider session={session}>
          <Provider>
            <GlobalBehaviours>{children}</GlobalBehaviours>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
