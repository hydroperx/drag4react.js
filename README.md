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

## Setting property to translate

The library uses `inset` or `left` and `top` for moving elements. If on drag stop you wish to change that, set the option `finishParent` to a parent and `finish="translate"` (for the cascading `translate` property), or `finish="transform"` (for the cascading `transform` property using the `translate()` function), or `finish="position"` (for the cascading `left` and `top` properties).

*Important*: You may also want to use cascading `rem` units for the finishing position; therefore, you may need to pass the option `rem={size}`.