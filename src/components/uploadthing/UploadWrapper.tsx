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

  return (
    <label>
      <input
        className="sr-only"
        type="file"
        multiple={false}
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
