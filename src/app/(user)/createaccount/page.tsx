"use client";
import { Input } from "~/components/common/Input/Input";
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
import { changeRegistrationStatus } from "~/app/_actions/actions";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  username: z.string().min(2, {
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
  //picture: z.string(),
});

export default function Create_Account() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const { data: session } = useSession();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    router.push("/createaccount/step2");
  };

  return (
    <div>
      <h1 className="my-10 flex justify-center">
        Uzupełnij te dane i korzystaj z naszej aplikacji!
      </h1>
      <div className="w-500 flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
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
                    <Input placeholder="imię" {...field} />
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
              name="picture"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Zdjęcie</FormLabel>
                  <FormControl>
                    <Input id="picture" type="file" />
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
