"use client";
import Tiptap from "~/components/RichTextEditor/Tiptap";

export default function Home() {
  return (
    <Tiptap
      description="Write here.."
      onChange={() => {
        return;
      }}
    />
  );
}
