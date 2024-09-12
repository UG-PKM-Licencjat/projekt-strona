"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { type UserWithMessage } from "~/components/chat/ConversationsNav/ConversationsNav";

import { trpc } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const { data: session } = useSession();
  const [sampleMessages, setSampleMessages] = useState<UserWithMessage[]>([]);
  const router = useRouter();

  const { data: messages } = trpc.getSampleMessages.useQuery(
    session?.user.id ?? "",
  );

  useEffect(() => {
    const userId = session?.user.id;
    if (!userId) return;
    //void re(); // TODO: not too good idea
    const mapped: Array<UserWithMessage> | undefined = messages?.map(
      (message) =>
        ({
          name: "Test name", // TODO: get user name from the server
          lastMessage: message.message,
          image: "https://picsum.photos/id/100/400/400", // TODO: fetch from server
          userId: message.from == userId ? message.to : message.from,
        }) satisfies UserWithMessage,
    );
    setSampleMessages(mapped ?? []);
  }, [messages, session?.user.id]);

  return (
    <div className="flex h-screen bg-[#4a8573] text-[#005243]">
      {/* Sidebar for desktop and mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 transform overflow-y-auto bg-neo-castleton p-4 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <h2 className="mb-4 text-2xl font-bold text-white">Rozmowy</h2>
        {sampleMessages.map((conversation, index) => (
          <div
            onClick={() => {
              router.push(`/chat/${conversation.userId}`);
            }}
            key={index}
            className="mb-2 flex cursor-pointer items-center rounded p-2 text-white transition-colors hover:bg-[#4a8573]"
          >
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src={conversation.image} alt={conversation.name} />
              <AvatarFallback>{conversation.name}</AvatarFallback>
            </Avatar>
            <span>{conversation.name}</span>
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
