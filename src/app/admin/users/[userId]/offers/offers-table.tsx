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

type RouterUserOutputs = inferRouterOutputs<typeof AdminRouter.offers>;
type Offer = RouterUserOutputs["getByUserId"][0];

export function OffersTable({
  offers,
  offset,
  refetch,
}: {
  offers: Offer[];
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
              <TableHead className="md:table-cell">Name</TableHead>
              <TableHead className="md:table-cell">Description</TableHead>
              <TableHead className="md:table-cell">Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer, index) => (
              <OfferRow key={index} offer={offer} refetch={refetch} />
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

function OfferRow({ offer, refetch }: { offer: Offer; refetch: () => void }) {
  const deleteUserWithId = trpc.admin.users.delete.useMutation();

  // FIELDS
  const id = offer.id ?? "null";
  const name = offer.name ?? "null";
  const description = offer.description ?? "null";
  const price = offer.price ?? "null";

  return (
    <TableRow>
      <TableCell className="font-medium">{id}</TableCell>
      <TableCell className="md:table-cell">{name}</TableCell>
      <TableCell className="md:table-cell">{description}</TableCell>
      <TableCell className="md:table-cell">{price}</TableCell>
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
