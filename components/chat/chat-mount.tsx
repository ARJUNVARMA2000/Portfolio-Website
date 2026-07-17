"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAskTerminal } from "./use-ask-terminal";

const AskTerminal = dynamic(
  () => import("./ask-terminal").then((module) => module.AskTerminal),
  { ssr: false }
);

export function ChatMount() {
  const [open, setOpen] = useAskTerminal();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (open) setLoaded(true);
  }, [open]);

  return loaded ? <AskTerminal open={open} onClose={() => setOpen(false)} /> : null;
}
