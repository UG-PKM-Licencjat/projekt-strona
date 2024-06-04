"use client";

import { useSession } from "next-auth/react";
import Message from "../Message/Message";

export default function ConversationWindow({ data }: ConversationWindowProps) {
  const { data: session } = useSession();
  if (!session) {
    return <div>Please log in to view your chat history.</div>;
  }
  return (
    <div id="conversation-window">
      {data.map((message) => (
        <Message
          key={message.timestamp}
          text={message.message}
          isFromMe={message.from === session.user.id}
        />
      ))}
    </div>
  );
}

interface ConversationWindowProps {
  data: Array<Message>;
}

export interface Message {
  from: string;
  to: string;
  timestamp: string;
  message: string;
}
