import { ArtistProfileMultiform } from "~/components/ArtistProfile/ArtistProfileMultiform";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { ArtistFormData } from "~/lib/artistSchema";

// TODO fetch offer data

export default async function CreateArtistProfilePage() {
  const session = await getServerAuthSession();
  const isArtist = session?.user.isArtist;
  if (!isArtist) redirect("/");
  const rawOffer = await api.offers.getByUserId(session.user.id);
  if (!rawOffer) redirect("/");
  const offer: ArtistFormData = {
    name: rawOffer?.name,
    shortDescription: rawOffer?.shortDescription,
    longDescriptionHTML: rawOffer?.longDescription,
    longDescription: "",
    locationName: rawOffer?.locationName,
    locationPlaceholder: rawOffer?.locationName,
    location: rawOffer?.location,
    distance: rawOffer?.distance,
    tags: rawOffer?.offerTags,
    price: rawOffer?.price.toString().replace(".", ","),
    // TODO: add files editing
    // files: rawOffer?.files,
  };
  return (
    <ArtistProfileMultiform
      title="Edytuj profil"
      edit={true}
      defaultData={offer}
    />
  );
}
