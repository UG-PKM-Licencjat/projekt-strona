import { type ClientUploadedFileData } from "uploadthing/types";
import Image from "next/image";
import { PlayCircleIcon } from "lucide-react";
import { Icon } from "~/components/ui/Icon/Icon";

export function FilePreview({
  file,
  deleteFile,
}: {
  file: ClientUploadedFileData<null> | (File & { url: string; key: string });
  deleteFile: (fileKey: string) => void;
}) {
  return (
    <>
      <div
        className="relative flex aspect-square h-52 overflow-hidden rounded-lg border-2 border-neo-gray-hover"
        onClick={(e) => e.stopPropagation()}
      >
        {file.type.startsWith("image") ? (
          // TODO make image same as video - I give up for now...
          <div className="grid h-full w-full [&>*]:col-start-1 [&>*]:row-start-1">
            {/* <Image
              src={file.url}
              alt={file.name}
              width={150}
              height={150}
              sizes="20vw"
              className="absolute z-30 object-contain"
            /> */}
            <div className="flex h-full w-full">
              <Image
                src={file.url}
                alt={file.name}
                width={150}
                height={150}
                sizes="20vw"
                className="object-fill blur-lg"
              />
            </div>
          </div>
        ) : file.type.startsWith("video") ? (
          <div className="grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1">
            <video className="h-full w-full object-fill blur-lg">
              <source src={file.url} type={file.type} />
            </video>
            <div className="z-30 flex items-center justify-center">
              <PlayCircleIcon className="text-neo-black size-10" />
            </div>
            <video className="z-20 object-contain">
              <source src={file.url} type={file.type} />
            </video>
          </div>
        ) : file.type.startsWith("audio") ? (
          // PLACEHOLDER (?)
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-center text-sm font-semibold">{file.name}</p>
            <audio controls>
              <source src={file.url} type={file.type} />
            </audio>
          </div>
        ) : null}
      </div>
      <div
        className="absolute right-0 top-0 rotate-180 scale-0 cursor-pointer rounded-full bg-neo-pink p-1 transition-all duration-200 hover:bg-neo-pink-hover group-hover:rotate-0 group-hover:scale-100"
        onClick={(e) => {
          e.stopPropagation();
          void deleteFile(file.key);
        }}
      >
        <Icon name="plus" className="size-4 rotate-45 text-neo-gray" />
      </div>
    </>
  );
}
