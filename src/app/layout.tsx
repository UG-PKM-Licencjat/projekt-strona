"use client";
import "~/styles/globals.css";

import { Inter } from "next/font/google";

import SvgSymbols from "~/components/ui/SvgSymbols/SvgSymbols";
import { trpc } from "~/utils/trpc";
import Provider from "./_trpc/Provider";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

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
          <Provider>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
