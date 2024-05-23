"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "~/components/ui/Table/Table";
import { Button } from "~/components/ui/Button/Button";
import { useRouter } from "next/navigation";
import { trpc } from "~/app/_trpc/client";

interface SelectUser {
  id: string;
  image: string | null;
  name: string | null;
  email: string;
  emailVerified: string | null;
}

export function UsersTable({
  users,
  offset,
}: {
  users: SelectUser[];
  offset: number | null;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  return (
    <>
      <form className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Username</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} />
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

function UserRow({ user }: { user: SelectUser }) {
  const userId = user.id;
  const deleteUserWithId = trpc.deleteUser.useMutation();

  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={() => deleteUserWithId.mutate({ id: userId })}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
