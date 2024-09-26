import { AnimatePresence, motion } from "framer-motion";
import { CloudUploadIcon, XIcon } from "lucide-react";
import { useCallback } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { SortableItem } from "~/components/Sortable/SortableItem";
import { Button } from "~/components/ui/Button/Button";
import { FilePreview } from "~/components/uploadthing/FilePreview";
import { cn } from "~/lib/utils";
import { type PreviewDropzoneProps } from "../PreviewDropzone";
import {
  allowedContentTextLabelGenerator,
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
  getByteFileSize,
  translateFileRejection,
} from "../utils";

export default function PreviewDropzone({
  files,
  setFiles,
  removeFile,
  routeConfig,
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
        .map((v) => v.maxFileSize)
        .sort()[0]
    : "null";

  const maxFileSizeRaw = routeConfig
    ? Object.values(routeConfig)
        .map((v) => getByteFileSize(v.maxFileSize))
        .sort()[0]
    : Infinity;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const modifiedFiles = acceptedFiles.map((file) => {
        return Object.assign(file, {
          url: URL.createObjectURL(file),
          key: uuidv4(),
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

  const { fileTypes } = generatePermittedFileTypes(routeConfig);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
      disabled: disabled ?? isUploading,
      maxFiles: maxFileCount,
      maxSize: maxFileSizeRaw,
    });

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
        const translated = fileRejection.errors.map((error) => {
          return translateFileRejection({
            code: error.code,
            fileTypes,
            maxFileSize,
          });
        });
        return (
          <div
            key={fileRejection.file.name}
            className="flex items-center gap-1"
          >
            <XIcon className="size-6 shrink-0 text-neo-pink" />
            <p className="text-sm font-semibold text-red-600">
              {`${fileRejection.file.name} - ${translated.join(", ")}`}
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
          "relative mt-2 flex justify-center rounded-lg border border-dashed sm:p-4",
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
            {files.length === 0 && showUploadButton && (
              <div className="mt-4 flex items-center justify-center">
                <Button variant="secondary" type="button">
                  Wybierz pliki
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative flex flex-wrap justify-center gap-2 p-2">
            <AnimatePresence initial={false}>
              {files.map((file) => (
                <motion.div
                  key={file.key}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="group relative flex p-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <SortableItem key={file.key} sortId={file.key}>
                    <FilePreview file={file} deleteFile={removeFile} />
                  </SortableItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        <div
          className={cn(
            "absolute bottom-2 right-2",
            files.length === maxFileCount && "text-neo-castleton",
          )}
        >
          {files.length}/{maxFileCount}
        </div>
      </div>
      <div className="flex gap-2">{renderErrorMessages(fileRejections)}</div>
    </div>
  );
}
