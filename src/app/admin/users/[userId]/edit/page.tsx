"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "src/app/_trpc/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
// import { Input } from "~/components/ui/Input/Input";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/Button/Button";
import { Icon } from "~/components/ui/Icon/Icon";

const formSchema = z.object({
  id: z.string(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  nickname: z.string().optional(),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  image: z.string().optional(),
  location: z.string().optional(),
});

export default function Page({ params }: { params: { userId: string } }) {
  const { data, refetch: re } = trpc.admin.users.getById.useQuery({
    id: params.userId,
  });

  useEffect(() => {
    if (data) {
      form.setValue("firstname", data.firstName ?? "");
      form.setValue("lastname", data.lastName ?? "");
      form.setValue("nickname", data.nickname ?? "");
      form.setValue("shortDescription", data.shortDescription ?? "");
      form.setValue("longDescription", data.longDescription ?? "");
      form.setValue("image", data.image ?? "");
      form.setValue("location", data.location ?? "");
    }
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: data?.id ?? "",
      firstname: data?.firstName ?? "",
      lastname: data?.lastName ?? "",
      nickname: data?.nickname ?? "",
      shortDescription: data?.shortDescription ?? "",
      longDescription: data?.longDescription ?? "",
      image: data?.image ?? "",
      location: data?.location ?? "",
    },
  });

  const mutation = trpc.admin.users.patch.useMutation();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    alert("submitting");
    console.dir(values);
    // mutation.mutate(values);
    // await re({});
  };

  return (
    <main className="flex max-w-[80vw] flex-1 flex-col overflow-scroll p-4 md:p-6">
      <div className="mb-8 flex-col items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Edit user</h1>
        <h2 className="text-lg text-gray-500 md:text-lg">
          {data?.id ?? "null"}
        </h2>
        <h2 className="text-lg text-gray-500 md:text-lg">
          {data?.email ?? "null"}
        </h2>
      </div>
      {data ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nickname</FormLabel>
                  <FormControl>
                    <Input placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short description</FormLabel>
                  <FormControl>
                    <Input placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long description</FormLabel>
                  <FormControl>
                    <Input placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder={field.value} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      ) : (
        <Icon name="spinner" className="m-32 h-8 w-8 animate-spin" />
      )}
    </main>
  );
}
