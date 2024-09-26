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
import { EyeIcon } from "lucide-react";
import TipTap from "~/components/RichTextEditor/Tiptap";

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
  return (
    <div className="flex flex-col gap-2 text-lg">
      <div className="flex items-center gap-2">
        <h3>Tytuł: </h3>
        <Value>{data.name}</Value>
      </div>
      <div className="flex items-center gap-2">
        <h3>Opis: </h3>
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
        {data.tags?.map((tag) => (
          <Tag
            key={tag.id}
            className="h-auto rounded bg-neo-mantis px-1.5 py-1 text-base"
          >
            {tag.name}
          </Tag>
        ))}
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
    </div>
  );
}
