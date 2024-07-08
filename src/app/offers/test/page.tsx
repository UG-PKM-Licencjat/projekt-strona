"use client";

import { useState } from "react";
import {
  PreviewDropzone,
  useUploadThing,
  type CustomFile,
} from "~/components/uploadthing";

export default function TestPage() {
  const [images, setImages] = useState<CustomFile[]>([]);

  const {
    startUpload: startImageUpload,
    routeConfig: imageRouteConfig,
    isUploading: isImageUploading,
  } = useUploadThing("createImageUploader", {
    onClientUploadComplete: (res) => {
      console.log(res);
      console.log(res[0]?.url.split("/").pop());
      setImages([]);
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      // alert("upload has begun");
    },
  });

  return (
    <div>
      <PreviewDropzone
        files={images}
        setFiles={setImages}
        routeConfig={imageRouteConfig}
        startUpload={startImageUpload}
        isUploading={isImageUploading}
      />
    </div>
  );
}
