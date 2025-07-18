import React, { useEffect, useRef } from "react";
import BaseDraggable from "@hydroperx/draggable";

export default function Draggable(options: {
  nodeRef: React.MutableRefObject<HTMLElement | null>;
  limitRef?: React.MutableRefObject<HTMLElement | null>;
  children?: React.ReactNode;
  disabled?: boolean;

  dragStart?: (data: DraggableData) => void;
  dragMove?: (data: DraggableData) => void;
  dragStop?: (data: DraggableData) => void;
}) {
  let {
    dragStart: drag_start,
    dragMove: drag_move,
    dragStop: drag_stop,
    limitRef: limit_ref,
    nodeRef: el_ref,
    children,
    disabled,
  } = options;

  const draggable = useRef<BaseDraggable | null>(null);

  function create_draggable() {
    draggable.current = new BaseDraggable(el_ref.current!, {
      limit: limit_ref.current ?? undefined,

      onDragStart(element, x, y, event) {
        drag_start?.({ element: element as HTMLElement, x, y });
      },

      onDrag(element, x, y, event) {
        drag_move?.({ element: element as HTMLElement, x, y });
      },

      onDragEnd(element, x, y, event) {
        drag_stop?.({ element: element as HTMLElement, x, y });
      },
    });
  }

  useEffect(() => {
    if (draggable.current)
      draggable.current!.destroy(),
      draggable.current = null;
    if (!disabled) create_draggable();

    // Cleanup
    return () => {
      if (draggable.current) draggable.current!.destroy(), draggable.current = null;
    };
  }, [disabled]);

  useEffect(() => {
    // Cleanup
    return () => {
      if (draggable.current) draggable.current!.destroy(), draggable.current = null;
    };
  }, []);

  return <>{children}</>;
}

export type DraggableData = {
  element: HTMLElement;
  x: number;
  y: number;
};