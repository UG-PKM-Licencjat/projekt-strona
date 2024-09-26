import { type SetStateAction } from "react";

import type { CustomFile, ExpandedRouteConfig } from "../utils";
import type { PreviewFile } from "~/stores/fileStore";

export interface PreviewDropzoneProps {
  files: PreviewFile[];
  setFiles: (value: SetStateAction<CustomFile[]>) => void;
  removeFile: (fileKey: string) => void;
  routeConfig?: ExpandedRouteConfig;
  isUploading?: boolean;
  className?: string;
  showUploadButton?: boolean;
  disabled?: boolean;
}

export { default as PreviewDropzone } from "./PreviewDropzone";
