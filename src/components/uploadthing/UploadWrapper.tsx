import { type OurFileRouter } from "~/app/api/uploadthing/core";
import { getRouteConfig } from ".";
import { generateMimeTypes, getByteFileSize } from "./utils";

type SizeError = {
  message: string;
};

interface UploadWrapperProps {
  children: React.ReactNode;
  endpoint: keyof OurFileRouter;
  disabled?: boolean;
  className?: string;
  onChange: (file: File) => void;
  onError: (error: SizeError) => void;
}

export default function UploadWrapper({
  children,
  endpoint,
  disabled,
  className,
  onChange,
  onError,
}: UploadWrapperProps) {
  const routeConfig = getRouteConfig(endpoint);
  const mimeTypes = generateMimeTypes(routeConfig);
  const maxFileCount = Object.values(routeConfig).map((v) => v.maxFileCount);
  const maxFileSizeString = Object.values(routeConfig).map(
    (v) => v.maxFileSize,
  );
  const maxFileSize = maxFileSizeString
    .map((v) => ({ stringSize: v, size: getByteFileSize(v) }))
    .sort((a, b) => b.size - a.size)[0];
  const multiple = maxFileCount.some((v) => v && v > 1);

  return (
    <label className={className}>
      <input
        className="sr-only"
        type="file"
        multiple={multiple}
        accept={mimeTypes.join(",")}
        disabled={disabled}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const fileType = file.type.split("/")[0];
            if (!fileType) {
              onError({ message: "Nieprawidłowy typ pliku" });
              return;
            }
            if (!mimeTypes.join("").includes(fileType)) {
              console.log("mimeTypes", mimeTypes);
              console.log("fileType", fileType);
              onError({
                message: `Nieobsługiwany typ pliku. Dozwolone typy to ${mimeTypes.join(", ")}`,
              });
              return;
            }
            if (maxFileSize && file.size > maxFileSize.size) {
              onError({
                message: `Plik jest zbyt duży. Maksymalny rozmiar pliku to ${maxFileSize.stringSize}`,
              });
              return;
            }
            onChange(file);
            onError({ message: "" });
          }
        }}
      />
      {children}
    </label>
  );
}
