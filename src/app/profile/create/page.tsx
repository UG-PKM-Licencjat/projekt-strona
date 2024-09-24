import { ArtistProfileMultiform } from "~/components/ArtistProfile/ArtistProfileMultiform";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function CreateArtistProfilePage() {
  const session = await getServerAuthSession();
  if (!session) return;
  const isArtist = session?.user.isArtist;
  if (isArtist) redirect("/");
  return (
    <ArtistProfileMultiform
      title="Stwórz profil"
      edit={false}
      session={session}
    />
  );
}
