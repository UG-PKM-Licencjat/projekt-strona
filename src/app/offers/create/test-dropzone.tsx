// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import Image from "next/image";

import { useUploadThing } from "~/components/uploadthing";

export function MultiUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, routeConfig } = useUploadThing("fileUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  useEffect(() => {
    console.log("files", files);
    console.log(routeConfig);
  }, [files, routeConfig]);

  const fileTypes = routeConfig ? Object.keys(routeConfig) : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="m-10 w-96 rounded border border-black p-10"
      >
        <input {...getInputProps()} />
        <div>
          {files.length > 0 && (
            <button onClick={() => startUpload(files)}>
              Upload {files.length} files
            </button>
          )}
        </div>
        Drop files here!
      </div>
      <div className="group relative flex p-2">
        {files.map((file, index) => (
          <div
            className="relative flex h-44 overflow-hidden rounded-lg border-2"
            key={index}
          >
            {file.type.startsWith("image") ? (
              <Image
                src={URL.createObjectURL(file)}
                alt="test"
                width={150}
                height={150}
                style={{ width: "100%", height: "auto" }}
                sizes="20vw"
              />
            ) : file.type.startsWith("video") ? (
              <video controls>
                <source src={URL.createObjectURL(file)} type={file.type} />
              </video>
            ) : file.type.startsWith("audio") ? (
              // PLACEHOLDER (?)
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-center text-sm font-semibold">{file.name}</p>
                <audio controls>
                  <source src={URL.createObjectURL(file)} type={file.type} />
                </audio>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}
