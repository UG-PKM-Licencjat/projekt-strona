import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { PreviewDropzone, useUploadThing } from "~/components/uploadthing";

import { useFormContext } from "react-hook-form";
import { KeyboardSensor, PointerSensor } from "~/components/Sortable/sensors";
import { ArtistFormData } from "~/lib/artistSchema";
import { useFileStore } from "~/stores/fileStore";
import { ErrorMessage } from "@hookform/error-message";
import CustomError from "./CustomError";

export default function Step4() {
  // TODO this lags on every render, figure out why
  const {
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<ArtistFormData>();
  const { files, touched, setFiles } = useFileStore();

  useEffect(() => {
    setValue("files", files);
    if (touched) trigger("files");
  }, [files]);

  const { startUpload, routeConfig, isUploading } =
    useUploadThing("galleryUploader");

  // Useful for onDrag overlays and animations
  const [isDragging, setIsDragging] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={files.map((file) => file.key)}
        strategy={rectSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          <PreviewDropzone
            files={files}
            setFiles={setFiles}
            routeConfig={routeConfig}
            startUpload={startUpload}
            isUploading={isUploading}
            showUploadButton={true}
            className="w-full"
          />
          <CustomError name="files" />
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    setIsDragging(true);
  }

  function handleDragCancel() {
    setIsDragging(false);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setFiles((files) => {
        const oldIndex = files.findIndex((file) => file.key === active?.id);
        const newIndex = files.findIndex((file) => file.key === over?.id!);

        return arrayMove(files, oldIndex, newIndex);
      });
    }
    setIsDragging(false);
  }
}
