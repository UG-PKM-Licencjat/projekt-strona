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
  EllipsisVertical,
} from "lucide-react";
import { Icon } from "../ui/Icon/Icon";

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
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { cn } from "~/lib/utils";

type Props = {
  editor: Editor;
  className?: string;
};
const BUTTON_NAMES_LIST = [
  "color",
  "heading",
  "bold",
  "italic",
  "strike",
  "bulletList",
  "orderedList",
  "blockquote",
  "horizontalRule",
  "table",
  "youtube",
] as const;

type ButtonName = (typeof BUTTON_NAMES_LIST)[number];

export function Toolbar({ editor, className }: Props) {
  // youtube
  const [url, setUrl] = useState("");

  const addYoutubeVideo = () => {
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 320,
        height: 240,
      });
    }
  };

  const mainToolbarRef = useRef<HTMLElement>(null);
  const [visibleButtons, setVisibleButtons] = useState<ButtonName[]>([]);
  const [showMore, setShowMore] = useState(false);

  const doAdapt = useCallback(() => {
    const mainToolbar = mainToolbarRef.current;
    if (mainToolbar) {
      const buttonsArray = Array.from(mainToolbar.children);

      const tempVisibleButtons: ButtonName[] = [];

      buttonsArray.forEach((button, index) => {
        const btn = button as HTMLElement;
        if (isFullyVisible(btn)) {
          tempVisibleButtons.push(BUTTON_NAMES_LIST[index]!);
        }
      });

      setVisibleButtons(tempVisibleButtons);
      setShowMore(tempVisibleButtons.length < buttonsArray.length - 1);
    }
  }, [mainToolbarRef]);

  const isFullyVisible = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const mainToolbarRect = mainToolbarRef.current?.getBoundingClientRect();
    return rect.right <= (mainToolbarRect!.right - 40 || 0);
  };

  useLayoutEffect(() => {
    doAdapt();
    window.addEventListener("resize", doAdapt);

    return () => {
      window.removeEventListener("resize", doAdapt);
    };
  }, [doAdapt]);

  const isButtonVisible = (buttonName: ButtonName) => {
    return visibleButtons.includes(buttonName);
  };

  return (
    <nav
      className={cn(
        "flex flex-grow gap-1 overflow-x-hidden rounded-md bg-white p-1",
        className,
      )}
      ref={mainToolbarRef}
    >
      <TooltipProvider>
        {/* Color Picker */}
        <Tooltip>
          <TooltipTrigger
            asChild
            style={{
              visibility: isButtonVisible("color") ? "visible" : "hidden",
            }}
          >
            <input
              className="h-9 w-9 shrink-0 cursor-pointer appearance-none rounded-md bg-transparent px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
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
              className="h-9 w-9 shrink-0 cursor-pointer rounded-md px-2.5 transition-colors hover:bg-muted hover:text-muted-foreground"
              style={{
                visibility: isButtonVisible("heading") ? "visible" : "hidden",
              }}
            >
              <PopoverTrigger asChild>
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
          <TooltipTrigger
            asChild
            style={{
              visibility: isButtonVisible("bold") ? "visible" : "hidden",
            }}
          >
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
          <TooltipTrigger
            asChild
            style={{
              visibility: isButtonVisible("italic") ? "visible" : "hidden",
            }}
          >
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
          <TooltipTrigger
            asChild
            style={{
              visibility: isButtonVisible("strike") ? "visible" : "hidden",
            }}
          >
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
          <TooltipTrigger
            asChild
            style={{
              visibility: isButtonVisible("bulletList") ? "visible" : "hidden",
            }}
          >
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
          <TooltipTrigger
            asChild
            style={{
              visibility: isButtonVisible("orderedList") ? "visible" : "hidden",
            }}
          >
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
          <TooltipTrigger
            asChild
            style={{
              visibility: isButtonVisible("blockquote") ? "visible" : "hidden",
            }}
          >
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
          <TooltipTrigger
            asChild
            style={{
              visibility: isButtonVisible("horizontalRule")
                ? "visible"
                : "hidden",
            }}
          >
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
            <TooltipTrigger
              asChild
              style={{
                visibility: isButtonVisible("table") ? "visible" : "hidden",
              }}
            >
              <PopoverTrigger
                asChild
                className="h-9 w-9 shrink-0 cursor-pointer appearance-none rounded-md bg-transparent px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground"
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
                        .insertTable({
                          rows: 3,
                          cols: 3,
                          withHeaderRow: true,
                        })
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
            <TooltipTrigger
              asChild
              style={{
                visibility: isButtonVisible("youtube") ? "visible" : "hidden",
              }}
            >
              <PopoverTrigger className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-transparent px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground">
                <Icon
                  name="youtube"
                  className="size-4 fill-[#ff0000] stroke-none"
                />
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent sideOffset={4}>Dodaj film z Youtube</TooltipContent>
          </Tooltip>
          <PopoverContent sideOffset={4}>
            <div className="flex flex-col items-center gap-2">
              <input
                className="flex rounded-md border px-2"
                id="url"
                type="text"
                placeholder="youtube.com/watch?v=XXXXXXXXXX"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
              <Button
                id="add"
                variant="destructive"
                size="sm"
                className="h-9 w-32 text-sm"
                onClick={addYoutubeVideo}
              >
                Dodaj filmik
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* More */}
        <Popover>
          <Tooltip>
            <TooltipTrigger
              asChild
              className="h-9 w-9 shrink-0 cursor-pointer rounded-md px-2.5 transition-colors hover:bg-muted hover:text-muted-foreground"
              style={{
                position: "absolute",
                right: 10,
                visibility: showMore ? "visible" : "hidden",
              }}
            >
              <PopoverTrigger asChild>
                <EllipsisVertical className="h-4 w-4" />
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent sideOffset={4}>Nagłówki</TooltipContent>
          </Tooltip>
          <PopoverContent
            sideOffset={4}
            align="center"
            className="ml-2 mt-2 w-20"
            side="bottom"
          >
            {/* Bullet List */}
            {!isButtonVisible("bulletList") && (
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
            )}
            {/* Ordered List */}
            {!isButtonVisible("orderedList") && (
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
            )}

            {/* Blockquote */}
            {!isButtonVisible("blockquote") && (
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
            )}

            {/* Horizontal Rule */}
            {!isButtonVisible("horizontalRule") && (
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
            )}

            {/* Table */}
            {!isButtonVisible("table") && (
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
                              .insertTable({
                                rows: 3,
                                cols: 3,
                                withHeaderRow: true,
                              })
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
                          onClick={() =>
                            editor.chain().focus().deleteTable().run()
                          }
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
                          onClick={() =>
                            editor.chain().focus().addRowBefore().run()
                          }
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
                          onClick={() =>
                            editor.chain().focus().addRowAfter().run()
                          }
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
                          onClick={() =>
                            editor.chain().focus().deleteRow().run()
                          }
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
                          onClick={() =>
                            editor.chain().focus().deleteColumn().run()
                          }
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
                          onClick={() =>
                            editor.chain().focus().mergeCells().run()
                          }
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
                          onClick={() =>
                            editor.chain().focus().splitCell().run()
                          }
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
                          onClick={() =>
                            editor.chain().focus().goToNextCell().run()
                          }
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
            )}

            {/* Youtube */}
            {!isButtonVisible("youtube") && (
              <Popover>
                <Tooltip>
                  <TooltipTrigger>
                    <PopoverTrigger className="h-9 w-9 cursor-pointer appearance-none rounded-md bg-transparent px-2.5 py-2 transition-colors hover:bg-muted hover:text-muted-foreground">
                      <Icon
                        name="youtube"
                        className="size-4 fill-[#ff0000] stroke-none"
                      />
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={4}>
                    Dodaj film z Youtube
                  </TooltipContent>
                </Tooltip>
                <PopoverContent sideOffset={4}>
                  <div className="flex flex-col items-center gap-2">
                    <input
                      className="flex rounded-md border px-2"
                      id="url"
                      type="text"
                      placeholder="youtube.com/watch?v=XXXXXXXXXX"
                      value={url}
                      onChange={(event) => setUrl(event.target.value)}
                    />
                    <Button
                      id="add"
                      variant="destructive"
                      size="sm"
                      className="h-9 w-32 text-sm"
                      onClick={addYoutubeVideo}
                    >
                      Dodaj filmik
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </PopoverContent>
        </Popover>
      </TooltipProvider>
    </nav>
  );
}
