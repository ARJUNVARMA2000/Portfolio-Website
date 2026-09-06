import { expect, test, type Page } from "@playwright/test";

const DEFAULT_RESPONSE = [
  "Read [DEUCE](/work/deuce-tennis-forecast) and ",
  "https://example.com/docs. Unsafe javascript:alert(1) and /work/not-real.",
];

type ChatRequest = { messages: { role: string; content: string }[] };

async function installChatStream(page: Page, responseParts = DEFAULT_RESPONSE, delayMs = 420) {
  await page.addInitScript(({ parts, delay }: { parts: string[]; delay: number }) => {
    const originalFetch = window.fetch.bind(window);
    const requests: ChatRequest[] = [];
    Object.defineProperty(window, "chatTestRequests", { value: requests });
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (!url.endsWith("/api/chat")) return originalFetch(input, init);
      requests.push(JSON.parse(String(init?.body)));

      const encoder = new TextEncoder();
      const chunks = [
        ...parts.map((part) => `0:${JSON.stringify(part)}\n`),
        `d:${JSON.stringify({ finishReason: "stop", usage: { promptTokens: 1, completionTokens: 1 } })}\n`,
      ];
      let index = 0;
      const body = new ReadableStream<Uint8Array>({
        start(controller) {
          const send = () => {
            if (index >= chunks.length) {
              controller.close();
              return;
            }
            controller.enqueue(encoder.encode(chunks[index++]));
            window.setTimeout(send, delay);
          };
          window.setTimeout(send, delay ? 380 : 0);
        },
      });
      return new Response(body, {
        status: 200,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "x-vercel-ai-data-stream": "v1",
        },
      });
    };
  }, { parts: responseParts, delay: delayMs });
}

async function installChatError(page: Page, status = 503, recover = false, streamFailure = false) {
  await page.addInitScript(({ errorStatus, recoverAfterError, failDuringStream }) => {
    const originalFetch = window.fetch.bind(window);
    let calls = 0;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (!url.endsWith("/api/chat")) return originalFetch(input, init);
      calls++;
      if (recoverAfterError && calls > 1) {
        return new Response('0:"Recovered answer."\nd:{"finishReason":"stop","usage":{"promptTokens":1,"completionTokens":1}}\n', {
          headers: { "content-type": "text/plain", "x-vercel-ai-data-stream": "v1" },
        });
      }
      if (failDuringStream) {
        const encoder = new TextEncoder();
        const body = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(encoder.encode('0:"An incomplete answer"\n'));
            window.setTimeout(() => {
              controller.enqueue(encoder.encode('3:"Provider stream failed"\n'));
              controller.close();
            }, 250);
          },
        });
        return new Response(body, {
          headers: { "content-type": "text/plain", "x-vercel-ai-data-stream": "v1" },
        });
      }
      return new Response("request failed", { status: errorStatus, headers: { "retry-after": "90" } });
    };
  }, { errorStatus: status, recoverAfterError: recover, failDuringStream: streamFailure });
}

async function openAsk(page: Page) {
  await page.waitForFunction(() => document.documentElement.dataset.chatReady === "true");
  const trigger = page.locator("header").getByRole("button", { name: /ask/i });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "arjun@portfolio — ask" });
  await expect(dialog).toBeVisible();
  return { dialog, trigger };
}

