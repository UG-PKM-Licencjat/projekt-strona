import { useEditor, EditorContent } from "@tiptap/react";
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

export default function TipTap({
  placeholder,
  onChange,
  onChangeHTML,
  charLimit,
  value,
  onBlur,
}: {
  placeholder: string;
  onChange: (richText: string) => void;
  onChangeHTML: (richText: string) => void;
  onBlur: () => void;
  charLimit: number;
  value?: string;
}) {
  const editor = useEditor({
    content: value,
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
      onChangeHTML(editor.getHTML());
      onChange(editor.getText());
    },
    onUpdate({ editor }) {
      onChangeHTML(editor.getHTML());
      onChange(editor.getText());
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
