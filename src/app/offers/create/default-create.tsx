"use client";

import { useState } from "react";
import { Icon } from "~/components/ui/Icon/Icon";
import { OfferSegment } from "~/components/ui/OfferSegment/OfferSegment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select/Select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "src/components/ui/popover";
import { ScrollArea } from "src/components/ui/scroll-area";
import { useToast } from "src/components/ui/use-toast";
import { useFieldArray, useFormContext } from "react-hook-form";
import { type FormData } from "~/utils/offerSchema";
import { SegmentField } from "./segment-field";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import {
  PreviewDropzone,
  useUploadThing,
  type CustomFile,
} from "~/components/uploadthing";
import { trpc } from "~/trpc/react";
import { useSession } from "next-auth/react";

export function DefaultCreateOfferPage() {
  const { data: session } = useSession({
    required: true,
  });
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext<FormData>();

  const [tagOpen, setTagOpen] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
    keyName: "key",
  });

  const { fields: filesFields } = useFieldArray({
    control,
    name: "files",
    keyName: "key",
  });

  const [tags, setTags] = useState<{ name: string; id: string }[]>([
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

  const [images, setImages] = useState<CustomFile[]>([]);
  const {
    startUpload: startImageUpload,
    routeConfig: imageRouteConfig,
    isUploading: isImageUploading,
  } = useUploadThing("createImageUploader", {
    onClientUploadComplete: () => {
      setImages([]);
      // alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      // alert("upload has begun");
    },
  });
  const [videos, setVideos] = useState<CustomFile[]>([]);
  const {
    startUpload: startVideoUpload,
    routeConfig: videoRouteConfig,
    isUploading: isVideoUploading,
  } = useUploadThing("createVideoUploader", {
    onClientUploadComplete: () => {
      setVideos([]);
      // alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      // alert("upload has begun");
    },
  });

  // TODO disable all interactions while uploading
  const [uploading, setUploading] = useState(false);
  const createOffer = trpc.offers.create.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    setUploading(true);
    await Promise.all([
      images.length > 0 ? startImageUpload(images) : [],
      videos.length > 0 ? startVideoUpload(videos) : [],
    ])
      .then((results) => {
        const files = results
          .flat()
          .filter((file) => file !== undefined)
          .map((file): FormData["files"][number] => ({
            url: file.url,
            type: file.type,
          }));
        console.log(files);
        data.files = files;
        console.log("Done");
      })
      .catch((err) => {
        console.log(err);
        console.log("Error");
      });
    if (session?.user?.id === undefined) {
      toast({
        title: "Error submitting form",
        description: "You must be logged in to create an offer",
        variant: "destructive",
      });
    } else {
      const offer = { ...data, userId: session?.user?.id };
      toast({
        title: "Submitted form",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(offer, null, 2)}</code>
          </pre>
        ),
      });
      // Development only
      createOffer.mutate(offer, {
        onError(error) {
          toast({
            title: `Error submitting form [${error.data?.code}]`,
            description: error.message,
            variant: "destructive",
          });
        },
      });
      console.log(offer);
    }
    setUploading(false);
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-start gap-20 px-16 py-8">
          {/* HEADER */}
          <div className="flex items-start gap-10">
            <div className="relative size-64">
              <Image
                src="https://utfs.io/f/2d3da5b8-2b91-40b1-801a-f17f936fd1e3-n92lk7.jpg"
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
                <input
                  {...register("name")}
                  className="w-[500px] break-all text-4xl font-semibold uppercase text-blue-950 outline-none"
                  placeholder="Twoja ksywka"
                />
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
              <p className="text-sm font-semibold text-red-500">
                {errors.name?.message}
              </p>
              <div className="flex h-10 items-center justify-center gap-4">
                <Popover open={tagOpen} onOpenChange={setTagOpen}>
                  <PopoverTrigger
                    className="flex items-center justify-center rounded-full border-2 p-1 hover:bg-secondary disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-60"
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
                            className="cursor-pointer select-none divide-y divide-solid divide-black rounded-lg bg-purple-400 p-3 font-semibold text-white transition-colors hover:bg-purple-300"
                            onClick={() => appendFunc(tag)}
                          >
                            {tag.name}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
                {fields?.map((tag, index) => (
                  <div
                    className="pointer-events-none flex h-10 select-none items-center gap-2 rounded-lg bg-purple-400 px-4 font-normal text-white transition-colors hover:bg-destructive"
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
              </div>
              <p className="text-sm font-semibold text-red-500">
                {errors.tags?.root?.message?.toString() ??
                  errors.tags?.message?.toString()}
              </p>
              {/* TODO quick placeholder - get someone to design this */}
              <label className="flex items-center gap-3 rounded-full border bg-primary stroke-primary-foreground px-4 py-2 font-semibold text-primary-foreground">
                <Icon name="wallet" className="size-8" />
                <input
                  {...register("price")}
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
          <Tabs defaultValue="images" className="w-full">
            <TabsList className="h-14 p-0">
              <TabsTrigger
                value="images"
                className="h-14 data-[state=active]:bg-pink-700 data-[state=active]:text-white"
                disabled={uploading}
              >
                <h1 className="text-4xl font-semibold uppercase">
                  ZDJĘCIA {images.length}/
                  {imageRouteConfig?.image?.maxFileCount}
                </h1>
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="h-14 data-[state=active]:bg-pink-700 data-[state=active]:text-white"
                disabled={uploading}
              >
                <h1 className="text-4xl font-semibold uppercase">
                  FILMY {videos.length}/{videoRouteConfig?.video?.maxFileCount}
                </h1>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="images">
              <PreviewDropzone
                files={images}
                setFiles={setImages}
                routeConfig={imageRouteConfig}
                startUpload={startImageUpload}
                isUploading={isImageUploading}
                showUploadButton={false}
                disabled={
                  uploading ||
                  images.length >=
                    (imageRouteConfig?.image?.maxFileCount
                      ? imageRouteConfig?.image?.maxFileCount
                      : 0)
                }
              />
            </TabsContent>
            <TabsContent value="videos">
              <PreviewDropzone
                files={videos}
                setFiles={setVideos}
                routeConfig={videoRouteConfig}
                startUpload={startVideoUpload}
                isUploading={isVideoUploading}
                showUploadButton={false}
                disabled={
                  uploading ||
                  videos.length >=
                    (videoRouteConfig?.video?.maxFileCount
                      ? videoRouteConfig?.video?.maxFileCount
                      : 0)
                }
              />
            </TabsContent>
          </Tabs>
          {filesFields.map((file, index) => (
            <input
              key={file.key}
              {...register(`files.${index}.url` as const)}
              className="hidden bg-inherit outline-none"
            />
          ))}

          {/* LINKI */}
          <OfferSegment heading="LINKI">
            <SegmentField type="links" />
          </OfferSegment>
        </div>
      </form>
    </>
  );
}
