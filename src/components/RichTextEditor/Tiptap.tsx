"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount, {
  type CharacterCountStorage,
} from "@tiptap/extension-character-count";
import { Toolbar } from "./Toolbar";

export default function TipTap({
  placeholder,
  onChange,
  charLimit,
}: {
  placeholder: string;
  onChange: (richText: string) => void;
  charLimit: number;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Placeholder.configure({ placeholder: placeholder }),
      CharacterCount.configure({ limit: charLimit }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const characterCountStorage = editor.storage
    .characterCount as CharacterCountStorage;

  const percentage = editor
    ? Math.round((100 / charLimit) * characterCountStorage.characters())
    : 0;

  return (
    <div>
      {/* {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <Toolbar editor={editor} />
        </BubbleMenu>
      )} */}
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <div
        className={`m-6 flex items-center gap-2 text-xs text-gray-500 ${characterCountStorage.characters() === charLimit ? "text-red-500" : ""}`}
      >
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          className={`${characterCountStorage.characters() === charLimit ? "text-red-500" : "text-purple-500"}`}
        >
          <circle r="10" cx="10" cy="10" fill="#e9ecef" />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
            transform="rotate(-90) translate(-20)"
          />
          <circle r="6" cx="10" cy="10" fill="white" />
        </svg>
        {characterCountStorage.characters()} / {charLimit} characters
        {/* word count */}
        {/* <br />
        {characterCountStorage.words()} words */}
      </div>
    </div>
  );
}
