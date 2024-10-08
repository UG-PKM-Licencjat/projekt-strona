"use client";

import { useEffect, useState, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/Button/Button";
import { Input } from "~/components/ui/Input/Input";
import { CameraIcon, LoaderCircleIcon, XIcon } from "lucide-react";
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
import { cn } from "~/lib/utils";

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
    })
    .max(40, {
      message: "Imię nie może mieć więcej niż 40 znaków.",
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
    })
    .max(40, {
      message: "Nazwisko nie może mieć więcej niż 40 znaków.",
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

  const [
    avatarUrl,
    setAvatarUrl,
    setAvatar,
    uploadAvatar,
    clearAvatar,
    avatarChanged,
  ] = useAvatarStore((state) => [
    state.avatarUrl,
    state.setAvatarUrl,
    state.setAvatar,
    state.uploadAvatar,
    state.clearAvatar,
    state.avatarChanged,
  ]);

  const [avatarError, setAvatarError] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (session?.user?.firstName && session?.user?.lastName) {
      form.setValue("firstName", session.user.firstName);
      form.setValue("lastName", session.user.lastName);
      setAvatarUrl(session?.user?.image ?? "");
    }
  }, [session]);

  const formState = form.watch();
  const isDataChanged = useMemo(() => {
    if (!session) return false;
    return (
      session.user.firstName !== formState.firstName ||
      session.user.lastName !== formState.lastName ||
      avatarChanged
    );
  }, [session, formState, avatarChanged]);

  const updateValues = trpc.user.updateData.useMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);
    const avatar = await uploadAvatar();
    if (!avatar) {
      toast({
        title: "Error",
        description:
          "Wystąpił błąd podczas wysyłania zdjęcia profilowego, spróbuj ponownie lub zmień zdjęcie profilowe.",
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
        await update({
          user: {
            firstName: values.firstName,
            lastName: values.lastName,
            image: avatar,
          },
        });
        setIsProcessing(false);
        router.refresh();
      })
      .catch(() => {
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
            title: "Error",
            description: "Konto nie istnieje",
            variant: "destructive",
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
      .catch(() => {
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
            className="gap-y-auto left bottom-0 flex h-full flex-col justify-end space-y-8 pt-6 xl:w-3/4"
          >
            <div className="h-3/8 flex flex-col items-center gap-2">
              <div className="relative">
                <div className="grid size-44 place-items-center overflow-hidden rounded-full [&>*]:col-start-1 [&>*]:row-start-1">
                  {!avatarUrl && (
                    <div className="flex size-full animate-pulse items-center justify-center rounded-full bg-neo-sage-hover"></div>
                  )}
                  {avatarUrl && (
                    <Image
                      src={avatarUrl}
                      alt="avatar"
                      height={100}
                      width={100}
                      priority
                      referrerPolicy="no-referrer"
                      className="h-full w-full overflow-hidden object-cover"
                    />
                  )}
                </div>
                {avatarChanged && (
                  <div
                    className={cn(
                      "absolute right-1 top-1 z-30 cursor-pointer rounded-full bg-neo-pink p-3 transition-colors hover:bg-neo-pink-hover",
                      isProcessing && "hidden",
                    )}
                    onClick={() => {
                      if (isProcessing) return;
                      clearAvatar();
                      setAvatarUrl(session?.user.image ?? "");
                    }}
                  >
                    <XIcon className="size-5 text-neo-gray" />
                  </div>
                )}
              </div>
              <Button size="sm" type="button" disabled={isProcessing}>
                <UploadWrapper
                  endpoint="avatarUploader"
                  onChange={(avatar) => {
                    setAvatar(avatar);
                  }}
                  className="flex cursor-pointer items-center gap-2"
                  onError={(error) => setAvatarError(error.message)}
                >
                  <CameraIcon className="size-6" />
                  Zmień zdjęcie
                </UploadWrapper>
              </Button>
              <div className="h-4 text-sm text-destructive">{avatarError}</div>
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
                    <div className="h-2">
                      <FormMessage />
                    </div>
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
                    <div className="h-2">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full place-self-end">
              <Button
                className="w-full"
                type="submit"
                disabled={isProcessing || !isDataChanged}
              >
                {isProcessing ? (
                  <LoaderCircleIcon className="size-8 animate-spin" />
                ) : (
                  "Zapisz zmiany"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="w-full flex-col items-center justify-end space-y-8 xl:ml-20 xl:flex">
          <Image
            src={profile}
            alt="man"
            priority
            className="ml-20 hidden h-3/4 w-max object-cover xl:block"
          />
          <AlertDialog open={isOpen}>
            <Button
              variant="outline"
              className="w-1/2 max-xl:mt-4 max-xl:w-full"
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
                  onClick={() => {
                    void onDelete();
                  }}
                >
                  Tak
                </Button>
                <Button
                  variant="secondary"
                  className="w-1/2"
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
