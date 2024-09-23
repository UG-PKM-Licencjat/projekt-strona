import { type SetStateAction } from "react";

import type { CustomFile, ExpandedRouteConfig } from "../utils";

export interface PreviewDropzoneProps {
  files: CustomFile[];
  setFiles: (value: SetStateAction<CustomFile[]>) => void;
  routeConfig?: ExpandedRouteConfig;
  startUpload?: (files: CustomFile[]) => void;
  isUploading?: boolean;
  className?: string;
  showUploadButton?: boolean;
  disabled?: boolean;
}

export { default as PreviewDropzone } from "./PreviewDropzone";
