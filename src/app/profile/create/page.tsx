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
import { ChevronDown } from "lucide-react";

const variants = {
  enter: (direction: number) => {
    return {
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      // scaleY: 0,
    };
  },
  center: {
    y: 0,
    opacity: 1,
    // scaleY: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      // scaleY: 0,
    };
  },
};

export default function CreateArtistProfilePage() {
  const [[activeStep, direction], setStep] = useState([0, 0]);
  const [openDescription, setOpenDescription] = useState(false);

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
        className="container flex flex-col justify-between bg-neo-gray p-8 sm:rounded-lg"
      >
        <div className="flex gap-8 max-lg:flex-col">
          {/* Vertical stepper */}
          <div className="flex shrink-0 flex-col gap-4">
            <h2 className="font-header text-2xl font-semibold">
              Stwórz profil
            </h2>
            <div className="flex flex-col justify-center gap-4 max-lg:flex-row">
              {steps.map((step, index) => (
                <motion.div
                  whileTap={{ scale: [null, 0.95] }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex cursor-pointer select-none items-center gap-2 rounded-md bg-neo-gray-hover p-3 sm:p-4",
                    index === activeStep && "bg-neo-sea text-neo-gray",
                  )}
                  key={index}
                  onClick={() =>
                    handleStepChange(index, index > activeStep ? 1 : -1)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleStepChange(index, index > activeStep ? 1 : -1);
                    }
                  }}
                >
                  <Icon name={step.icon} className="size-6" />
                  <span className="max-lg:hidden">{step.title}</span>
                </motion.div>
              ))}
            </div>
            <span className="text-center font-semibold lg:hidden">
              {steps[activeStep]?.title}
            </span>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col lg:p-10">
              <h1 className="text-lg font-medium sm:text-xl">
                {steps[activeStep]?.title}
              </h1>
              <div className="flex items-start gap-2">
                <p
                  className={cn(
                    "overflow-hidden text-ellipsis text-black/60 transition-[height] duration-300 ease-in-out",
                    openDescription ? "h-full" : "max-md:h-6",
                  )}
                >
                  {steps[activeStep]?.description}
                </p>
                <ChevronDown
                  className={cn(
                    "size-6 shrink-0 stroke-black/60 transition-transform md:hidden",
                    openDescription && "rotate-180",
                  )}
                  onClick={() =>
                    setOpenDescription((openDescription) => !openDescription)
                  }
                />
              </div>
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
                // transition={{ duration: 0.1 }}
                key={`step-${activeStep}`}
                className="rounded-lg lg:px-10"
              >
                {steps[activeStep]?.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex w-full pb-10">
          <div className="container flex w-full justify-center gap-2 sm:justify-between">
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
