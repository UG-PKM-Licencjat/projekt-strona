import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
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
import { getRouteConfig, PreviewDropzone } from "~/components/uploadthing";

import { useFormContext } from "react-hook-form";
import { KeyboardSensor, PointerSensor } from "~/components/Sortable/sensors";
import { type ArtistFormData } from "~/lib/artistSchema";
import { useFileStore } from "~/stores/fileStore";
import CustomError from "~/components/Form/CustomError";

export default function Step4() {
  // TODO this lags on every render, figure out why
  const { setValue, trigger } = useFormContext<ArtistFormData>();
  const {
    previewFiles,
    files,
    touched,
    setFiles,
    setPreviewFiles,
    removeFile,
  } = useFileStore();

  useEffect(() => {
    setValue("files", previewFiles);
    if (touched) void trigger("files");
  }, [previewFiles, setValue, touched, trigger]);

  const routeConfig = getRouteConfig("galleryUploader");

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
        items={previewFiles.map((file) => file.key)}
        strategy={rectSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          <PreviewDropzone
            files={previewFiles}
            setFiles={setFiles}
            removeFile={removeFile}
            routeConfig={routeConfig}
            showUploadButton={false}
            className="w-full"
            disabled={previewFiles.length >= 5}
          />
          <CustomError name="files" />
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragStart(_event: DragStartEvent) {
    setIsDragging(true);
  }

  function handleDragCancel() {
    setIsDragging(false);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setPreviewFiles((files) => {
        const oldIndex = files.findIndex((file) => file.key === active?.id);
        const newIndex = files.findIndex((file) => file.key === over?.id);

        return arrayMove(files, oldIndex, newIndex);
      });
    }
    setIsDragging(false);
  }
}
