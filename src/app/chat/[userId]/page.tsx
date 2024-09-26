import { getServerAuthSession } from "~/server/auth";
import Conversation from "./chat-page";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const session = await getServerAuthSession();
  if (!session) redirect("/");
  if (session.user.id === params.userId) redirect("/chat");
  return api.accounts
    .getProviderIdWithUserInfo(params.userId)
    .then((otherUserData) => {
      return (
        <Conversation
          params={params}
          session={session}
          otherUserData={otherUserData}
        />
      );
    })
    .catch(() => {
      redirect("/chat");
    });
}
