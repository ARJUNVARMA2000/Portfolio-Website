"use client";

import { AskTerminal } from "./ask-terminal";
import { useAskTerminal } from "./use-ask-terminal";

export function ChatMount() {
  const [open, setOpen] = useAskTerminal();
  return <AskTerminal open={open} onClose={() => setOpen(false)} />;
}
