import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "~/components/ui/Icon/Icon";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { FilePreview } from "~/components/uploadthing/FilePreview";

import {
  generatePermittedFileTypes,
  getByteFileSize,
  allowedContentTextLabelGenerator,
  type PreviewDropzoneProps,
  generateClientDropzoneAccept,
} from ".";

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

  return (
    <>
      <div
        className={cn(
          "mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10",
          className,
          isDragActive
            ? "border-pink-600 bg-pink-600/10"
            : "border-gray-900/25",
          disabled && "cursor-not-allowed select-none opacity-50",
        )}
        {...getRootProps()}
      >
        <input className="sr-only" {...getInputProps()} />
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="mx-auto h-12 w-12 text-gray-400"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765a4.5 4.5 0 0 1 8.302-3.046a3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <div
              className={cn(
                "relative cursor-pointer font-semibold text-pink-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-pink-600 focus-within:ring-offset-2 hover:text-pink-500",
                disabled && "cursor-not-allowed",
              )}
            >
              Wybierz
            </div>
            <p className="pl-1">lub przeciągnij pliki</p>
          </div>
          <div className="h-[1.25rem]">
            <p className="text-xs leading-5 text-gray-600">
              {allowedContentTextLabelGenerator(routeConfig)}
            </p>
          </div>
          {files.length > 0 && showUploadButton && (
            <div className="mt-4 flex items-center justify-center">
              <button
                className="flex h-10 w-40 items-center justify-center rounded-md bg-pink-600"
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
              </button>
            </div>
          )}
          {files.length === 0 && showUploadButton && (
            <div className="mt-4 flex items-center justify-center">
              <button className="flex h-10 w-40 items-center justify-center rounded-md bg-pink-600">
                <span className="px-3 py-2 text-white">Wybierz pliki</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2">
        {fileRejections.map((fileRejection) => (
          <div
            key={fileRejection.file.name}
            className="flex items-center gap-2"
          >
            <Icon name="plus" className="size-6 rotate-45" />
            <p className="text-sm font-semibold text-red-500">
              {fileRejection.errors.map((error) => error.message).join(", ")}
            </p>
          </div>
        ))}
      </div>
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
            >
              <FilePreview file={file} deleteFile={removeFile} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
