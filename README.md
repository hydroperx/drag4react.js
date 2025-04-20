# Drag for React

Drag-n-drop for React.

## Getting started

```tsx
import Draggable from "@hydroper/drag4react";
import { useRef } from "react";

function Content()
{
    const div_ref = useRef<HTMLDivElement | null>(null);
    return (
        <Draggable nodeRef={div_ref}>
            <div ref={div_ref}>
                Drag me
            </div>
        </Draggable>
    );
}
```

## Resulting property values

The library as part of the `draggable` dependency uses `inset` for moving elements.