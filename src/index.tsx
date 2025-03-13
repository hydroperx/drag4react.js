import React, { useEffect, Ref } from "react";
import ext_Draggable from "draggable";
import $ from "jquery";

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
        limit,
        element: el_ref,
        children,
        disabled,
        finish,
        rem,
    } = options;

    let draggable: ext_Draggable | null = null;

    function createDraggable()
    {
        draggable = new ext_Draggable(el_ref.current!, {
            limit,

            onDragStart(element, x, y, event) {
                drag_start?.({ element: element as HTMLElement, x, y });
            },

            onDrag(element, x, y, event) {
                drag_move?.({ element: element as HTMLElement, x, y });
            },

            onDragEnd(element, x, y, event) {
                if (limit)
                {
                    if (finish === "translate")
                    {
                        (element as HTMLElement).style.inset = "";
                        const offsets = utils.getElementRelativeOffset(element, limit);
                        let x = offsets.left + "px";
                        let y = offsets.top + "px";
                        if (rem !== undefined)
                        {
                            x = (offsets.left / rem) + "rem";
                            y = (offsets.top / rem) + "rem";
                        }
                        (element as HTMLElement).style.translate = `${x} ${y}`;
                    }
                    else if (finish === "transform")
                    {
                        (element as HTMLElement).style.inset = "";
                        const offsets = utils.getElementRelativeOffset(element, limit);
                        let x = offsets.left + "px";
                        let y = offsets.top + "px";
                        if (rem !== undefined)
                        {
                            x = (offsets.left / rem) + "rem";
                            y = (offsets.top / rem) + "rem";
                        }
                        (element as HTMLElement).style.transform = `translate(${x}, ${y})`;
                    }
                    else if (finish === "position")
                    {
                        (element as HTMLElement).style.inset = "";
                        const offsets = utils.getElementRelativeOffset(element, limit);
                        let x = offsets.left + "px";
                        let y = offsets.top + "px";
                        if (rem !== undefined)
                        {
                            x = (offsets.left / rem) + "rem";
                            y = (offsets.top / rem) + "rem";
                        }
                        (element as HTMLElement).style.left = x;
                        (element as HTMLElement).style.left = y;
                    }
                }
                drag_stop?.({ element: element as HTMLElement, x, y });
            },
        });
    }

    useEffect(() => {
        if (!disabled)
        {
            if (draggable) draggable.destroy();
            createDraggable();
        }

        // Cleanup
        return () => {
            if (draggable) draggable.destroy(), draggable = null;
        };
    }, [disabled, finish, limit, rem]);

    useEffect(() => {
        // Cleanup
        return () => {
            if (draggable) draggable.destroy(), draggable = null;
        };
    }, []);

    return (<>
        {children}
    </>);
}

export type DraggableOptions = {
    element: React.MutableRefObject<HTMLElement>,
    limit?: HTMLElement,
    children?: React.ReactNode,
    disabled?: boolean,
    finish?: "translate" | "transform" | "position",
    rem?: number,

    dragStart?: (data: DraggableData) => void,
    dragMove?: (data: DraggableData) => void,
    dragStop?: (data: DraggableData) => void,
};

export type DraggableData = {
    element: HTMLElement,
    x: number,
    y: number,
};

export const utils = {
    getElementRelativeOffset(element: Element, reference: Element): { left: number, top: number }
    {
        const a = $(element).offset();
        const b = $(reference).offset();
        return {
            left: Math.round(a.top - b.top),
            top: Math.round(a.top - b.top),
        };
    }
};