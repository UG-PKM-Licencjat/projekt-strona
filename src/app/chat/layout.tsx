"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { type UserWithMessage } from "~/components/chat/ConversationsNav/ConversationsNav";

import { trpc } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Message } from "~/components/chat/ConversationWindow/ConversationWindow";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const { data: session } = useSession();
  // const [sampleMessages, setSampleMessages] = useState<UserWithMessage[]>([]);
  const router = useRouter();

  const { data: messages } = trpc.getSampleMessages.useQuery(
    session?.user.id ?? "",
  );

  const { data: userDataForSample } = trpc.user.fetchManyUsers.useQuery(
    [],
    // messages?.map((message) =>
    //   message.from == session?.user.id ? message.to : message.from,
    // ) ?? [],
  );

  useEffect(() => {
    console.log(messages);
    const userId = session?.user.id;
    if (!userId || !userDataForSample) return;

    // const mapped: Array<UserWithMessage> | undefined = userDataForSample.map(
    //   (userData) =>
    //     ({
    //       userId: userData.id,
    //       name: userData.name ?? "",
    //       lastMessage: "", //message.message,
    //       image: userData.image ?? "",
    //     }) satisfies UserWithMessage,
    // );
    // setSampleMessages(mapped ?? []);
  }, [messages, session?.user.id, userDataForSample]);

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
                image: userData.image ?? "",
              }) satisfies UserWithMessage,
          )
          .map((conversation, index) => (
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
