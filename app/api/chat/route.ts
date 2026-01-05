import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { SYSTEM_PROMPT } from "@/lib/resume-context";

export const runtime = "edge";

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
  const { messages } = await req.json().catch(() => ({ messages: [] }));

  if (!process.env.OPENROUTER_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Missing OPENROUTER_API_KEY. Set it in .env.local (dev) or your hosting provider env vars (prod).",
      }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  if (!Array.isArray(messages)) {
    return new Response(
      JSON.stringify({
        error: "Invalid request body: expected { messages: [...] }",
      }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
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
    const message =
      err instanceof Error ? err.message : "Unknown error while generating chat response.";

    const status =
      typeof message === "string" && message.toLowerCase().includes("unauthorized")
        ? 401
        : 500;

    return new Response(
      JSON.stringify({
        error: message,
        hint:
          status === 401
            ? "Your OpenRouter key/model may be invalid. Check OPENROUTER_API_KEY and OPENROUTER_MODEL."
            : "See server logs for details.",
      }),
      { status, headers: { "content-type": "application/json" } }
    );
  }
}
