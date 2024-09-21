"use client";

import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { type Message } from "src/components/chat/ConversationWindow/ConversationWindow";
import { Button } from "src/components/ui/Button/Button";
import { Input } from "src/components/ui/Input/Input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useConversationsStore } from "~/stores";
import { trpc } from "~/trpc/react";

export default function Conversation({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const { data: otherProviderId } =
    trpc.accounts.getProviderId.useQuery(userId);

  const store = useConversationsStore();

  void useMemo(async () => {
    console.log("Info: ");
    console.log(store.conversations);
    if (!session) return;
    await store.fetchMessagesForUser(session, userId);
  }, []);

  async function handleSubmit() {
    if (!otherProviderId || !session) return;
    setMessage("");
    await store.sendMessage(message, session, userId, otherProviderId);
  }

  return (
    <div className="flex flex-1 flex-col bg-neo-gray-hover md:p-6">
      <div className="flex-1 overflow-y-auto p-4">
        {(store.conversations[userId] ?? []).map((message) => (
          <div
            key={message.from + message.to + message.timestamp}
            className={`mb-4 flex ${message.from === session?.user.id ? "flex-row-reverse" : ""}`}
          >
            {/* TODO CHANGE ALL ANOTHERS HERE */}
            <Avatar
              className={`h-8 w-8 ${message.from === session?.user.id ? "ml-2" : "mr-2"}`}
            >
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt={message.from === session?.user.id ? "You" : "ANOTHER"}
              />
              <AvatarFallback>
                {message.from === session?.user.id ? "Y" : "ANOTHER"}
              </AvatarFallback>
            </Avatar>
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.from === session?.user.id
                  ? "bg-neo-sea text-white"
                  : "bg-neo-gray text-neo-castleton"
              }`}
            >
              <p className="font-bold">
                {message.from === session?.user.id ? "Ty:" : `ANOTHER:`}
              </p>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="">
        <div className="flex">
          <Input
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            placeholder="Tutaj wpisz treść twojej wiadomości"
            className="mr-2 flex-1 border-[#005243] bg-white text-[#005243] placeholder-[#4a8573]"
          />
          <Button
            onClick={handleSubmit}
            className="bg-neo-pink text-white transition-colors hover:bg-neo-pink-hover"
          >
            <Send className="mr-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
