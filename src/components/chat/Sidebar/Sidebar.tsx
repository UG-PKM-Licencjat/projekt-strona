import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useConversationsStore } from "~/stores";
import { usePathname, useRouter } from "next/navigation";
import { trpc } from "~/trpc/react";
import { useSession } from "next-auth/react";

export interface UserWithMessage {
  userId: string;
  name: string;
  lastMessage: string;
  image: string;
}

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const store = useConversationsStore();
  const pathname = usePathname();
  const pathUserId = pathname.split("/")[2]; // Get userId from the URL

  // Fetch users excluding the current session user
  const { data: userDataForSample } = trpc.user.fetchManyUsers.useQuery(
    Object.entries(store.conversations)
      .map((entry) => entry[0])
      .filter((e) => e !== session?.user.id),
  );

  return (
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
              lastMessage: "", // message.message (can be added later),
              image: userData.image ?? "",
            }) satisfies UserWithMessage,
        )
        .map((conversation, index) => (
          <div
            onClick={() => {
              router.push(`/chat/${conversation.userId}`);
              setIsSidebarOpen(false); // Close sidebar on mobile after selecting
            }}
            key={index}
            className={`mb-2 flex cursor-pointer items-center rounded p-2 text-white transition-colors hover:bg-neo-sea ${
              (pathUserId ?? "") == conversation.userId ? "bg-neo-sea" : ""
            }`}
          >
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src={conversation.image} alt={conversation.name} />
              <AvatarFallback>{conversation.name}</AvatarFallback>
            </Avatar>
            <span>{conversation.name}</span>
          </div>
        ))}
    </div>
  );
}
