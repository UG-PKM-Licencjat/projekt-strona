"use client";
import { Input } from "~/components/ui/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/Button/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Icon } from "~/components/ui/Icon/Icon";
import { Data } from "./page";
import Image from "next/image";
import man from "public/svg/man.svg";

const formSchema = z.object({
  //   ^: Asserts the start of the string.
  // [\p{L}\p{M}]: Matches one or more Unicode letter (\p{L}) or mark (\p{M}) characters. This allows for letters with accents or diacritics.
  // +: Ensures that there is at least one character that is a letter or mark.
  // (?: ... ): Defines a non-capturing group for the following pattern.
  // [\p{Pd}']: Matches a Unicode dash (\p{Pd}) or apostrophe ('). This allows for hyphens and apostrophes in the name.
  // [\p{L}\p{M}]: Matches one or more Unicode letter or mark characters, following the hyphen or apostrophe.
  // +: Ensures that there is at least one letter or mark after the hyphen or apostrophe.
  // {0,2}: Allows the non-capturing group to repeat between 0 and 2 times, meaning the name can have up to two additional parts separated by hyphens or apostrophes.
  // $: Asserts the end of the string.
  // /u: Enables Unicode mode, which allows for proper matching of Unicode characters.
  firstName: z
    .string()
    .regex(/^[\p{L}\p{M}]+(?:[\p{Pd}'][\p{L}\p{M}]+){0,2}$/u, {
      message: "Pseudonim zawiera nieprawidłowe znaki.",
    })
    .min(2, {
      message: "Imię musi mieć co najmniej 2 znaki.",
    }),
  //     ^: Asserts the start of the string.
  // [\p{L}\p{M}]: Matches one or more Unicode letter (\p{L}) or mark (\p{M}) characters.
  // +: Ensures that there is at least one letter or mark.
  // (?: ... ): Defines a non-capturing group for the following pattern.
  // [\p{Pd}' ]: Matches a Unicode dash (\p{Pd}), apostrophe ('), or space ( ). This allows for hyphens, apostrophes, and spaces within the name.
  // [\p{L}\p{M}]: Matches one or more Unicode letter or mark characters, following the hyphen, apostrophe, or space.
  // +: Ensures that there is at least one letter or mark after the hyphen, apostrophe, or space.
  // {0,2}: Allows the non-capturing group to repeat between 0 and 2 times, allowing up to two additional segments separated by hyphens, apostrophes, or spaces.
  // $: Asserts the end of the string.
  // /u: Enables Unicode mode.
  lastName: z
    .string()
    .regex(/^[\p{L}\p{M}]+(?:[\p{Pd}' ][\p{L}\p{M}]+){0,2}$/u, {
      message: "Nazwisko zawiera nieprawidłowe znaki.",
    })
    .min(2, {
      message: "Nazwisko musi mieć co najmniej 2 znaki.",
    }),

  image: z.string().optional(),
});

export default function Step1(props: {
  data: Data;
  handleChange: ({}) => void;
}) {
  const { data, handleChange } = props;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (data.firstName && data.lastName) {
      form.setValue("firstName", data.firstName);
      form.setValue("lastName", data.lastName);
    }
  }, [data.activeTab]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // if sth bad display error

    console.log("data", data);

    // console.log("form", form.formState.errors);
    handleChange({
      ...data,
      firstName: data.firstName,
      lastName: data.lastName,
      activeTab: 1,
    });
  };

  // const handleSubmits = (form) => {
  //   event.preventDefault();
  //   console.log("form", form.formState);

  //   onSubmit(form.getValues());
  // };

  return (
    <>
      <div className="mb-6 h-4 w-auto self-start rounded-lg bg-secondary md:bg-neo-castleton">
        <div className="h-4 w-1/3 self-start rounded-lg bg-neo-pink"></div>
      </div>
      <div className="flex h-full flex-row pb-10">
        <div className="flex w-full flex-col justify-between">
          <h1 className="w-full text-center font-header text-2xl font-medium leading-none text-primary xl:text-left">
            Cieszymy się, że
            <br className="sm:hidden" />
            <span className="text-neo-mantis md:text-neo-castleton">
              {" "}
              jesteś
            </span>{" "}
            z nami!
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-y-auto left bottom-0 space-y-6 pt-6"
            >
              <div className="flex flex-col items-center">
                <div className="relative h-44 w-44 justify-center rounded-full bg-neo-pink">
                  <Icon
                    width="100"
                    height="100"
                    name="upload-white"
                    viewBox="0 0 74 73"
                    className="absolute bottom-2 left-0 right-0 top-0 m-auto"
                  />
                </div>
              </div>
              {/* <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormControl className="h-44 w-44 justify-center rounded-full bg-neo-pink">
                      <Input id="image" type="file" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="box-border flex w-full flex-col">
                    <FormLabel>Imię</FormLabel>
                    <FormControl>
                      <Input placeholder="Podaj imię" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="box-content flex flex-col">
                    <FormLabel>Nazwisko</FormLabel>
                    <FormControl>
                      <Input placeholder="Podaj nazwisko" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Przejdź dalej
              </Button>
            </form>
          </Form>
        </div>

        <div className="hidden w-full justify-end xl:block">
          <Image
            src={man}
            alt="man"
            className="ml-20 hidden h-full w-max object-cover xl:block"
          />
        </div>
      </div>
    </>
  );
}
