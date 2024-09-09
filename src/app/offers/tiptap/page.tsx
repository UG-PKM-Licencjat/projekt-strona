"use client";
import Tiptap from "~/components/RichTextEditor/Tiptap";

export default function Home() {
  return (
    <Tiptap
      placeholder="Write here.."
      onChange={() => {
        return;
      }}
    />
  );
}
