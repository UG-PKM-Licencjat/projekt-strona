import { useFormContext } from "react-hook-form";
import TipTap from "~/components/RichTextEditor/Tiptap";
import { type ArtistFormData } from "~/lib/artistSchema";

export default function Step1() {
  const { setValue, getValues } = useFormContext<ArtistFormData>();
  const setTitle = (title: string) => setValue("name", title);
  const setDescription = (description: string) =>
    setValue("description", description);
  const { name: title, description } = getValues();
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md bg-white drop-shadow-md">
        <TipTap
          placeholder="Tytuł"
          charLimit={100}
          onChange={setTitle}
          value={title}
        />
      </div>
      <div className="rounded-md bg-white drop-shadow-md">
        <TipTap
          placeholder="Opis"
          charLimit={200}
          onChange={setDescription}
          value={description}
        />
      </div>
    </div>
  );
}
