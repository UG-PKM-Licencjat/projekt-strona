"use client";
import Tiptap from "~/components/RichTextEditor/Tiptap";
import { Input } from "~/components/ui/Input/Input";

export default function Home() {
  return (
    <div className="h-screen p-16">
      <Input placeholder="1236213621362..." className="mb-10" />
      <div className="h-full p-16">
        <Tiptap
          placeholder="Write here.."
          onChange={() => {
            return;
          }}
          charLimit={200}
        />
      </div>
    </div>
  );
}
