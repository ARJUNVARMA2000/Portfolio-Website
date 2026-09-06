"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useAskTerminal } from "./use-ask-terminal";

const AskTerminal = dynamic(
  () => import("./ask-terminal").then((module) => module.AskTerminal),
  { ssr: false }
);

export function ChatMount() {
  const [open, setOpen] = useAskTerminal();
  const [loaded, setLoaded] = useState(false);

  // Keep the terminal mounted after its first opening so closing preserves the chat.
  if (open && !loaded) setLoaded(true);

  return loaded ? <AskTerminal open={open} onClose={() => setOpen(false)} /> : null;
}
