"use client";
import { Button } from "~/components/ui/Button/Button";
import { useRouter } from "next/navigation";
import {
  RadioGroup,
  RadioGroupLabelItem,
} from "~/components/ui/RadioGroup/RadioGroup";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "~/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Data } from "./page";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Icon } from "~/components/ui/Icon/Icon";

export default function Step2(props: { data: Data; handleChange: ({}) => void  }) {
  const { data, handleChange } = props;
  const router = useRouter();
  const FormSchema = z.object({
    type: z.string({
      message: "To pole jest wymagane",
    }),
  });

  const { data: sessionData } = useSession();

  useEffect(() => {
    console.log("Data has changed step 2 :", data);
  }, [data]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const writenames = trpc.user.putRegistrationData.useMutation();
  const write = trpc.user.write.useMutation();

  const {data: session, update} = useSession();

  async function onSubmit(isArtistString: z.infer<typeof FormSchema>)  {

    const isArtist = isArtistString.type === "true" ? true : false;
  
    const response = await writenames.mutateAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      isArtist: isArtist,
      registrationStatus : 2,
    });


    if (response) {
      await update({
        ...session,
        user: {
          ...session?.user,
          firstName: data.firstName,
          lastName: data.lastName,
        }
      }
      );
      console.log(session?.user.firstName)
      handleChange({ activeTab: 2 });
    }


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
              className="flex h-full w-full flex-col justify-between gap-5 "
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                      <FormItem>
                        <FormControl>
                          <RadioGroupLabelItem value="true" id="r1" >
                            
                            <div className=" ">
                              Tak, chcę się reklamować na Bebop!
                            </div>
                          </RadioGroupLabelItem>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupLabelItem value="false " id="r2">
                            <div className=" ">
                              Nie, chcę tylko przeglądać oferty.
                            </div>
                          </RadioGroupLabelItem>
                        </FormControl>
                        <FormMessage />
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
          <div className="h-full pb-10 ml-20 hidden   w-3/4 object-cover xl:block">
            <Icon
              name="woman-going"
              viewBox="0 0 821 576"
              className="h-full bg-pink-300 w-1/2"
            />
            {/* <img
              src="/svgs/Frame7.svg"
              className="ml-20 hidden h-full  w-3/4 object-cover xl:block"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
