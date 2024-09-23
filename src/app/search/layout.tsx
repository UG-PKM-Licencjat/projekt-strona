"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import APIProviderWrapper from "~/components/LocationGoogle/APIProviderWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  if (!session) {
    redirect("/");
  }
  return (
    <APIProviderWrapper>
      <div className="flex flex-1 flex-col">{children}</div>;
    </APIProviderWrapper>
  );
}
