import { createRoot } from "react-dom/client";
import { useEffect, useRef, useState } from "react";
import Draggable from "@hydroperx/drag4react";

function App() {
  const drag_area_ref = useRef<HTMLDivElement | null>(null);
  const draggable_div_ref = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div style={{ width: "200px", height: "200px", background: "red" }} ref={drag_area_ref}>
        <Draggable
          nodeRef={draggable_div_ref}
          limitRef={drag_area_ref}>

          <div
            ref={draggable_div_ref}
            style={{ width: "100px", height: "100px", background: "orange" }}>
          </div>
        </Draggable>
      </div>
    </>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);