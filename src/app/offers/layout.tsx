import React from "react";
import { Navbar } from "src/components/Navbar/Navbar";
import { Toaster } from "src/components/ui/toaster";

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
