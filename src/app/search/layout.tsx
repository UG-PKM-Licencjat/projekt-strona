"use client";
import APIProviderWrapper from "~/components/LocationGoogle/APIProviderWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <APIProviderWrapper>
      <div className="flex h-full flex-col bg-neo-gray">{children}</div>
    </APIProviderWrapper>
  );
}
