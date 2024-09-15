"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/Button/Button";
import { Input } from "~/components/ui/Input/Input";
import { Switch } from "~/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { CameraIcon, User } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useSession } from "next-auth/react";

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
  const [photoUrl, setPhotoUrl] = useState(
    "/placeholder.svg?height=128&width=128",
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      isArtist: false,
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData?.user?.firstName && sessionData?.user?.lastName) {
      form.setValue("firstName", sessionData.user.firstName);
      form.setValue("lastName", sessionData.user.lastName);
      form.setValue("isArtist", sessionData.user.isArtist);
    }
  }, [sessionData]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send the data to your backend
    console.log(values);
  }

  return (
    <div className="bg-neo flex h-full flex-1 items-start justify-center bg-neo-castleton">
      <div className="flex flex-col sm:mt-8">
        {/* Main Content */}
        <div className="flex flex-grow items-center justify-center p-4">
          <Card className="mx-auto w-full max-w-2xl">
            <CardHeader className="text-neo-castleton">
              <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
            </CardHeader>
            <div className="h-px bg-neo-pink"></div>
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-10"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={photoUrl} alt="Profile picture" />
                      <AvatarFallback className="bg-neo-sage text-2xl text-green-700">
                        {form.getValues("firstName").charAt(0)}
                        {form.getValues("lastName").charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="relative">
                      <Input
                        type="file"
                        id="photo"
                        className="sr-only"
                        accept="image/*"
                        onChange={handlePhotoChange}
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
                          <FormLabel className="text-black">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
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
                          <FormLabel className="text-black">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
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
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="bg-green-200 data-[state=checked]:bg-neo-castleton"
                          />
                        </FormControl>
                        <FormLabel className="text-black">
                          I am an artist
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
