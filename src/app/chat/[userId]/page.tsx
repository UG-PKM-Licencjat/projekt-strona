"use client";

import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { type Message } from "src/components/chat/ConversationWindow/ConversationWindow";
import { Button } from "src/components/ui/Button/Button";
import { Input } from "src/components/ui/Input/Input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { trpc } from "~/trpc/react";

export default function Conversation({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const { data: session } = useSession();

  const { data: otherProviderId } = trpc.accounts.getByUserId.useQuery({
    userId: userId,
  });

  void useMemo(async () => {
    console.log("Loading data for", session?.user.id);
    const response = await fetch(
      `https://chat-swxn.onrender.com/messages?userA=${session?.user.id}&userB=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.idToken}`,
        },
      },
    );

    // TODO: Validate schema?
    const initialMessages = (await response.json()) as {
      messages: Array<Message>;
    };

    setMessages(initialMessages.messages);
  }, [session?.user.id, userId]);

  async function handleSubmit() {
    if (!otherProviderId) return;
    const otherAccountProv = otherProviderId[0]?.providerAccountId;
    const response = await fetch("https://chat-swxn.onrender.com/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.idToken}`,
      },
      body: JSON.stringify({
        message: message,
        from: session?.user.id,
        to: userId,
        fromSub: session?.user.providerAccountId,
        toSub: otherAccountProv,
      }),
    });
    // Todo also validate
    const newMessage = (await response.json()) as { message: Message };
    // TODO when status will be known change it to exact one
    if (response.status < 300) {
      setMessages([...messages, newMessage.message]);
    }
    setMessage("");
  }

  return (
    <div className="flex flex-1 flex-col bg-neo-gray-hover md:p-6">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.timestamp}
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
