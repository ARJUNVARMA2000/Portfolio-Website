"use client";

import { useEffect, useState } from "react";
import FieldNotes from "./field-notes/FieldNotes";
import "./field-notes/field-notes.css";

const MOBILE_BREAKPOINT = 900;

export default function Home() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      id="fn-stage"
      style={{
        position: "relative",
        background: "#f6efe0",
        minHeight: "100vh",
      }}
    >
      <FieldNotes mobile={mobile} />
    </div>
  );
}
