import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount, {
  type CharacterCountStorage,
} from "@tiptap/extension-character-count";
import { Toolbar } from "./Toolbar";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Youtube from "@tiptap/extension-youtube";
import { cn } from "~/lib/utils";

type editorVariant = "full" | "textOnly";
type returnFormat = "html" | "json" | "text";

export type TipTapProps = {
  placeholder: string;
  returnFormat: returnFormat;
  onChange?: (richText: string | JSONContent) => void;
  content?: string;
  charLimit: number;
  className?: string;
  classNameToolbar?: string;
  classNameEditor?: string;
  variant?: editorVariant;
  toolbarActive: boolean;
};

export default function TipTap({
  placeholder,
  onChange,
  content,
  charLimit,
  className,
  classNameToolbar,
  classNameEditor,
  variant = "full",
  returnFormat = "html",
  toolbarActive = true,
}: TipTapProps) {
  const getVariant = (variant: editorVariant) => {
    switch (variant) {
      case "full":
        return [
          StarterKit.configure({}),
          Placeholder.configure({ placeholder: placeholder }),
          CharacterCount.configure({ limit: charLimit }),
          TextStyle,
          Color,
          Table.configure({
            resizable: true,
          }),
          TableRow,
          TableHeader,
          TableCell,
          Youtube.configure({
            controls: true,
            nocookie: true,
          }),
        ];
      case "textOnly":
        return [
          Placeholder.configure({ placeholder: placeholder }),
          CharacterCount.configure({ limit: charLimit }),
        ];
    }
  };

  const editor = useEditor({
    content: content ? content : "",
    immediatelyRender: false,
    extensions: getVariant(variant),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      if (!onChange) {
        return;
      }
      switch (returnFormat) {
        case "html":
          onChange(editor.getHTML());
          break;
        case "json":
          onChange(editor.getJSON());
          break;
        case "text":
          onChange(editor.getText());
          break;
      }
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
    <div
      className={cn(
        "rounded-lg bg-neo-gray px-2 py-2 text-lg ring-offset-background drop-shadow-md file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {toolbarActive && (
        <Toolbar editor={editor} className={classNameToolbar} />
      )}
      <EditorContent editor={editor} className={classNameEditor} />
      <div
        className={`m-6 flex items-center gap-2 text-xs text-gray-500 ${characterCountStorage.characters() === charLimit ? "text-red-500" : ""}`}
      >
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          className={`${characterCountStorage.characters() === charLimit ? "text-neo-pink-hover" : characterCountStorage.characters() > charLimit / 2 ? "text-neo-sage-hover" : "text-neo-mantis"}`}
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
