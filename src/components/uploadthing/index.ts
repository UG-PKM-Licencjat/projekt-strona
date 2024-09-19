import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "~/app/api/uploadthing/core";
export { PreviewDropzone } from "./PreviewDropzone";
export { type CustomFile, type ExpandedRouteConfig } from "./utils";

export const { useUploadThing, uploadFiles, getRouteConfig } =
  generateReactHelpers<OurFileRouter>();
