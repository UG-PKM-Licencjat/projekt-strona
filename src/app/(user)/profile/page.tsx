"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/Button/Button";
import { Input } from "~/components/ui/Input/Input";
import { Switch } from "~/components/ui/switch";
import { CameraIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useSession } from "next-auth/react";
import { trpc } from "~/trpc/react";
import { toast } from "~/components/ui/use-toast";
import Image from "next/image";
import profile from "public/svg/profile.svg";

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
  isArtist: z.boolean({
    message: "To pole jest wymagane",
  }),
});

export default function GreenProfileEditWithShadcnForms() {
  const [photoUrl, setPhotoUrl] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      isArtist: false,
    },
  });

  // const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPhotoUrl(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const { data: session, update } = useSession();

  useEffect(() => {
    if (session?.user?.firstName && session?.user?.lastName) {
      form.setValue("firstName", session.user.firstName);
      form.setValue("lastName", session.user.lastName);
      form.setValue("isArtist", session.user.isArtist);
    }
  }, [session]);

  const updateValues = trpc.user.updateData.useMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateValues
      .mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        isArtist: values.isArtist,
      })
      .then(() => {
        update({
          ...session,
          user: {
            ...session?.user,
            firstName: values.firstName,
            lastName: values.lastName,
            isArtist: values.isArtist,
          },
        })
          .catch((error) => {
            toast({
              title: "Error",
              description:
                "Nie udało się zaktualizować sesji, zaloguj się ponownie",
              variant: "destructive",
            });
          })
          .then(() => {
            toast({
              title: "Success",
              description: "Profil został zaktualizowany",
              variant: "default",
            });
          });
      })
      .catch((error) => {
        if (!session) {
          toast({
            title: "Error",
            description: "Sesja wygasła, zaloguj się ponownie, aby kontynuować",
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Error",
          description:
            "Nie udało się zaktualizować profilu, spróbuj ponownie później",
          variant: "destructive",
        });
      });
  }

  return (
    <div className="box-border flex w-full flex-1 items-center justify-center bg-neo-castleton">
      <div className="mb-8 flex items-end justify-center rounded-xl px-6 py-10 md:mb-0 md:w-4/6 md:bg-neo-gray">
        <div>
          <h1 className="pb-6 text-2xl font-bold leading-none text-neo-gray-hover md:text-neo-castleton">
            Edit Profile
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-32 w-32 rounded-full bg-neo-sage"></div>
                <div className="relative">
                  <Input
                    type="file"
                    id="photo"
                    className="sr-only"
                    accept="image/*"
                    //   onChange={handlePhotoChange}
                  />
                  <FormLabel
                    htmlFor="photo"
                    className="flex cursor-pointer items-center justify-center rounded-md bg-neo-pink px-4 py-2 text-white transition-colors hover:bg-neo-pink-hover"
                  >
                    <CameraIcon className="mr-2 h-5 w-5" />
                    Zmień zdjęcie
                  </FormLabel>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Imię</FormLabel>
                      <FormControl>
                        <Input placeholder="Imię" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Nazwisko</FormLabel>
                      <FormControl>
                        <Input placeholder="Nazwisko" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="isArtist"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="bg-green-200 data-[state=checked]:bg-neo-castleton"
                      />
                    </FormControl>
                    <FormLabel className="text-black">Jestem artystą</FormLabel>
                  </FormItem>
                )}
              />
              <div className="flex w-full">
                <Button className="w-full" type="submit">
                  Zapisz zmiany
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <Image
          src={profile}
          alt="Profile edit"
          className="ml-20 mr-4 hidden h-full w-96 items-end xl:flex"
          width="500"
          height="500"
        />
      </div>
    </div>
  );
}
