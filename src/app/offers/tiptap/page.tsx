"use client";

import { type JSONContent } from "@tiptap/react";
import Tiptap, { type TipTapProps } from "~/components/RichTextEditor/Tiptap";
import { Input } from "~/components/ui/Input/Input";
import { CharactersCount } from "~/components/ui/Input/CharactersCount";
import { useRef } from "react";

const tiptapParams: TipTapProps = {
  placeholder: "Write here..",
  onChange: (s: string | JSONContent) => {
    console.log(s);
  },
  charLimit: 200,
  returnFormat: "text",
};

export default function Home() {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="h-screen p-16">
      <Input
        placeholder="1236213621362..."
        className="mb-10"
        maxLength={20}
        ref={input}
      />
      <CharactersCount inputRef={input} />

      <div className="h-full p-16">
        <Tiptap {...tiptapParams} />
      </div>
    </div>
  );
}
