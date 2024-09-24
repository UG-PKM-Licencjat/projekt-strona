"use client";
import { trpc } from "~/trpc/react";
import { useParams, notFound } from "next/navigation";
import OfferView from "~/components/Offer/OfferView";
import { LoaderCircleIcon } from "lucide-react";

export default function OfferPage() {
  const { offerId } = useParams<{ offerId: string }>();
  const { data, isLoading } = trpc.offers.getById.useQuery(offerId);

  if (isLoading) {
    return (
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
        <LoaderCircleIcon className="size-10 animate-spin text-white" />
      </div>
    );
  }

  if (!isLoading && !data) notFound();

  if (data) return <OfferView data={data} />;
}
