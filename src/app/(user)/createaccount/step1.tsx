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
import { useEffect } from "react";
import { Icon } from "~/components/ui/Icon/Icon";


const formSchema = z.object({
  firstName: z
    .string()
    .regex(/^[\p{L}\p{M}]+(?:[\p{Pd}'][\p{L}\p{M}]+){0,2}$/u, {
      message: "Pseudonim zawiera nieprawidłowe znaki.",
    })
    .min(2, {
      message: "Imię musi mieć co najmniej 2 znaki.",
    }),
  lastName: z
    .string()
    .regex(/^[\p{L}\p{M}]+(?:[\p{Pd}' ][\p{L}\p{M}]+){0,2}$/u, {
      message: "Nazwisko zawiera nieprawidłowe znaki.",
    })
    .min(2, {
      message: "Nazwisko musi mieć co najmniej 2 znaki.",
    }),

  image: z.string().optional(),
});

export default function Step1(props: any) {
  const { data, handleChange } = props;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (data.firstName && data.lastName) {
      form.setValue("firstName", data.firstName);
      form.setValue("lastName", data.lastName);
    }
  }, [data.activeTab]);

  const onSubmit = async (datas: z.infer<typeof formSchema>) => {
    handleChange({
      ...data,
      firstName: datas.firstName,
      lastName: datas.lastName,
      activeTab: 1,
    });
  };

  const handleSubmits = (form) => {
    event.preventDefault();
    onSubmit(form.getValues());
  };

  return (
    <>
      <div className="mb-6 h-4 w-auto self-start rounded-lg bg-secondary md:bg-neo-castleton">
        <div className="h-4 w-1/3 self-start rounded-lg bg-neo-pink"></div>
      </div>
      <div className="flex h-full flex-row pb-10">
        <div className="flex w-full flex-col justify-between">
          <h1 className="w-full text-center font-header text-2xl font-medium leading-none text-primary  xl:text-left ">
            Cieszymy się, że
            <br className="sm:hidden" />
            <span className="text-neo-mantis md:text-neo-castleton">
              {" "}
              jesteś
            </span>{" "}
            z nami!
          </h1>

          <Form {...form}>
            <form
              onSubmit={() => handleSubmits(form)}
              className="gap-y-auto left bottom-0  space-y-6 pt-6"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem
                    className=" flex flex-col items-center
                "
                  >
                    <FormControl className="h-44 w-44 justify-center rounded-full bg-neo-pink">
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

              <Button
                type="submit"
                className="w-full "
                onClick={() => onSubmit}
              >
                Przejdź dalej
              </Button>
            </form>
          </Form>
        </div>

        <div className="hidden   w-full justify-end xl:block ">
          <Icon name="standing-man" viewBox="0 0 253 551"  className="ml-20 hidden h-full w-fit object-cover xl:block " />
          {/* <img
            src="/svgs/illustration.svg"
            className="ml-20 hidden h-full w-max object-cover xl:block"
          /> */}
        </div>
      </div>
    </>
  );
}
