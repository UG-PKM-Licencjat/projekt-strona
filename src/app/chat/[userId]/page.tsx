"use client";

import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState, useEffect, useRef } from "react";
import { Button } from "src/components/ui/Button/Button";
import { Input } from "src/components/ui/Input/Input";
import Message from "~/components/chat/Message/Message";
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

  const { data: otherProviderId } =
    trpc.accounts.getProviderId.useQuery(userId);

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

  useEffect(() => {
    const listener = (ev: KeyboardEvent) => {
      if (ev.code === "Enter" || ev.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        ev.preventDefault();
        void handleSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  async function handleSubmit() {
    if (!otherProviderId || !session) return;
    setMessage("");
    await sendMessage(message, session, userId, otherProviderId);
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
      <div className="flex flex-1 flex-col overflow-y-scroll p-4">
        {(conversations[userId] ?? [])
          .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
          .map((message, ind) => (
            <Message key={ind} message={{ ...message }} />
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
          className="mr-2 flex-1 border-[#005243] bg-white text-[#005243] placeholder-[#4a8573]"
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
