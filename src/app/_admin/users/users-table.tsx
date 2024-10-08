"use client";

import Link from "next/link";
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
type SelectUser = RouterUserOutputs["users"]["get"][0]; // TODO: tricky type infering xd

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
              <TableHead className="md:table-cell">Firstname</TableHead>
              <TableHead className="md:table-cell">Lastname</TableHead>
              <TableHead className="md:table-cell">Email</TableHead>
              <TableHead className="md:table-cell">EmailVerified</TableHead>
              <TableHead className="md:table-cell">Image</TableHead>
              <TableHead className="md:table-cell">isPremium</TableHead>
              <TableHead className="md:table-cell">isAdmin</TableHead>
              <TableHead className="md:table-cell">isActive</TableHead>
              <TableHead className="md:table-cell">Sessions</TableHead>
              <TableHead className="md:table-cell">Accounts</TableHead>
              <TableHead className="md:table-cell">Offers</TableHead>
              <TableHead>Actions</TableHead>
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
  const deleteUserWithId = trpc.admin.users.delete.useMutation();

  // FIELDS
  const id = user.id ?? "null";
  const firstname = user.firstName ?? "null";
  const lastname = user.lastName ?? "null";
  const email = user.email ?? "null";
  const emailVerified = user.emailVerified ?? "null";
  const image = user.image ?? "null";
  const isPremium = user.isPremium ?? "null";
  const isAdmin = user.isAdmin ?? "null";
  const isActive = user.isActive ?? "null";
  // const location = user.location ?? "null";
  // const registrationStatus = user.registrationStatus ?? "null";
  const sessions = user.sessions_count ?? "null";
  const accounts = user.accounts_count ?? "null";
  const offers = user.offers_count ?? "null";

  return (
    <TableRow>
      <TableCell className="font-medium">{id}</TableCell>
      <TableCell className="md:table-cell">{firstname}</TableCell>
      <TableCell className="md:table-cell">{lastname}</TableCell>
      <TableCell className="md:table-cell">{email}</TableCell>
      <TableCell className="md:table-cell">
        {emailVerified.toLocaleString()}
      </TableCell>
      <TableCell className="md:table-cell">
        {image === "null" ? <a href={image}>image</a> : "null"}
      </TableCell>
      <TableCell className="md:table-cell">
        {isPremium ? (
          <p className="text-green-500">true</p>
        ) : (
          <p className="text-red-500">false</p>
        )}
      </TableCell>
      <TableCell className="md:table-cell">
        {isAdmin ? (
          <p className="text-green-500">true</p>
        ) : (
          <p className="text-red-500">false</p>
        )}
      </TableCell>
      <TableCell className="md:table-cell">
        {isActive ? (
          <p className="text-green-500">true</p>
        ) : (
          <p className="text-red-500">false</p>
        )}
      </TableCell>
      {/* <TableCell className="md:table-cell">{location}</TableCell>
      <TableCell className="md:table-cell">{registrationStatus}</TableCell> */}
      <TableCell className="md:table-cell">
        <Link
          href={`users/${id}/sessions`}
          className="text-indigo-700 underline hover:opacity-30"
        >
          {sessions}
        </Link>
      </TableCell>
      <TableCell className="md:table-cell">
        <Link
          href={`users/${id}/accounts`}
          className="text-indigo-700 underline hover:opacity-30"
        >
          {accounts}
        </Link>
      </TableCell>
      <TableCell className="md:table-cell">
        <Link
          href={`users/${id}/offers`}
          className="text-indigo-700 underline hover:opacity-30"
        >
          {offers}
        </Link>
      </TableCell>
      <TableCell className="flex gap-4">
        <Button className="w-full" size="sm" variant="secondary">
          <Link href={`users/${id}/edit`}>Edit</Link>
        </Button>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={() => {
            deleteUserWithId.mutate({ id });
            refetch();
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
