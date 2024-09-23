import { EyeIcon } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export function OfferFilePreview({
  file,
}: {
  file: { url: string; type: string };
}) {
  return (
    <>
      <div
        className="flex h-44 overflow-hidden rounded-lg border-2 border-neo-gray-hover sm:h-36"
        onClick={(e) => e.stopPropagation()}
      >
        {file.type.startsWith("image") ? (
          <div className="relative flex h-full w-full">
            <Image
              src={file.url}
              alt={file.url}
              width={150}
              height={150}
              sizes="20vw"
              className="h-full w-full object-contain"
            />
            <Dialog>
              <DialogTrigger>
                <div className="absolute left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-black/30 text-white opacity-0 transition-all hover:opacity-100">
                  <EyeIcon className="size-7 text-white" />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Zdjęcie</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <Image
                  src={file.url}
                  alt={file.url}
                  width={150}
                  height={150}
                  sizes="20vw"
                  className="h-full w-full rounded-md object-contain"
                />
              </DialogContent>
            </Dialog>
          </div>
        ) : file.type.startsWith("video") ? (
          <video controls>
            <source src={file.url} type={file.type} />
          </video>
        ) : file.type.startsWith("audio") ? (
          // PLACEHOLDER (?)
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-center text-sm font-semibold">{file.url}</p>
            <audio controls>
              <source src={file.url} type={file.type} />
            </audio>
          </div>
        ) : null}
      </div>
    </>
  );
}
