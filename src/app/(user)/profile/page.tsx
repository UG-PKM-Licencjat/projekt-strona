"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/Button/Button";
import { Input } from "~/components/ui/Input/Input";
import { Switch } from "~/components/ui/switch";
import { CameraIcon, LoaderCircleIcon } from "lucide-react";
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
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      isArtist: false,
    },
  });

  const { data: session, update } = useSession();

  const [avatarUrl, setAvatarUrl, setAvatar, uploadAvatar] = useAvatarStore(
    (state) => [
      state.avatarUrl,
      state.setAvatarUrl,
      state.setAvatar,
      state.uploadAvatar,
    ],
  );

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (session?.user?.firstName && session?.user?.lastName) {
      form.setValue("firstName", session.user.firstName);
      form.setValue("lastName", session.user.lastName);
      form.setValue("isArtist", session.user.isArtist);
      setAvatarUrl(session?.user?.image ?? "");
    }
  }, [session]);

  const updateValues = trpc.user.updateData.useMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      values.firstName === session?.user?.firstName &&
      values.lastName === session?.user?.lastName &&
      values.isArtist === session?.user?.isArtist &&
      avatarUrl === session?.user?.image
    ) {
      toast({
        title: "Error",
        description: "Nie wprowadzono zmian",
        variant: "destructive",
      });
      return;
    }
    console.log("formValues", values);
    console.log("session", session?.user);
    setIsProcessing(true);
    const avatar = await uploadAvatar();
    if (!avatar) {
      toast({
        title: "Error uploading avatar",
        description: "Avatar upload failed",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }
    await updateValues
      .mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        isArtist: values.isArtist,
        avatar: avatar,
      })
      .then(async () => {
        void update({
          user: {
            firstName: values.firstName,
            lastName: values.lastName,
            isArtist: values.isArtist,
            image: avatar,
          },
        });
        setIsProcessing(false);
        router.refresh();
      })
      .catch((error) => {
        if (!session) {
          toast({
            title: "Error",
            description: "Sesja wygasła, zaloguj się ponownie, aby kontynuować",
            variant: "destructive",
          });
          setIsProcessing(false);
          return;
        }
        setIsProcessing(false);
        toast({
          title: "Error",
          description:
            "Nie udało się zaktualizować profilu, spróbuj ponownie później",
          variant: "destructive",
        });
      });
  }

  return (
    <>
      <h1 className="text-2xl font-bold leading-none text-neo-gray-hover md:text-neo-castleton">
        Edytuj profil
      </h1>

      <div className="flex h-full flex-row justify-stretch pb-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-y-auto left bottom-0 flex h-full flex-col justify-end space-y-8 pt-6 xl:w-3/4"
          >
            <div className="h-3/8 flex flex-col items-center gap-8">
              <div className="grid size-44 place-items-center overflow-hidden rounded-full bg-neo-sage [&>*]:col-start-1 [&>*]:row-start-1">
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
              </div>
              <Button size="sm" type="button" disabled={isProcessing}>
                <UploadWrapper
                  endpoint="avatarUploader"
                  onChange={setAvatar}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <CameraIcon className="size-6" />
                  Zmień zdjęcie
                </UploadWrapper>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Imię</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isProcessing}
                        placeholder="Imię"
                        {...field}
                      />
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
                      <Input
                        disabled={isProcessing}
                        placeholder="Nazwisko"
                        {...field}
                      />
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
                      disabled={isProcessing}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="bg-green-200 data-[state=checked]:bg-neo-sage md:data-[state=checked]:bg-neo-castleton"
                    />
                  </FormControl>
                  <FormLabel className="text-black">Jestem artystą</FormLabel>
                </FormItem>
              )}
            />
            <div className="flex w-full">
              <Button className="w-full" type="submit" disabled={isProcessing}>
                {isProcessing ? (
                  <LoaderCircleIcon className="size-8 animate-spin" />
                ) : (
                  "Zapisz zmiany"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="hidden w-full justify-end xl:block">
          <Image
            src={profile}
            alt="man"
            className="ml-20 hidden h-full w-max object-cover xl:block"
          />
        </div>
      </div>
    </>
  );
}
