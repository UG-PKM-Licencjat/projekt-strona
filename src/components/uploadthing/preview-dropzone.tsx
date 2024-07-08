import { useCallback, useEffect, type SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Icon } from "~/components/ui/Icon/Icon";
import { cn } from "~/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { FilePreview } from "~/app/offers/create/file-preview";

type AllowedFileType = "image" | "video" | "audio" | "blob";
type PowOf2 = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024;
type SizeUnit = "B" | "KB" | "MB" | "GB";
type FileSize = `${PowOf2}${SizeUnit}`;

type RouteConfig = {
  maxFileSize: FileSize;
  maxFileCount: number;
};

export type CustomFile = File & { url: string; key: string };

type ExpandedRouteConfig = Partial<Record<AllowedFileType, RouteConfig>>;

const doFormatting = (config?: ExpandedRouteConfig): string => {
  if (!config) return "";

  const allowedTypes = Object.keys(config) as (keyof ExpandedRouteConfig)[];

  const formattedTypesSingle = allowedTypes.map((f) => {
    if (f === "blob") return "plik";
    if (f === "image") return "obraz";
    if (f === "video") return "film";
    return f;
  });

  const formattedTypesMulti = allowedTypes.map((f) => {
    if (f === "blob") return "pliki";
    if (f === "image") return "obrazy";
    if (f === "video") return "filmy";
    return f;
  });

  // Format multi-type uploader label as "Obrazy, filmy i pliki";
  if (allowedTypes.length > 1) {
    const lastType = formattedTypesMulti.pop();
    return `${formattedTypesMulti.join(", ")} i ${lastType}`;
  }

  // Single type uploader label
  const key = allowedTypes[0]!;

  const { maxFileSize, maxFileCount } = config[key]!;

  if (maxFileCount && maxFileCount > 1) {
    return `${formattedTypesMulti[0]} do ${maxFileSize}, max ${maxFileCount}`;
  } else {
    return `${formattedTypesSingle[0]} (${maxFileSize})`;
  }
};

const capitalizeStart = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const allowedContentTextLabelGenerator = (
  config?: ExpandedRouteConfig,
): string => {
  return capitalizeStart(doFormatting(config));
};

const generatePermittedFileTypes = (config?: ExpandedRouteConfig) => {
  const fileTypes = config ? Object.keys(config) : [];

  const maxFileCount = config
    ? Object.values(config).map((v) => v.maxFileCount)
    : [];

  return { fileTypes, multiple: maxFileCount.some((v) => v && v > 1) };
};

interface PreviewDropzoneProps {
  files: CustomFile[];
  setFiles: (value: SetStateAction<CustomFile[]>) => void;
  routeConfig: ExpandedRouteConfig | undefined;
  startUpload: (files: CustomFile[]) => void;
  isUploading: boolean;
  className?: string;
}

export function PreviewDropzone({
  files,
  setFiles,
  routeConfig,
  startUpload,
  isUploading,
  className,
}: PreviewDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const modifiedFiles = acceptedFiles.map((file) => {
        return Object.assign(file, {
          url: URL.createObjectURL(file),
          key: crypto.randomUUID(),
        });
      });
      setFiles((files) => [...files, ...modifiedFiles]);
    },
    [setFiles],
  );

  const removeFile = (fileKey: string) => {
    setFiles((files) => files.filter((file) => file.key !== fileKey));
  };

  const { fileTypes } = generatePermittedFileTypes(routeConfig);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <>
      <div
        className={cn(
          cn(
            "mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10",
            className,
          ),
          isDragActive
            ? "border-pink-600 bg-pink-600/10"
            : "border-gray-900/25",
        )}
        {...getRootProps()}
      >
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
            <div className="relative cursor-pointer font-semibold text-pink-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-pink-600 focus-within:ring-offset-2 hover:text-pink-500">
              {`Wybierz`}
              <input
                className="sr-only"
                {...getInputProps()}
                disabled={isUploading}
              />
            </div>
            <p className="pl-1">{`lub przeciągnij pliki`}</p>
          </div>
          <div className="h-[1.25rem]">
            <p className="text-xs leading-5 text-gray-600">
              {allowedContentTextLabelGenerator(routeConfig)}
            </p>
          </div>
          {files.length > 0 && (
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
          {files.length === 0 && (
            <div className="mt-4 flex items-center justify-center">
              <button className="flex h-10 w-40 items-center justify-center rounded-md bg-pink-600">
                <span className="px-3 py-2 text-white">Wybierz pliki</span>
              </button>
            </div>
          )}
        </div>
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
