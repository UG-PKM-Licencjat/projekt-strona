"use client";

import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import ConversationWindow, {
  type Message,
} from "src/components/chat/ConversationWindow/ConversationWindow";
import { Button } from "src/components/ui/Button/Button";
import { Input } from "src/components/ui/Input/Input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

// export default function Conversation({
//   params,
// }: {
//   params: { userId: string };
// }) {
//   const { userId } = params;
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Array<Message>>([]);
//   const { data: session } = useSession();

//   void useMemo(async () => {
//     console.log("Loading data for", session?.user.id);
//     const response = await fetch(
//       `https://chat-swxn.onrender.com/messages?userA=${session?.user.id}&userB=${userId}`,
//     );

//     // TODO: Validate schema?
//     const initialMessages = (await response.json()) as {
//       messages: Array<Message>;
//     };

//     setMessages(initialMessages.messages);
//   }, [session?.user.id, userId]);

//   async function handleSubmit() {
//     const response = await fetch("https://chat-swxn.onrender.com/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         message: message,
//         from: session?.user.id,
//         to: userId,
//       }),
//     });
//     // Todo also validate
//     const newMessage = (await response.json()) as { message: Message };
//     // TODO when status will be known change it to exact one
//     if (response.status < 300) {
//       setMessages([...messages, newMessage.message]);
//     }
//     setMessage("");
//   }

//   return (
//     <div>
//       <ConversationWindow data={messages} />
//       <Input
//         value={message}
//         onChange={(event) => {
//           setMessage(event.target.value);
//         }}
//         placeholder="Hej! Czy dasz radę zagrać na..."
//       />
//       <Button type="submit" onClick={handleSubmit}>
//         Send
//       </Button>
//     </div>
//   );
// }

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

  return <div className="flex-1 flex flex-col bg-neo-gray-hover">
  <div className="flex-1 p-4 overflow-y-auto">
  {messages.map((message) => (
    <div
      key={message.timestamp}
      className={`flex mb-4 ${message.from === session?.user.id ? "flex-row-reverse" : ""}`}
    >
      {/* TODO CHANGE ALL ANOTHERS HERE */}
      <Avatar className={`h-8 w-8 ${message.from === session?.user.id ? "ml-2" : "mr-2"}`}>
        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={message.from === session?.user.id ? "You" : "ANOTHER"} />
        <AvatarFallback>{message.from === session?.user.id ? "Y" : "ANOTHER"}</AvatarFallback>
      </Avatar>
      <div
        className={`rounded-lg p-3 max-w-[70%] ${
          message.from === session?.user.id ? "bg-neo-sea text-white" : "bg-neo-gray text-neo-castleton"
        }`}
      >
        <p className="font-bold">{message.from === session?.user.id ? "Ty:" : `ANOTHER:`}</p>
        <p>{message.message}</p>
      </div>
    </div>
  ))}
  </div>

  <div className="p-4">
    <div className="flex">
      <Input 
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        placeholder="Tutaj wpisz treść twojej wiadomości" 
        className="flex-1 mr-2 bg-white text-[#005243] placeholder-[#4a8573] border-[#005243]"
      />
      <Button onClick={handleSubmit} className="bg-neo-pink hover:bg-neo-pink-hover transition-colors text-white">
        <Send className="mr-2" />
      </Button>
    </div>
  </div>
</div>;
}