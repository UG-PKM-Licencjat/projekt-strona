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
  Table,
  Trash,
  PlusSquare,
  ArrowLeft,
  ArrowRight,
  BetweenHorizontalStart,
  BetweenHorizontalEnd,
  TableCellsMerge,
  TableCellsSplit,
  BetweenVerticalStart,
  BetweenVerticalEnd,
  FoldHorizontal,
  FoldVertical,
  Youtube,
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

import { Button } from "~/components/ui/Button/Button";
import { Toggle } from "~/components/ui/toggle";
import { useState, type FormEvent } from "react";
import { cn } from "~/lib/utils";

type Props = {
  editor: Editor;
  className?: string;
};

export function Toolbar({ editor, className }: Props) {
  // youtube
  const [height, setHeight] = useState(480);
  const [width, setWidth] = useState(640);

  const addYoutubeVideo = () => {
    const url = prompt("Podaj link do filmu YouTube");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(`${width}`, 10)) || 640,
        height: Math.max(180, parseInt(`${height}`, 10)) || 480,
      });
    }
  };

  return (
    <div className={cn("flex gap-1 rounded-md bg-white p-1", className)}>
      <TooltipProvider>
        {/* Color Picker */}
        <Tooltip>
          <TooltipTrigger asChild>
            <input
              className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-transparent px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
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
          <TooltipContent sideOffset={4}>Wybierz kolor</TooltipContent>
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
            <TooltipContent sideOffset={4}>Nagłówki</TooltipContent>
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
                  <TooltipContent sideOffset={4}>Nagłówek 1</TooltipContent>
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
                  <TooltipContent sideOffset={4}>Nagłówek 2</TooltipContent>
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
                  <TooltipContent sideOffset={4}>Nagłówek 3</TooltipContent>
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
          <TooltipContent sideOffset={4}>Pogrubienie</TooltipContent>
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
          <TooltipContent sideOffset={4}>Kursywa</TooltipContent>
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
          <TooltipContent sideOffset={4}>Przekreślenie</TooltipContent>
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
          <TooltipContent sideOffset={4}>Lista punktowana</TooltipContent>
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
          <TooltipContent sideOffset={4}>Lista numerowana</TooltipContent>
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
          <TooltipContent sideOffset={4}>Cytat</TooltipContent>
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
          <TooltipContent sideOffset={4}>Linia pozioma</TooltipContent>
        </Tooltip>

        {/* Table */}
        <Popover>
          <Tooltip>
            <TooltipTrigger>
              <PopoverTrigger
                asChild
                className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-transparent px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
              >
                <Table className="h-4 w-4" />
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent sideOffset={4}>Tabela</TooltipContent>
          </Tooltip>
          <PopoverContent
            sideOffset={4}
            align="center"
            className="w-26 ml-2 mt-2"
            side="bottom"
          >
            <div className="grid grid-cols-2 gap-2">
              {/* Wstawienie tabeli */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                        .run()
                    }
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                  >
                    <PlusSquare className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Wstaw nową tabelę
                </TooltipContent>
              </Tooltip>

              {/* Usunięcie tabeli */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                    variant="ghost"
                    size="sm"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Usuń istniejącą tabelę
                </TooltipContent>
              </Tooltip>

              {/* Dodanie kolumny przed */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      editor.chain().focus().addColumnBefore().run()
                    }
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                  >
                    <BetweenHorizontalStart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Dodaj kolumnę przed bieżącą
                </TooltipContent>
              </Tooltip>

              {/* Dodanie kolumny po */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      editor.chain().focus().addColumnAfter().run()
                    }
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                  >
                    <BetweenHorizontalEnd className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Dodaj kolumnę po bieżącej
                </TooltipContent>
              </Tooltip>

              {/* Dodanie wiersza przed */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                  >
                    <BetweenVerticalStart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Dodaj wiersz przed bieżącym
                </TooltipContent>
              </Tooltip>

              {/* Dodanie wiersza po */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                  >
                    <BetweenVerticalEnd className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Dodaj wiersz po bieżącym
                </TooltipContent>
              </Tooltip>

              {/* Usunięcie wiersza */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                  >
                    <FoldVertical className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Usuń bieżący wiersz
                </TooltipContent>
              </Tooltip>

              {/* Usunięcie kolumny */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                  >
                    <FoldHorizontal className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Usuń bieżącą kolumnę
                </TooltipContent>
              </Tooltip>

              {/* Scalanie komórek */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().mergeCells().run()}
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                  >
                    <TableCellsMerge className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Scal zaznaczone komórki
                </TooltipContent>
              </Tooltip>

              {/* Dzielenie komórek */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().splitCell().run()}
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                  >
                    <TableCellsSplit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Podziel scalone komórki
                </TooltipContent>
              </Tooltip>

              {/* Przejdź do poprzedniej komórki */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      editor.chain().focus().goToPreviousCell().run()
                    }
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Przejdź do poprzedniej komórki
                </TooltipContent>
              </Tooltip>
              {/* Przejdź do następnej komórki */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().goToNextCell().run()}
                    className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-white px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  Przejdź do następnej komórki
                </TooltipContent>
              </Tooltip>
            </div>
          </PopoverContent>
        </Popover>

        {/* Youtube */}
        <Popover>
          <Tooltip>
            <TooltipTrigger>
              <PopoverTrigger
                asChild
                className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-transparent px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
              >
                <Youtube className="h-4 w-4" />
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent sideOffset={4}>Dodaj film z Youtube</TooltipContent>
          </Tooltip>
          <PopoverContent className="w-80" sideOffset={4}>
            <div className="flex justify-around">
              <input
                className="flex rounded-md border px-2"
                id="width"
                type="number"
                min="320"
                max="1024"
                placeholder="width"
                value={width}
                onChange={(event) => setWidth(parseInt(event.target.value))}
              />
              <input
                className="flex rounded-md border px-2"
                id="height"
                type="number"
                min="180"
                max="720"
                placeholder="height"
                value={height}
                onChange={(event) => setHeight(parseInt(event.target.value))}
              />
              <Button
                id="add"
                variant="destructive"
                size="sm"
                className="h-9 w-32 text-sm"
                onClick={addYoutubeVideo}
              >
                Add YouTube video
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </TooltipProvider>
    </div>
  );
}
