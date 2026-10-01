const metrics = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "speed-index",
  "total-blocking-time",
  "cumulative-layout-shift",
];

export const scoreMinimums = Object.freeze({
  performance: 0.9,
  accessibility: 1,
  "best-practices": 0.95,
  seo: 0.95,
});

export function checkMedianScores(scores) {
  return Object.entries(scoreMinimums).map(([category, minimum]) => {
    const median = scores[category]?.median;
    return {
      category,
      minimum,
      median: Number.isFinite(median) ? median : null,
      passed: Number.isFinite(median) && median >= minimum && median <= 1,
    };
  });
}

function stats(values) {
  if (values.some((value) => !Number.isFinite(value)))
    throw new Error("Lighthouse returned a missing or invalid measurement.");
  const sorted = [...values].sort((a, b) => a - b);
  return { median: sorted[1], min: sorted[0], max: sorted[2], runs: values };
}

export function summarizeRuns(reports) {
  if (reports.length !== 3 || reports.some((report) => report.runtimeError))
    throw new Error("Three successful Lighthouse reports are required.");
  const scores = Object.fromEntries(
    Object.keys(reports[0].categories).map((category) => [
      category,
      stats(reports.map((report) => report.categories[category]?.score)),
    ]),
  );
  // Keep a real report rather than manufacturing an LHR from mixed audit results.
  const representativeRun =
    reports.findIndex(
      (report) => report.categories.performance.score === scores.performance.median,
    ) + 1;
  return {
    representativeRun,
    scores,
    metrics: Object.fromEntries(
      metrics.map((metric) => [
        metric,
        stats(reports.map((report) => report.audits[metric]?.numericValue)),
      ]),
    ),
  };
}

const categoryLabels = {
  performance: "perf",
  accessibility: "a11y",
  "best-practices": "bp",
  seo: "seo",
};
const categoryTitles = {
  performance: "Performance",
  accessibility: "Accessibility",
  "best-practices": "Best practices",
  seo: "SEO",
};
const percent = (score) => (score === null ? "--" : String(Math.round(score * 100)));
const mark = (check) => (check.passed ? "✓" : "✗");
const lcpSeconds = (page) =>
  `${(page.metrics["largest-contentful-paint"].median / 1000).toFixed(2)}s`;
const performanceRuns = (page) => page.scores.performance.runs.map(percent).join(" ");

export function formatPageRow(page, nameWidth) {
  const cells = page.checks.map(
    (check) =>
      `${categoryLabels[check.category]} ${percent(check.median).padStart(3)} ${mark(check)}`,
  );
  return [
    page.name.padEnd(nameWidth),
    page.formFactor.padEnd(7),
    ...cells,
    `LCP ${lcpSeconds(page)}`,
    `perf runs ${performanceRuns(page)}`,
  ].join("  ");
}

export function failedChecks(pages) {
  return pages.flatMap((page) =>
    page.checks.filter((check) => !check.passed).map((check) => ({ page, check })),
  );
}

export function formatFailure({ page, check }) {
  const result =
    check.median === null ? "missing" : `${percent(check.median)} < ${percent(check.minimum)}`;
  return `${page.name} (${page.formFactor}): ${check.category} ${result}`;
}

function countLine(pages) {
  const failed = pages.filter((page) => page.checks.some((check) => !check.passed)).length;
  return `${pages.length - failed}/${pages.length} passed, ${failed} failed`;
}

export function formatSummary(pages, reportDirectory) {
  return [
    `Lighthouse: ${countLine(pages)}`,
    ...failedChecks(pages).map((failure) => `  ✗ ${formatFailure(failure)}`),
    `Reports: ${reportDirectory}/`,
  ].join("\n");
}

export function formatMarkdownSummary(pages) {
  const categories = Object.keys(scoreMinimums);
  const header = [
    "Page",
    "Form factor",
    ...categories.map((c) => categoryTitles[c]),
    "LCP",
    "Performance runs",
  ];
  const rows = pages.map((page) => [
    `${page.name} (\`${page.path}\`)`,
    page.formFactor,
    ...page.checks.map((check) => `${percent(check.median)} ${mark(check)}`),
    lcpSeconds(page),
    performanceRuns(page),
  ]);
  const minimums = `Minimums: ${categories.map((c) => `${categoryTitles[c]} ${percent(scoreMinimums[c])}`).join(", ")}.`;
  return [
    "## Lighthouse",
    "",
    countLine(pages),
    "",
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`),
    "",
    minimums,
    "",
  ].join("\n");
}
