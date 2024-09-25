"use client";

import { useState } from "react";
import { Sidebar } from "~/components/chat/Sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-1 bg-neo-castleton text-neo-castleton md:bg-neo-gray">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <button
        className="z-30 p-4 text-white md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {children}
    </div>
  );
}
