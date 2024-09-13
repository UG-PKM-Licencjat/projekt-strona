"use client";
import { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { Icon } from "~/components/ui/Icon/Icon";
import { type IconType } from "~/components/ui/SvgSymbols/SvgSymbols";
import { cn } from "~/lib/utils";

export default function CreateArtistProfilePage() {
  const [activeStep, setStep] = useState(1);

  const handleStepChange = (newStep: number) => {
    if (newStep < 1) return;
    if (newStep > steps.length) return;
    setStep(newStep);
  };

  const steps: { title: string; content: React.ReactNode; icon: IconType }[] = [
    {
      title: "Step 1",
      content: <Step1 />,
      icon: "user",
    },
    {
      title: "Step 2",
      content: <Step2 />,
      icon: "user",
    },
    {
      title: "Step 3",
      content: <Step3 />,
      icon: "user",
    },
  ];

  return (
    <div className="container">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Create Profile</h1>
        </div>
        <div className="rounded-lg bg-neo-gray p-10">
          {steps[activeStep - 1]?.content}
        </div>
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <div
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-md bg-neo-dark-gray p-2",
                index === activeStep - 1 && "bg-neo-sea",
              )}
              key={index}
              onClick={() => handleStepChange(index + 1)}
            >
              {step.title}
              <Icon name={step.icon} className="size-6" />
            </div>
          ))}
        </div>
      </div>
      <div className="container absolute bottom-0 flex justify-center p-4">
        <div className="flex w-full justify-between gap-2">
          <button
            className="flex h-10 w-40 items-center justify-center rounded-md bg-pink-600"
            onClick={() => handleStepChange(activeStep - 1)}
          >
            <span className="px-3 py-2 text-white">Back</span>
          </button>
          <button
            className="flex h-10 w-40 items-center justify-center rounded-md bg-pink-600"
            onClick={() => handleStepChange(activeStep + 1)}
          >
            <span className="px-3 py-2 text-white">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}
