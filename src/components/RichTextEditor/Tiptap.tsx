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

export type TipTapProps = {
  placeholder: string;
  onChange?: (richText: string) => void;
  onChangeHTML?: (richText: string) => void;
  onChangeJSON?: (richText: JSONContent) => void;
  onBlur?: () => void;
  content?: string;
  charLimit: number;
  className?: string;
  classNameToolbar?: string;
  classNameEditor?: string;
  toolbarActive?: boolean;
  editable?: boolean;
};

export default function TipTap({
  placeholder,
  onChange,
  onChangeHTML,
  onChangeJSON,
  onBlur,
  content,
  charLimit,
  className,
  classNameToolbar,
  classNameEditor,
  toolbarActive = true,
  editable = true,
}: TipTapProps) {
  const editor = useEditor({
    content: content ? content : "",
    editable: editable,
    immediatelyRender: false,
    extensions: [
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
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    onBlur,
    onFocus({ editor }) {
      if (onChange) onChange(editor.getText());
      if (onChangeHTML) onChangeHTML(editor.getHTML());
      if (onChangeJSON) onChangeJSON(editor.getJSON());
    },
    onUpdate({ editor }) {
      if (onChange) onChange(editor.getText());
      if (onChangeHTML) onChangeHTML(editor.getHTML());
      if (onChangeJSON) onChangeJSON(editor.getJSON());
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
      <EditorContent
        editor={editor}
        className={cn("overflow-x-auto", classNameEditor)}
      />
      {toolbarActive && (
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
        </div>
      )}
    </div>
  );
}
