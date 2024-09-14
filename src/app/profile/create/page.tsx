"use client";
import { useState } from "react";
import { steps } from "./steps";
import { Icon } from "~/components/ui/Icon/Icon";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { artistSchema, type ArtistFormData } from "~/lib/artistSchema";
import { useToast } from "~/components/ui/use-toast";

const variants = {
  enter: (direction: number) => {
    return {
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
};

export default function CreateArtistProfilePage() {
  const [[activeStep, direction], setStep] = useState([0, 0]);

  const handleStepChange = (newStep: number, direction: number) => {
    if (newStep < 0) return;
    if (newStep >= steps.length) return;
    setStep([newStep, direction]);
  };

  const methods = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
  });

  const { toast } = useToast();
  const onSubmit = (data: ArtistFormData) => {
    toast({
      title: "Submitted form",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="container flex flex-1 flex-col justify-between bg-neo-gray p-8 sm:rounded-lg"
      >
        <div className="flex flex-1 gap-8">
          {/* Vertical stepper */}
          <div className="flex h-full flex-col gap-4">
            <h2 className="font-header text-2xl font-semibold">
              Stwórz profil
            </h2>
            {steps.map((step, index) => (
              <motion.div
                whileTap={{ scale: [null, 0.95] }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex cursor-pointer select-none items-center gap-2 rounded-md bg-neo-gray-hover p-4",
                  index === activeStep && "bg-neo-sea text-neo-gray",
                )}
                key={index}
                onClick={() =>
                  handleStepChange(index, index > activeStep ? 1 : -1)
                }
              >
                <Icon name={step.icon} className="size-6" />
                {step.title}
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-10">
              <h1 className="text-xl font-bold">
                {steps[activeStep]?.description}
              </h1>
            </div>
            <AnimatePresence
              initial={false}
              mode="popLayout"
              custom={direction}
            >
              <motion.div
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                key={`step-${activeStep}`}
                className="w-fit rounded-lg bg-neo-gray px-10"
              >
                {steps[activeStep]?.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex w-full pb-20 sm:p-6">
          <div className="container flex w-full justify-between gap-2">
            {activeStep > 0 ? (
              <Button
                variant="outline"
                onClick={() => handleStepChange(activeStep - 1, -1)}
                type="button"
              >
                Cofnij
              </Button>
            ) : (
              <div></div>
            )}
            {activeStep === steps.length - 1 ? (
              <Button type="submit" key="submit-button">
                Stwórz profil
              </Button>
            ) : (
              <Button
                onClick={() => handleStepChange(activeStep + 1, 1)}
                type="button"
                key="next-button"
              >
                Dalej
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
