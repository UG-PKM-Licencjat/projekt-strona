"use client";
import { Input } from "~/components/ui/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { trpc } from "~/app/_trpc/client";
import { useEffect } from "react";

const formSchema = z.object({
  nickname: z.string().min(2, {
    message: "Pseudonim musi mieć co najmniej 2 znaki.",
  }),
  firstName: z.string().min(2, {
    message: "Imię musi mieć co najmniej 2 znaki.",
  }),
  lastName: z.string().min(2, {
    message: "Nazwisko musi mieć co najmniej 2 znaki.",
  }),
  location: z.string().min(2, {
    message: "Lokalizacja musi mieć co najmniej 2 znaki.",
  }),
  image: z.string().optional(),
});

export default function Create_Account() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      firstName: "",
      lastName: "",
      location: "",
      image: "",
    },
  });
  const router = useRouter();
  const { data } = useSession();
  const putData = trpc.putRegistrationData1Step.useMutation();
  const changeStep = trpc.changeStep.useMutation();
  const getStep = trpc.getRegistationStep.useQuery();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await putData.mutateAsync({
      nickname: data.nickname,
      firstName: data.firstName,
      lastName: data.lastName,
      location: data.location,
      image: data.image ?? "",
    });
    if (response != null) {
      const stepp = await changeStep.mutateAsync({ step: 2 });
      console.log("Success");
      // console.log("response", stepp);
      const got = await getStep;
      console.log("got", got);

      // router.push("/createaccount/step2");
    } else {
      console.log("Error");
    }
  };
  const { data: trpcData } = trpc.getRegistrationData1Step.useQuery();
  useEffect(() => {
    console.log("trpcData", trpcData);
    if (trpcData && Array.isArray(trpcData) && trpcData.length > 0) {
      console.log("trpcData2", trpcData);
      const firstData = trpcData[0];
      if (firstData) {
        form.setValue("firstName", firstData.firstName ?? "");
        form.setValue("lastName", firstData.lastName ?? "");
        form.setValue("nickname", firstData.nickname ?? "");
        form.setValue("location", firstData.location ?? "");
      }
    }
  }, [form, trpcData]);

  return (
    <div>
      <Button onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>
        Wyloguj
      </Button>
      <h1 className="my-10 flex justify-center">
        Uzupełnij te dane i korzystaj z naszej aplikacji!
      </h1>
      <div className="w-500 flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className=" flex flex-col">
                  <FormLabel>Pseudonim</FormLabel>
                  <FormControl>
                    <Input placeholder="pseudonim" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input placeholder="imie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Nazwisko</FormLabel>
                  <FormControl>
                    <Input placeholder="nazwisko" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Lokalizacja</FormLabel>
                  <FormControl>
                    <Input placeholder="lokalizacja" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Zdjęcie</FormLabel>
                  <FormControl>
                    <Input id="image" type="file" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Przejdź dalej</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
