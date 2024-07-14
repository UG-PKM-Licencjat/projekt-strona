"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Message from "../Message";

export default function ConversationWindow({ data }: ConversationWindowProps) {
  const { data: session } = useSession();
  const chatBox = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // if (chatBox.current) {
    // chatBox.current.scrollTop = chatBox.current.scrollHeight;
    // }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  if (!session) {
    return <div>Please log in to view your chat history.</div>;
  }
  return (
    <div
      id="conversation-window"
      ref={chatBox}
      className="grid grid-cols-1 gap-2"
    >
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
