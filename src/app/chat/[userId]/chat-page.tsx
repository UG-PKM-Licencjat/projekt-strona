"use client";

import { LoaderCircleIcon, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "src/components/ui/Button/Button";
import { Input } from "src/components/ui/Input/Input";
import Message from "~/components/chat/Message/Message";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import SkeletonCard from "~/components/ui/SkeletonCard/SkeletonCard";
import { useConversationsStore } from "~/stores";
import { type Session } from "next-auth";

export default function Conversation({
  params,
  session,
  otherUserData,
}: {
  params: { userId: string };
  session: Session;
  otherUserData: {
    providerAccountId: string;
    name: string | null;
    image: string | null;
    offerId: string | null;
  };
}) {
  const { userId } = params;
  const [message, setMessage] = useState("");

  const [skip, setSkip] = useState(0);
  const limit = 5;

  const [conversations, fetchMessagesForUser, sendMessage] =
    useConversationsStore((state) => [
      state.conversations,
      state.fetchMessagesForUser,
      state.sendMessage,
    ]);

  void useMemo(async () => {
    await fetchMessagesForUser(session, userId, skip, limit);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
    e.preventDefault();
    setMessage("");
    await sendMessage(
      message,
      session,
      userId,
      otherUserData.providerAccountId,
    );
  }

  // start at the bottom
  const endOfChatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endOfChatRef.current?.scrollIntoView();
  }, []);

  // pagination

  const [doPagination, setDoPagination] = useState(true);
  const [lastNumber, setLastNumber] = useState(0);

  const [loadingMore, setLoadingMore] = useState(false);
  const topOfChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!doPagination) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting && !loadingMore) {
          if (conversations[userId] && conversations[userId].length < limit) {
            return;
          }
          setLoadingMore(true);
          setSkip((prev) => prev + 5);
          fetchMessagesForUser(session, userId, skip, limit)
            .then(() => {
              setLoadingMore(false);
              if (conversations[userId]) {
                if (lastNumber === conversations[userId].length) {
                  setDoPagination(false);
                }
                setLastNumber(conversations[userId].length);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
      { threshold: 0.5 },
    );

    if (topOfChatRef.current) {
      observer.observe(topOfChatRef.current);
    }

    return () => {
      if (topOfChatRef.current) {
        observer.unobserve(topOfChatRef.current);
      }
    };
  });

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
            <>
              <span className="text-lg font-semibold text-white">
                {otherUserData?.name}
              </span>
              <span className="text-base font-semibold text-white">
                {otherUserData?.offerId ? "Artysta" : "Użytkownik"}
              </span>
            </>
          ) : (
            <SkeletonCard className="h-8 w-44 rounded" />
          )}
        </div>
        {otherUserData?.offerId && (
          <Link
            href={`/offers/${otherUserData?.offerId}`}
            className="mr-6 text-base font-medium text-white transition-colors duration-200 hover:text-gray-300 hover:underline"
          >
            <Button variant="secondary" size="sm">
              Zobacz ofertę artysty
            </Button>
          </Link>
        )}
      </div>

      <div className="flex flex-1 flex-col-reverse overflow-y-auto p-4">
        {!conversations[userId] && (
          <div className="flex h-full w-full items-center justify-center">
            <LoaderCircleIcon className="size-10 animate-spin text-neo-castleton" />
          </div>
        )}
        <div ref={endOfChatRef}></div>
        {(conversations[userId] ?? [])
          .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
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
        {loadingMore && (
          <div className="flex w-full justify-center">
            <LoaderCircleIcon className="size-10 animate-spin text-neo-castleton" />
          </div>
        )}
        <div ref={topOfChatRef}></div>
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
