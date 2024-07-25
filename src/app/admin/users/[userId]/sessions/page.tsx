"use client";

import { trpc } from "src/app/_trpc/client";
import { SessionsTable } from "./sessions-table";
import { Search } from "../../../search";
import { Icon } from "src/components/ui/Icon/Icon";
import { useRouter } from "next/navigation";
import { Button } from "src/components/ui/Button/Button";

export default function IndexPage({
  searchParams,
  params,
}: {
  searchParams: { q: string; offset: string };
  params: { userId: string };
}) {
  const search = searchParams.q ?? "";
  const offset = searchParams.offset ?? 0;

  const { data } = trpc.admin.users.getById.useQuery({
    id: params.userId,
  });

  const { data: sessionData, refetch: sessionRe } =
    trpc.admin.sessions.getByUserId.useQuery({ userId: params.userId });
  const router = useRouter();

  const refetch = async () => {
    console.log("refetching");
    await sessionRe({});
    router.refresh();
  };

  return (
    <main className="flex max-w-[80vw] flex-1 flex-col overflow-hidden p-4 md:p-6">
      <div className="mb-8 flex-col items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Sessions</h1>
        <h2 className="text-lg text-gray-500 md:text-lg">
          {data?.id ?? "null"}
        </h2>
        <h2 className="text-lg text-gray-500 md:text-lg">
          {data?.email ?? "null"}
        </h2>
      </div>
      <div className="mb-4 w-full">
        <Search value={searchParams.q} />
      </div>
      {sessionData ? (
        <SessionsTable sessions={sessionData} offset={0} refetch={sessionRe} />
      ) : (
        <Icon name="spinner" className="m-32 h-8 w-8 animate-spin" />
      )}
    </main>
  );
}
