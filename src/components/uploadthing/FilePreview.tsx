import { FileImageIcon, FileVideoIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { type ClientUploadedFileData } from "uploadthing/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export function FilePreview({
  file,
  deleteFile,
}: {
  file: ClientUploadedFileData<null> | (File & { url: string; key: string });
  deleteFile: (fileKey: string) => void;
}) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="button">
            <div
              className="relative flex aspect-square h-32 place-items-center overflow-hidden rounded-lg border-2 border-neo-gray-hover sm:h-36"
              onClick={(e) => e.stopPropagation()}
            >
              {file.type.startsWith("image") ? (
                <div className="relative flex h-full w-full">
                  <Image
                    src={file.url}
                    alt={file.name}
                    width={150}
                    height={150}
                    sizes="20vw"
                    className="absolute z-10 h-full w-full object-contain"
                  />
                  <Image
                    src={file.url}
                    alt={file.name}
                    width={150}
                    height={150}
                    style={{ width: "100%", height: "auto" }}
                    sizes="20vw"
                    className="h-full w-full object-fill blur-lg"
                  />
                  <div className="absolute bottom-2 left-2 z-30">
                    <FileImageIcon className="size-7 text-neo-mantis" />
                  </div>
                </div>
              ) : file.type.startsWith("video") ? (
                <div className="grid h-full w-full place-items-center [&>*]:col-start-1 [&>*]:row-start-1">
                  <video className="h-full w-full object-fill blur-lg">
                    <source src={file.url} type={file.type} />
                  </video>
                  <div className="z-30 flex items-center justify-center place-self-start self-end p-2">
                    <FileVideoIcon className="size-7 text-neo-mantis" />
                  </div>
                  <video className="z-20 object-contain">
                    <source src={file.url} type={file.type} />
                  </video>
                </div>
              ) : file.type.startsWith("audio") ? (
                // PLACEHOLDER (?)
                <div className="flex flex-col items-center justify-center gap-2">
                  <p className="text-center text-sm font-semibold">
                    {file.name}
                  </p>
                  <audio controls>
                    <source src={file.url} type={file.type} />
                  </audio>
                </div>
              ) : null}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="text-base">{file.name}</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div
        className="absolute -right-1 -top-1 z-30 cursor-pointer rounded-full bg-neo-pink p-2 transition-all duration-200 hover:bg-neo-pink-hover group-hover:rotate-0 group-hover:scale-100 lg:rotate-180 lg:scale-0"
        onClick={(e) => {
          e.stopPropagation();
          void deleteFile(file.key);
        }}
        data-no-dnd
      >
        <XIcon className="size-5 text-neo-gray" />
      </div>
    </>
  );
}
