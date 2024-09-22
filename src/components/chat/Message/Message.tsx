import { type Message } from "src/components/chat/ConversationWindow/ConversationWindow";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function Message({ message }: MessageProps) {
  const { data: session } = useSession();

  const isUser = message.from === session?.user.id;
  const timeParsed = new Date(message.timestamp).toLocaleTimeString();

  return (
    <div className={`mb-5 flex gap-4 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* TODO CHANGE ALL ANOTHERS HERE */}
      <Avatar className={`h-12 w-12 ${isUser ? "ml-2" : "mr-2"}`}>
        <AvatarImage
          src="/placeholder.svg?height=40&width=40"
          alt={isUser ? "Twoje zdjęcie awataru" : "ANOTHER"}
        />
        <AvatarFallback>{isUser ? "Y" : "ANOTHER"}</AvatarFallback>
      </Avatar>
      <div
        className={`flex min-w-[100px] max-w-[70%] flex-col rounded-md px-2 ${
          isUser
            ? "items-end bg-neo-sea text-white"
            : "bg-neo-gray text-neo-castleton"
        }`}
      >
        <p className={`text-md overflow-x-auto p-2 ${isUser ? "mr-2" : ""}`}>
          {message.message}
        </p>
        <p
          className={`text-sm ${isUser ? "mb-1 mr-2" : "ml-2 text-neo-dark-gray"}`}
        >
          {timeParsed}
        </p>
      </div>
    </div>
  );
}

interface MessageProps {
  message: Message;
}
