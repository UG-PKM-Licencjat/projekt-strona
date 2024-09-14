import { useFormContext } from "react-hook-form";
import TipTap from "~/components/RichTextEditor/Tiptap";
import { useState } from "react";

export default function Step1() {
  const { register } = useFormContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="flex flex-col gap-4">
      {/* <Input {...register("name")} placeholder="Tytuł" /> */}
      <div className="rounded-md bg-white drop-shadow-md">
        <TipTap placeholder="Tytuł" charLimit={100} onChange={setTitle} />
      </div>
      <div className="rounded-md bg-white drop-shadow-md">
        <TipTap placeholder="Opis" charLimit={200} onChange={setDescription} />
      </div>
      {/* <Input {...register("name")} placeholder="Opis placeholder - tiptap goes here" /> */}
    </div>
  );
}
