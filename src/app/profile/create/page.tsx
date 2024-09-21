import { ArtistProfileMultiform } from "~/components/ArtistProfile/ArtistProfileMultiform";

const testOffer = {
  distance: 30,
  name: "Testowa oferta 3",
  shortDescription: "Testowa oferta - opis",
  longDescription:
    "\n\n\n\nOpis z różnymi efektami  asdasdasdasd \n\n\n\nasdasdasdasdasd",
  longDescriptionHTML:
    '<ol><li><p><strong>Opis<em> z różnymi </em></strong><span style="color: #e00b0b">efektami  </span><span style="color: #000000"><s>asdasdasdasd </s></span></p></li><li><p>asdasdasdasdasd</p></li></ol>',
  tags: [
    {
      id: 2,
      name: "Python",
    },
    {
      id: 3,
      name: "Java",
    },
    {
      id: 6,
      name: "Django",
    },
    {
      id: 5,
      name: "Node.js",
    },
  ],
  locationName: "Gdańsk",
  price: "123123123",
  locationPlaceholder: "Gdańsk",
  location: {
    x: 18.6466384,
    y: 54.35202520000001,
  },
};

export default function CreateArtistProfilePage() {
  return (
    <ArtistProfileMultiform
      title="Stwórz profil"
      edit={false}
      defaultData={testOffer}
    />
  );
}
