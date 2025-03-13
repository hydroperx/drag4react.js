import React, { useEffect, Ref } from "react";
import ext_Draggable from "draggable";

const at_browser = typeof window !== "undefined";

let pointerMoveHandlers = [];
function window_onPointerMove(e: PointerEvent): void
{
    for (const handler of pointerMoveHandlers)
    {
        handler(e);
    }
}
window.addEventListener("pointermove", window_onPointerMove);

let pointerUpHandlers = [];
function window_onPointerUp(e: PointerEvent): void
{
    for (const handler of pointerUpHandlers)
    {
        handler(e);
    }
}
window.addEventListener("pointerup", window_onPointerUp);
window.addEventListener("pointercancel", window_onPointerUp);

export default function Draggable(options: DraggableOptions)
{
    let {
        dragStart: drag_start,
        dragMove: drag_move,
        dragStop: drag_stop,
        offsetParent: offset_parent,
        element: el_ref,
        children,
        disabled,
    } = options;

    let draggable: ext_Draggable | null = null;

    useEffect(() => {
        if (!disabled)
        {
            if (draggable) draggable.destroy();

            draggable = new ext_Draggable(el_ref.current!, {
                limit: offset_parent,

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

        // Cleanup
        return () => {
            if (draggable) draggable.destroy();
        };
    }, []);

    return (<>
        {children}
    </>);
}

export type DraggableOptions = {
    element: React.MutableRefObject<HTMLElement>,
    offsetParent?: HTMLElement,
    children?: React.ReactNode,
    disabled?: boolean,

    dragStart?: (data: DraggableData) => void,
    dragMove?: (data: DraggableData) => void,
    dragStop?: (data: DraggableData) => void,
};

export type DraggableData = {
    element: HTMLElement,
    x: number,
    y: number,
};