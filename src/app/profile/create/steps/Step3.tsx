"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Tag } from "~/components/Tag/Tag";
import { Input } from "~/components/ui/Input/Input";
import { ArtistFormData } from "~/lib/artistSchema";
import CustomError from "./CustomError";
import { Check, XIcon } from "lucide-react";

// Mock data for front development purposes
const tags = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Python" },
  { id: 3, name: "Java" },
  { id: 4, name: "React" },
  { id: 5, name: "Node.js" },
  { id: 6, name: "Django" },
  { id: 7, name: "Machine Learning" },
  { id: 8, name: "DevOps" },
  { id: 9, name: "AWS" },
  { id: 10, name: "Cybersecurity" },
  { id: 11, name: "Node.js" },
  { id: 12, name: "Django" },
  { id: 13, name: "Machine Learning" },
  { id: 14, name: "DevOps" },
  { id: 15, name: "AWS" },
  { id: 101, name: "Cybersecurity" },
];

export default function Step3() {
  const {
    setValue,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<ArtistFormData>();

  const [inputText, setInputText] = useState("");
  const [focus, setFocus] = useState(false);
  const [resultTags, setResultTags] = useState<{ id: number; name: string }[]>(
    getValues("tags") ?? [],
  );

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  useEffect(() => {
    setValue("tags", resultTags);
    void trigger("tags");
  }, [resultTags, setValue, trigger]);

  return (
    <div className="my-4 flex flex-col gap-4">
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
        <CustomError name="tags" />
      </div>
      <div>
        <Input
          value={inputText}
          onChange={onInputChange}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => setTimeout(() => setFocus(false), 150)}
          placeholder="Wpisz nazwę tagu tutaj"
        />
        {focus && (
          <div className="relative left-0 right-0 mt-1 max-h-48 overflow-y-scroll rounded border border-gray-300 bg-neo-gray shadow-lg">
            {tags
              .filter(
                (tag) =>
                  !resultTags.includes(tag) && tag.name.includes(inputText),
              )
              .map((tag) => (
                <div
                  key={tag.id}
                  className="px-6 py-2 tracking-wider hover:bg-neo-gray-hover"
                  onClick={() => {
                    setResultTags((prev) => [...prev, tag]);
                    setInputText("");
                  }}
                >
                  <p>{tag.name}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
