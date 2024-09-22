import { ArtistProfileMultiform } from "~/components/ArtistProfile/ArtistProfileMultiform";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

// TODO Mock data, delete before deploy
const testOffer = {
  distance: 30,
  name: "Testowa oferta 3",
  shortDescription: "Testowa oferta - opis",
  longDescription:
    "\n\n\n\nOpis z różnymi efektami  asdasdasdasd \n\n\n\nasdasdasdasdasd",
  longDescriptionHTML:
    '<ol><li><p><strong>Opis<em> z różnymi </em></strong><span style="color: #e00b0b">efektami  </span><span style="color: #000000"><s>asdasdasdasd </s></span></p></li><li><p>asdasdasdasdasd</p></li></ol>',
  locationName: "Gdańsk",
  tags: [],
  price: "123123123",
  locationPlaceholder: "Gdańsk",
  location: {
    x: 18.6466384,
    y: 54.35202520000001,
  },
};

export default async function CreateArtistProfilePage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/");
  const hasOffer = await api.offers.checkByUserId({ userId: session.user.id });
  if (hasOffer) redirect("/");
  return (
    <ArtistProfileMultiform
      title="Stwórz profil"
      edit={false}
      defaultData={testOffer}
    />
  );
}
