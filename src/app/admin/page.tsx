"use client";

import { trpc } from "~/app/_trpc/client";
import { UsersTable } from "./users-table";
import { Search } from "./search";
import { Icon } from "~/components/ui/Icon/Icon";

export default function IndexPage({
  searchParams,
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? "";
  const offset = searchParams.offset ?? 0;
  const { data, refetch } = trpc.getUsers.useQuery();

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="mb-8 flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <div className="mb-4 w-full">
        <Search value={searchParams.q} />
      </div>
      {data ? (
        <UsersTable users={data} offset={0} />
      ) : (
        <Icon name="spinner" className="m-32 h-8 w-8" />
      )}
    </main>
  );
}
