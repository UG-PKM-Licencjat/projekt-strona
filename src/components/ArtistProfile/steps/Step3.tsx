"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Tag } from "~/components/Tag/Tag";
import { Input } from "~/components/ui/Input/Input";
import { type ArtistFormData } from "~/lib/artistSchema";
import CustomError from "~/components/Form/CustomError";
import { XIcon } from "lucide-react";
import { trpc } from "~/trpc/react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";

export default function Step3() {
  const { setValue, trigger, getValues } = useFormContext<ArtistFormData>();
  const { data: rawTags } = trpc.offers.getAllTags.useQuery();

  const [inputText, setInputText] = useState("");
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [resultTags, setResultTags] = useState<{ id: number; name: string }[]>(
    getValues("tags") ?? [],
  );

  const tags = rawTags?.filter(
    (tag) => !resultTags.some((resultTag) => resultTag.id === tag.id),
  );

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
    setOpen(true);
  }

  useEffect(() => {
    setValue("tags", resultTags);
    if (touched) void trigger("tags");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultTags, setValue]);

  const filteredTags = tags?.filter(
    (tag) =>
      !resultTags.includes(tag) &&
      tag.name.toLowerCase().includes(inputText.toLowerCase()),
  );

  return (
    <div className="my-4 flex flex-col gap-4">
      <CustomError name="tags" />
      <div className="flex flex-col gap-2">
        <span>Wybrane tagi</span>
        <div className="flex flex-wrap gap-3">
          {resultTags.map((resultTag) => (
            <div
              key={resultTag.id}
              onClick={() => {
                setResultTags((prev) =>
                  prev.filter((tag) => tag.id != resultTag.id),
                );
              }}
            >
              <Tag className="gap-2 bg-neo-mantis hover:cursor-pointer hover:bg-neo-mantis-hover">
                {resultTag.name}
                <XIcon className="size-5" />
              </Tag>
            </div>
          ))}
        </div>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Input
            value={inputText}
            onChange={onInputChange}
            onFocus={() => setTouched(true)}
            placeholder="Wyszukaj tagi..."
          />
        </PopoverTrigger>
        <PopoverContent
          className="max-h-64 overflow-y-auto rounded border border-gray-300 bg-neo-gray p-0 shadow-lg"
          onOpenAutoFocus={(e) => e.preventDefault()}
          style={{
            width: "var(--radix-popover-trigger-width)",
          }}
          onInteractOutside={() => void trigger("tags")}
        >
          {filteredTags &&
            filteredTags?.length > 0 &&
            filteredTags?.map((tag) => (
              <div
                key={tag.id}
                className="cursor-pointer px-6 py-2 tracking-wider hover:bg-neo-gray-hover"
                onClick={() => {
                  setResultTags((prev) => [...prev, tag]);
                  setInputText("");
                }}
              >
                <p>{tag.name}</p>
              </div>
            ))}
          {filteredTags?.length === 0 && (
            <div className="px-6 py-2 tracking-wider">
              <p>Brak wyników</p>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
