import { type OurFileRouter } from "~/app/api/uploadthing/core";
import { getRouteConfig } from ".";
import { generateMimeTypes } from "./utils";

interface UploadWrapperProps {
  children: React.ReactNode;
  endpoint: keyof OurFileRouter;
  onChange: (file: File) => void;
}

export default function UploadWrapper({
  children,
  endpoint,
  onChange,
}: UploadWrapperProps) {
  const routeConfig = getRouteConfig(endpoint);
  const mimeTypes = generateMimeTypes(routeConfig);
  const maxFileCount = Object.values(routeConfig).map((v) => v.maxFileCount);
  const multiple = maxFileCount.some((v) => v && v > 1);

  return (
    <label>
      <input
        className="sr-only"
        type="file"
        multiple={multiple}
        accept={mimeTypes.join(",")}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
      />
      {children}
    </label>
  );
}
