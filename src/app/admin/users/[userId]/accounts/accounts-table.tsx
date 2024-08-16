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
import { AdminRouter } from "~/server/routers/admin";

type RouterUserOutputs = inferRouterOutputs<typeof AdminRouter.accounts>;
type Account = RouterUserOutputs["getByUserId"][0];

export function AccountsTable({
  accounts,
  offset,
  refetch,
}: {
  accounts: Account[];
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
              <TableHead className="max-w-[150px]">Type</TableHead>
              <TableHead className="md:table-cell">Provider</TableHead>
              <TableHead className="md:table-cell">ProviderAccountId</TableHead>
              <TableHead className="md:table-cell">RefreshToken</TableHead>
              <TableHead className="md:table-cell">AccessToken</TableHead>
              <TableHead className="md:table-cell">ExpiresAt</TableHead>
              <TableHead className="md:table-cell">TokenType</TableHead>
              <TableHead className="md:table-cell">Scope</TableHead>
              <TableHead className="md:table-cell">IdToken</TableHead>
              <TableHead className="md:table-cell">SessionState</TableHead>
              <TableHead className="md:table-cell">Admin</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account, index) => (
              <AccountRow key={index} account={account} refetch={refetch} />
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

function AccountRow({
  account,
  refetch,
}: {
  account: Account;
  refetch: () => void;
}) {
  const deleteUserWithId = trpc.admin.users.delete.useMutation();

  // FIELDS
  const type = account.type ?? "null";
  const provider = account.provider ?? "null";
  const providerAccountId = account.providerAccountId ?? "null";
  const refreshToken = account.refresh_token ?? "null";
  const accessToken = account.access_token ?? "null";
  const expiresAt = account.expires_at ?? "null";
  const tokenType = account.token_type ?? "null";
  const scope = account.scope ?? "null";
  const idToken = account.id_token ?? "null";
  const sessionState = account.session_state ?? "null";
  const admin = account.admin ?? "null";

  return (
    <TableRow>
      <TableCell className="font-medium">{type}</TableCell>
      <TableCell className="md:table-cell">{provider}</TableCell>
      <TableCell className="md:table-cell">{providerAccountId}</TableCell>
      <TableCell className="md:table-cell">{refreshToken}</TableCell>
      <TableCell className="md:table-cell">{accessToken}</TableCell>
      <TableCell className="md:table-cell">{expiresAt}</TableCell>
      <TableCell className="md:table-cell">{tokenType}</TableCell>
      <TableCell className="md:table-cell">{scope}</TableCell>
      <TableCell className="md:table-cell">{idToken}</TableCell>
      <TableCell className="md:table-cell">{sessionState}</TableCell>
      <TableCell className="md:table-cell">{admin}</TableCell>
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
