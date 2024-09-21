"use client";

import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { Button } from "src/components/ui/Button/Button";
import { Input } from "src/components/ui/Input/Input";
import Message from "src/components/chat/Message/Message";
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
        {(store.conversations[userId] ?? []).map((message, ind) => (
          <Message key={ind} message={message} />
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
            onKeyDown={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
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
