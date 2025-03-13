# Draggable

<p align="center">
  <a href="https://jsr.io/@hydroper/draggable"><img src="https://img.shields.io/jsr/v/@hydroper/metrocomponents"></a>
  <a href="https://jsr.io/@hydroper/draggable/doc"><img src="https://img.shields.io/badge/API%20Documentation-gray"></a>
</p>

Drag-n-drop for React.

## Getting started

```tsx
import Draggable from "@hydroper/draggable";
import { useRef } from "react";

function Content()
{
    const div_ref = useRef<HTMLDivElement | null>(null);
    return (
        <Draggable element={div_ref}>
            <div ref={div_ref}>
                Drag me
            </div>
        </Draggable>
    );
}
```

## Resulting property values

The library as part of the `draggable` dependency uses `inset` for moving elements.