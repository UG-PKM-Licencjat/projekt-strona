"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  MessageSquareQuote,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Toggle } from "~/components/ui/toggle";
import type { FormEvent } from "react";

type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  // set base color

  return (
    <div className="flex gap-1 rounded-md border bg-white p-1 active:bg-opacity-10">
      <input
        className="h-9 w-9 cursor-pointer rounded-md px-2.5 transition-colors hover:bg-muted hover:text-muted-foreground"
        type="color"
        onInput={(event: FormEvent<HTMLInputElement>) =>
          editor
            .chain()
            .focus()
            .setColor((event.target as HTMLInputElement).value)
            .run()
        }
        value={(editor.getAttributes("textStyle").color as string) || "#000000"}
        data-testid="setColor"
      />
      <Popover>
        <PopoverTrigger
          asChild
          className="h-9 w-9 cursor-pointer rounded-md px-2.5 transition-colors hover:bg-muted hover:text-muted-foreground"
        >
          <Heading className="h-4 w-4" />
        </PopoverTrigger>
        <PopoverContent
          sideOffset={4}
          align="center"
          className="ml-2 mt-2 w-20"
        >
          <div className="flex flex-col gap-1 outline-none">
            <Toggle
              size="sm"
              pressed={editor.isActive("heading", { level: 1 })}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Heading1 className="h-4 w-4" />
            </Toggle>

            <Toggle
              size="sm"
              pressed={editor.isActive("heading", { level: 2 })}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2 className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive("heading", { level: 3 })}
              onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <Heading3 className="h-4 w-4" />
            </Toggle>
          </div>
        </PopoverContent>
      </Popover>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <MessageSquareQuote className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
