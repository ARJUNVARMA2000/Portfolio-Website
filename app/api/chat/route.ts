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

const MODEL = process.env.OPENROUTER_MODEL ?? "openai/gpt-5.2";

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!process.env.OPENROUTER_API_KEY) {
    return new Response(
      JSON.stringify({
        error:
          "Missing OPENROUTER_API_KEY. Set it in .env.local (dev) or your hosting provider env vars (prod).",
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }

  const result = await streamText({
    model: openrouter(MODEL),
    system: SYSTEM_PROMPT,
    messages,
    maxTokens: 700,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}
