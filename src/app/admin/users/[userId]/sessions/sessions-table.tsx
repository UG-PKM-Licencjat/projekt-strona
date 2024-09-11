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
import { trpc } from "~/trpc/react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AdminRouter } from "~/server/api/routers/admin";

type RouterUserOutputs = inferRouterOutputs<typeof AdminRouter>;
type Session = RouterUserOutputs["sessions"]["getByUserId"][0];

export function SessionsTable({
  sessions,
  offset,
  refetch,
}: {
  sessions: Session[];
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
              <TableHead className="max-w-[150px]">SessionToken</TableHead>
              <TableHead className="md:table-cell">Expires</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session, index) => (
              <SessionRow key={index} session={session} refetch={refetch} />
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

function SessionRow({
  session,
  refetch,
}: {
  session: Session;
  refetch: () => void;
}) {
  const deleteUserWithId = trpc.admin.users.delete.useMutation();

  // FIELDS
  const sessionToken = session.sessionToken ?? "null";
  const expires = session.expires ?? "null";

  return (
    <TableRow>
      <TableCell className="font-medium">{sessionToken}</TableCell>
      <TableCell className="md:table-cell">{expires.toLocaleString()}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={() => {
            refetch();
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
