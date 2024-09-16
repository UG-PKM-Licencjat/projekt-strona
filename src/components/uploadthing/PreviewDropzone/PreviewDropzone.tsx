import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "~/components/ui/Icon/Icon";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { FilePreview } from "~/components/uploadthing/FilePreview";
import { CloudUploadIcon, XIcon } from "lucide-react";

import {
  generatePermittedFileTypes,
  getByteFileSize,
  allowedContentTextLabelGenerator,
  generateClientDropzoneAccept,
} from "../utils";
import { type PreviewDropzoneProps } from "../PreviewDropzone";
import { Button } from "~/components/ui/Button/Button";

export default function PreviewDropzone({
  files,
  setFiles,
  routeConfig,
  startUpload,
  isUploading,
  className,
  showUploadButton = true,
  disabled = false,
}: PreviewDropzoneProps) {
  const maxFileCount = routeConfig
    ? Object.values(routeConfig)
        .map((v) => v.maxFileCount)
        .sort()[0]
    : 0;

  const maxFileSize = routeConfig
    ? Object.values(routeConfig)
        .map((v) => getByteFileSize(v.maxFileSize))
        .sort()[0]
    : Infinity;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const modifiedFiles = acceptedFiles.map((file) => {
        return Object.assign(file, {
          url: URL.createObjectURL(file),
          key: crypto.randomUUID(),
        });
      });
      setFiles((files) => {
        if (maxFileCount && maxFileCount > 0) {
          return [...files, ...modifiedFiles].slice(0, maxFileCount);
        }
        return [...files, ...modifiedFiles];
      });
    },
    [setFiles, maxFileCount],
  );

  const removeFile = (fileKey: string) => {
    setFiles((files) => files.filter((file) => file.key !== fileKey));
  };

  const { fileTypes } = generatePermittedFileTypes(routeConfig);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
      disabled: disabled || isUploading,
      maxFiles: maxFileCount,
      maxSize: maxFileSize,
    });

  type FileRejection = (typeof fileRejections)[number];

  const renderErrorMessages = (fileRejections: FileRejection[]) => {
    let tooManyFiles = false;
    let tooManyFilesMessage: React.ReactNode = null;

    const errorMessages = fileRejections.map((fileRejection) => {
      const filteredErrors = fileRejection.errors.filter((error) => {
        if (error.code === "too-many-files") {
          if (!tooManyFiles) {
            tooManyFilesMessage = (
              <div
                key={fileRejection.file.name}
                className="flex items-center gap-1"
              >
                <XIcon className="size-6 shrink-0 text-neo-pink" />
                <p className="text-sm font-semibold text-red-600">
                  Za dużo plików
                </p>
              </div>
            );
            tooManyFiles = true;
          }
          return false;
        }
        return true;
      });

      if (filteredErrors.length > 0) {
        return (
          <div
            key={fileRejection.file.name}
            className="flex items-center gap-1"
          >
            <XIcon className="size-6 shrink-0 text-neo-pink" />
            <p className="text-sm font-semibold text-red-600">
              {`${fileRejection.file.name} - ${fileRejection.errors.map((error) => error.message).join(", ")}`}
            </p>
          </div>
        );
      }

      return null;
    });

    return (
      <>
        {tooManyFiles && tooManyFilesMessage}
        {errorMessages}
      </>
    );
  };

  return (
    <div className="flex w-full flex-col gap-1">
      <div
        className={cn(
          "mt-2 flex justify-center rounded-lg border border-dashed p-4",
          className,
          isDragActive
            ? "border-neo-castleton bg-neo-castleton/10"
            : "border-black/25",
          disabled && "cursor-not-allowed select-none",
        )}
        {...getRootProps()}
      >
        <input className="sr-only" {...getInputProps()} />
        {files.length == 0 ? (
          <div className="my-12 flex flex-col items-center">
            <CloudUploadIcon className="size-14 text-neo-dark-gray" />
            <div className="mt-4 flex text-base leading-6 text-black">
              <div
                className={cn(
                  "relative cursor-pointer font-semibold text-neo-sea focus-within:outline-none focus-within:ring-2 focus-within:ring-neo-sea focus-within:ring-offset-2 hover:text-neo-sea-hover",
                  disabled && "cursor-not-allowed",
                )}
              >
                Wybierz
              </div>
              <p className="pl-1">lub przeciągnij pliki</p>
            </div>
            <div className="h-[1.25rem]">
              <p className="text-sm leading-5 text-neo-dark-gray">
                {allowedContentTextLabelGenerator(routeConfig)}
              </p>
            </div>
            {files.length > 0 && showUploadButton && (
              <div className="mt-4 flex items-center justify-center">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!files || isUploading) return;

                    void startUpload(files);
                  }}
                >
                  <span className="px-3 py-2 text-white">
                    {isUploading ? (
                      <Icon name="spinner" className="size-6 animate-spin" />
                    ) : (
                      `Prześlij ${files.length} plik${files.length >= 5 ? "ów" : files.length >= 2 ? "i" : ""}`
                    )}
                  </span>
                </Button>
              </div>
            )}
            {files.length === 0 && showUploadButton && (
              <div className="mt-4 flex items-center justify-center">
                <Button variant="secondary" type="button">
                  Wybierz pliki
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative flex flex-wrap gap-2 p-2">
            <AnimatePresence initial={false}>
              {files.map((file) => (
                <motion.div
                  key={file.key}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="group relative flex p-2"
                  layout
                  onClick={(e) => e.stopPropagation()}
                >
                  <FilePreview file={file} deleteFile={removeFile} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      <div className="flex gap-2">{renderErrorMessages(fileRejections)}</div>
    </div>
  );
}
