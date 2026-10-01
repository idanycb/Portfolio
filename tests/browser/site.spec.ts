import { expect, test } from "@playwright/test";
import { caseStudies } from "../../src/content/case-studies";
import { homeContent } from "../../src/content/home";
import { checkAccessibility } from "./accessibility";

const routes = ["/", ...Object.keys(caseStudies).map((slug) => `/work/${slug}`)];
const widths = [320, 390, 640, 768, 959, 960, 1024, 1440];

test.beforeEach(async ({ page }) => {
  // Tests never contact Turnstile or submit a deliverable message.
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.fulfill({ body: "", contentType: "application/javascript" }),
  );
});

for (const route of routes) {
  for (const width of widths) {
    test(`${route} at ${width}px: layout, accessibility and SEO`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await settlePage(page);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.title()).not.toBe("");
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S+/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      for (const nav of await page.locator("nav:visible").all())
        await expect(nav).toHaveAttribute("aria-label", /\S+/);
      await checkAccessibility(page);
      if (width < 960) {
        const buttons = page.locator("button[aria-expanded]:visible");
        for (const button of await buttons.all()) {
          if (route !== "/") await expect(button).toHaveAccessibleName("SHOW TABLE OF CONTENTS");
          await button.click();
          if (route !== "/") await expect(button).toHaveAccessibleName("HIDE TABLE OF CONTENTS");
          await expect(button).toHaveAttribute("aria-expanded", "true");
          const panel = page.locator(`[id="${await button.getAttribute("aria-controls")}"]`);
          await expect(panel.locator("a").first()).toBeFocused();
          await settleAnimations(page);
          await checkAccessibility(page);
          await page.keyboard.press("Escape");
          await expect(button).toHaveAttribute("aria-expanded", "false");
          await expect(button).toBeFocused();
        }
      }
    });
  }
  test(`${route}: keyboard skip link and reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to content/i })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();
    const hiddenStrokes = await page
      .locator("svg [style*='stroke-dash'], svg .draw")
      .evaluateAll(
        (elements) =>
          elements.filter(
            (element) =>
              getComputedStyle(element).strokeDashoffset !== "0px" &&
              getComputedStyle(element).strokeDashoffset !== "0",
          ).length,
      );
    expect(hiddenStrokes).toBe(0);
  });
}

test("legacy redirects and both 404 routes", async ({ page }) => {
  for (const [from, to] of [
    ["/projects/rag-workspace", "/work/findoc"],
    ["/projects/portfolio-gitops", "/work/portfolio-gitops"],
  ] as const) {
    await page.goto(from);
    await expect(page).toHaveURL(new RegExp(`${to}$`));
  }
  for (const route of ["/missing-page", "/work/missing-study"]) {
    expect((await page.goto(route))?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveCount(1);
    await settlePage(page);
    await checkAccessibility(page);
  }
});

test("contact rejects empty and invalid fields without delivery", async ({ page }) => {
  let submissions = 0;
  page.on("request", (request) => {
    if (request.method() === "POST") submissions++;
  });
  await page.goto("/");
  await page.locator('#contact button[type="submit"]').click();
  expect(
    await page
      .locator("#contact-name")
      .evaluate((element: HTMLInputElement) => element.validity.valueMissing),
  ).toBe(true);
  await page.locator("#contact-name").fill("Test Visitor");
  await page.locator("#contact-email").fill("invalid");
  expect(
    await page
      .locator("#contact-email")
      .evaluate((element: HTMLInputElement) => element.validity.typeMismatch),
  ).toBe(true);
  await page.locator('#contact button[type="submit"]').click();
  expect(submissions).toBe(0);
});

test("server contact validation focuses errors without external delivery", async ({ page }) => {
  await page.goto("/");
  await page.locator("#contact form").evaluate((element: HTMLFormElement) => {
    element.noValidate = true;
    element.querySelector<HTMLInputElement>('input[name="startedAt"]')!.value = String(
      Date.now() - 5000,
    );
  });
  await page.locator('#contact button[type="submit"]').click();
  await expect(page.locator("#contact-name")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#contact-name")).toBeFocused();
  await expect(page.locator("#contact-name-error")).toBeVisible();
});

async function settleAnimations(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    await Promise.all(
      document
        .getAnimations()
        .filter(
          (animation) =>
            animation.playState === "running" &&
            animation.effect?.getComputedTiming().iterations !== Infinity,
        )
        .map((animation) => animation.finished.catch(() => {})),
    );
  });
}

async function settlePage(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 2) {
      scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
    scrollTo(0, 0);
  });
  await settleAnimations(page);
}

test("Next.js portrait endpoint resizes, negotiates formats, and caches variants", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  for (const width of [384, 640, 750]) {
    for (const format of ["webp", "png"]) {
      const url = `/_next/image?url=${encodeURIComponent(homeContent.hero.image.src)}&w=${width}&q=75`;
      const headers = { Accept: `image/${format}` };
      const response = await page.request.get(url, { headers });
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toBe(`image/${format}`);
      const body = await response.body();
      const dimensions = await page.evaluate(
        async ({ bytes, type }) => {
          const image = await createImageBitmap(new Blob([new Uint8Array(bytes)], { type }));
          const result = { width: image.width, height: image.height };
          image.close();
          return result;
        },
        { bytes: Array.from(body), type: `image/${format}` },
      );
      expect(dimensions.width).toBe(width);
      expect(dimensions.height).toBeGreaterThan(0);
      // Original-image fallback can return HTTP 200; dimensions and type must also match.
      await expect
        .poll(async () => {
          const cached = await page.request.get(url, { headers });
          expect((await cached.body()).equals(body)).toBe(true);
          return cached.headers()["x-nextjs-cache"];
        })
        .toBe("HIT");
    }
  }
});
