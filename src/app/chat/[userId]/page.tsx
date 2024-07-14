"use client";

import { request } from "http";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import ConversationWindow, {
  type Message,
} from "~/components/chat/ConversationWindow";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";

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

  useEffect(() => {
    const socketConnection = new WebSocket(
      `wss://chat-swxn.onrender.com/connect?id=${session?.user.id}`,
    );

    socketConnection.onmessage = (event: MessageEvent<string>) => {
      const newMessage = JSON.parse(event.data) as Message;
      console.log("1", messages);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log(messages);
    };
  }, [session]);

  void useMemo(async () => {
    console.log("Loading data for", session?.user.id);
    const response = await fetch(
      `https://chat-swxn.onrender.com/messages?userA=${session?.user.id}&userB=${userId}`,
    );

    // TODO: Validate schema?
    const initialMessages = (await response.json()) as {
      messages: Array<Message>;
    };

    setMessages(initialMessages.messages);
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
