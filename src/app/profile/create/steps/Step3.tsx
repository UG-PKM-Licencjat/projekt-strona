"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Tag } from "~/components/Tag/Tag";
import { Input } from "~/components/ui/Input/Input";
import { ArtistFormData } from "~/lib/artistSchema";

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
];

export default function Step3() {
  const [inputText, setInputText] = useState("");
  const [focus, setFocus] = useState(false);
  const [resultTags, setResultTags] = useState<{ id: number; name: string }[]>(
    [],
  );

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ArtistFormData>();

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  useEffect(() => {
    register("tags");
    setValue(
      "tags",
      resultTags.map((tag) => tag.id),
    );
  }, [register, resultTags, setValue]);

  // TODO implement this
  return (
    <div className="my-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        Wybrane tagi
        <div className="flex gap-3">
          {resultTags.map((resultTag) => (
            <div
              key={resultTag.id}
              onClick={() =>
                setResultTags(
                  resultTags.filter((tag) => tag.id != resultTag.id),
                )
              }
            >
              <Tag
                className="hover:cursor-pointer hover:bg-slate-500"
                label={resultTag.name}
              />
            </div>
          ))}
        </div>
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
          <div className="relative left-0 right-0 mt-1 rounded border border-gray-300 bg-white shadow-lg">
            {tags
              .filter(
                (tag) =>
                  !resultTags.includes(tag) && tag.name.includes(inputText),
              )
              .map((tag) => (
                <div
                  key={tag.id}
                  className="hover:bg-slate-500"
                  onClick={() => {
                    setResultTags([...resultTags, tag]);
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