test.describe("Ask terminal", () => {
  test("streams an elapsed state, then exposes only safe links and known sources", async ({ page }) => {
    await installChatStream(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const { dialog } = await openAsk(page);
    await dialog
      .getByRole("group", { name: "Suggested questions" })
      .getByRole("button", { name: /strongest proof/i })
      .click();

    await expect(dialog.getByRole("status")).toContainText("preparing answer");
    await expect(dialog.getByRole("status")).toContainText("streaming answer", { timeout: 1_200 });
    const sourceGroup = dialog.getByRole("group", { name: "Case-study sources" });
    await expect(sourceGroup).toBeVisible({ timeout: 3_000 });
    await expect(sourceGroup.getByRole("link", { name: "DEUCE Tennis Forecast" })).toHaveCount(1);
    await expect(dialog.locator('a[href="https://example.com/docs"]')).toHaveCount(1);
    await expect(dialog.locator('a[href^="javascript:"]')).toHaveCount(0);
    await expect(dialog.locator('a[href="/work/not-real"]')).toHaveCount(0);
    await expect(dialog.getByRole("group", { name: "Follow-up questions" })).toBeVisible();

    await sourceGroup.getByRole("link", { name: "DEUCE Tennis Forecast" }).click();
    await expect(page).toHaveURL(/\/work\/deuce-tennis-forecast$/);
    await expect(dialog).toHaveCount(0);
  });

  test("uses case-aware prompts and restores focus after Escape", async ({ page }) => {
    await page.goto("/work/deuce-tennis-forecast", { waitUntil: "domcontentloaded" });
    const { dialog, trigger } = await openAsk(page);
    const suggestions = dialog.getByRole("group", { name: "Suggested questions" });
    await expect(suggestions).toContainText("What problem did DEUCE Tennis Forecast solve?");
    await expect(suggestions).toContainText("What did Arjun personally build on DEUCE Tennis Forecast?");
    await expect(dialog.getByRole("textbox", { name: "Ask a question about Arjun Varma" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("announces provider failures and retries without duplicating the question", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "One error-announcement contract is sufficient");
    await installChatError(page, 503, true);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const { dialog } = await openAsk(page);
    await dialog
      .getByRole("group", { name: "Suggested questions" })
      .getByRole("button", { name: /strongest proof/i })
      .click();
    await expect(dialog.getByRole("alert")).toContainText("Chat is temporarily unavailable");
    await expect(dialog.getByRole("group", { name: "Follow-up questions" })).toHaveCount(0);
    await expect(dialog.locator('[data-chat-message="user"]')).toHaveCount(1);
    await dialog.getByRole("button", { name: "Retry question" }).click();
    await expect(dialog.locator('[data-chat-message="assistant"]')).toHaveText("Recovered answer.");
    await expect(dialog.locator('[data-chat-message="user"]')).toHaveCount(1);
    await expect(dialog.getByRole("alert")).toHaveCount(0);
  });

  test("recovers when a stream fails after HTTP 200 and a partial answer", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "One streaming failure contract is sufficient");
    await installChatError(page, 200, true, true);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const { dialog } = await openAsk(page);
    const input = dialog.getByRole("textbox", { name: "Ask a question about Arjun Varma" });
    await input.fill("What is the strongest evidence?");
    await input.press("Enter");
    await expect(dialog.getByRole("alert")).toContainText("Chat is temporarily unavailable");
    await expect(dialog.locator('[data-chat-message="assistant"]')).toHaveText("An incomplete answer");
    await expect(dialog.getByRole("group", { name: "Follow-up questions" })).toHaveCount(0);
    await expect(input).toBeEnabled();
    await dialog.getByRole("button", { name: "Retry question" }).click();
    await expect(dialog.locator('[data-chat-message="assistant"]')).toHaveText("Recovered answer.");
    await expect(dialog.locator('[data-chat-message="user"]')).toHaveCount(1);
    await expect(dialog.getByRole("alert")).toHaveCount(0);
  });

  for (const failure of [
    { status: 400, message: "This question could not be sent" },
    { status: 429, message: "Try again in 2 minutes" },
  ]) {
    test(`explains ${failure.status} errors and allows a new conversation`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-chromium", "One recovery contract is sufficient");
      await installChatError(page, failure.status);
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const { dialog } = await openAsk(page);
      const input = dialog.getByRole("textbox", { name: "Ask a question about Arjun Varma" });
      await input.fill("What did Arjun build?");
      await input.press("Enter");
      await expect(dialog.getByRole("alert")).toContainText(failure.message);
      await dialog.getByRole("button", { name: "Start a new conversation" }).click();
      await expect(dialog.locator("[data-chat-message]")).toHaveCount(0);
      await expect(dialog.getByRole("alert")).toHaveCount(0);
      await expect(dialog.getByRole("group", { name: "Suggested questions" })).toBeVisible();
      await expect(input).toBeFocused();
    });
  }

  test("bounds submitted history while preserving a long visible conversation", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "One request-window contract is sufficient");
    await installChatStream(page, ["A concise answer with a source."], 0);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const { dialog } = await openAsk(page);
    const input = dialog.getByRole("textbox", { name: "Ask a question about Arjun Varma" });
    for (let index = 1; index <= 12; index++) {
      await expect(input).toBeEnabled();
      await input.fill(`Question ${index}: what does the evidence show?`);
      await input.press("Enter");
      await expect(dialog.locator('[data-chat-message="assistant"]')).toHaveCount(index);
    }
    await expect(dialog.locator("[data-chat-message]")).toHaveCount(24);
    await expect(dialog.locator('[data-chat-message="user"]').first()).toContainText("Question 1:");
    const requests = await page.evaluate(() => Reflect.get(window, "chatTestRequests") as ChatRequest[]);
    expect(requests).toHaveLength(12);
    for (const { messages } of requests) {
      expect(messages.length).toBeLessThanOrEqual(20);
      expect(messages.every(({ content }) => content.length <= 2_000)).toBe(true);
      expect(messages.reduce((total, { content }) => total + content.length, 0)).toBeLessThanOrEqual(8_000);
    }
    expect(requests.at(-1)?.messages.at(-1)?.content).toContain("Question 12:");
    await dialog.getByRole("button", { name: "Start a new conversation" }).click();
    await expect(dialog.locator("[data-chat-message]")).toHaveCount(0);
    await expect(input).toBeFocused();
    await input.fill("A fresh conversation");
    await input.press("Enter");
    await expect(dialog.locator('[data-chat-message="assistant"]')).toHaveCount(1);
    const afterReset = await page.evaluate(() => Reflect.get(window, "chatTestRequests") as ChatRequest[]);
    expect(afterReset.at(-1)?.messages).toEqual([{ role: "user", content: "A fresh conversation" }]);
  });

  test("explains the input limit without silently truncating a pasted question", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "One composer-length contract is sufficient");
    await installChatStream(page, ["Answer received."], 0);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const { dialog } = await openAsk(page);
    const input = dialog.getByRole("textbox", { name: "Ask a question about Arjun Varma" });
    await input.fill("Original question");
    await input.evaluate((element) => {
      const clipboardData = new DataTransfer();
      clipboardData.setData("text", "x".repeat(2_001));
      element.dispatchEvent(new ClipboardEvent("paste", { clipboardData, bubbles: true, cancelable: true }));
    });
    await expect(dialog.locator("#ask-terminal-input-hint")).toContainText("That paste exceeds 2,000 characters");
    await expect(input).toHaveValue("Original question");
    await input.fill("x".repeat(2_000));
    await expect(dialog.locator("#ask-terminal-input-hint")).toContainText("limit reached");
    await input.press("End");
    await input.press("x");
    await expect(input).toHaveValue("x".repeat(2_000));
    await input.fill("A shorter question");
    await input.press("Enter");
    await expect(dialog.locator('[data-chat-message="assistant"]')).toHaveText("Answer received.");
  });

  test("keeps long answers scrollable and closes same-page citations without reloading", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "One nested-scroll contract is sufficient");
    const longAnswer = `${Array.from(
      { length: 70 },
      (_, index) => `Evidence line ${String(index + 1).padStart(2, "0")} stays inside the transcript.`
    ).join("\n")}\nRead [the overview](/work/deuce-tennis-forecast) or [the evidence](/work/deuce-tennis-forecast#evidence).`;
    await installChatStream(page, [longAnswer]);
    await page.goto("/work/deuce-tennis-forecast", { waitUntil: "domcontentloaded" });
    const { dialog } = await openAsk(page);
    await dialog
      .getByRole("group", { name: "Suggested questions" })
      .getByRole("button", { name: /what problem/i })
      .click();

    const overview = dialog.getByRole("link", { name: "the overview" });
    await expect(overview).toBeVisible({ timeout: 3_000 });
    await expect(dialog).toHaveAttribute("data-lenis-prevent", "true");
    const transcript = dialog.locator("[data-chat-transcript]");
    await expect
      .poll(() => transcript.evaluate((element) => element.scrollHeight > element.clientHeight))
      .toBe(true);
    await transcript.evaluate((element) => {
      element.scrollTop = 0;
    });
    const pageScrollBefore = await page.evaluate(() => window.scrollY);
    await page.mouse.move(4, 4);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(100);
    expect(await page.evaluate(() => window.scrollY)).toBe(pageScrollBefore);
    await transcript.hover();
    await page.mouse.wheel(0, 500);
    await expect.poll(() => transcript.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
    expect(await page.evaluate(() => window.scrollY)).toBe(pageScrollBefore);

    const input = dialog.getByRole("textbox", { name: "Ask a question about Arjun Varma" });
    await input.fill("What is the main limitation?");
    await input.press("Enter");
    await expect(input).toBeEnabled({ timeout: 3_000 });
    await expect(dialog.locator('[data-chat-message="assistant"]')).toHaveCount(2);
    await expect(dialog.locator('[data-chat-message="assistant"]').first()).toContainText("Evidence line 70");
    const requests = await page.evaluate(() => Reflect.get(window, "chatTestRequests") as ChatRequest[]);
    expect(requests.at(-1)?.messages.every(({ content }) => content.length <= 2_000)).toBe(true);

    const currentUrl = page.url();
    await overview.first().click();
    await expect(dialog).toHaveCount(0);
    expect(page.url()).toBe(currentUrl);

    const reopened = (await openAsk(page)).dialog;
    await reopened.getByRole("link", { name: "the evidence" }).first().click();
    await expect(page).toHaveURL(/\/work\/deuce-tennis-forecast#evidence$/);
    await expect(reopened).toHaveCount(0);
  });

  test("keeps the mobile composer and controls usable at 320px", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-safari", "Mobile sizing contract");
    await installChatStream(page, [`See https://example.com/${"x".repeat(500)}`]);
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const { dialog } = await openAsk(page);
    const input = dialog.getByRole("textbox", { name: "Ask a question about Arjun Varma" });
    await expect(input).toHaveCSS("font-size", "16px");
    await expect(dialog.locator("[data-term-title]")).toHaveText("arjun@portfolio — ask");
    const touchTargets = dialog.locator(
      'button[aria-label="Close portfolio chat"], button[aria-label="Start a new conversation"], button[type="submit"], [aria-label="Suggested questions"] button'
    );
    await expect
      .poll(() =>
        touchTargets.evaluateAll((elements) =>
          elements.every((element) => element.getBoundingClientRect().height >= 44)
        )
      )
      .toBe(true);
    await input.fill(`what about ${"unbroken".repeat(35)}`);
    await input.press("Enter");
    await expect(dialog.locator('a[href^="https://example.com/"]')).toHaveCount(1, { timeout: 3_000 });
    const overflow = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      dialog: document.querySelector<HTMLElement>('[role="dialog"]')!.scrollWidth - window.innerWidth,
    }));
    expect(overflow.document).toBeLessThanOrEqual(1);
    expect(overflow.dialog).toBeLessThanOrEqual(0);
  });
});
