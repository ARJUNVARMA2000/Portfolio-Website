import { expect, test, type Locator, type Page } from "@playwright/test";

const FEATURED_TITLES = ["DEUCE Tennis Forecast", "Airbnb Data Analyst Agent", "ClaimReady", "Biliary Tract Cancer Early Detection"] as const;

function articleFor(page: Page, title: (typeof FEATURED_TITLES)[number]) {
  return page.locator("#work article").filter({ has: page.getByRole("heading", { level: 3, name: title, exact: true }) });
}

async function openGallery(page: Page) {
  expect((await page.goto("/#work", { waitUntil: "domcontentloaded" }))?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 2, name: /selected projects/i })).toBeAttached({ timeout: 15_000 });
  // These controls appear after hydration, avoiding lost clicks on server-rendered instruments.
  await expect(page.getByRole("group", { name: "Filter projects", includeHidden: true })).toBeAttached();
}

async function expand(disclosure: Locator) {
  if (!(await disclosure.evaluate((element) => (element as HTMLDetailsElement).open))) {
    await disclosure.locator(":scope > summary").click();
  }
  await expect(disclosure).toHaveJSProperty("open", true);
}

test.describe("Portfolio gallery and recorded evidence", () => {
  test("shows four labelled previews with optional evidence and a complete directory", async ({ page }) => {
    const runtimeErrors: string[] = [];
    const failedAssets: string[] = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("response", (response) => {
      const importantAsset = ["document", "script", "stylesheet", "font"].includes(response.request().resourceType());
      const url = new URL(response.url());
      const localVercelStub = ["127.0.0.1", "localhost"].includes(url.hostname) && url.pathname.startsWith("/_vercel/");
      if (importantAsset && !localVercelStub && response.status() >= 400 && url.origin === new URL(page.url()).origin) {
        failedAssets.push(`${response.status()} ${response.url()}`);
      }
    });
    await openGallery(page);
    await expect(page.locator("#work ol > li > article")).toHaveCount(4);
    await expect(page.locator("#work ol > li > article > figure")).toHaveCount(4);
    for (const title of FEATURED_TITLES) {
      const article = articleFor(page, title);
      await expect(article.getByRole("figure", { name: `${title} preview`, exact: true })).toHaveCount(1);
      await expect(article.locator("details.project-disclosure")).toHaveJSProperty("open", false);
      await expect(article.locator("details.project-disclosure > summary")).toContainText("Evidence & design");
    }
    await expect(articleFor(page, "DEUCE Tennis Forecast").getByRole("img")).toHaveAttribute("alt", /forecast dashboard/);
    await expect(articleFor(page, "Airbnb Data Analyst Agent")).toContainText("Recorded output");
    await expect(articleFor(page, "ClaimReady")).toContainText("architecture");
    await expect(articleFor(page, "ClaimReady")).toContainText("Collaborative project");
    await expect(articleFor(page, "Biliary Tract Cancer Early Detection")).toContainText("Evaluation schematic");
    await expect(page.locator("#projects [data-row]")).toHaveCount(9);
    for (const title of [...FEATURED_TITLES, "Filing Intelligence RAG"]) {
      await expect(page.locator("#projects").getByRole("heading", { name: title, exact: true, includeHidden: true })).toHaveCount(1);
    }
    expect(runtimeErrors).toEqual([]);
    expect(failedAssets).toEqual([]);
  });

  test("opens evidence disclosures and updates every project instrument", async ({ page }) => {
    await openGallery(page);
    const deuce = articleFor(page, "DEUCE Tennis Forecast");
    const disclosure = deuce.locator("details.project-disclosure");
    const styleMatchup = deuce.getByRole("button", { name: /Style matchup/ });
    await expect(styleMatchup).toBeHidden();
    await expand(disclosure);
    await styleMatchup.click();
    await expect(styleMatchup).toHaveAttribute("aria-pressed", "true");
    await expect(deuce.locator("output")).toContainText("Player-style features capture matchup effects");
    await disclosure.locator(":scope > summary").click();
    await expect(disclosure).toHaveJSProperty("open", false);
    await expect(styleMatchup).toBeHidden();
    await expand(disclosure);
    await expect(styleMatchup).toHaveAttribute("aria-pressed", "true");

    const airbnb = articleFor(page, "Airbnb Data Analyst Agent");
    await expand(airbnb.locator("details.project-disclosure"));
    await expect(airbnb.locator("ol button")).toHaveCount(9);
    await airbnb.getByRole("button", { name: "db tool failure", exact: true }).click();
    await expect(airbnb.locator("output")).toContainText('column "superhost_flag" does not exist');
    await airbnb.getByRole("button", { name: "validator validator retry", exact: true }).click();
    await expect(airbnb.locator("output")).toContainText("host_is_superhost");
    await expect(airbnb.locator("output")).toContainText("Retrying");
    await airbnb.getByRole("button", { name: "narrator cited answer", exact: true }).click();
    await expect(airbnb.locator("output")).toContainText("Superhosts average 4.89 vs 4.61");
    await airbnb.getByRole("button", { name: "Restart recorded sequence" }).click();
    await airbnb.getByRole("button", { name: "play", exact: true }).click();
    await expect(airbnb).toContainText("step 2/9", { timeout: 3_000 });
    await airbnb.getByRole("button", { name: "pause", exact: true }).click();

    const claimReady = articleFor(page, "ClaimReady");
    await expand(claimReady.locator("details.project-disclosure"));
    const jurisdiction = claimReady.getByRole("button", { name: /Jurisdiction Checker/ });
    await jurisdiction.click();
    await expect(jurisdiction).toHaveAttribute("aria-pressed", "true");
    await expect(claimReady.locator("output")).toContainText("monetary cap, limitations period, venue, and damages");
    await claimReady.getByRole("button", { name: /Drafter/ }).click();
    await expect(claimReady.locator("output")).toContainText("PDF renderer");

    const btc = articleFor(page, "Biliary Tract Cancer Early Detection");
    await expand(btc.locator("details.project-disclosure"));
    const slider = btc.getByRole("slider", { name: /move index date/i });
    await expect(slider).toHaveValue("56");
    await slider.press("ArrowRight");
    await expect(slider).toHaveValue("57");
    await expect(slider).toHaveAttribute("aria-valuetext", /45 days.*30 days/i);
    await expect(btc.getByTestId("btc-index-marker")).toHaveAttribute("style", /left: 57%/);
  });

  test("switches recorded answers and exposes the original failure and recovery", async ({ page }) => {
    await openGallery(page);
    const walkthrough = page.locator("#walkthrough");
    await expect(walkthrough).toContainText("Do superhosts get better review scores than other hosts?");
    await expect(walkthrough.getByText(/Superhosts average 4.89 vs 4.61/).first()).toBeVisible();
    const disclosure = walkthrough.locator("details").filter({ has: page.locator("summary", { hasText: "Inspect the recorded steps" }) });
    await expect(disclosure).toHaveJSProperty("open", false);
    await expand(disclosure);
    await expect(walkthrough.locator("ol button")).toHaveCount(9);
    await walkthrough.getByRole("button", { name: "db tool failure", exact: true }).click();
    await expect(walkthrough.locator("output")).toContainText('column "superhost_flag" does not exist');
    await walkthrough.getByRole("button", { name: "validator validator retry", exact: true }).click();
    await expect(walkthrough.locator("output")).toContainText("host_is_superhost");
    await expect(walkthrough.locator("output")).toContainText("attempt 1/3");

    await walkthrough.getByRole("button", { name: "Brooklyn prices", exact: true }).click();
    await expect(walkthrough).toContainText("Which Brooklyn neighborhoods saw the biggest price shift 2019→2023?");
    await expect(walkthrough.getByText(/Biggest jumps: Bushwick/).first()).toBeVisible();
    await expand(disclosure);
    await expect(walkthrough).toContainText("step 1/6");
    await expect(walkthrough.locator("ol button")).toHaveCount(6);
    await expect(walkthrough.locator("output")).toContainText("Join listings × calendar × neighbourhood");
    await walkthrough.getByRole("button", { name: "validator validator retry", exact: true }).click();
    await expect(walkthrough.locator("output")).toContainText("excluded from the headline ranking");

    await walkthrough.getByRole("button", { name: "Union Square rooms", exact: true }).click();
    await expect(walkthrough.getByText(/Cheapest viable private room: \$42\/night/).first()).toBeVisible();
    await expand(disclosure);
    await expect(walkthrough.locator("output")).toContainText("Haversine filter");
    await walkthrough.getByRole("button", { name: "narrator cited answer", exact: true }).click();
    await expect(walkthrough.locator("output")).toContainText("rows with price=0 or <30 available nights excluded");
    await walkthrough.getByRole("button", { name: "Superhost reviews", exact: true }).click();
    await expand(disclosure);
    await expect(walkthrough).toContainText("step 1/9");
    await expect(walkthrough.locator("output")).toContainText("Compare avg review_scores_rating");
  });

  test("keeps project evidence and the first recorded answer available without JavaScript", async ({ browser, baseURL }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "One no-JavaScript contract is sufficient");
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#work ol > li > article")).toHaveCount(4);
    const deuce = articleFor(page, "DEUCE Tennis Forecast");
    const disclosure = deuce.locator("details.project-disclosure");
    await expect(disclosure).toHaveJSProperty("open", false);
    await expand(disclosure);
    await expect(deuce.getByRole("link", { name: "Evaluation methodology notes" }).first()).toBeVisible();
    for (const metric of ["87,957", "0.1950", "0.2017"]) await expect(deuce).toContainText(metric);
    await disclosure.locator(":scope > summary").click();
    await expect(disclosure).toHaveJSProperty("open", false);
    await expect(page.locator("#walkthrough").getByText(/Superhosts average 4.89 vs 4.61/).first()).toBeVisible();
    await expect(page.locator("#projects [data-row]")).toHaveCount(9);
    await context.close();
  });

  test("retains resume evidence, complete role details, and skill context", async ({ page }) => {
    await openGallery(page);
    const experience = page.locator("#experience");
    for (const text of ["Jun 2026 — present", "~500 of 10,000+ providers", "5.2x top-decile lift", "MLflow tracking", "real-world evidence modeling"]) {
      await expect(experience).toContainText(text);
    }
    const roles = experience.locator("details");
    expect(await roles.count()).toBeGreaterThanOrEqual(3);
    for (const detail of await roles.all()) await expect(detail).toHaveJSProperty("open", false);
    await expand(roles.first());
    await expect(experience.getByText(/prioritize ~500 of 10,000\+ providers/)).toBeVisible();
    const gaffer = page.locator('#projects [data-project-slug="gaffer"]');
    for (const text of ["~49K international matches", "8,136 matches", "0.887 log loss versus a 1.05 baseline"]) await expect(gaffer).toContainText(text);
    const filing = page.locator('#projects [data-project-slug="filing-intelligence-rag"]');
    for (const text of ["4,967 indexed passages", "128 filings", "72 automated checks"]) await expect(filing).toContainText(text);
    const about = page.locator("#about");
    const skills = about.locator("details").filter({ has: page.locator("summary", { hasText: "All skills" }) });
    await expect(skills).toHaveJSProperty("open", false);
    await expand(skills);
    for (const skill of ["Propensity scoring", "Causal inference", "Walk-forward validation", "Postgres", "GCP Cloud Run"]) {
      await expect(skills.getByText(skill, { exact: false })).toBeVisible();
    }
    expect(await about.locator('a[href^="/work/"]').count()).toBeGreaterThanOrEqual(4);
  });

  test("preserves case routes and prominent project destinations", async ({ page, request, baseURL }) => {
    await openGallery(page);
    for (const [scope, route] of [["#work", "/work/deuce-tennis-forecast"], ["#work", "/work/airbnb-data-analyst-agent"], ["#work", "/work/btc-early-detection"], ["#projects", "/work/filing-intelligence-rag"]]) {
      await expect(page.locator(`${scope} a[href="${route}"]`)).toHaveCount(1);
      expect((await request.get(new URL(route, baseURL).toString())).status(), `${route} should resolve`).toBe(200);
    }
    const airbnb = articleFor(page, "Airbnb Data Analyst Agent");
    await expand(airbnb.locator("details.project-disclosure"));
    await expect(airbnb.locator('a[href="/work/airbnb-data-analyst-agent#trace"]')).toBeVisible();
    const destinations = [
      { title: "DEUCE Tennis Forecast" as const, live: "https://deuce-forecast.web.app/", github: "https://github.com/ARJUNVARMA2000/tennis-elo" },
      { title: "Airbnb Data Analyst Agent" as const, live: "https://airbnb-frontend-686529012610.us-east1.run.app/", github: "https://github.com/ARJUNVARMA2000/airbnb-data-analyst-agent" },
      { title: "ClaimReady" as const, live: "https://claimready-frontend-7pj7nolpla-ue.a.run.app", github: "https://github.com/Agentic-AI-Project-Columbia/claimready" },
    ];
    for (const destination of destinations) {
      for (const [name, href] of [[/live website/i, destination.live], [/github/i, destination.github]] as const) {
        const link = articleFor(page, destination.title).getByRole("link", { name });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", href);
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", /noopener noreferrer/);
        expect((await link.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44);
      }
    }
    await expect(articleFor(page, "DEUCE Tennis Forecast")).toContainText("Maintained product · data refreshes hourly · model retrains daily");
    const btc = articleFor(page, "Biliary Tract Cancer Early Detection");
    await expect(btc).toContainText("Proprietary client work");
    await expect(btc.getByRole("link", { name: /live website|github/i })).toHaveCount(0);
    const filing = page.locator('#projects [data-project-slug="filing-intelligence-rag"]');
    await filing.scrollIntoViewIfNeeded();
    await expect(filing.getByRole("link", { name: /live website/i })).toHaveAttribute("href", "https://filing-intelligence-rag-7pj7nolpla-uc.a.run.app");
    await expect(filing.getByRole("link", { name: /github/i })).toHaveAttribute("href", "https://github.com/ARJUNVARMA2000/filing-intelligence-rag");
    await expect(filing.getByRole("link", { name: /case study/i })).toHaveAttribute("href", "/work/filing-intelligence-rag");
    await expect(page.locator("#projects [data-row]")).toHaveCount(9);
    for (const row of await page.locator('#projects [data-row]:not([data-project-slug="btc-early-detection"])').all()) {
      await expect(row.getByRole("link", { name: /live website/i })).toHaveCount(1);
      await expect(row.getByRole("link", { name: /github/i })).toHaveCount(1);
    }
  });

  test("makes case-study contributions, limits, and evidence notes inspectable", async ({ page }) => {
    await page.goto("/work/deuce-tennis-forecast", { waitUntil: "domcontentloaded" });
    const article = page.locator("article");
    const summary = article.locator("[data-case-summary]");
    for (const label of ["My contribution", "Key decision", "Result", "Current limitation"]) await expect(summary).toContainText(label);
    await expect(summary).toContainText("Designed and built");
    await expect(summary).toContainText("closing market remains stronger");
    await expect(article.getByRole("link", { name: /live website/i }).first()).toHaveAttribute("href", "https://deuce-forecast.web.app/");
    await expect(article.getByRole("link", { name: /github/i }).first()).toHaveAttribute("href", "https://github.com/ARJUNVARMA2000/tennis-elo");
    const evidenceLink = article.getByRole("link", { name: "Evaluation methodology notes" }).first();
    await expect(evidenceLink).toBeVisible();
    await expect(evidenceLink).toHaveAttribute("href", "/work/deuce-tennis-forecast#evidence");
    await evidenceLink.click();
    await expect(page).toHaveURL(/\/work\/deuce-tennis-forecast#evidence$/);
    await expect(page.locator("section#evidence")).toBeInViewport();
    await expect.poll(async () => (await page.locator("section#evidence").boundingBox())?.y ?? 0).toBeGreaterThanOrEqual(70);
    await page.goto("/work/airbnb-data-analyst-agent", { waitUntil: "domcontentloaded" });
    const citationMetric = page.locator("[data-card]").filter({ hasText: "source-row citations" });
    await expect(citationMetric.locator("[data-value]")).toHaveText("Required");
    await expect(citationMetric).toContainText("System contract");
    await expect(citationMetric).toContainText("not a measured citation-success rate");
    await expect(page.locator("[data-case-summary]")).toContainText("not a measured 100% success rate");
    await page.goto("/work/filing-intelligence-rag", { waitUntil: "domcontentloaded" });
    const documentMetric = page.locator("[data-card]").filter({ hasText: "source documents" });
    const verificationMetric = page.locator("[data-card]").filter({ hasText: "automated verification checks" });
    await expect(documentMetric.locator("[data-value]")).toHaveText("128");
    await expect(documentMetric).toContainText("Corpus scope");
    await expect(verificationMetric.locator("[data-value]")).toHaveText("72");
    await expect(verificationMetric).toContainText("Verification coverage");
    await expect(page.locator("[data-case-summary]")).toContainText("not measured answer accuracy");
  });

  test("opens the original DEUCE screenshots from the case study", async ({ page, request, baseURL }) => {
    await page.goto("/work/deuce-tennis-forecast#system", { waitUntil: "domcontentloaded" });
    await expect(page.locator('#system a[href^="/images/deuce/"]')).toHaveCount(3);
    for (const [name, label] of [["home", "forecasts"], ["rankings", "rankings"], ["style", "player style"]]) {
      const href = `/images/deuce/${name}.png`;
      const link = page.getByRole("link", { name: `Open ${label} screenshot at full size`, exact: true });
      await expect(link).toHaveAttribute("href", href);
      await expect(link.locator("img")).toHaveCount(1);
      const response = await request.get(new URL(href, baseURL).toString());
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toMatch(/^image\/png/);
    }
  });

  test("brings experience into the compact homepage without sticky previews", async ({ page }, testInfo) => {
    const mobile = testInfo.project.name === "mobile-safari";
    await page.setViewportSize(mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 });
    await openGallery(page);
    await page.evaluate(() => document.fonts.ready);
    const geometry = await page.evaluate(() => {
      const experience = document.getElementById("experience")!;
      const articles = Array.from(document.querySelectorAll<HTMLElement>("#work ol > li > article"));
      const previews = Array.from(document.querySelectorAll<HTMLElement>("#work ol > li > article > figure"));
      return {
        experienceTop: experience.getBoundingClientRect().top + window.scrollY,
        articleMinHeights: articles.map((article) => getComputedStyle(article).minHeight),
        previewPositions: previews.map((preview) => getComputedStyle(preview).position),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    expect(geometry.experienceTop).toBeGreaterThan(0);
    expect(geometry.experienceTop).toBeLessThan(mobile ? 3600 : 2500);
    expect(geometry.articleMinHeights).toEqual(Array(4).fill("0px"));
    expect(geometry.previewPositions).toEqual(Array(4).fill("static"));
    expect(geometry.overflow).toBeLessThanOrEqual(1);
  });

  test("keeps previews and disclosures usable at 320px with reduced motion", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-safari", "Narrow mobile reduced-motion contract");
    await page.setViewportSize({ width: 320, height: 800 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openGallery(page);
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const mainNav = page.locator("header nav");
    const brand = mainNav.getByRole("link", { name: "Arjun Varma", exact: true });
    const sections = mainNav.getByRole("button", { name: "Sections", exact: true });
    const brandBox = await brand.boundingBox();
    const sectionsBox = await sections.boundingBox();
    expect(brandBox && sectionsBox && sectionsBox.x - (brandBox.x + brandBox.width)).toBeGreaterThanOrEqual(8);
    expect(sectionsBox?.height).toBeGreaterThanOrEqual(44);
    await sections.click();
    await expect(mainNav.getByRole("link", { name: /Resume/ })).toBeVisible();
    await sections.press("Escape");
    await expect(sections).toHaveAttribute("aria-expanded", "false");
    for (const title of FEATURED_TITLES) {
      const article = articleFor(page, title);
      await expect(article.getByRole("heading", { name: title, exact: true })).toBeVisible();
      await expand(article.locator("details.project-disclosure"));
      const dimensions = await page.evaluate(() => {
        const work = document.getElementById("work")!;
        return { document: document.documentElement.scrollWidth - document.documentElement.clientWidth, work: work.scrollWidth - work.clientWidth };
      });
      expect(dimensions.document).toBeLessThanOrEqual(1);
      expect(dimensions.work).toBeLessThanOrEqual(1);
    }
  });
});
