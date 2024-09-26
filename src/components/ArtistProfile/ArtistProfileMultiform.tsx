"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWindowSize } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, EyeIcon, LoaderCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { FormProvider, useForm, type FieldErrors } from "react-hook-form";
import { type ClientUploadedFileData } from "uploadthing/types";
import { Button } from "~/components/ui/Button/Button";
import { useToast } from "~/components/ui/use-toast";
import { uploadFiles } from "~/components/uploadthing";
import { artistSchema, type ArtistFormData } from "~/lib/artistSchema";
import { cn } from "~/lib/utils";
import { useFileStore } from "~/stores/fileStore";
import { steps, type Fields } from "./steps";
import { trpc } from "~/trpc/react";
import { type TRPCError } from "@trpc/server";
import { useRouter } from "next/navigation";
import Image from "next/image";
import forest from "public/svg/forest.svg";
import forestmini from "public/svg/forestmini.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import OfferView, { type OfferData } from "../Offer/OfferView";
import type { Session } from "next-auth";
import { ScrollArea } from "../ui/scroll-area";
import { objectKeys } from "~/components/uploadthing/utils";

interface ArtistProfileMultiformProps {
  defaultData?: ArtistFormData;
  title: string;
  edit?: boolean;
  session: Session;
}

export function ArtistProfileMultiform({
  defaultData,
  title,
  edit,
  session,
}: ArtistProfileMultiformProps) {
  const { width } = useWindowSize();
  const isMobile = width ? width <= 1280 : window.innerWidth <= 1280;
  const { files, clearFiles, previewFiles, setPreviewFiles } = useFileStore(
    (state) => ({
      files: state.files,
      clearFiles: state.clearFiles,
      previewFiles: state.previewFiles,
      setPreviewFiles: state.setPreviewFiles,
    }),
  );

  const [saveDisabled, setSaveDisabled] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const router = useRouter();

  const navigateToHome = () => {
    router.push("/");
    router.refresh();
  };

  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
    }

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);

  const variants = {
    enter: (direction: number) => {
      return {
        y: !isMobile ? (direction > 0 ? 50 : -50) : 0,
        x: isMobile ? (direction > 0 ? 30 : -30) : 0,
        opacity: 0,
      };
    },
    center: {
      y: 0,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        y: !isMobile ? (direction < 0 ? 50 : -50) : 0,
        x: isMobile ? (direction < 0 ? 30 : -30) : 0,
        opacity: 0,
      };
    },
  };
  const [[activeStep, direction], setStep] = useState([0, 0]);
  const [openDescription, setOpenDescription] = useState(false);
  const toggleDescription = () => setOpenDescription((open) => !open);

  const createOffer = trpc.offers.create.useMutation();
  const updateOffer = trpc.offers.update.useMutation();

  const handleStepChange = async (newStep: number, direction: number) => {
    if (newStep < 0) return;
    if (newStep >= steps.length) return;
    setStep([newStep, direction]);
  };

  const methods = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
    mode: "onTouched",
    defaultValues: {
      ...defaultData,
      distance: defaultData?.distance ?? 0,
    },
  });

  useEffect(() => {
    setPreviewFiles(defaultData?.files ?? []);
    methods.setValue("files", defaultData?.files ?? undefined);
  }, []);

  const formData = methods.watch();
  const previewData: OfferData = {
    name: formData.name,
    price: Number.parseFloat(formData.price?.replace(",", ".") ?? "0"),
    ratingsSum: 0,
    votes: 0,
    shortDescription: formData.shortDescription,
    longDescription: formData.longDescriptionHTML,
    locationName: formData.locationName,
    location: {
      x: formData.location?.x ?? 21.0122287,
      y: formData.location?.y ?? 52.2296756,
    },
    distance: formData.distance,
    files: formData.files ?? null,
    users: {
      id: session.user.id,
      image: session.user.image ?? null,
      name: `${session.user.firstName} ${session.user.lastName}`,
    },
    offerTags: formData.tags,
  };

  const { toast } = useToast();
  let onSubmit: (data: ArtistFormData) => Promise<void>;
  if (edit) {
    onSubmit = async (data: ArtistFormData) => {
      setIsSubmitting(true);
      let updatedFiles = previewFiles;
      if (files.length > 0) {
        let newFiles = await uploadFiles("galleryUploader", {
          files,
        });
        newFiles = newFiles.reverse();
        updatedFiles = updatedFiles.map((file) =>
          file.url.startsWith("blob:") ? newFiles.pop()! : file,
        );
        setPreviewFiles(updatedFiles);
        clearFiles();
      }
      const parsedPrice = parseFloat(data.price.replace(",", "."));
      const profileData = {
        name: data.name,
        shortDescription: data.shortDescription,
        longDescription: data.longDescriptionHTML,
        files: updatedFiles,
        locationName: data.locationName,
        location: data.location,
        distance: data.distance,
        price: parsedPrice,
        tags: data.tags,
      };
      updateOffer
        .mutateAsync(profileData)
        .then((result) => {
          toast({
            title: "Zaktualizowano profil",
          });
          setIsSubmitting(false);
          setSaveDisabled(true);
          setTimeout(() => {
            setSaveDisabled(false);
          }, 5000);
        })
        .catch((error: TRPCError) => {
          // TODO rethink if this is the best way to communicate errors to user
          toast({
            title: "Wystąpił błąd",
            description: error.message,
            variant: "destructive",
          });
          setIsSubmitting(false);
        });
    };
  } else {
    onSubmit = async (data: ArtistFormData) => {
      methods.setValue("files", previewFiles);
      setIsSubmitting(true);
      // TODO cache the responses here to avoid multiple uploads
      let uploadedFiles: ClientUploadedFileData<null>[] | undefined;
      if (files.length > 0) {
        uploadedFiles = await uploadFiles("galleryUploader", {
          files,
        });
      }
      const parsedPrice = parseFloat(data.price.replace(",", "."));
      const profileData = {
        name: data.name,
        shortDescription: data.shortDescription,
        longDescription: data.longDescriptionHTML,
        files: uploadedFiles,
        locationName: data.locationName,
        location: data.location,
        distance: data.distance,
        price: parsedPrice,
        tags: data.tags,
      };
      createOffer
        .mutateAsync(profileData)
        .then((result) => {
          // Maybe useful for debugging?
          // toast({
          //   title: "Submitted form",
          //   description: (
          //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          //       <code className="text-white">
          //         {JSON.stringify(result, null, 2)}
          //       </code>
          //     </pre>
          //   ),
          // });
          setIsSubmitting(false);
          setProfileCreated(true);
          clearFiles();
        })
        .catch((error: TRPCError) => {
          // TODO rethink if this is the best way to communicate errors to user
          toast({
            title: "Wystąpił błąd",
            description: error.message,
            variant: "destructive",
          });
          setIsSubmitting(false);
        });
    };
  }

  const onInvalid = (errors: FieldErrors<ArtistFormData>) => {
    methods.setValue("files", previewFiles);
    const errorFields = objectKeys(errors);
    const errorSteps = errorFields
      .map((field) => errors[field]?.message)
      .filter((step) => step !== "");
    toast({
      title: "Popraw błędy",
      variant: "destructive",
      description: (
        <ul className="flex list-inside list-disc flex-col">
          {errorSteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      ),
    });
  };

  const hasErrors = (fields?: Fields[]) => {
    if (!fields) return false;
    return fields.some((field) => methods.formState.errors[field]?.message);
  };

  const isComplete = (fields?: Fields[]) => {
    if (!fields) return false;
    return fields.every((field) => {
      const value = methods.getValues(field);
      const error = methods.formState.errors[field]?.message;
      switch (typeof value) {
        case "string":
        case "number":
          return (value && !error) || field === "distance";
        case "object":
          return (Object.keys(value).length > 0 && !error) || field === "files";
        default:
          return false;
      }
    });
  };

  return (
    <FormProvider {...methods}>
      {profileCreated ? (
        <div className="container relative grid grid-cols-[40%_60%] gap-10 bg-neo-gray max-lg:grid-cols-1 md:rounded-lg">
          <div className="flex shrink-0 flex-col items-center justify-center gap-2 lg:gap-20 xl:gap-32">
            <div className="flex flex-col items-start">
              <h2 className="font-header text-2xl font-semibold sm:text-3xl">
                To już
                <span className="text-neo-mantis lg:text-neo-castleton">
                  {" "}
                  wszystko!
                </span>
              </h2>
              <p className="text-base text-neo-dark-gray sm:text-lg">
                Teraz możesz w pełni korzystać z serwisu Bebop.
              </p>
            </div>
            <div className="flex p-5">
              <Image
                src={forestmini}
                alt="forest mini"
                className="w-96 lg:hidden"
              />
            </div>
            <Button variant="default" size="lg" onClick={navigateToHome}>
              Przejdź do strony głównej
            </Button>
          </div>
          <div className="shrink self-end pr-10 pt-10 max-lg:hidden">
            <Image
              src={forest}
              alt="forest"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      ) : (
        <form
          onSubmit={methods.handleSubmit(onSubmit, onInvalid)}
          className="container relative flex flex-col justify-between bg-neo-gray p-8 max-sm:py-4 md:rounded-lg"
        >
          <div className="flex gap-8 max-xl:flex-col">
            {/* Vertical stepper */}
            <div className="flex shrink-0 flex-col gap-4">
              <h2 className="font-header text-2xl font-semibold">{title}</h2>
              <div className="flex flex-col justify-center gap-2 max-xl:flex-row sm:gap-4">
                {steps.map((step, index) => (
                  <motion.div
                    whileTap={{ scale: [null, 0.95] }}
                    // transition={{ duration: 0.2 }}
                    className={cn(
                      "flex cursor-pointer select-none items-center gap-2 rounded-md bg-neo-gray-hover p-3 sm:p-4",
                      hasErrors(step.fields) && "bg-neo-pink/30",
                      isComplete(step.fields) && "bg-neo-sea/30",
                      index === activeStep && "bg-neo-sea text-neo-gray",
                      index === activeStep &&
                        hasErrors(step.fields) &&
                        "bg-neo-pink/90",
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
                    <span className="max-xl:hidden">{step.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col gap-6">
              <div className="flex w-full flex-col xl:px-10 xl:py-5">
                <h1 className="text-lg font-medium sm:text-xl">
                  {steps[activeStep]?.title}
                </h1>
                <div className="flex items-start gap-2">
                  <motion.p
                    layout={isMobile}
                    initial={
                      isMobile
                        ? { height: openDescription ? "auto" : 24 }
                        : { height: "auto" }
                    }
                    animate={
                      isMobile
                        ? { height: openDescription ? "auto" : 24 }
                        : { height: "auto" }
                    }
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "h-auto overflow-hidden text-ellipsis text-neo-dark-gray",
                    )}
                    onClick={toggleDescription}
                  >
                    {steps[activeStep]?.description}
                  </motion.p>
                  <ChevronDown
                    className={cn(
                      "size-6 shrink-0 stroke-neo-dark-gray transition-transform xl:hidden",
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
                  layout="position"
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
          <div className="mt-5 flex w-full pb-10">
            <div className="container flex w-full justify-center gap-2 max-sm:flex-col sm:justify-between">
              {activeStep > 0 ? (
                <Button
                  variant="outline"
                  onClick={() => handleStepChange(activeStep - 1, -1)}
                  type="button"
                  className="border-neo-sea text-neo-sea hover:bg-neo-sea hover:text-white"
                >
                  Cofnij
                </Button>
              ) : (
                <div></div>
              )}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    {activeStep === steps.length - 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        key="preview-button"
                        className="w-fit shrink-0 gap-2 max-sm:size-14 max-sm:p-0"
                      >
                        <EyeIcon className="size-5" />
                        <span className="hidden sm:block">Podgląd</span>
                      </Button>
                    )}
                  </DialogTrigger>
                  <DialogContent
                    className="size-full max-h-full max-w-full rounded-md border-neo-castleton bg-neo-castleton p-0 md:max-h-[95svh] md:max-w-[95svw]"
                    closeButtonIconClassName="size-6 text-neo-gray"
                  >
                    <DialogHeader className="m-6">
                      <DialogTitle className="text-xl text-white">
                        Podgląd oferty
                      </DialogTitle>
                      <DialogDescription className="text-base text-neo-gray-hover">
                        Tak będzie wyglądała twoja oferta.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-full w-full overflow-y-auto p-2 sm:p-6">
                      <OfferView preview data={previewData} />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    key="submit-button"
                    variant="secondary"
                    className="w-full max-sm:px-0"
                    disabled={saveDisabled}
                  >
                    {edit ? "Zapisz" : "Stwórz profil"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleStepChange(activeStep + 1, 1)}
                    type="button"
                    variant="secondary"
                    key="next-button"
                    className="w-full"
                  >
                    Dalej
                  </Button>
                )}
              </div>
            </div>
          </div>
          {isSubmitting && (
            <div className="absolute bottom-0 left-0 right-0 flex size-full items-center justify-center bg-black/30 md:rounded-lg">
              <LoaderCircleIcon className="size-10 animate-spin text-white" />
            </div>
          )}
        </form>
      )}
    </FormProvider>
  );
}
