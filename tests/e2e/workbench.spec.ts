import { expect, test, type Page } from "@playwright/test";

const WORKBENCH_TITLES = [
  "DEUCE Tennis Forecast",
  "Airbnb Data Analyst Agent",
  "ClaimReady",
  "Biliary Tract Cancer Early Detection",
] as const;

function articleFor(page: Page, title: (typeof WORKBENCH_TITLES)[number] | "Filing Intelligence RAG") {
  return page.locator("#work article").filter({
    has: page.getByRole("heading", { level: 3, name: title, exact: true }),
  });
}

async function openWorkbench(page: Page) {
  const response = await page.goto("/#work", { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 2, name: /SELECTED PROJECTS/ })).toBeAttached({ timeout: 15_000 });
}

test.describe("Evidence Workbench deployment contracts", () => {
  test("renders four instruments and keeps Financial RAG conventional", async ({ page }) => {
    const runtimeErrors: string[] = [];
    const failedAssets: string[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("response", (response) => {
      const request = response.request();
      const importantAsset = ["document", "script", "stylesheet", "font"].includes(request.resourceType());
      const responseUrl = new URL(response.url());
      const localVercelStub =
        ["127.0.0.1", "localhost"].includes(responseUrl.hostname) &&
        responseUrl.pathname.startsWith("/_vercel/");
      if (
        importantAsset &&
        !localVercelStub &&
        response.status() >= 400 &&
        responseUrl.origin === new URL(page.url()).origin
      ) {
        failedAssets.push(`${response.status()} ${response.url()}`);
      }
    });

    await openWorkbench(page);

    const workbenchArticles = page.locator("#work ol > li > article");
    await expect(workbenchArticles).toHaveCount(4);
    await expect(page.locator('#work ol figure[aria-labelledby^="workbench-"]')).toHaveCount(4);

    for (const title of WORKBENCH_TITLES) {
      await expect(articleFor(page, title)).toHaveCount(1);
    }

    await expect(articleFor(page, "Filing Intelligence RAG")).toHaveCount(0);
    await expect(
      page.locator("#projects [data-row]").filter({ hasText: "Filing Intelligence RAG" })
    ).toHaveCount(1);
    await expect(page.locator("#projects").getByText("ClaimReady", { exact: true })).toHaveCount(0);

    expect(runtimeErrors).toEqual([]);
    expect(failedAssets).toEqual([]);
  });

  test("hydrates and updates every project instrument", async ({ page }) => {
    await openWorkbench(page);

    const deuce = articleFor(page, "DEUCE Tennis Forecast");
    const styleMatchup = deuce.getByRole("button", { name: /Style matchup/ });
    await styleMatchup.click();
    await expect(styleMatchup).toHaveAttribute("aria-pressed", "true");
    await expect(deuce.locator("output")).toContainText("Player-style features capture matchup effects");

    const airbnb = articleFor(page, "Airbnb Data Analyst Agent");
    await expect(airbnb.locator("ol button")).toHaveCount(7);
    await airbnb.getByRole("button", { name: "db tool failure", exact: true }).click();
    await expect(airbnb.locator("output")).toContainText('column "superhost_flag" does not exist');
    await airbnb.getByRole("button", { name: "validator validator retry", exact: true }).click();
    await expect(airbnb.locator("output")).toContainText("Retrying");
    await airbnb.getByRole("button", { name: "narrator cited answer", exact: true }).click();
    await expect(airbnb.locator("output")).toContainText("Superhosts average 4.89 vs 4.61");
    await airbnb.getByRole("button", { name: "Restart recorded sequence" }).click();
    await airbnb.getByRole("button", { name: "play", exact: true }).click();
    await expect(airbnb).toContainText("step 2/7", { timeout: 3_000 });
    await airbnb.getByRole("button", { name: "pause", exact: true }).click();

    const claimReady = articleFor(page, "ClaimReady");
    const jurisdiction = claimReady.getByRole("button", { name: /Jurisdiction Checker/ });
    await jurisdiction.click();
    await expect(jurisdiction).toHaveAttribute("aria-pressed", "true");
    await expect(claimReady.locator("output")).toContainText("monetary cap, limitations period, venue, and damages");
    await expect(claimReady).toContainText("jurisdiction check");
    await claimReady.getByRole("button", { name: /Drafter/ }).click();
    await expect(claimReady.locator("output")).toContainText("PDF renderer");

    const btc = articleFor(page, "Biliary Tract Cancer Early Detection");
    const slider = btc.getByRole("slider", { name: /move index date/i });
    await expect(slider).toHaveValue("56");
    await slider.press("ArrowRight");
    await expect(slider).toHaveValue("57");
    await expect(slider).toHaveAttribute("aria-valuetext", /45 days.*30 days/i);
    await expect(btc.getByTestId("btc-index-marker")).toHaveAttribute("style", /left: 57%/);
  });

  test("preserves case studies and exposes prominent public project destinations", async ({ page, request, baseURL }) => {
    await openWorkbench(page);

    const internalRoutes: Array<[scope: string, route: string]> = [
      ["#work", "/work/deuce-tennis-forecast"],
      ["#work", "/work/airbnb-data-analyst-agent"],
      ["#work", "/work/btc-early-detection"],
      ["#projects", "/work/filing-intelligence-rag"],
    ];

    for (const [scope, route] of internalRoutes) {
      await expect(page.locator(`${scope} a[href="${route}"]`)).toHaveCount(1);
      const response = await request.get(new URL(route, baseURL).toString());
      expect(response.status(), `${route} should resolve`).toBe(200);
    }

    await expect(page.locator('#work a[href="/work/airbnb-data-analyst-agent#trace"]')).toHaveCount(1);

    const publicDestinations = [
      {
        title: "DEUCE Tennis Forecast" as const,
        live: "https://deuce-forecast.web.app/",
        github: "https://github.com/ARJUNVARMA2000/tennis-elo",
      },
      {
        title: "Airbnb Data Analyst Agent" as const,
        live: "https://airbnb-frontend-686529012610.us-east1.run.app/",
        github: "https://github.com/ARJUNVARMA2000/airbnb-data-analyst-agent",
      },
      {
        title: "ClaimReady" as const,
        live: "https://claimready-frontend-7pj7nolpla-ue.a.run.app",
        github: "https://github.com/Agentic-AI-Project-Columbia/claimready",
      },
    ];

    for (const destination of publicDestinations) {
      const article = articleFor(page, destination.title);
      await article.scrollIntoViewIfNeeded();
      const live = article.getByRole("link", { name: /live website/i });
      const github = article.getByRole("link", { name: /github/i });
      await expect(live).toHaveAttribute("href", destination.live);
      await expect(github).toHaveAttribute("href", destination.github);
      await expect(live).toHaveAttribute("target", "_blank");
      await expect(github).toHaveAttribute("target", "_blank");
      await expect(live).toHaveAttribute("rel", /noopener/);
      await expect(github).toHaveAttribute("rel", /noreferrer/);
    }

    const deuce = articleFor(page, "DEUCE Tennis Forecast");
    await expect(deuce).toContainText("Maintained product · data refreshes hourly · model retrains daily");

    const btc = articleFor(page, "Biliary Tract Cancer Early Detection");
    await expect(btc).toContainText("Private production system · public website and source are unavailable");
    await expect(btc.getByRole("link", { name: /live website|github/i })).toHaveCount(0);

    const financialRagRow = page.locator("#projects [data-row]").filter({ hasText: "Filing Intelligence RAG" });
    await financialRagRow.scrollIntoViewIfNeeded();
    await expect(financialRagRow.getByRole("link", { name: /live website/i })).toHaveAttribute(
      "href",
      "https://filing-intelligence-rag-7pj7nolpla-uc.a.run.app"
    );
    await expect(financialRagRow.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/ARJUNVARMA2000/filing-intelligence-rag"
    );
    await expect(financialRagRow.getByRole("link", { name: /case study/i })).toHaveAttribute(
      "href",
      "/work/filing-intelligence-rag"
    );

    const shippedRows = page.locator("#projects [data-row]");
    await expect(shippedRows).toHaveCount(5);
    for (const row of await shippedRows.all()) {
      await row.scrollIntoViewIfNeeded();
      await expect(row.getByRole("link", { name: /live website/i })).toHaveCount(1);
      await expect(row.getByRole("link", { name: /github/i })).toHaveCount(1);
    }
  });

  test("keeps live and GitHub actions prominent on case-study pages", async ({ page }) => {
    await page.goto("/work/deuce-tennis-forecast", { waitUntil: "domcontentloaded" });

    const article = page.locator("article");
    await expect(article.getByRole("link", { name: /live website/i }).first()).toHaveAttribute(
      "href",
      "https://deuce-forecast.web.app/"
    );
    await expect(article.getByRole("link", { name: /github/i }).first()).toHaveAttribute(
      "href",
      "https://github.com/ARJUNVARMA2000/tennis-elo"
    );
    await expect(article).toContainText("Maintained product · data refreshes hourly · model retrains daily");
  });

  test("uses sticky desktop stages and stacked mobile stages without overflow", async ({ page }, testInfo) => {
    await openWorkbench(page);

    const figures = page.locator('#work ol figure[aria-labelledby^="workbench-"]');
    const positions = await figures.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).position));
    const mobile = testInfo.project.name === "mobile-safari";
    expect(positions).toEqual(Array(4).fill(mobile ? "static" : "sticky"));

    const dimensions = await page.evaluate(() => {
      const work = document.querySelector<HTMLElement>("#work");
      return {
        documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        workOverflow: work ? work.scrollWidth - work.clientWidth : -1,
      };
    });
    expect(dimensions.documentOverflow).toBeLessThanOrEqual(1);
    expect(dimensions.workOverflow).toBeLessThanOrEqual(1);
  });

  test("disables sticky staging when reduced motion is requested", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "Desktop reduced-motion contract");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openWorkbench(page);

    const figures = page.locator('#work ol figure[aria-labelledby^="workbench-"]');
    const positions = await figures.evaluateAll((elements) => elements.map((element) => getComputedStyle(element).position));
    expect(positions).toEqual(Array(4).fill("static"));

    const minHeights = await page
      .locator("#work ol > li > article")
      .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).minHeight));
    expect(minHeights).toEqual(Array(4).fill("0px"));
  });
});
