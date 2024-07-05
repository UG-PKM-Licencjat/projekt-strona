// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import Image from "next/image";
import { Icon } from "~/components/ui/Icon/Icon";
import { cn } from "~/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

import { useUploadThing } from "~/components/uploadthing";

type AllowedFileType = "image" | "video" | "audio" | "blob";
type PowOf2 = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024;
type SizeUnit = "B" | "KB" | "MB" | "GB";
type FileSize = `${PowOf2}${SizeUnit}`;

type RouteConfig = {
  maxFileSize: FileSize;
  maxFileCount: number;
};

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

  // Format multi-type uploader label as "Supports videos, images and files";
  if (allowedTypes.length > 1) {
    const lastType = formattedTypesMulti.pop();
    return `${formattedTypesMulti.join(", ")} i ${lastType}`;
  }

  // Single type uploader label
  const key = allowedTypes[0] ? allowedTypes[0] : "blob";

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-assignment
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

export function MultiUploader() {
  const [files, setFiles] = useState<
    (File & { preview: string; key: string })[]
  >([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("acceptedFiles", acceptedFiles);
    const modifiedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        key: crypto.randomUUID(),
      }),
    );
    console.log("modifiedFiles", modifiedFiles);
    setFiles((files) => [...files, ...modifiedFiles]);
  }, []);

  const { startUpload, routeConfig, isUploading } = useUploadThing(
    "fileUploader",
    {
      onClientUploadComplete: (res) => {
        console.log(res);
        setFiles([]);
        alert("uploaded successfully!");
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
      onUploadBegin: () => {
        // alert("upload has begun");
      },
    },
  );

  const removeFile = (index: number) => {
    setFiles((files) => files.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("files", files);
    console.log(routeConfig);
  }, []);

  const { fileTypes } = generatePermittedFileTypes(routeConfig);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <>
      <div
        className={cn(
          "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
          isDragActive ? "bg-blue-600/10" : "",
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
            <div className="relative cursor-pointer font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
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
                className="flex h-10 w-40 items-center justify-center rounded-md bg-blue-600"
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
              <button className="flex h-10 w-40 items-center justify-center rounded-md bg-blue-600">
                <span className="px-3 py-2 text-white">Wybierz pliki</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="relative flex flex-wrap gap-2 p-2">
        <AnimatePresence initial={false}>
          {files.map((file, index) => (
            <motion.div
              key={file.key}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="group relative flex p-2"
              layout
            >
              <div className="relative flex h-44 overflow-hidden rounded-lg border-2">
                {file.type.startsWith("image") ? (
                  <Image
                    src={file.preview}
                    alt="test"
                    width={150}
                    height={150}
                    style={{ width: "100%", height: "auto" }}
                    sizes="20vw"
                  />
                ) : file.type.startsWith("video") ? (
                  <video controls>
                    <source src={file.preview} type={file.type} />
                  </video>
                ) : file.type.startsWith("audio") ? (
                  // PLACEHOLDER (?)
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-center text-sm font-semibold">
                      {file.name}
                    </p>
                    <audio controls>
                      <source src={file.preview} type={file.type} />
                    </audio>
                  </div>
                ) : null}
              </div>
              <div
                className="absolute right-0 top-0 rotate-180 scale-0 cursor-pointer rounded-full bg-destructive p-1 transition-all duration-200 hover:bg-red-600 group-hover:rotate-0 group-hover:scale-100"
                onClick={() => {
                  void removeFile(index);
                }}
              >
                <Icon
                  name="plus"
                  className="size-4 rotate-45 stroke-destructive-foreground"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
