"use client";
import { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { Icon } from "~/components/ui/Icon/Icon";
import { type IconType } from "~/components/ui/SvgSymbols/SvgSymbols";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button/Button";
import { motion } from "framer-motion";

export default function CreateArtistProfilePage() {
  const [activeStep, setStep] = useState(1);

  const handleStepChange = (newStep: number) => {
    if (newStep < 1) return;
    if (newStep > steps.length) return;
    setStep(newStep);
  };

  const steps: { title: string; content: React.ReactNode; icon: IconType }[] = [
    {
      title: "Opisz siebie",
      content: <Step1 />,
      icon: "user",
    },
    {
      title: "Galeria",
      content: <Step2 />,
      icon: "user",
    },
    {
      title: "Linki",
      content: <Step3 />,
      icon: "user",
    },
  ];

  return (
    <div className="container flex flex-1 flex-col justify-between bg-neo-gray p-8 sm:rounded-lg">
      <div className="flex flex-1 gap-8">
        {/* Vertical stepper */}
        <div className="flex h-full flex-col gap-4">
          <h2 className="font-header text-2xl font-semibold">Stwórz profil</h2>
          {steps.map((step, index) => (
            <motion.div
              whileTap={{ scale: [null, 0.95] }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex cursor-pointer select-none items-center gap-2 rounded-md bg-neo-gray-hover p-4",
                index === activeStep - 1 && "bg-neo-sea text-neo-gray",
              )}
              key={index}
              onClick={() => handleStepChange(index + 1)}
            >
              <Icon name={step.icon} className="size-6" />
              {step.title}
            </motion.div>
          ))}
        </div>
        {/* Horizontal stepper */}
        {/* <div className="relative flex w-full gap-4">
          <h2 className="font-header text-2xl font-semibold">Stwórz profil</h2>
          <div className="absolute left-0 top-0 flex w-full justify-center">
            <div className="flex w-fit gap-2 rounded-md bg-neo-gray-hover">
              {steps.map((step, index) => (
                <motion.div
                  whileTap={{ scale: [null, 0.95] }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex cursor-pointer select-none items-center gap-2 rounded-md bg-neo-gray-hover p-4",
                    index <= activeStep - 1 && "bg-neo-sea text-neo-gray",
                  )}
                  key={index}
                  onClick={() => handleStepChange(index + 1)}
                >
                  <Icon name={step.icon} className="size-6" />
                  {step.title}
                </motion.div>
              ))}
            </div>
          </div>
        </div> */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              {steps[activeStep - 1]?.title}
            </h1>
          </div>
          <div className="w-fit rounded-lg bg-neo-gray p-10">
            {steps[activeStep - 1]?.content}
          </div>
        </div>
      </div>
      <div className="flex w-full pb-20 sm:p-6">
        <div className="container flex w-full justify-between gap-2">
          {activeStep > 1 ? (
            <Button
              variant="outline"
              onClick={() => handleStepChange(activeStep - 1)}
            >
              Cofnij
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={() => handleStepChange(activeStep + 1)}>
            Dalej
          </Button>
        </div>
      </div>
    </div>
  );
}
