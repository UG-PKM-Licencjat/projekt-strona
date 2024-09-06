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
  return <div className="flex-1 flex flex-col bg-neo-gray-hover">
  <div className="flex-1 p-4 overflow-y-auto">
    {/* Sample messages */}
    <div className="flex mb-4">
      <Avatar className="h-8 w-8 mr-2">
        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Karol" />
        <AvatarFallback>K</AvatarFallback>
      </Avatar>
      <div className="bg-neo-gray rounded-lg p-3 max-w-[70%] text-neo-castleton">
        <p className="font-bold">Karol Studniarek:</p>
        <p>Cześć! Jak mogę ci dzisiaj pomóc?</p>
      </div>
    </div>
    <div className="flex flex-row-reverse mb-4">
      <Avatar className="h-8 w-8 ml-2">
        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>
      <div className="bg-neo-sea rounded-lg p-3 max-w-[70%] text-white">
        <p className="font-bold">Ty:</p>
        <p>Dzień dobry! Szukam zespołu na wesele mojej babci.</p>
      </div>
    </div>
  </div>

  <div className="p-4">
    <div className="flex">
      <Input 
        placeholder="Tutaj wpisz treść twojej wiadomości" 
        className="flex-1 mr-2 bg-white text-[#005243] placeholder-[#4a8573] border-[#005243]"
      />
      <Button className="bg-neo-pink hover:bg-neo-pink-hover transition-colors text-white">
        <Send className="mr-2" />
      </Button>
    </div>
  </div>
</div>;
}