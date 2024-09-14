import {
  type CustomFile,
  PreviewDropzone,
  useUploadThing,
} from "~/components/uploadthing";
import { useState } from "react";

export default function Step3() {
  // TODO extract this to parent component, figure out how to pass it down and make it work
  const [videos, setVideos] = useState<CustomFile[]>([]);
  const {
    startUpload: startVideoUpload,
    routeConfig: videoRouteConfig,
    isUploading: isVideoUploading,
  } = useUploadThing("createVideoUploader", {
    onClientUploadComplete: () => {
      setVideos([]);
      // alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      // alert("upload has begun");
    },
  });
  return (
    <div className="flex">
      <PreviewDropzone
        files={videos}
        setFiles={setVideos}
        routeConfig={videoRouteConfig}
        startUpload={startVideoUpload}
        isUploading={isVideoUploading}
        showUploadButton={false}
        className="w-full"
      />
    </div>
  );
}
