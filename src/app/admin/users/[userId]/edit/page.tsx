import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "src/app/_trpc/client";
import { Icon } from "src/components/ui/Icon/Icon";

const formSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  nickname: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  image: z.string(),
  location: z.string(),
});

export default function Page({ params }: { params: { userId: string } }) {
  const { data, refetch: re } = trpc.admin.users.getById.useQuery({
    id: params.userId,
  });

  const Form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: data?.firstName ?? "",
      lastname: data?.lastName ?? "",
      nickname: data?.nickname ?? "",
      shortDescription: data?.shortDescription ?? "",
      longDescription: data?.longDescription ?? "",
      image: data?.image ?? "",
      location: data?.location ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await trpc.admin.users.update.mutation(values);
    re({});
  };

  return (
    <main className="flex max-w-[80vw] flex-1 flex-col overflow-hidden p-4 md:p-6">
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
        <div></div>
      ) : (
        <Icon name="spinner" className="m-32 h-8 w-8 animate-spin" />
      )}
    </main>
  );
}
