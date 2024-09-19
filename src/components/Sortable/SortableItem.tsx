import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type UniqueIdentifier } from "@dnd-kit/core";

export function SortableItem({
  children,
  sortId,
  ...props
}: React.ComponentProps<"div"> & { sortId: UniqueIdentifier }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: sortId });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      {...props}
    >
      {children}
    </div>
  );
}
