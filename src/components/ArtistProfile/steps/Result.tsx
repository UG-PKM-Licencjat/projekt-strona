import { useFormContext } from "react-hook-form";
import type { ArtistFormData } from "~/lib/artistSchema";
import { Tag } from "~/components/Tag/Tag";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { EyeIcon, RectangleHorizontalIcon } from "lucide-react";
import TipTap from "~/components/RichTextEditor/Tiptap";
import { Button } from "~/components/ui/Button/Button";
import OfferCard from "~/components/Offer/OfferCard";
import { useSession } from "next-auth/react";
import { ScrollArea } from "~/components/ui/scroll-area";
import OfferView from "~/components/Offer/OfferView";

const Value = ({ children }: { children: React.ReactNode }) => (
  <span
    className="font-semibold"
    style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
  >
    {children}
  </span>
);

export default function Result() {
  const { getValues } = useFormContext<ArtistFormData>();
  const data = getValues();
  const { data: session } = useSession();
  const price = data?.price ? parseFloat(data?.price?.replace(",", ".")) : 0;
  const location = data?.location ?? { x: 21.0122287, y: 52.2296756 };
  return (
    <div className="flex flex-col gap-2 text-lg">
      <div className="flex items-center gap-2">
        <h3>Tytuł: </h3>
        <Value>{data.name}</Value>
      </div>
      <div className="flex items-center gap-2">
        <h3>Krótki opis: </h3>
        <Value>{data.shortDescription}</Value>
      </div>
      <div className="flex items-center gap-2">
        <h3>Główny opis: </h3>
        <Dialog>
          <DialogTrigger className="w-fit">
            <EyeIcon className="size-5" />
          </DialogTrigger>
          <DialogContent className="max-h-full max-w-full overflow-y-auto lg:max-h-[80svh] lg:max-w-[60svw]">
            <DialogHeader>
              <DialogTitle>Główny opis</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <TipTap
              placeholder=""
              charLimit={1}
              content={data.longDescriptionHTML}
              toolbarActive={false}
              editable={false}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center gap-2">
        <h3>Tagi: </h3>
        <div className="flex flex-wrap gap-2">
          {data.tags?.map((tag) => (
            <Tag
              key={tag.id}
              className="h-auto rounded bg-neo-mantis px-1.5 py-1 text-base"
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <h3>Cena: </h3>
        <Value>{data.price}zł</Value>
      </div>
      <div className="flex items-center gap-2">
        <h3>Lokalizacja: </h3>
        <Value>{data.locationName}</Value>
      </div>
      <div className="flex items-center gap-2">
        <h3>Odległość: </h3>
        <Value>{data.distance}km</Value>
      </div>
      <div className="flex items-center gap-2">
        <h3>Galeria: </h3>
        <Value>{data.files?.map((file) => file.name).join(", ")}</Value>
      </div>
      <div className="grid w-full grid-cols-1 gap-4 max-lg:px-8 sm:grid-cols-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              key="preview-button"
              className="shrink-0 gap-2"
            >
              <EyeIcon className="size-5" />
              <span>Podgląd oferty</span>
            </Button>
          </DialogTrigger>
          <DialogContent
            className="size-full max-h-full max-w-full rounded-md border-neo-castleton bg-neo-castleton p-0 md:max-h-[95svh] md:max-w-[95svw]"
            closeButtonIconClassName="size-6 text-neo-gray"
          >
            <DialogHeader className="m-6">
              <DialogTitle className="text-xl text-white">
                Podgląd pełnej oferty
              </DialogTitle>
              <DialogDescription className="text-base text-neo-gray-hover">
                Tak będzie wyglądała twoja oferta.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-full w-full overflow-y-auto p-2 sm:p-6">
              <OfferView
                preview
                data={{
                  ...data,
                  ratingsSum: 0,
                  votes: 0,
                  offerTags: data?.tags ?? [],
                  price,
                  location,
                  files:
                    data.files?.map((file) => ({
                      type: file.type,
                      url: file.url,
                    })) ?? [],
                  users: {
                    id: session?.user.id ?? "123",
                    image: session?.user.image ?? "",
                    name: `${session?.user.firstName} ${session?.user.lastName}`,
                  },
                }}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="flex gap-2">
              <RectangleHorizontalIcon className="size-5 shrink-0" />
              Podgląd kafelka oferty
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl">
                Podgląd kafelka oferty
              </DialogTitle>
              <DialogDescription className="text-base">
                Tak będzie wyglądała twoja oferta w wyszukiwarce.
              </DialogDescription>
            </DialogHeader>
            <OfferCard
              preview
              offer={{
                ...data,
                tags: data?.tags?.map((tag) => tag.name) ?? [],
                price,
                id: "123",
                image: session?.user.image ?? "",
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
