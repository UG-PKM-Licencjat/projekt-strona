"use client";

import { request } from "http";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import ConversationWindow, {
  type Message,
} from "~/components/chat/ConversationWindow/ConversationWindow";
import { Button } from "~/components/ui/Button/Button";
import { Input } from "~/components/ui/Input/Input";

// TODO: Data should be cached in the client
export default function Conversation({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const { data: session } = useSession();

  void useMemo(async () => {
    console.log("Loading data for", session?.user.id);
    const response = await fetch(
      `https://chat-swxn.onrender.com/messages?from=${session?.user.id}&to=${userId}`, // TODO: this fetches not conversations but messages to be fixed
    );

    // TODO: Validate schema?
    const initialMessages = (await response.json()) as {
      messages: Array<Message>;
    };

    setMessages(initialMessages.messages);
    console.log(initialMessages.messages);
  }, [session?.user.id, userId]);

  async function handleSubmit() {
    const response = await fetch("https://chat-swxn.onrender.com/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        from: session?.user.id,
        to: userId,
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
    <div>
      <ConversationWindow data={messages} />
      <Input
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        placeholder="Hej! Czy dasz radę zagrać na..."
      />
      <Button type="submit" onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
}
