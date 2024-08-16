"use client";
import "~/styles/globals.css";

import { Cabin, Montserrat } from "next/font/google";

import SvgSymbols from "src/components/ui/SvgSymbols/SvgSymbols";
import { trpc } from "src/utils/trpc";
import Provider from "./_trpc/Provider";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import GlobalBehaviours from "./GlobalBehaviours";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { Toaster } from "~/components/ui/toaster";

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
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
      <body className={`${cabin.variable} ${montserrat.variable} font-body`}>
        {SvgSymbols}
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <SessionProvider session={session}>
          <Provider>
            <GlobalBehaviours>{children}</GlobalBehaviours>
          </Provider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
