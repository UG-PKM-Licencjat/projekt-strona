import {
  type CustomFile,
  PreviewDropzone,
  useUploadThing,
} from "~/components/uploadthing";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { PointerSensor, KeyboardSensor } from "~/components/Sortable/sensors";

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
