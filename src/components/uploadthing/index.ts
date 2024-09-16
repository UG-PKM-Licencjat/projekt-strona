import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "~/app/api/uploadthing/core";
export {
  PreviewDropzone,
  type CustomFile,
  type ExpandedRouteConfig,
} from "./PreviewDropzone";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
