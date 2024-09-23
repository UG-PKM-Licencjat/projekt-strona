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
import { useEffect, useState } from "react";
import { type Data } from "./page";
import Image from "next/image";
import man from "public/svg/man.svg";
import { useSession } from "next-auth/react";
import { UploadIcon } from "lucide-react";
import { useAvatarStore } from "~/stores/avatarStore";
import UploadWrapper from "~/components/uploadthing/UploadWrapper";

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
    .min(2, {
      message: "Imię musi mieć co najmniej 2 znaki.",
    })
    .regex(/^[\p{L}\p{M}]+(?:[\p{Pd}'][\p{L}\p{M}]+){0,2}$/u, {
      message: "Pseudonim zawiera nieprawidłowe znaki.",
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
    .min(2, {
      message: "Nazwisko musi mieć co najmniej 2 znaki.",
    })
    .regex(/^[\p{L}\p{M}]+(?:[\p{Pd}' ][\p{L}\p{M}]+){0,2}$/u, {
      message: "Nazwisko zawiera nieprawidłowe znaki.",
    }),
});

export default function Step1(props: {
  data: Data;
  handleChange: (data: Data) => void;
}) {
  const { data, handleChange } = props;
  const { data: session } = useSession();

  const [avatarUrl, setAvatarUrl, setAvatar, gotSessionImage] = useAvatarStore(
    (state) => [
      state.avatarUrl,
      state.setAvatarUrl,
      state.setAvatar,
      state.gotSessionImage,
    ],
  );
  const [avatarError, setAvatarError] = useState("");

  useEffect(() => {
    if (gotSessionImage) return;
    setAvatarUrl(session?.user?.image ?? "");
  }, [session?.user?.image, gotSessionImage]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: session?.user?.firstName ?? "",
      lastName: session?.user?.lastName ?? "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (data.firstName && data.lastName) {
      form.setValue("firstName", data.firstName);
      form.setValue("lastName", data.lastName);
    }
  }, [data.activeTab]);

  const onSubmit = (formdata: z.infer<typeof formSchema>) => {
    handleChange({
      ...data,
      firstName: formdata.firstName || "",
      lastName: formdata.lastName || "",
      activeTab: 1,
    });
  };

  return (
    <>
      <div className="mb-6 h-4 w-auto self-start rounded-lg bg-secondary md:bg-neo-castleton">
        <div className="h-4 w-1/3 self-start rounded-lg bg-neo-pink"></div>
      </div>
      <div className="flex h-full flex-row pb-10">
        <div className="flex w-full flex-col">
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
              className="gap-y-auto left bottom-0 flex h-full flex-col justify-end space-y-6 pt-6"
            >
              <div className="flex flex-col items-center">
                <UploadWrapper
                  endpoint="avatarUploader"
                  onChange={setAvatar}
                  onError={(error) => setAvatarError(error.message)}
                >
                  <div className="grid size-44 cursor-pointer place-items-center overflow-hidden rounded-full bg-neo-sage [&>*]:col-start-1 [&>*]:row-start-1">
                    {avatarUrl && (
                      <Image
                        src={avatarUrl}
                        alt="avatar"
                        height={100}
                        width={100}
                        referrerPolicy="no-referrer"
                        className="h-full w-full overflow-hidden object-cover"
                      />
                    )}
                    <div className="z-50 flex size-full items-center justify-center bg-black/20 transition-all hover:opacity-100 md:opacity-0">
                      <UploadIcon className="size-20 text-white" />
                    </div>
                  </div>
                </UploadWrapper>
                <div className="text-sm text-destructive">{avatarError}</div>
              </div>
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
            priority={true}
          />
        </div>
      </div>
    </>
  );
}
