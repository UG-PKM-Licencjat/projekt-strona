"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Toolbar } from "./Toolbar";

export default function TipTap({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: (richText: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: placeholder }),
    ],

    editorProps: {
      attributes: {
        class: "border min-h-[150px] p-2",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getJSON());
      console.log(editor.getText());
    },
  });

  return (
    <div>
      {/* {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <Toolbar editor={editor} />
        </BubbleMenu>
      )} */}
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
