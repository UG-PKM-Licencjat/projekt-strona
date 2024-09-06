"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ConversationsNav, {
  type UserWithMessage,
} from "~/components/chat/ConversationsNav/ConversationsNav";
import { useConversationsStore } from "~/stores";
import { trpc } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Send } from "lucide-react";

// export default function ChatLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const conversationsStore = useConversationsStore();
//   const { data: session } = useSession();
//   const [sampleMessages, setSampleMessages] = useState<UserWithMessage[]>([]);
//   const router = useRouter();

//   const { data: messages, refetch: re } = trpc.getSampleMessages.useQuery(
//     session?.user.id ?? "",
//   );

//   useEffect(() => {
//     const userId = session?.user.id;
//     if (!userId) return;
//     //void re(); // TODO: not too good idea
//     const conversations = conversationsStore.conversations[userId] ?? [];
//     const mapped: Array<UserWithMessage> | undefined = messages?.map(
//       (message) =>
//         ({
//           name: "Test name", // TODO: get user name from the server
//           lastMessage: message.message,
//           image: "https://picsum.photos/id/100/400/400", // TODO: fetch from server
//           userId: message.from == userId ? message.to : message.from,
//         }) satisfies UserWithMessage,
//     );
//     setSampleMessages(mapped ?? []);
//   }, [conversationsStore.conversations, messages, session?.user.id]);

//   // TODO: we should fetch the messages from the server
//   return (
//     <div className="flex gap-10">
//       <div id="contact-list w-1/4">
//         <ConversationsNav
//           usersWithMessages={sampleMessages}
//           clickAction={(user) => {
//             router.push(`/chat/${user.userId}`);
//           }}
//         />
//       </div>
//       <main>{children}</main>
//     </div>
//   );
// }



// export default function ChatLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const conversations = [
//     { name: 'Karol Studniarek', avatar: '/placeholder.svg?height=40&width=40' },
//     { name: 'Magik', avatar: '/placeholder.svg?height=40&width=40' },
//     { name: 'Fotograf', avatar: '/placeholder.svg?height=40&width=40' },
//     { name: 'Zespół muzyczny', avatar: '/placeholder.svg?height=40&width=40' },
//   ]
  
//   return <div className="flex h-screen bg-[#4a8573] text-[#005243]">
//   <div className="w-64 bg-neo-castleton p-4 overflow-y-auto">
//     <h2 className="text-2xl font-bold mb-4 text-white">Rozmowy</h2>
//     {conversations.map((conversation, index) => (
//       <div key={index} className="flex items-center mb-2 p-2 hover:bg-[#4a8573] rounded cursor-pointer transition-colors text-white">
//         <Avatar className="h-8 w-8 mr-2">
//           <AvatarImage src={conversation.avatar} alt={conversation.name} />
//           <AvatarFallback>{conversation.name[0]}</AvatarFallback>
//         </Avatar>
//         <span>{conversation.name}</span>
//       </div>
//     ))}
//   </div>

//   {children}
// </div>
// }
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const conversations = [
    { name: 'Karol Studniarek', avatar: '/placeholder.svg?height=40&width=40' },
    { name: 'Magik', avatar: '/placeholder.svg?height=40&width=40' },
    { name: 'Fotograf', avatar: '/placeholder.svg?height=40&width=40' },
    { name: 'Zespół muzyczny', avatar: '/placeholder.svg?height=40&width=40' },
  ];

  return (
    <div className="flex h-screen bg-[#4a8573] text-[#005243]">
      {/* Sidebar for desktop and mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-neo-castleton p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-4 text-white">Rozmowy</h2>
        {conversations.map((conversation, index) => (
          <div
            key={index}
            className="flex items-center mb-2 p-2 hover:bg-[#4a8573] rounded cursor-pointer transition-colors text-white"
          >
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={conversation.avatar} alt={conversation.name} />
              <AvatarFallback>{conversation.name[0]}</AvatarFallback>
            </Avatar>
            <span>{conversation.name}</span>
          </div>
        ))}
      </div>

      {/* Toggle Button for Mobile */}
      <button
        className="p-4 text-white md:hidden z-30"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      {children}
    </div>
  );
}