"use client";

import { useEffect, useRef, useState } from "react";
import FieldNotes from "./field-notes/FieldNotes";
import "./field-notes/field-notes.css";

const MOBILE_BREAKPOINT = 900;

export default function Home() {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const inner = innerRef.current;
    const stage = stageRef.current;
    if (!inner || !stage) return;

    const fit = () => {
      const vw = window.innerWidth;
      const isMobile = vw < MOBILE_BREAKPOINT;
      setMobile(isMobile);

      if (isMobile) {
        inner.style.transform = "none";
        inner.style.width = "100%";
        stage.style.height = "auto";
      } else {
        inner.style.width = "1440px";
        const scale = Math.min(1, vw / 1440);
        inner.style.transform = `scale(${scale})`;
        const visualHeight = inner.offsetHeight * scale;
        stage.style.height = visualHeight + "px";
      }
    };
    fit();
    window.addEventListener("resize", fit);
    const ro = new ResizeObserver(fit);
    ro.observe(inner);
    return () => {
      window.removeEventListener("resize", fit);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      id="fn-stage"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflow: "hidden",
        background: "#e6e2d8",
      }}
    >
      <div
        ref={innerRef}
        id="fn-stage-inner"
        style={{
          width: 1440,
          flexShrink: 0,
          transformOrigin: "top center",
        }}
      >
        <div style={{ width: "100%", background: "#f6efe0" }}>
          <FieldNotes mobile={mobile} />
        </div>
      </div>
    </div>
  );
}
