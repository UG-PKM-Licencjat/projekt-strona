"use client";
import Tiptap from "~/components/RichTextEditor/Tiptap";

export default function Home() {
  return (
    <div className="h-screen bg-neo-castleton p-32">
      <Tiptap
        placeholder="Write here.."
        onChange={() => {
          return;
        }}
        charLimit={200}
      />
    </div>
  );
}
