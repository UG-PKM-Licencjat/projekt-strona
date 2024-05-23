"use client";
import "~/styles/globals.css";

import { Inter } from "next/font/google";

import SvgSymbols from "~/components/ui/SvgSymbols/SvgSymbols";
import { trpc } from "~/utils/trpc";
import Provider from "./_trpc/Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className={`font-sans ${inter.variable}`}>
        {SvgSymbols}
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
