import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "@/lib/resume-context";

export const runtime = "edge";
export const maxDuration = 30;

const WINDOW_MS = 5 * 60 * 1000;
const REQUEST_LIMIT = 8;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2_000;
const MAX_TOTAL_CHARS = 8_000;
const requestsByIp = new Map<string, { count: number; resetAt: number }>();

function json(error: string, status: number, headers: HeadersInit = {}) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(req: Request) {
  const now = Date.now();
  const ip = clientIp(req);
  const current = requestsByIp.get(ip);

  if (!current || current.resetAt <= now) {
    requestsByIp.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }
  if (current.count >= REQUEST_LIMIT) {
    return Math.max(1, Math.ceil((current.resetAt - now) / 1_000));
  }
  current.count += 1;

  if (requestsByIp.size > 1_000) {
    requestsByIp.forEach((value, key) => {
      if (value.resetAt <= now) requestsByIp.delete(key);
    });
  }
  return null;
}

// OpenRouter is OpenAI-compatible. We point the OpenAI provider at OpenRouter's base URL.
const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    // Optional but recommended by OpenRouter for attribution/analytics.
    ...(process.env.OR_SITE_URL ? { "HTTP-Referer": process.env.OR_SITE_URL } : {}),
    ...(process.env.OR_APP_NAME ? { "X-Title": process.env.OR_APP_NAME } : {}),
  },
});

const MODEL = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";

export async function POST(req: Request) {
  const retryAfter = checkRateLimit(req);
  if (retryAfter) {
    return json("Too many requests. Please try again shortly.", 429, {
      "retry-after": String(retryAfter),
    });
  }

  const payload = await req.json().catch(() => null);

  if (!process.env.OPENROUTER_API_KEY) {
    return json("Chat is temporarily unavailable.", 503);
  }

  if (!payload || !Array.isArray(payload.messages) || payload.messages.length > MAX_MESSAGES) {
    return json("Invalid chat request.", 400);
  }

  const messages = payload.messages.filter(
    (message: unknown): message is { role: "user" | "assistant"; content: string } => {
      if (!message || typeof message !== "object") return false;
      const candidate = message as { role?: unknown; content?: unknown };
      return (
        (candidate.role === "user" || candidate.role === "assistant") &&
        typeof candidate.content === "string" &&
        candidate.content.length > 0 &&
        candidate.content.length <= MAX_MESSAGE_CHARS
      );
    }
  );

  const totalChars = messages.reduce((sum: number, message: { content: string }) => sum + message.content.length, 0);
  if (messages.length !== payload.messages.length || totalChars > MAX_TOTAL_CHARS) {
    return json("Invalid chat request.", 400);
  }

  try {
    const result = await streamText({
      model: openrouter(MODEL),
      system: SYSTEM_PROMPT,
      messages,
      maxTokens: 700,
      temperature: 0.5,
    });

    return result.toDataStreamResponse();
  } catch (err: unknown) {
    console.error("Portfolio chat request failed", err);
    return json("Chat is temporarily unavailable.", 502);
  }
}
