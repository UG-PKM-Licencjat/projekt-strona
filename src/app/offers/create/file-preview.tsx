import { type ClientUploadedFileData } from "uploadthing/types";
import Image from "next/image";
import { Icon } from "~/components/ui/Icon/Icon";

export function FilePreview({
  file,
  fileIsDeleting,
  deleteFile,
}: {
  file: ClientUploadedFileData<null> | (File & { url: string; key: string });
  fileIsDeleting?: string[];
  deleteFile: (fileKey: string) => void;
}) {
  return (
    <>
      <div className="relative flex h-44 overflow-hidden rounded-lg border-2">
        {file.type.startsWith("image") ? (
          <Image
            src={file.url}
            alt={file.name}
            width={150}
            height={150}
            style={{ width: "100%", height: "auto" }}
            sizes="20vw"
          />
        ) : file.type.startsWith("video") ? (
          <video controls>
            <source src={file.url} type={file.type} />
          </video>
        ) : file.type.startsWith("audio") ? (
          // PLACEHOLDER (?)
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-center text-sm font-semibold">{file.name}</p>
            <audio controls>
              <source src={file.url} type={file.type} />
            </audio>
          </div>
        ) : null}
        {fileIsDeleting?.includes(file.key) ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
            <Icon name="spinner" className="size-10 animate-spin" />
          </div>
        ) : null}
      </div>
      <div
        className="absolute right-0 top-0 rotate-180 scale-0 cursor-pointer rounded-full bg-destructive p-1 transition-all duration-200 hover:bg-red-600 group-hover:rotate-0 group-hover:scale-100"
        onClick={() => {
          void deleteFile(file.key);
        }}
        hidden={fileIsDeleting?.includes(file.key)}
      >
        <Icon
          name="plus"
          className="size-4 rotate-45 stroke-destructive-foreground"
        />
      </div>
    </>
  );
}
