"use client";

import React from "react";
import { Icon } from "~/components/ui/Icon/Icon";
import { OfferSegment } from "~/components/ui/OfferSegment/OfferSegment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useToast } from "~/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "~/components/ui/dialog";

import { motion, AnimatePresence } from "framer-motion";

import { useFieldArray, useFormContext } from "react-hook-form";
import { type FormData } from "./schema";

import { SegmentField } from "./segment-field";
import { UploadDropzone } from "~/components/uploadthing";
import { trpc } from "~/app/_trpc/client";
import Image from "next/image";

import { type ClientUploadedFileData } from "uploadthing/types";
import { Button } from "~/components/ui/Button/Button";

export function DefaultCreateOfferPage() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext<FormData>();

  const [tagOpen, setTagOpen] = React.useState(false);
  const [files, setfiles] = React.useState<ClientUploadedFileData<null>[]>([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [fileIsDeleting, setFileIsDeleting] = React.useState<string[]>([]);

  const deleteFilesMutation = trpc.deleteFiles.useMutation();

  const deleteFile = async (fileKey: string) => {
    setFileIsDeleting([...fileIsDeleting, fileKey]);
    deleteFilesMutation
      .mutateAsync({ fileKeys: fileKey })
      .then((success) => {
        if (success) {
          setfiles((prevfiles) =>
            prevfiles.filter((file) => file.key !== fileKey),
          );
          setFileIsDeleting((prevFileIsDeleting) =>
            prevFileIsDeleting.filter((file) => file !== fileKey),
          );
        } else {
          toast({
            title: "Wystąpił błąd",
            description: "Nie udało się usunąć pliku",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        console.log("Error deleting file", err);
        toast({
          title: "Wystąpił błąd",
          description: "Nie udało się usunąć pliku",
          variant: "destructive",
        });
      });
  };

  const deleteAll = () => {
    setFileIsDeleting(files.map((file) => file.key));
    deleteFilesMutation
      .mutateAsync({ fileKeys: files.map((file) => file.key) })
      .then((success) => {
        if (success) {
          setfiles([]);
          setFileIsDeleting([]);
        } else {
          toast({
            title: "Wystąpił błąd",
            description: "Nie udało się usunąć plików",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        console.log("Error deleting files", err);
        toast({
          title: "Wystąpił błąd",
          description: "Nie udało się usunąć plików",
          variant: "destructive",
        });
      });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
    keyName: "key",
  });

  const [tags, setTags] = React.useState<{ name: string; id: string }[]>([
    { name: "hashtag1", id: "0" },
    { name: "hashtag2", id: "1" },
    { name: "hashtag3", id: "2" },
  ]);

  const appendFunc = (tag: { name: string; id: string }) => {
    setTags(tags?.filter((t) => t.id !== tag.id));
    append(tag);

    if (tags.length === 1) {
      setTagOpen(false);
    }
  };

  const removeFunc = (
    tag: { name: string; id: string; key?: string },
    index: number,
  ) => {
    delete tag.key;
    setTags([...tags, tag]);
    remove(index);
  };

  const onSubmit = handleSubmit((data) => {
    toast({
      title: "Submitted form",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log(data);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-start gap-20 px-16 py-8">
          {/* HEADER */}
          <div className="flex items-start gap-10">
            <div className="relative size-64">
              <Image
                src="https://utfs.io/f/43f2c3de-591d-4497-9461-3ba48a570d4c-n92lk7.jpg"
                alt="avatar"
                fill={true}
                sizes="(max-width: 768px) 100vw, 640px"
                className="rounded-full"
                priority
              />
            </div>

            <div className="mt-4 flex flex-col items-start justify-center gap-4">
              <div className="flex items-end justify-center gap-12">
                {/* Offer create */}
                <h1 className="break-all text-4xl font-semibold uppercase text-blue-950 outline-none">
                  MICHAŁ MATCZAK
                </h1>
                {/* TODO placeholder until location stuff is figured out */}
                <Select>
                  <SelectTrigger className="w-fit text-2xl font-bold capitalize text-black/40">
                    <SelectValue placeholder="Lokalizacja" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="text-2xl font-bold capitalize text-black/40">
                      <SelectItem value="1">Lokalizacja 1</SelectItem>
                      <SelectItem value="2">Lokalizacja 2</SelectItem>
                      <SelectItem value="3">Lokalizacja 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-center gap-4">
                {fields?.map((tag, index) => (
                  <div
                    className="pointer-events-none flex h-10 items-center gap-2 rounded-lg bg-purple-400 px-4 font-normal text-white transition-colors hover:bg-destructive"
                    key={tag.key}
                  >
                    <input
                      {...register(`tags.${index}.name` as const)}
                      className="hidden bg-inherit outline-none"
                    />
                    <input
                      {...register(`tags.${index}.id` as const)}
                      className="hidden bg-inherit outline-none"
                    />
                    {tag.name}
                    <Icon
                      name="plus"
                      className="pointer-events-auto size-5 rotate-45 cursor-pointer"
                      onClick={() => removeFunc(tag, index)}
                    />
                  </div>
                ))}
                <Popover open={tagOpen} onOpenChange={setTagOpen}>
                  <PopoverTrigger
                    className="flex items-center rounded-full border-2 p-1 hover:bg-secondary disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-60"
                    disabled={tags.length === 0}
                  >
                    <Icon name="plus" className="size-6" />
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-0">
                    {/* TODO add search */}
                    <ScrollArea className="max-h-[20rem] rounded-lg">
                      <div className="flex flex-col gap-1 p-2">
                        {tags?.map((tag, index) => (
                          <div
                            key={index}
                            className=" cursor-pointer divide-y divide-solid divide-black rounded-lg bg-purple-400 p-3 font-semibold text-white transition-colors hover:bg-purple-300"
                            onClick={() => appendFunc(tag)}
                          >
                            {tag.name}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-sm font-semibold text-red-500">
                {errors.tags?.root?.message?.toString() ??
                  errors.tags?.message?.toString()}
              </p>
              {/* TODO quick placeholder - get someone to design this */}
              <label className="flex items-center gap-3 rounded-full border bg-primary stroke-primary-foreground px-4 py-2 font-semibold text-primary-foreground">
                <Icon name="wallet" className="size-8" />
                <input
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                  className="w-[5.8rem] bg-inherit text-right outline-none"
                  placeholder="Cena"
                />
                zł
              </label>
              <p className="text-sm font-semibold text-red-500">
                {errors.price?.message}
              </p>
              <button type="submit">TEST</button>
            </div>
          </div>

          {/* O MNIE */}
          <OfferSegment heading="O MNIE">
            <SegmentField type="about" />
          </OfferSegment>

          {/* CO OFERUJĘ */}
          <OfferSegment heading="CO OFERUJĘ">
            <SegmentField type="skills" />
          </OfferSegment>

          {/* MOJE PORTFOLIO */}
          <OfferSegment heading="MOJE PORTFOLIO">
            <div className="flex items-center justify-center gap-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center justify-center gap-2">
                    <Icon name="upload" className="size-5" />
                    Prześlij pliki
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Prześlij pliki</DialogTitle>
                  {/* TODO customize style and text */}
                  <UploadDropzone
                    endpoint="fileUploader"
                    onClientUploadComplete={(success) => {
                      // Do something with the successponse
                      console.log("Files: ", success);
                      success ? setfiles([...files, ...success]) : null;
                      setDialogOpen(false);
                      // alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </DialogContent>
              </Dialog>
              {files.length > 0 && (
                <Button
                  onClick={deleteAll}
                  className="flex w-fit items-center justify-center gap-2 px-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60"
                  variant="error"
                  type="button"
                  disabled={fileIsDeleting.length > 0}
                >
                  {fileIsDeleting.length > 0 ? (
                    <Icon name="spinner" className="size-5 animate-spin" />
                  ) : (
                    <Icon name="trash" className="size-5" />
                  )}
                  Usuń wszystkie
                </Button>
              )}
            </div>

            <motion.div className="flex flex-wrap gap-4">
              <AnimatePresence initial={false}>
                {files.map((file) => (
                  <motion.div
                    key={file.key}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="group relative flex p-2"
                    layout
                  >
                    <div className="relative flex h-44 overflow-hidden rounded-lg border-2">
                      {file.type.startsWith("image") ? (
                        <Image
                          src={file.url}
                          alt={file.name}
                          width={150}
                          height={150}
                          style={{ width: "100%", height: "auto" }}
                          sizes="20vw"
                        />
                      ) : file.type.startsWith("video") ? (
                        <video controls>
                          <source src={file.url} type={file.type} />
                        </video>
                      ) : file.type.startsWith("audio") ? (
                        // PLACEHOLDER (?)
                        <div className="flex flex-col items-center justify-center gap-2">
                          <p className="text-center text-sm font-semibold">
                            {file.name}
                          </p>
                          <audio controls>
                            <source src={file.url} type={file.type} />
                          </audio>
                        </div>
                      ) : null}
                      {fileIsDeleting.includes(file.key) ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                          <Icon
                            name="spinner"
                            className="size-10 animate-spin"
                          />
                        </div>
                      ) : null}
                    </div>
                    <div
                      className="absolute right-0 top-0 rotate-180 scale-0 cursor-pointer rounded-full bg-destructive p-1 transition-all duration-200 hover:bg-red-600 group-hover:rotate-0 group-hover:scale-100"
                      onClick={() => {
                        void deleteFile(file.key);
                      }}
                    >
                      <Icon
                        name="plus"
                        className="size-4 rotate-45 stroke-destructive-foreground"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </OfferSegment>

          {/* LINKI */}
          <OfferSegment heading="LINKI">
            <SegmentField type="links" />
          </OfferSegment>
        </div>
      </form>
    </>
  );
}
