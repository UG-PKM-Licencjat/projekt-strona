"use client";
import { useState } from "react";
import { steps, type Fields } from "./steps";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { artistSchema, type ArtistFormData } from "~/lib/artistSchema";
import { useToast } from "~/components/ui/use-toast";
import { ChevronDown } from "lucide-react";
import { useWindowSize } from "@uidotdev/usehooks";

export default function CreateArtistProfilePage() {
  const window = useWindowSize();

  const variants = {
    enter: (direction: number) => {
      return {
        y: window.width! >= 1024 ? (direction > 0 ? 50 : -50) : 0,
        x: window.width! < 1024 ? (direction > 0 ? 30 : -30) : 0,
        opacity: 0,
        // scaleY: 0,
      };
    },
    center: {
      y: 0,
      x: 0,
      opacity: 1,
      // scaleY: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        y: window.width! >= 1024 ? (direction < 0 ? 50 : -50) : 0,
        x: window.width! < 1024 ? (direction < 0 ? 30 : -30) : 0,
        opacity: 0,
        // scaleY: 0,
      };
    },
  };
  const [[activeStep, direction], setStep] = useState([0, 0]);
  const [openDescription, setOpenDescription] = useState(false);
  const toggleDescription = () => setOpenDescription((open) => !open);

  const handleStepChange = async (newStep: number, direction: number) => {
    if (newStep < 0) return;
    if (newStep >= steps.length) return;
    await methods.trigger();
    setStep([newStep, direction]);
  };

  const methods = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
    mode: "onTouched",
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

  const hasErrors = (fields?: Fields[]) => {
    if (!fields) return false;
    return fields.some((field) => methods.formState.errors[field]?.message);
  };

  const isComplete = (fields?: Fields[]) => {
    if (!fields) return false;
    return fields.every(
      (field) =>
        methods.getValues()[field] && !methods.formState.errors[field]?.message,
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="container flex flex-col justify-between bg-neo-gray p-8 md:rounded-lg"
      >
        <div className="flex gap-8 max-lg:flex-col">
          {/* Vertical stepper */}
          <div className="flex shrink-0 flex-col gap-4">
            <h2 className="font-header text-2xl font-semibold">
              Stwórz profil
            </h2>
            <div className="flex flex-col justify-center gap-2 max-lg:flex-row sm:gap-4">
              {steps.map((step, index) => (
                <motion.div
                  whileTap={{ scale: [null, 0.95] }}
                  // transition={{ duration: 0.2 }}
                  className={cn(
                    "flex cursor-pointer select-none items-center gap-2 rounded-md bg-neo-gray-hover p-3 sm:p-4",
                    hasErrors(step.fields) && "bg-neo-pink/30",
                    isComplete(step.fields) && "bg-neo-sea/30",
                    index === activeStep && "bg-neo-sea text-neo-gray",
                  )}
                  key={index}
                  onClick={() =>
                    handleStepChange(index, index > activeStep ? 1 : -1)
                  }
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      await handleStepChange(
                        index,
                        index > activeStep ? 1 : -1,
                      );
                    }
                  }}
                >
                  {step.icon}
                  <span className="max-lg:hidden">{step.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col lg:px-10 lg:py-5">
              <h1 className="text-lg font-medium sm:text-xl">
                {steps[activeStep]?.title}
              </h1>
              <div className="flex items-start gap-2">
                <motion.p
                  layout={window.width! < 1024}
                  animate={
                    window.width! < 1024
                      ? { height: openDescription ? "auto" : 24 }
                      : undefined
                  }
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "overflow-hidden text-ellipsis text-neo-dark-gray",
                    openDescription && window.width! < 1024 ? "" : "max-lg:h-6",
                  )}
                  onClick={toggleDescription}
                >
                  {steps[activeStep]?.description}
                </motion.p>
                <ChevronDown
                  className={cn(
                    "size-6 shrink-0 stroke-neo-dark-gray transition-transform lg:hidden",
                    openDescription && "rotate-180",
                  )}
                  onClick={toggleDescription}
                />
              </div>
            </div>
            <AnimatePresence
              initial={false}
              mode="popLayout"
              custom={direction}
            >
              <motion.div
                layout
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
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
