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
import { useToast } from "~/components/ui/use-toast";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { ScrollArea } from "~/components/ui/scroll-area";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DevTool } from "@hookform/devtools";

const offerSchema = z
  .object({
    price: z
      .number({
        message: "Cena powinna być podana w formacie 123456.50",
      })
      .step(0.01, {
        message: "Cena powinna być podana w formacie 123456.50",
      })
      .positive({
        message: "Cena powinna być podana w formacie 123456.50",
      })
      .max(999999999, {
        message: "Cena nie może przekraczać 999 999 999 zł",
      }),
    tags: z
      .array(z.object({ name: z.string(), id: z.string() }))
      .nonempty({ message: "Musisz dodać co najmniej jeden tag" }),
  })
  .required();

type FormData = z.infer<typeof offerSchema>;
// import { trpc } from "~/app/_trpc/client";
// import Image from "next/image";

export default function OfferPage() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields: touched },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(offerSchema),
  });

  const [tagOpen, setTagOpen] = React.useState(false);

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
  const description = [
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos eum fugit ex sed saepe quo consectetur nostrum illo autem recusandae.",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat alias facere itaque natus repellendus debitis voluptas facilis maiores quia rerum.",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut inventore, libero dignissimos rerum quos, dolorem amet consectetur labore sint odio vero itaque obcaecati earum? Recusandae odio laborum aut voluptatum nesciunt?",
  ];

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-start gap-20 px-16 py-8">
          {/* HEADER */}
          <div className="flex items-start gap-10">
            <img
              src="https://i.pinimg.com/736x/dc/e1/8e/dce18e21ab55156563e17affb71314fc.jpg"
              alt="avatar"
              className="size-64 rounded-full"
            />

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
                  <PopoverTrigger className="flex items-center rounded-full border-2 p-1 hover:bg-secondary">
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
                {errors.tags ?? (fields?.length === 0 && touched.tags)
                  ? "Musisz dodać co najmniej jeden tag"
                  : ""}
              </p>
              {/* TODO quick placeholder - get someone to design this */}
              <label className="flex items-center gap-3 rounded-full border bg-primary stroke-primary-foreground px-4 py-2 font-semibold text-primary-foreground">
                <Icon name="wallet" className="size-8" />
                <input
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                  className="w-[5.8rem] bg-inherit text-right outline-none"
                  placeholder="XXXXXXXX"
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
          <OfferSegment heading="O MNIE">test</OfferSegment>

          {/* CO OFERUJĘ */}
          <OfferSegment heading="CO OFERUJĘ" info={description} />

          {/* MOJE PORTFOLIO */}
          <OfferSegment
            heading="MOJE PORTFOLIO"
            info={[
              "https://www.youtube.com/embed/F2YpXC1itEE",
              "https://www.youtube.com/embed/F2YpXC1itEE",
            ]}
            type="video"
          />

          {/* LINKI */}
          <OfferSegment
            heading="LINKI"
            info={["https://www.youtube.com/embed/F2YpXC1itEE"]}
            type="link"
          />
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
}
