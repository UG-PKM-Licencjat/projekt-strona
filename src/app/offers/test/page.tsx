"use client";

import { useState } from "react";
import {
  PreviewDropzone,
  useUploadThing,
  type CustomFile,
} from "~/components/uploadthing";

export default function TestPage() {
  const [files, setFiles] = useState<CustomFile[]>([]);

  const { startUpload, routeConfig, isUploading } = useUploadThing(
    "fileUploader",
    {
      onClientUploadComplete: (res) => {
        console.log(res);
        console.log(res[0]?.url.split("/").pop());
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

  return (
    <div>
      <PreviewDropzone
        files={files}
        setFiles={setFiles}
        routeConfig={routeConfig}
        startUpload={startUpload}
        isUploading={isUploading}
      />
    </div>
  );
}
