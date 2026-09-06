import { expect, test } from "@playwright/test";

const ALL_PROJECTS = [
  "DEUCE Tennis Forecast",
  "Airbnb Data Analyst Agent",
  "ClaimReady",
  "Biliary Tract Cancer Early Detection",
  "Filing Intelligence RAG",
  "GAFFER: Live World Cup Forecasting Platform",
  "ClassPulse",
  "SeanceAI",
  "Citation Format Checker",
] as const;

test.describe("Project Explorer", () => {
  test("keeps every project and destination available without JavaScript", async ({ browser, baseURL }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "One no-JavaScript contract is sufficient");
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage();
    await page.goto("/#projects", { waitUntil: "domcontentloaded" });

    const explorer = page.locator("[data-project-explorer]");
    await expect(explorer.locator("[data-row]")).toHaveCount(9);
    await expect(explorer.getByRole("group", { name: "Filter projects" })).toHaveCount(0);
    await expect(explorer.getByRole("searchbox")).toHaveCount(0);
    for (const title of ALL_PROJECTS) {
      await expect(explorer.getByRole("heading", { level: 3, name: title, exact: true })).toHaveCount(1);
    }
    for (const row of await explorer.locator('[data-row]:not([data-project-slug="btc-early-detection"])').all()) {
      await expect(row.getByRole("link", { name: /live website/i })).toHaveCount(1);
      await expect(row.getByRole("link", { name: /github/i })).toHaveCount(1);
    }
    const privateProject = explorer.locator('[data-project-slug="btc-early-detection"]');
    await expect(privateProject.getByRole("link", { name: /live website|github/i })).toHaveCount(0);
    await expect(privateProject.getByRole("link", { name: /case study/i })).toHaveAttribute("href", "/work/btc-early-detection");
    await expect(privateProject).toContainText("Proprietary client work");
    await expect(explorer).not.toContainText("SunCulture");
    await context.close();
  });

  test("filters, searches, announces results, and resets", async ({ page }) => {
    await page.goto("/#projects", { waitUntil: "domcontentloaded" });
    const explorer = page.locator("[data-project-explorer]");
    const filters = explorer.getByRole("group", { name: "Filter projects" });
    const status = explorer.getByRole("status");
    await expect(filters).toBeVisible();
    await expect(status).toHaveText("9 projects");

    const forecasting = filters.getByRole("button", { name: "Forecasting", exact: true });
    await forecasting.click();
    await expect(forecasting).toHaveAttribute("aria-pressed", "true");
    await expect(explorer.locator("[data-row]")).toHaveCount(2);
    await expect(explorer).toContainText("DEUCE Tennis Forecast");
    await expect(explorer).toContainText("GAFFER: Live World Cup Forecasting Platform");
    await expect(status).toHaveText("2 projects");

    await filters.getByRole("button", { name: "All", exact: true }).click();
    const search = explorer.getByRole("searchbox", { name: "Search projects" });
    await search.fill("FastAPI");
    await expect(explorer.locator("[data-row]")).toHaveCount(5);
    await expect(status).toHaveText("5 projects");
    await expect(explorer.locator("[data-row]")).toHaveText([/FastAPI/, /FastAPI/, /FastAPI/, /FastAPI/, /FastAPI/]);
    for (const title of ["Airbnb Data Analyst Agent", "ClaimReady", "Filing Intelligence RAG", "ClassPulse", "Citation Format Checker"]) {
      await expect(explorer.getByRole("heading", { level: 3, name: title, exact: true })).toHaveCount(1);
    }
    const clear = explorer.getByRole("button", { name: "Clear project search" });
    const clearBox = await clear.boundingBox();
    expect(clearBox?.width ?? 0).toBeGreaterThanOrEqual(44);
    expect(clearBox?.height ?? 0).toBeGreaterThanOrEqual(44);
    await clear.click();
    await expect(status).toHaveText("9 projects");

    await search.fill("not-a-project");
    await expect(status).toHaveText("0 projects");
    await expect(explorer).toContainText("No projects match this view.");
    const reset = explorer.getByRole("button", { name: "Reset filters" });
    expect((await reset.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44);
    await reset.click();
    await expect(explorer.locator("[data-row]")).toHaveCount(9);
    await expect(status).toHaveText("9 projects");
  });

  test("finds featured projects and combines search with categories", async ({ page }) => {
    await page.goto("/#projects", { waitUntil: "domcontentloaded" });
    const explorer = page.locator("[data-project-explorer]");
    const search = explorer.getByRole("searchbox", { name: "Search projects" });
    for (const [query, title] of [
      ["deuce", "DEUCE Tennis Forecast"],
      ["ClaimReady", "ClaimReady"],
      ["  bTc  ", "Biliary Tract Cancer Early Detection"],
    ]) {
      await search.fill(query);
      await expect(explorer.locator("[data-row]")).toHaveCount(1);
      await expect(explorer.getByRole("heading", { name: title, exact: true })).toBeVisible();
    }
    const filters = explorer.getByRole("group", { name: "Filter projects" });
    await filters.getByRole("button", { name: "Production ML", exact: true }).click();
    await expect(explorer.getByRole("status")).toHaveText("1 project");
    await search.fill("ClaimReady");
    await expect(explorer.getByRole("status")).toHaveText("0 projects");
    await filters.getByRole("button", { name: "Agents", exact: true }).click();
    await expect(explorer.getByRole("status")).toHaveText("1 project");
    await expect(explorer).toContainText("Collaborative project");
  });

  test("supports keyboard filtering and a reduced-motion gliding indicator", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "Desktop motion contract");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#projects", { waitUntil: "domcontentloaded" });
    const explorer = page.locator("[data-project-explorer]");
    const filters = explorer.getByRole("group", { name: "Filter projects" });
    const indicator = explorer.locator("[data-filter-indicator]");
    await expect(indicator).toBeVisible();
    const before = await indicator.boundingBox();

    const agents = filters.getByRole("button", { name: "Agents", exact: true });
    await agents.focus();
    await agents.press("Enter");
    await expect(agents).toHaveAttribute("aria-pressed", "true");
    await expect(explorer.locator("[data-row]")).toHaveCount(3);
    await expect(explorer).toContainText("Airbnb Data Analyst Agent");
    await expect(explorer).toContainText("ClaimReady");
    await expect(explorer).toContainText("SeanceAI");
    await expect.poll(async () => (await indicator.boundingBox())?.x).not.toBe(before?.x);
    const transitionSeconds = await indicator.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).transitionDuration)
    );
    expect(transitionSeconds).toBeLessThanOrEqual(0.001);
  });

  test("exposes direct Projects navigation and contains mobile overflow", async ({ page }, testInfo) => {
    if (testInfo.project.name === "mobile-safari") {
      await page.setViewportSize({ width: 320, height: 800 });
    }
    await page.goto("/", { waitUntil: "domcontentloaded" });

    if (testInfo.project.name === "mobile-safari") {
      await page.getByRole("button", { name: "Sections" }).click();
    }
    const projectsLink = page.locator('header a[href="/#projects"]:visible');
    await expect(projectsLink).toBeVisible();
    await projectsLink.click();
    await expect(page).toHaveURL(/\/#projects$/);
    await expect(page.locator("#projects")).toBeInViewport();
    if (testInfo.project.name === "mobile-safari") {
      await expect(page.getByRole("button", { name: "Sections" })).toHaveAttribute("aria-expanded", "false");
      await expect(page.locator("#mobile-sections")).toHaveCount(0);
    }

    const overflow = await page.evaluate(() => {
      const projects = document.getElementById("projects");
      return {
        document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        projects: projects ? projects.scrollWidth - projects.clientWidth : -1,
      };
    });
    expect(overflow.document).toBeLessThanOrEqual(1);
    expect(overflow.projects).toBeLessThanOrEqual(1);
  });
});
