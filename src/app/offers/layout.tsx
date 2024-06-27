import React from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { Toaster } from "~/components/ui/toaster";

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
}
