/** Shared by the composer and API; these are character limits, not token limits. */
export const CHAT_LIMITS = {
  messages: 20,
  messageChars: 2_000,
  totalChars: 8_000,
} as const;

export type ChatMessage = { role: "user" | "assistant"; content: string };

export function parseChatMessages(payload: unknown): ChatMessage[] | null {
  if (!payload || typeof payload !== "object" || !("messages" in payload)) return null;
  const messages = payload.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > CHAT_LIMITS.messages) {
    return null;
  }

  const result: ChatMessage[] = [];
  let total = 0;
  for (const message of messages) {
    if (!message || typeof message !== "object") return null;
    const { role, content } = message;
    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string" ||
      content.trim().length === 0 ||
      content.length > CHAT_LIMITS.messageChars
    ) return null;
    total += content.length;
    if (total > CHAT_LIMITS.totalChars) return null;
    result.push({ role, content });
  }
  return result[0].role === "user" && result[result.length - 1].role === "user" ? result : null;
}

/** Keep the on-screen transcript intact while sending a recent, valid context window. */
export function boundedChatHistory(
  transcript: readonly { role: string; content: string }[]
): ChatMessage[] {
  const latest = transcript[transcript.length - 1];
  if (
    !latest || latest.role !== "user" || !latest.content.trim() ||
    latest.content.length > CHAT_LIMITS.messageChars
  ) throw new Error(`Ask a question of up to ${CHAT_LIMITS.messageChars.toLocaleString()} characters.`);

  const shortened = "\n[Earlier answer shortened for context.]";
  const recent: ChatMessage[] = [];
  let total = 0;
  for (let index = transcript.length - 1; index >= 0 && recent.length < CHAT_LIMITS.messages; index--) {
    const message = transcript[index];
    if (message.role !== "user" && message.role !== "assistant") continue;
    if (!message.content.trim()) continue;
    const content = message.role === "assistant" && message.content.length > CHAT_LIMITS.messageChars
      ? message.content.slice(0, CHAT_LIMITS.messageChars - shortened.length) + shortened
      : message.content;
    if (content.length > CHAT_LIMITS.messageChars || total + content.length > CHAT_LIMITS.totalChars) break;
    recent.unshift({ role: message.role, content });
    total += content.length;
  }
  // A retained answer without its question is misleading context.
  while (recent[0]?.role === "assistant") recent.shift();
  return recent;
}

export type ChatFailure = { kind: "validation" | "rate-limit" | "unavailable"; message: string };

export function chatFailure(status?: number, retryAfter?: string | null): ChatFailure {
  if (status === 400 || status === 413) {
    return {
      kind: "validation",
      message: "This question could not be sent. Use at most 2,000 characters, or start a new conversation.",
    };
  }
  if (status === 429) {
    const seconds = Number(retryAfter);
    const minutes = Number.isFinite(seconds) && seconds > 0 ? Math.ceil(seconds / 60) : null;
    return {
      kind: "rate-limit",
      message: `Too many questions at once. Try again ${minutes ? `in ${minutes} minute${minutes === 1 ? "" : "s"}` : "shortly"}.`,
    };
  }
  return {
    kind: "unavailable",
    message: "Chat is temporarily unavailable. Retry your question, or use email, GitHub, or the resume.",
  };
}
