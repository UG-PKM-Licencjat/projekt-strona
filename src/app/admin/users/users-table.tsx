"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "src/components/ui/Table/Table";
import { Button } from "src/components/ui/Button/Button";
import { useRouter } from "next/navigation";
import { trpc } from "src/app/_trpc/client";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "src/server/routers/_app";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type SelectUser = RouterOutputs["getUsers"][0]; // TODO: tricky type infering xd

export function UsersTable({
  users,
  offset,
  refetch,
}: {
  users: SelectUser[];
  offset: number | null;
  refetch: () => void;
}) {
  const router = useRouter();

  function onClick() {
    // router.replace(`/?offset=${offset}`);
    alert("Not implemented");
  }

  return (
    <>
      <form className="w-full rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Id</TableHead>
              <TableHead className="md:table-cell">Email</TableHead>
              <TableHead className="md:table-cell">Username</TableHead>
              <TableHead className="md:table-cell">isPremium</TableHead>
              <TableHead className="md:table-cell">isActive</TableHead>
              <TableHead className="md:table-cell">isAdmin</TableHead>
              <TableHead className="md:table-cell">Sessions</TableHead>
              <TableHead className="md:table-cell">Accounts</TableHead>
              <TableHead className="md:table-cell">Offers</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} refetch={refetch} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function UserRow({ user, refetch }: { user: SelectUser; refetch: () => void }) {
  const userId = user.id;

  const deleteUserWithId = trpc.deleteUser.useMutation();

  console.log(user);
  return (
    <TableRow>
      <TableCell className="font-medium">{user.id}</TableCell>
      <TableCell className="md:table-cell">{user.email}</TableCell>
      <TableCell className="md:table-cell">{user.name}</TableCell>
      <TableCell className="md:table-cell">
        {user.isPremium ? (
          <p className="text-green-500">true</p>
        ) : (
          <p className="text-red-500">false</p>
        )}
      </TableCell>
      <TableCell className="md:table-cell">
        {user.isActive ? (
          <p className="text-green-500">true</p>
        ) : (
          <p className="text-red-500">false</p>
        )}
      </TableCell>
      <TableCell className="md:table-cell">
        {user.isAdmin ? (
          <p className="text-green-500">true</p>
        ) : (
          <p className="text-red-500">false</p>
        )}
      </TableCell>
      <TableCell className="md:table-cell">{user.sessions_count}</TableCell>
      <TableCell className="md:table-cell">account count</TableCell>
      <TableCell className="md:table-cell">offers count</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={() => {
            deleteUserWithId.mutate({ id: userId });
            refetch();
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
