"use client";

import { useSession } from "next-auth/react";
import Message from "../Message/Message";

export default function ConversationWindow({ data }: ConversationWindowProps) {
  const { data: session } = useSession();
  if (!session) {
    return <div>Please log in to view your chat history.</div>;
  }
  return (
    <div id="conversation-window" className="grid grid-cols-1 gap-2">
      {data.map((message) => (
        <div
          key={message.timestamp}
          className={
            message.from === session.user.id
              ? "justify-self-start"
              : "justify-self-end"
          }
        >
          <Message
            text={message.message}
            isFromMe={message.from === session.user.id}
          />
        </div>
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
