"use client";
import { type JSONContent } from "@tiptap/react";
import Tiptap, { type TipTapProps } from "~/components/RichTextEditor/Tiptap";
import { Input } from "~/components/ui/Input/Input";

const tiptapParams: TipTapProps = {
  placeholder: "Write here..",
  onChange: (s: string | JSONContent) => {
    console.log(s);
  },
  charLimit: 200,
  content: "abc",
  toolbarActive: true,
  className: "bg-gray-100",
  classNameEditor: "bg-pink-100",
  classNameToolbar: "bg-blue-100",
  returnFormat: "text",
  variant: "full",
};

export default function Home() {
  return (
    <div className="h-screen p-16">
      <Input placeholder="1236213621362..." className="mb-10" />
      <div className="h-full p-16">
        <Tiptap {...tiptapParams} />
      </div>
    </div>
  );
}
