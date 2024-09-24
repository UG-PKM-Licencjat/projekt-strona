"use client";
import { Button } from "~/components/ui/Button/Button";
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
import { type Data } from "./page";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import womangoing from "public/svg/woman-going.svg";
import { useToast } from "~/components/ui/use-toast";
import { useAvatarStore } from "~/stores/avatarStore";
import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { type TRPCError } from "@trpc/server";
import { useSession } from "next-auth/react";

export default function Step2(props: {
  data: Data;
  handleChange: (data: Data) => void;
}) {
  const router = useRouter();
  const { data, handleChange } = props;
  const FormSchema = z.object({
    type: z
      .string({
        message: "To pole jest wymagane",
      })
      .min(1, {
        message: "To pole jest wymagane",
      }),
  });
  const uploadAvatar = useAvatarStore((state) => state.uploadAvatar);
  const [isProcessing, setIsProcessing] = useState(false);
  const { update } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const writenames = trpc.user.putRegistrationData.useMutation();

  const { toast } = useToast();
  const type = form.watch("type");

  async function onSubmit(isArtistString: z.infer<typeof FormSchema>) {
    const isArtist = isArtistString.type === "true" ? true : false;

    if (form.getValues().type !== undefined) {
      setIsProcessing(true);
      const avatar = await uploadAvatar();
      if (!avatar) {
        toast({
          title: "Error uploading avatar",
          description: "Avatar upload failed",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      await writenames
        .mutateAsync({
          firstName: data.firstName,
          lastName: data.lastName,
          image: avatar,
          registered: true,
        })
        .then(async () => {
          await update({
            user: {
              firstName: data.firstName,
              lastName: data.lastName,
              image: avatar,
            },
          });
          if (isArtist) {
            router.push("/profile/create");
          } else {
            handleChange({ ...data, activeTab: 2 });
          }
        })
        .catch((error: TRPCError) => {
          if (error.code === "UNAUTHORIZED") {
            toast({
              title: "Błąd",
              description: "Nie jesteś zalogowany",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Błąd",
              description: "Nie udało się zaktualizować danych",
              variant: "destructive",
            });
          }
          setIsProcessing(false);
        });
    }
  }

  return (
    <>
      <div className="mb-6 h-4 w-auto self-start rounded-lg bg-secondary md:bg-neo-castleton">
        <div className="h-4 w-2/3 self-start rounded-lg bg-neo-pink"></div>
      </div>
      <div className="flex h-full">
        <div className="flex h-full w-full flex-col justify-between pb-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full w-full flex-col justify-between gap-5"
            >
              <div>
                <h1 className="mb-4 self-start text-start font-header text-2xl font-medium leading-none text-primary">
                  Czy jesteś
                  <span className="text-neo-mantis md:text-neo-castleton">
                    {" "}
                    artystą?
                  </span>
                </h1>
                <p className="text-neo-dark-gray">
                  Wiemy, że w każdym drzemie artysta
                </p>
              </div>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col gap-4"
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupLabelItem
                            value="true"
                            id="r1"
                            disabled={isProcessing}
                          >
                            Tak, chcę się reklamować na Bebop!
                          </RadioGroupLabelItem>
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupLabelItem
                            value="false"
                            id="r2"
                            disabled={isProcessing}
                          >
                            Nie, chcę tylko przeglądać oferty.
                          </RadioGroupLabelItem>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                )}
              />
              <div></div>
              <div className="flex flex-col justify-between gap-5 sm:flex-row">
                <Button
                  className="sm:w-1/2"
                  variant={"outline"}
                  onClick={() => {
                    handleChange({ ...data, activeTab: 0 });
                  }}
                  disabled={isProcessing}
                >
                  Wróć
                </Button>
                <Button
                  className="sm:w-1/2"
                  type="submit"
                  onClick={() => onSubmit(form.getValues())}
                  disabled={isProcessing || !type}
                >
                  {isProcessing ? (
                    <LoaderCircleIcon className="size-8 animate-spin" />
                  ) : type === "false" ? (
                    "Zakończ"
                  ) : (
                    "Kontynuuj"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="hidden h-full w-full justify-end xl:block">
          <div className="ml-20 hidden h-full w-3/4 object-cover pb-10 xl:block">
            <Image
              src={womangoing}
              alt="woman-going"
              className="ml-20 hidden h-full w-3/4 object-cover xl:block"
            />
          </div>
        </div>
      </div>
    </>
  );
}
