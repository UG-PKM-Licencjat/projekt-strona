"use client";
import "~/styles/globals.css";

import { Cabin, Montserrat } from "next/font/google";

import SvgSymbols from "~/components/ui/SvgSymbols/SvgSymbols";
import { TRPCReactProvider } from "~/trpc/react";
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

export default function RootLayout({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session }>) {
  return (
    <html lang="en">
      <body className={`${cabin.variable} ${montserrat.variable} font-body`}>
        {SvgSymbols}
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <SessionProvider session={session}>
          <TRPCReactProvider>
            <GlobalBehaviours>{children}</GlobalBehaviours>
          </TRPCReactProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
