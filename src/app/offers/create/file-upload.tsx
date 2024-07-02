import { useState } from "react";
// import { useFieldArray, useFormContext } from "react-hook-form";
// import { type FormData } from "./schema";
import { Icon } from "~/components/ui/Icon/Icon";
import { trpc } from "~/app/_trpc/client";
import { motion, AnimatePresence } from "framer-motion";
import { UploadDropzone } from "~/components/uploadthing";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "~/components/ui/dialog";
import { useToast } from "~/components/ui/use-toast";
import { Button } from "~/components/ui/Button/Button";
import { type ClientUploadedFileData } from "uploadthing/types";
import { FilePreview } from "./file-preview";

export function FileUpload() {
  const { toast } = useToast();
  const [files, setfiles] = useState<ClientUploadedFileData<null>[]>([]);
  const [fileIsDeleting, setFileIsDeleting] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const deleteFilesMutation = trpc.deleteFiles.useMutation();

  const deleteFile = async (fileKey: string) => {
    setFileIsDeleting([...fileIsDeleting, fileKey]);
    deleteFilesMutation
      .mutateAsync({ fileKeys: fileKey })
      .then((success) => {
        if (success) {
          setfiles((prevfiles) =>
            prevfiles.filter((file) => file.key !== fileKey),
          );
          setFileIsDeleting((prevFileIsDeleting) =>
            prevFileIsDeleting.filter((file) => file !== fileKey),
          );
        } else {
          toast({
            title: "Wystąpił błąd",
            description: "Nie udało się usunąć pliku",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        console.log("Error deleting file", err);
        toast({
          title: "Wystąpił błąd",
          description: "Nie udało się usunąć pliku",
          variant: "destructive",
        });
      });
  };

  const deleteAll = () => {
    setFileIsDeleting(files.map((file) => file.key));
    deleteFilesMutation
      .mutateAsync({ fileKeys: files.map((file) => file.key) })
      .then((success) => {
        if (success) {
          setfiles([]);
          setFileIsDeleting([]);
        } else {
          toast({
            title: "Wystąpił błąd",
            description: "Nie udało się usunąć plików",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        console.log("Error deleting files", err);
        toast({
          title: "Wystąpił błąd",
          description: "Nie udało się usunąć plików",
          variant: "destructive",
        });
      });
  };
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center justify-center gap-2">
              <Icon name="upload" className="size-5" />
              Prześlij pliki
            </Button>
          </DialogTrigger>
          <DialogContent
            onInteractOutside={(e) => {
              if (uploading) {
                e.preventDefault();
              }
            }}
            disableClose={uploading}
          >
            <DialogTitle>Prześlij pliki</DialogTitle>
            {/* TODO customize style and text */}
            <UploadDropzone
              endpoint="fileUploader"
              onBeforeUploadBegin={(files) => {
                setUploading(true);
                return files;
              }}
              onUploadAborted={() => setUploading(false)}
              onClientUploadComplete={(success) => {
                // Do something with the successponse
                console.log("Files: ", success);
                success ? setfiles([...files, ...success]) : null;
                setDialogOpen(false);
                setUploading(false);
                // alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);

                setUploading(false);
              }}
            />
          </DialogContent>
        </Dialog>
        {files.length > 0 && (
          <Button
            onClick={deleteAll}
            className="flex w-fit items-center justify-center gap-2 px-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60"
            variant="error"
            type="button"
            disabled={fileIsDeleting.length > 0}
          >
            {fileIsDeleting.length > 0 ? (
              <Icon name="spinner" className="size-5 animate-spin" />
            ) : (
              <Icon name="trash" className="size-5" />
            )}
            Usuń wszystkie
          </Button>
        )}
      </div>

      <motion.div className="flex flex-wrap gap-4">
        <AnimatePresence initial={false}>
          {files.map((file) => (
            <motion.div
              key={file.key}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="group relative flex p-2"
              layout
            >
              <FilePreview
                file={file}
                fileIsDeleting={fileIsDeleting}
                deleteFile={deleteFile}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
