import { expect, test, type Page } from "@playwright/test";

const DEFAULT_RESPONSE = [
  "Read [DEUCE](/work/deuce-tennis-forecast) and ",
  "https://example.com/docs. Unsafe javascript:alert(1) and /work/not-real.",
];

async function installChatStream(page: Page, responseParts = DEFAULT_RESPONSE) {
  await page.addInitScript((parts: string[]) => {
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (!url.endsWith("/api/chat")) return originalFetch(input, init);

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
            window.setTimeout(send, 420);
          };
          window.setTimeout(send, 380);
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
  }, responseParts);
}

async function installChatError(page: Page) {
  await page.addInitScript(() => {
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (!url.endsWith("/api/chat")) return originalFetch(input, init);
      return new Response("temporarily unavailable", { status: 503 });
    };
  });
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

  test("announces request failures", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "One error-announcement contract is sufficient");
    await installChatError(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const { dialog } = await openAsk(page);
    await dialog
      .getByRole("group", { name: "Suggested questions" })
      .getByRole("button", { name: /strongest proof/i })
      .click();
    await expect(dialog.getByRole("alert")).toContainText("chat is temporarily unavailable");
    await expect(dialog.getByRole("group", { name: "Follow-up questions" })).toHaveCount(0);
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

    const currentUrl = page.url();
    await overview.click();
    await expect(dialog).toHaveCount(0);
    expect(page.url()).toBe(currentUrl);

    const reopened = (await openAsk(page)).dialog;
    await reopened.getByRole("link", { name: "the evidence" }).click();
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
      'button[aria-label="Close portfolio chat"], button[type="submit"], [aria-label="Suggested questions"] button'
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
