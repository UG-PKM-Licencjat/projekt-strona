import { type SetStateAction } from "react";

export type AllowedFileType = "image" | "video" | "audio" | "blob";
export type PowOf2 = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024;
export type SizeUnit = "B" | "KB" | "MB" | "GB";
export type FileSize = `${PowOf2}${SizeUnit}`;

export type RouteConfig = {
  maxFileSize: FileSize;
  maxFileCount: number;
};

export type CustomFile = File & { url: string; key: string };

export type ExpandedRouteConfig = Partial<Record<AllowedFileType, RouteConfig>>;

export const getByteFileSize = (size: FileSize) => {
  if (size.endsWith("KB")) return parseInt(size.slice(0, -2)) * 1024;
  if (size.endsWith("MB")) return parseInt(size.slice(0, -2)) * 1024 * 1024;
  if (size.endsWith("GB"))
    return parseInt(size.slice(0, -2)) * 1024 * 1024 * 1024;
  if (size.endsWith("B")) return parseInt(size.slice(0, -1));
  return 0;
};

export const doFormatting = (config?: ExpandedRouteConfig): string => {
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

export const capitalizeStart = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const allowedContentTextLabelGenerator = (
  config?: ExpandedRouteConfig,
): string => {
  return capitalizeStart(doFormatting(config));
};

export const generatePermittedFileTypes = (config?: ExpandedRouteConfig) => {
  const fileTypes = config ? Object.keys(config) : [];

  const maxFileCount = config
    ? Object.values(config).map((v) => v.maxFileCount)
    : [];

  return { fileTypes, multiple: maxFileCount.some((v) => v && v > 1) };
};

const generateMimeTypes = (
  typesOrRouteConfig: string[] | ExpandedRouteConfig,
) => {
  const fileTypes = Array.isArray(typesOrRouteConfig)
    ? typesOrRouteConfig
    : Object.keys(typesOrRouteConfig);
  if (fileTypes.includes("blob")) return [];
  return fileTypes.map((type) => {
    if (type === "pdf") return "application/pdf";
    if (type.includes("/")) return type;
    return `${type}/*`;
  });
};
export const generateClientDropzoneAccept = (fileTypes: string[]) => {
  const mimeTypes = generateMimeTypes(fileTypes);
  return Object.fromEntries(mimeTypes.map((type) => [type, []]));
};

export interface PreviewDropzoneProps {
  files: CustomFile[];
  setFiles: (value: SetStateAction<CustomFile[]>) => void;
  routeConfig: ExpandedRouteConfig | undefined;
  startUpload: (files: CustomFile[]) => void;
  isUploading: boolean;
  className?: string;
  showUploadButton?: boolean;
  disabled?: boolean;
}

export { default as PreviewDropzone } from "./PreviewDropzone";
