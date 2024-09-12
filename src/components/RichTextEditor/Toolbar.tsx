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
  Minus,
} from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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
      <TooltipProvider>
        {/* Color Picker */}
        <Tooltip>
          <TooltipTrigger asChild>
            <input
              className="h-9 w-9 cursor-pointer appearance-none rounded-full bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
              type="color"
              onInput={(event: FormEvent<HTMLInputElement>) =>
                editor
                  .chain()
                  .focus()
                  .setColor((event.target as HTMLInputElement).value)
                  .run()
              }
              value={
                (editor.getAttributes("textStyle").color as string) || "#000000"
              }
              data-testid="setColor"
            />
          </TooltipTrigger>
          <TooltipContent sideOffset={4}>Select Color</TooltipContent>
        </Tooltip>

        {/* Headings */}
        <Popover>
          <Tooltip>
            <TooltipTrigger
              asChild
              className="h-9 w-9 cursor-pointer rounded-md px-2.5 transition-colors hover:bg-muted hover:text-muted-foreground"
            >
              <PopoverTrigger
                asChild
                className="h-9 w-9 cursor-pointer rounded-md px-2.5 transition-colors hover:bg-muted hover:text-muted-foreground"
              >
                <Heading className="h-4 w-4" />
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent sideOffset={4}>Headings</TooltipContent>
          </Tooltip>
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Heading1 className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent sideOffset={4}>Heading 1</TooltipContent>
                </Tooltip>
              </Toggle>

              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Heading2 className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent sideOffset={4}>Heading 2</TooltipContent>
                </Tooltip>
              </Toggle>

              <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Heading3 className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent sideOffset={4}>Heading 3</TooltipContent>
                </Tooltip>
              </Toggle>
            </div>
          </PopoverContent>
        </Popover>

        {/* Bold */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("bold")}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent sideOffset={4}>Bold</TooltipContent>
        </Tooltip>

        {/* Italic */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("italic")}
              onPressedChange={() =>
                editor.chain().focus().toggleItalic().run()
              }
            >
              <Italic className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent sideOffset={4}>Italic</TooltipContent>
        </Tooltip>

        {/* Strikethrough */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("strike")}
              onPressedChange={() =>
                editor.chain().focus().toggleStrike().run()
              }
            >
              <Strikethrough className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent sideOffset={4}>Strikethrough</TooltipContent>
        </Tooltip>

        {/* Bullet List */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("bulletList")}
              onPressedChange={() =>
                editor.chain().focus().toggleBulletList().run()
              }
            >
              <List className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent sideOffset={4}>Bullet List</TooltipContent>
        </Tooltip>

        {/* Ordered List */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("orderedList")}
              onPressedChange={() =>
                editor.chain().focus().toggleOrderedList().run()
              }
            >
              <ListOrdered className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent sideOffset={4}>Ordered List</TooltipContent>
        </Tooltip>

        {/* Blockquote */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("blockquote")}
              onPressedChange={() =>
                editor.chain().focus().toggleBlockquote().run()
              }
            >
              <MessageSquareQuote className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent sideOffset={4}>Blockquote</TooltipContent>
        </Tooltip>

        {/* Horizontal Rule */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive("horizontalRule")}
              onPressedChange={() =>
                editor.chain().focus().setHorizontalRule().run()
              }
            >
              <Minus className="h-4 w-4" />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent sideOffset={4}>Horizontal Rule</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
