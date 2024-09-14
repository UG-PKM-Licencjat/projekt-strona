import "~/styles/globals.css";

import { Cabin, Montserrat } from "next/font/google";

import SvgSymbols from "~/components/ui/SvgSymbols/SvgSymbols";
import { TRPCReactProvider } from "~/trpc/react";
import { getServerAuthSession } from "~/server/auth";
import { SessionProvider } from "~/components/SessionProvider";
import GlobalBehaviours from "./GlobalBehaviours";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { Toaster } from "~/components/ui/toaster";
import { Navbar } from "~/components/Navbar/Navbar";

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  return (
    <html lang="pl" className="h-full">
      <body
        className={`${cabin.variable} ${montserrat.variable} h-full min-h-svh font-body`}
      >
        {SvgSymbols}
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <SessionProvider session={session}>
          <TRPCReactProvider>
            <GlobalBehaviours>
              <Navbar />
              {children}
            </GlobalBehaviours>
          </TRPCReactProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
