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
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  isArtist: z.boolean().default(false),
});

export default function GreenProfileEditWithShadcnForms() {
  //   const [photoUrl, setPhotoUrl] = useState(
  //     "/placeholder.svg?height=128&width=128",
  //   );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      isArtist: false,
    },
  });

  //   const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setPhotoUrl(reader.result as string);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  const { data: session } = useSession();

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
        toast({
          title: "Sukces",
          description: "Zaktualizowano profil",
          variant: "default",
        });
      })
      .catch((error) => {
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
      <div className="mb-8 flex h-max items-center justify-center rounded-xl px-6 py-10 md:mb-0 md:w-4/6 md:bg-neo-gray">
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
                    Change Photo
                  </FormLabel>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
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
                      <FormLabel className="text-black">Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
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
                    <FormLabel className="text-black">I am an artist</FormLabel>
                  </FormItem>
                )}
              />
              <div className="flex w-full">
                <Button className="w-full" type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <Image
          src={profile}
          alt="Profile edit"
          className="ml-20 mr-4 hidden w-96 xl:block"
          width="500"
          height="500"
        />
      </div>
    </div>
  );
}
