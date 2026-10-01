import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

export async function checkAccessibility(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  await test.info().attach("accessibility", {
    body: JSON.stringify(results, null, 2),
    contentType: "application/json",
  });
  const failures = results.violations.map(({ id, nodes }) => ({
    id,
    targets: nodes.map(({ target }) => target),
  }));
  expect(failures, "Accessibility failures; full results attached to browser report").toEqual([]);
}
