"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { type UserWithMessage } from "~/components/chat/ConversationsNav/ConversationsNav";

import { trpc } from "~/trpc/react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useConversationsStore } from "~/stores";
import { AlertCircle } from "lucide-react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const pathUserId = pathname.split("/")[2]; // Needed as this layout doesnt have [userId]
  const conversations = useConversationsStore((state) => state.conversations);

  const { data: userDataForSample } = trpc.user.fetchManyUsers.useQuery(
    Object.entries(conversations)
      .map((entry) => entry[0])
      .filter((e) => e !== session?.user.id),
  );

  return (
    <div className="flex flex-1 gap-5 bg-neo-castleton text-neo-castleton md:bg-neo-gray-hover">
      {/* Sidebar for desktop and mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 transform overflow-y-auto bg-neo-castleton p-4 transition-transform duration-300 ease-in-out md:m-6 md:w-80 md:rounded-lg ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <h2 className="mb-4 text-2xl font-bold text-white">Rozmowy</h2>
        {userDataForSample
          ?.map(
            (userData) =>
              ({
                userId: userData.id,
                name: userData.name ?? "",
                lastMessage: "", //message.message,
                unread: conversations[userData.id]?.some(msg => !msg.read) ?? false,
                image: userData.image ?? "",
              }) satisfies UserWithMessage,
          )
          .map((conversation, index) => (
            <div
              onClick={() => {
                router.push(`/chat/${conversation.userId}`);
              }}
              key={index}
              className={`mb-2 flex cursor-pointer items-center rounded p-2 text-white transition-colors hover:bg-neo-sea ${(pathUserId ?? "") == conversation.userId ? "bg-neo-sea" : ""}`}
            >
              <Avatar className="mr-2 h-8 w-8">
                <AvatarImage src={conversation.image} alt={conversation.name} />
                <AvatarFallback>{conversation.name}</AvatarFallback>
              </Avatar>
              <span>{conversation.name}</span>
              {conversation.unread && <AlertCircle className="text-neo-pink ml-2"/>}
            </div>
          ))}
      </div>

      {/* Toggle Button for Mobile */}
      <button
        className="z-30 p-4 text-white md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Overlay for Mobile */}
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
