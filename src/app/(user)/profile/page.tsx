"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/Button/Button";
import { Input } from "~/components/ui/Input/Input";
import { CameraIcon, LoaderCircleIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { signOut, useSession } from "next-auth/react";
import { trpc } from "~/trpc/react";
import { toast } from "~/components/ui/use-toast";
import Image from "next/image";
import profile from "public/svg/profile.svg";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
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
});

export default function GreenProfileEditWithShadcnForms() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
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
      setAvatarUrl(session?.user?.image ?? "");
    }
  }, [session]);

  const updateValues = trpc.user.updateData.useMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("test");
    if (
      values.firstName === session?.user?.firstName &&
      values.lastName === session?.user?.lastName &&
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
        avatar: avatar,
      })
      .then(async () => {
        void update({
          user: {
            firstName: values.firstName,
            lastName: values.lastName,
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

  const [isOpen, setIsOpen] = useState(false);

  const deleteAccount = trpc.user.delete.useMutation();

  async function onDelete() {
    await deleteAccount
      .mutateAsync()
      .then(async (response) => {
        if (!response) {
          toast({
            title: "Destructive",
            description: "Konto nie istnieje",
            variant: "default",
          });
        } else {
          toast({
            title: "Success",
            description: "Konto zostało usunięte",
            variant: "default",
          });
          setIsOpen(false);
          await signOut({ callbackUrl: "/" });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Nie udało się usunąć konta, spróbuj ponownie później",
          variant: "destructive",
        });
      });
  }

  return (
    <>
      <h1 className="text-2xl font-bold leading-none text-neo-gray-hover md:text-neo-castleton">
        Edytuj profil
      </h1>

      <div className="flex h-full flex-row justify-stretch pb-10 max-xl:flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-y-auto left bottom-0 flex h-full flex-col justify-center space-y-8 pt-6 xl:w-3/4"
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
            <div className="flex w-full place-self-end">
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
        <div className="w-full flex-col items-center justify-between xl:ml-20 xl:flex">
          <Image
            src={profile}
            alt="man"
            className="ml-20 hidden h-3/4 w-max object-cover xl:block"
          />
          <AlertDialog open={isOpen}>
            <Button
              variant="outline"
              className="w-1/2 max-xl:mt-4 max-xl:w-full"
              id="delete-account"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Usuń konto
            </Button>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl">
                  Czy jesteś tego pewien?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-lg">
                  Ta akcja jest nieodwracalna. Pernamentnie usunie twoje dane z
                  naszych serwerów.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col items-center gap-4 max-sm:flex">
                <Button
                  variant="outline"
                  className="w-1/2"
                  id="confirm-delete"
                  onClick={() => {
                    void onDelete();
                  }}
                >
                  Tak
                </Button>
                <Button
                  variant="secondary"
                  className="w-1/2"
                  id="cancel-delete"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Nie
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}
