"use client";
import { Button } from "~/components/ui/Button/Button";
import { useRouter } from "next/navigation";
// import { Checkbox } from "~/components/ui/Checkbox/Checkbox";
import { Select } from "~/components/ui/Select/Select";
import { Label } from "~/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabelItem,
} from "~/components/ui/RadioGroup/RadioGroup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "~/utils/trpc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { on } from "events";
import { Data } from "./page";
import { useSession } from "next-auth/react";

export default function Step2(props: { data: Data; handleChange: any }) {
  const { data, handleChange } = props;
  const router = useRouter();
  const FormSchema = z.object({
    type: z.string({
      message: "To pole jest wymagane",
    }),
  });

  const { data: sessionData } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const writeState = trpc.userTypeRegularorArtist.useMutation();
  const writenames = trpc.putRegistrationData1Step.useMutation();

  async function onSubmit(isArtist: { type: string }) {
    const response = await writeState.mutateAsync({
      isArtist: false,
    });
    const response2 = await writenames.mutateAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      image: sessionData?.user?.image ?? "",
    });

    if (response != null || response.rowCount > 0) {
      console.log("User type updated");
      // handleChange({ activeTab: 2 });
    }
    console.log(response2.rowCount);
    console.log(response);
  }

  return (
    <>
      <div className="mb-6 h-4 w-auto self-start rounded-lg bg-secondary md:bg-neo-castleton">
        <div className="h-4 w-2/3 self-start rounded-lg bg-neo-pink"></div>
      </div>
      <div className="col flex h-full">
        <div className="flex h-full w-full flex-col justify-between pb-10 ">
          <div>
            <h1 className="mb-4 self-start   text-start font-header text-2xl font-medium leading-none text-primary">
              Czy jesteś
              <br className="sm:hidden" />
              <span className="text-neo-mantis md:text-neo-castleton">
                {" "}
                artystą?
              </span>
            </h1>
            <p className=" text-neo-dark-gray ">
              Wiemy, że w każdym drzemie artysta
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full w-full flex-col justify-between gap-5 pb-10"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange}>
                      <FormItem>
                        <FormControl>
                          <RadioGroupLabelItem value="true" id="r1">
                            <div className=" ">
                              Tak, chcę się reklamować na Bebopl
                            </div>
                          </RadioGroupLabelItem>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupLabelItem value="false " id="r2">
                            <div className=" ">
                              Nie, chcę tylko przeglądać oferty
                            </div>
                          </RadioGroupLabelItem>
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                )}
              />
              <div className=" flex flex-col  justify-between gap-5 sm:flex-row ">
                <Button
                  className="sm:w-1/2"
                  variant={"outline"}
                  onClick={() => {
                    handleChange({ activeTab: 0 });
                  }}
                >
                  Wróć
                </Button>
                <Button
                  className="sm:w-1/2"
                  type="submit"
                  onClick={() => onSubmit(form.getValues())}
                >
                  Zakończ
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className=" hidden h-full w-full justify-end xl:block ">
          <div className="h-full pb-10">
            <img
              src="/svgs/illustration2.svg"
              className="ml-20 hidden h-full  w-3/4 object-cover xl:block"
            />
          </div>
        </div>
      </div>
    </>
  );
}
