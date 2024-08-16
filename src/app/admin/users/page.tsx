"use client";

import { trpc } from "src/app/_trpc/client";
import { UsersTable } from "./users-table";
import { Search } from "../search";
import { Icon } from "src/components/ui/Icon/Icon";
import { useRouter } from "next/navigation";
import { Button } from "src/components/ui/Button/Button";

export default function IndexPage({
  searchParams,
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? "";
  const offset = searchParams.offset ?? 0;
  const { data, refetch: re } = trpc.admin.users.get.useQuery();
  const router = useRouter();

  const refetch = async () => {
    console.log("refetching");
    await re({});
    router.refresh();
  };

  return (
    <main className="flex max-w-[80vw] flex-1 flex-col overflow-hidden p-4 md:p-6">
      <div className="mb-8 flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <div className="mb-4 w-full">
        <Search value={searchParams.q} />
      </div>
      {data ? (
        <UsersTable users={data} offset={0} refetch={refetch} />
      ) : (
        <Icon name="spinner" className="m-32 h-8 w-8 animate-spin" />
      )}
    </main>
  );
}
