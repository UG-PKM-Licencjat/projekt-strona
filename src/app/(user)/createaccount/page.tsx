"use client";
import { Input } from "~/components/ui/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/Button/Button";
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
import { Icon } from "~/components/ui/Icon/Icon";
//import svg
import ReactComponent from "~/components/ui/SvgSymbols/illustration.svg";
import { OfferSegment } from "~/components/ui/OfferSegment/OfferSegment";

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
    <>
      {" "}
      <div className="absolute left-5 top-0 font-bold">
        <h1 className="text-center text-2xl text-primary">Bebooop</h1>
      </div>
      <div
        className="relative mx-10 box-border grid grid-cols-3 gap-20 rounded-lg bg-secondary p-10
    "
      >
        {/* header website name bebooop */}

        {/* <Button onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>
        Wyloguj
      </Button> */}
        {/* pasek progresu w rejestracji */}

        <div
          className="col-span-2 mb-10 grid w-max auto-rows-max grid-rows-2 justify-center gap-10 
          "
        >
          <h1
            className="font-header text-center text-2xl font-medium leading-none text-primary 
     "
          >
            Cieszymy się, że
            <span className="text-neo-castleton"> jesteś </span> z nami!
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-y-auto left absolute bottom-0 mb-10 w-72  space-y-6"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem
                    className=" flex flex-col items-center
                "
                  >
                    {/* <FormLabel>Zdjęcie</FormLabel> */}
                    <FormControl className="bg-neo-pink h-44 w-44 justify-center rounded-full">
                      <Input id="image" type="file" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="box-border flex w-full flex-col">
                    <FormLabel>Imię</FormLabel>
                    <FormControl>
                      <Input placeholder="Podaj imię" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="box-content flex flex-col">
                    <FormLabel>Nazwisko</FormLabel>
                    <FormControl>
                      <Input placeholder="Podaj nazwisko" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Przejdź dalej
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <img
            src="/svgs/illustration.svg"
            width={90}
            height={20}
            className="h-full w-full object-cover "
          />
          {/* <Icon name="registration1" /> */}
        </div>
      </div>
    </>
  );
}
