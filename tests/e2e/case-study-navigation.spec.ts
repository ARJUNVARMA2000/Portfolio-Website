import { expect, test } from "@playwright/test";

const SECTION_IDS = ["context", "constraint", "approach", "system", "evidence", "impact"] as const;

function contrastRatio(foreground: string, background: string) {
  const luminance = (hex: string) => {
    const raw = hex.replace("#", "");
    const normalized = raw.length === 3 ? raw.split("").map((character) => character.repeat(2)).join("") : raw;
    const channels = normalized
      .match(/.{2}/g)!
      .map((channel) => Number.parseInt(channel, 16) / 255)
      .map((channel) =>
        channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
      );
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function blendHex(foreground: string, background: string, alpha: number) {
  const channels = (hex: string) => hex.replace("#", "").match(/.{2}/g)!.map((value) => Number.parseInt(value, 16));
  const foregroundChannels = channels(foreground);
  const backgroundChannels = channels(background);
  return `#${foregroundChannels
    .map((value, index) =>
      Math.round(value * alpha + backgroundChannels[index] * (1 - alpha))
        .toString(16)
        .padStart(2, "0")
    )
    .join("")}`;
}

test.describe("Case-study section navigation", () => {
  test("exposes six semantic anchors in the responsive navigator", async ({ page }, testInfo) => {
    await page.goto("/work/deuce-tennis-forecast", { waitUntil: "domcontentloaded" });
    const nav = page.getByRole("navigation", { name: "Case study sections" });
    await expect(nav).toBeVisible();
    const links = nav.getByRole("link");
    await expect(links).toHaveCount(6);
    for (const id of SECTION_IDS) {
      await expect(nav.locator(`a[href="#${id}"]:visible`)).toHaveCount(1);
      await expect(page.locator(`section#${id}`)).toHaveCount(1);
    }
    await expect(nav).toHaveCSS("position", "sticky");

    const mobileStripVisible = await nav.locator(".case-nav-scroll").isVisible();
    expect(mobileStripVisible).toBe(testInfo.project.name === "mobile-safari");
  });

  test("navigates without obscuring headings and updates scroll-spy state", async ({ page }, testInfo) => {
    await page.goto("/work/deuce-tennis-forecast", { waitUntil: "domcontentloaded" });
    const nav = page.getByRole("navigation", { name: "Case study sections" });
    const impactLink = nav.locator('a[href="#impact"]:visible');
    await impactLink.focus();
    await impactLink.press("Enter");
    await expect(page).toHaveURL(/#impact$/);

    const minimumTop = testInfo.project.name === "mobile-safari" ? 100 : 70;
    await expect
      .poll(async () => {
        const box = await page.locator("section#impact").boundingBox();
        return Boolean(box && box.y >= minimumTop && box.y < 220);
      }, { timeout: 10_000 })
      .toBe(true);
    await expect(impactLink).toHaveAttribute("aria-current", "location");

    const headerBox = await page.locator("header").boundingBox();
    expect(headerBox?.y ?? -1).toBeGreaterThanOrEqual(-1);
    const currentLinks = nav.locator('a[aria-current="location"]:visible');
    await expect(currentLinks).toHaveCount(1);
  });

  test("honors direct hashes, reduced motion, and document overflow", async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/deuce-tennis-forecast#approach", { waitUntil: "domcontentloaded" });
    const nav = page.getByRole("navigation", { name: "Case study sections" });
    const approachLink = nav.locator('a[href="#approach"]:visible');
    await expect(approachLink).toHaveAttribute("aria-current", "location", { timeout: 4_000 });
    await nav.locator('a[href="#evidence"]:visible').click();
    await expect(page).toHaveURL(/#evidence$/);
    await expect(nav.locator('a[href="#evidence"]:visible')).toHaveAttribute("aria-current", "location");

    const overflow = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      article: document.querySelector("article")!.scrollWidth - document.querySelector("article")!.clientWidth,
    }));
    expect(overflow.document).toBeLessThanOrEqual(1);
    expect(overflow.article).toBeLessThanOrEqual(1);
    if (testInfo.project.name === "mobile-safari") {
      const strip = nav.locator(".case-nav-scroll");
      expect(await strip.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
    }
  });

  test("uses contrast-safe accent tokens", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "One token contract is sufficient");
    await page.setViewportSize({ width: 1024, height: 800 });
    await page.goto("/work/deuce-tennis-forecast", { waitUntil: "domcontentloaded" });
    const tokens = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        paper: styles.getPropertyValue("--bg").trim(),
        surface: styles.getPropertyValue("--surface").trim(),
        terminal: styles.getPropertyValue("--term-bg").trim(),
        decorativeAccent: styles.getPropertyValue("--accent").trim(),
        lightAccent: styles.getPropertyValue("--accent-text").trim(),
        terminalAccent: styles.getPropertyValue("--accent-term").trim(),
      };
    });
    expect(tokens.decorativeAccent).toBe("#d9480f");
    expect(contrastRatio(tokens.lightAccent, tokens.paper)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(tokens.lightAccent, tokens.surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(tokens.lightAccent, blendHex(tokens.decorativeAccent, tokens.paper, 0.08))).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(tokens.lightAccent, blendHex(tokens.decorativeAccent, tokens.paper, 0.1))).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(tokens.terminalAccent, tokens.terminal)).toBeGreaterThanOrEqual(4.5);

    const sectionNav = page.getByRole("navigation", { name: "Case study sections" });
    await expect(sectionNav).toHaveCSS("background-color", "rgb(250, 250, 247)");
    await expect(sectionNav.locator('a[href="#constraint"]:visible span').first()).toHaveCSS(
      "color",
      "rgb(184, 58, 12)"
    );
    await expect(page.locator("[data-progress]")).toHaveCSS("background-color", "rgb(217, 72, 15)");
    const primaryAction = page.getByRole("link", { name: /live website/i }).first();
    await expect(primaryAction).toHaveCSS("background-color", "rgb(184, 58, 12)");
    await expect(primaryAction).toHaveCSS("color", "rgb(250, 250, 247)");
  });
});
