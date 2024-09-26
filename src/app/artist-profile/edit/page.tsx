import { ArtistProfileMultiform } from "~/components/ArtistProfile/ArtistProfileMultiform";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { type ArtistFormData } from "~/lib/artistSchema";

export default async function CreateArtistProfilePage() {
  const session = await getServerAuthSession();
  if (!session) return;
  const isArtist = session?.user.isArtist;
  if (!isArtist) redirect("/");
  const rawOffer = await api.offers.getByUserId(session.user.id);
  if (!rawOffer) redirect("/");
  const offer: ArtistFormData = {
    name: rawOffer?.name,
    shortDescription: rawOffer?.shortDescription,
    longDescriptionHTML: rawOffer?.longDescription,
    longDescription: "1234567890", // Go over character limit initially to avoid errors
    locationName: rawOffer?.locationName,
    locationPlaceholder: rawOffer?.locationName,
    location: rawOffer?.location,
    distance: rawOffer?.distance,
    tags: rawOffer?.offerTags,
    price: rawOffer?.price.toString().replace(".", ","),
    files: rawOffer?.files?.map((file) => {
      const fileName = file.url.split("/").pop() ?? file.url;
      return {
        ...file,
        key: fileName,
        name: file.name ?? fileName,
      };
    }),
  };
  return (
    <ArtistProfileMultiform
      title="Edytuj profil"
      edit={true}
      defaultData={offer}
      session={session}
    />
  );
}
