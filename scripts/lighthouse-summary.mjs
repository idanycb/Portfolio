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
