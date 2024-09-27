"use client";
import APIProviderWrapper from "~/components/LocationGoogle/APIProviderWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <APIProviderWrapper>
      <div className="flex flex-col">{children}</div>
    </APIProviderWrapper>
  );
}
