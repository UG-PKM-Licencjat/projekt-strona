type AllowedFileType = "image" | "video" | "audio" | "blob";
type PowOf2 = 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024;
type SizeUnit = "B" | "KB" | "MB" | "GB";
type FileSize = `${PowOf2}${SizeUnit}`;

type RouteConfig = {
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

const doFormatting = (config?: ExpandedRouteConfig): string => {
  if (!config) return "";

  const allowedTypes = objectKeys(config);

  const formattedTypesSingle = allowedTypes.map((f) => {
    switch (f) {
      case "blob":
        return "plik";
      case "image":
        return "obraz";
      case "video":
        return "film";
      default:
        return f;
    }
  });

  const formattedTypesMulti = allowedTypes.map((f) => {
    switch (f) {
      case "blob":
        return "pliki";
      case "image":
        return "obrazy";
      case "video":
        return "filmy";
      default:
        return f;
    }
  });

  // Format multi-type uploader label as "Obrazy, filmy i pliki";
  if (allowedTypes.length > 1) {
    const types = allowedTypes.map((type, index) => {
      const { maxFileSize } = config[type]!;
      return `${formattedTypesMulti[index]} do ${maxFileSize}`;
    });
    return types.join(", ");
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

export const allowedContentTextLabelGenerator = (
  config?: ExpandedRouteConfig,
): string => {
  return capitalizeStart(doFormatting(config));
};

export const generatePermittedFileTypes = (config?: ExpandedRouteConfig) => {
  const fileTypes = config ? objectKeys(config) : [];

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
    : objectKeys(typesOrRouteConfig);
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

function objectKeys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
