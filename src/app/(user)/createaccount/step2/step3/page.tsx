"use client";
import { Input } from "~/components/common/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/common/Button/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Textarea } from "~/components/ui/textarea";

const formSchema = z.object({
  description: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return val.split(" ").length >= 2;
        }
        return true;
      },
      {
        message: "Opis musi mieć co najmniej 2 słowa.",
      },
    ),
  offer: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val) {
          return val.split(" ").length >= 2;
        }
        return true;
      },
      {
        message: "Oferta musi mieć co najmniej 2 słowa.",
      },
    ),
  links: z.string().optional(),
});

export default function Create_Account() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {};

  return (
    <div>
      <h1 className="my-10 flex justify-center">
        Uzupełnij swój profil artysty, aby twoi fani mogli cię znaleźć!
      </h1>
      <div className="w-500 flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className=" flex flex-col">
                  <FormLabel>O mnie</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Czym się zajmuje, kim jestem, moje doświadczenie itd."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offer"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Co oferuję?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Koncert, występ taneczny itd."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Portfolio</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="links"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Linki</FormLabel>
                  <FormControl>
                    <Input placeholder="linki" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Przejdź dalej</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
