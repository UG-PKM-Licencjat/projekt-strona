"use client";

import { LoaderCircleIcon, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { Button } from "src/components/ui/Button/Button";
import { Input } from "src/components/ui/Input/Input";
import Message from "~/components/chat/Message/Message";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import SkeletonCard from "~/components/ui/SkeletonCard/SkeletonCard";
import { useConversationsStore } from "~/stores";
import { trpc } from "~/trpc/react";

export default function Conversation({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const { data: otherUserData } =
    trpc.accounts.getProviderIdWithUserInfo.useQuery(userId);

  const [conversations, fetchMessagesForUser, sendMessage] =
    useConversationsStore((state) => [
      state.conversations,
      state.fetchMessagesForUser,
      state.sendMessage,
    ]);

  void useMemo(async () => {
    if (!session) return;
    await fetchMessagesForUser(session, userId);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!otherUserData || !session) return;
    setMessage("");
    await sendMessage(
      message,
      session,
      userId,
      otherUserData.providerAccountId,
    );
  }

  // // scroll pagination
  // const observerRef = useRef(null);
  // const observer = new IntersectionObserver(
  //   (entries: IntersectionObserverEntry[]) => {
  //     if (entries[0]?.isIntersecting && store.conversations[userId]) {
  //       if (store.conversations[userId].length > 0) {
  //         void fetchNextMessages();
  //       }
  //     }
  //   },
  //   { threshold: 0.5 },
  // );

  const fetchNextMessages = async () => {
    // fetch next messages
    setTimeout(() => {
      alert("fetching next messages");
    }, 1000);
  };

  return (
    <div className="flex max-h-[89vh] flex-1 flex-col overflow-y-hidden md:p-6">
      <div className="flex items-center justify-between rounded-lg bg-neo-castleton p-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <Avatar className={`h-12 w-12`}>
            <AvatarImage
              src={otherUserData?.image ?? ""}
              alt={"Zdjęcie awataru"}
            />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          {otherUserData ? (
            <span className="text-lg font-semibold text-white">
              {otherUserData?.name}
            </span>
          ) : (
            <SkeletonCard className="h-8 w-44 rounded" />
          )}
        </div>
        {otherUserData?.offerId && (
          <Link
            href={`/offers/${otherUserData?.offerId}`}
            className="mr-6 text-base font-medium text-white transition-colors duration-200 hover:text-gray-300 hover:underline"
          >
            Oferta
          </Link>
        )}
      </div>

      <div className="flex flex-1 flex-col overflow-y-scroll p-4">
        {!conversations[userId] && (
          <div className="flex h-full w-full items-center justify-center">
            <LoaderCircleIcon className="size-10 animate-spin text-white" />
          </div>
        )}

        {(conversations[userId] ?? [])
          .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
          .map((message, ind) => (
            <Message
              key={ind}
              message={{
                ...message,
                image:
                  message.from === session?.user.id
                    ? session.user.image
                    : otherUserData?.image,
              }}
            />
          ))}
        {/* <div ref={observerRef}></div> */}
      </div>
      <form className="mr-5 flex" onSubmit={handleSubmit}>
        <Input
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          placeholder="Tutaj wpisz treść twojej wiadomości"
          className="mr-2 flex-1 border-[#005243] bg-white text-black placeholder-[#4a8573]"
        />
        <Button
          onClick={handleSubmit}
          type="submit"
          className="bg-neo-pink text-white transition-colors hover:bg-neo-pink-hover"
        >
          <Send className="mr-2" />
        </Button>
      </form>
    </div>
  );
}
