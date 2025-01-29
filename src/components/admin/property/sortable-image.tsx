import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "@/components/ui/button"

interface SortableImageProps {
  id: string
  url: string
  onDelete: () => void
}

export function SortableImage({ id, url, onDelete }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative">
      <img
        src={url || "/placeholder.svg"}
        alt={`Uploaded ${id}`}
        className="w-full h-32 object-cover rounded"
      />
      <Button
        type="button"
        variant="destructive"
        size="sm"
        className="absolute top-0 right-0 m-1"
        onClick={onDelete}
      >
        Delete
      </Button>
    </div>
  )
}
