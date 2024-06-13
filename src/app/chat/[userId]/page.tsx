"use client";

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
    console.log("Loading data for", userId);
    const response = await fetch(
      `https://chat-swxn.onrender.com/messages?from=${session?.user.id}&to=${userId}`,
    );
    const initialMessages = (await response.json()) as Array<Message>;
    setMessages(initialMessages);
  }, [session?.user.id, userId]);

  function handleSubmit() {
    console.log(message);
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
