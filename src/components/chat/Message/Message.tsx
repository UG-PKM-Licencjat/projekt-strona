import { type Message } from "src/components/chat/ConversationWindow/ConversationWindow";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function Message({ message }: MessageProps) {
  const { data: session } = useSession();

  const isUser = message.from === session?.user.id;
  const timeParsed = new Date(message.timestamp).toLocaleTimeString();

  //   <div class="message-wrapper" :class="{'user-wrapper': isUser}">
  //   <template v-if="isUser">
  //       <div class="message user-message">
  //           <div class="content user" v-html="content" />
  //           <p>{{getTimeParsed()}}</p>
  //       </div>
  //       <span>
  //           <img src="@/assets/images/profile/user.svg" alt="user picture">
  //       </span>
  //   </template>
  //   <template v-else>
  //       <span>
  //           <i class="ri-openai-fill" />
  //       </span>
  //       <div class="message">
  //           <div class="content" v-html="content" />
  //           <p>{{getTimeParsed()}}</p>
  //       </div>
  //   </template>
  // </div>

  {
    /* <style lang="scss" scoped>
    // system
    .message-wrapper {
        display: flex;
        gap: 20px;
        span {
            padding-bottom: 20px;
            display: flex;
            align-items: center;
            font-size: 50px;
            color: $dark;        
            img {
                height: 50px;
                background: transparent;
            }
        }
        .message {
            max-width: 70%;
            display: flex;
            flex-direction: column;
            .content {
                color: $muted;
                font-weight: 400;
                padding: 10px;
                font-size: 14px;
                border-radius: 10px;
                background: $message-background-color;
                overflow-x: auto;
                max-width: 100%;

                p {
                    font-size: 14px;
                    color: $muted;
                    margin: 0;
                }
            }
            p {
                margin: 0;
                font-size: 12px;
                color: $timestamp-color;
            }
        }
    }
    // user
    .user-wrapper {
        justify-content: flex-end;
        span {
            justify-content: flex-end;
        }
        .user-message {
            align-items: flex-end;
            white-space: pre-wrap;
            .user {
                background: $user-message-background-color;
            }
        }
    }
</style> */
  }
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
        {/* <p className="font-bold">
          {message.from === session?.user.id ? "Ty:" : `ANOTHER:`}
        </p> */}
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
