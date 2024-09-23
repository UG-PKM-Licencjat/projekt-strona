import { CircleCheck, Loader2 } from "lucide-react"; // Icons for status
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export interface Message {
  from: string;
  to: string;
  timestamp: string;
  message: string;
  read: boolean;
  sending?: boolean; // Optional field for indicating if the message is still sending
}

export default function Message({ message }: MessageProps) {
  const { data: session } = useSession();

  const isUser = message.from === session?.user.id;
  const timeParsed = new Date(message.timestamp).toLocaleTimeString();

  return (
    <div className={`mb-5 flex ${isUser ? "flex-row-reverse self-end" : ""}`}>
      {/* Status Icons for User */}
      {isUser && (
        <div className="ml-2 flex items-end gap-1 text-neo-dark-gray">
          {/* Sending Icon */}
          {message.sending && <Loader2 className="animate-spin" size={16} />}

          {/* Sent and Unread Icon */}
          {!message.sending && !message.read && (
            <CircleCheck className="bg-transparent opacity-80" size={16} />
          )}

          {/* Read Icon */}
          {!message.sending && message.read && (
            <CircleCheck className="fill-current" size={16} />
          )}
        </div>
      )}
      <div
        className={`flex w-fit gap-2 rounded-xl p-2 shadow-lg ${
          isUser ? "flex-row-reverse bg-neo-sea" : "bg-white"
        }`}
      >
        {/* Avatar */}
        <Avatar className={`h-12 w-12 ${isUser ? "ml-2" : "mr-2"}`}>
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt={isUser ? "Twoje zdjęcie awataru" : "ANOTHER"}
          />
          <AvatarFallback>{isUser ? "Y" : "A"}</AvatarFallback>
        </Avatar>

        {/* Message bubble */}
        <div
          className={`flex min-w-[100px] max-w-[70%] flex-col justify-between rounded-md ${
            isUser ? "items-end text-white" : "text-black"
          }`}
        >
          {/* Message content */}
          <p className={`text-md overflow-x-auto ${isUser ? "ml-3" : "mr-3"}`}>
            {message.message}
          </p>

          {/* Time and status */}
          <div className="flex items-center justify-between">
            <p className={`text-sm ${isUser ? "mb-1" : "text-neo-dark-gray"}`}>
              {timeParsed}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MessageProps {
  message: Message;
}
