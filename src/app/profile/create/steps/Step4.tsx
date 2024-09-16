import {
  type CustomFile,
  PreviewDropzone,
  useUploadThing,
} from "~/components/uploadthing";
import { useState } from "react";

export default function Step3() {
  // TODO extract this to parent component, figure out how to pass it down and make it work
  const [files, setFiles] = useState<CustomFile[]>([]);
  const { startUpload, routeConfig, isUploading } = useUploadThing(
    "galleryUploader",
    {
      onUploadError: () => {
        alert("error occurred while uploading");
      },
    },
  );
  return (
    <div className="flex">
      <PreviewDropzone
        files={files}
        setFiles={setFiles}
        routeConfig={routeConfig}
        startUpload={startUpload}
        isUploading={isUploading}
        showUploadButton={true}
        className="w-full"
      />
    </div>
  );
}
