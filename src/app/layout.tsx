"use client";
import "~/styles/globals.css";

import { Inter } from "next/font/google";

import SvgSymbols from "~/components/ui/SvgSymbols/SvgSymbols";
import { trpc } from "~/utils/trpc";
import Provider from "./_trpc/Provider";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "~/app/api/uploadthing/core";

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
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <SessionProvider session={session}>
          <Provider>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
